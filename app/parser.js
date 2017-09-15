import { Task } from './task';
import { TaskToken } from './tasktoken';
import { TokenTypes } from './tokentypes';
const { remote } = require('electron');
const { Menu, dialog } = remote;
const fs = require('fs');
const readline = require('readline');

export class Parser {
    constructor(fileName) {
        this.todoFileName = fileName;
    }

    getParsedTodoList(callback) {
        let that = this;
        if (this.todoFileName !== undefined &&
            this.todoFileName !== null &&
            this.todoFileName.length !== 0) {
            const rl = readline.createInterface({
                input: fs.createReadStream(this.todoFileName)
            });

            let tdtasks = [];

            rl.on('line', function (line) {
                tdtasks.push(that.parseTdTask(line));
            }).on('close', function () {
                callback(tdtasks);
            });
        }
    }

    parseTdTask(taskLine) {
        let tokens = taskLine.split(' '); // each word is a token
        let tdTask = new Task();
        let completionDateParsed = false;

        if (tokens.length !== 0) {
            for (var index = 0; index < tokens.length; index++) {
                if (index < 4) {
                    if (index === 0 ) {
                        if(tokens[index] === 'x') {
                            tdTask.tokens.push(new TaskToken(tokens[index], TokenTypes.COMPLETION));
                            continue;
                        }
                        else if (Parser.priorityRegex.test(tokens[index])) {
                            tdTask.tokens.push(new TaskToken(tokens[index], TokenTypes.PRIORITY));
                            continue;
                        }
                        else if (Parser.dateRegex.test(tokens[index])) {
                            tdTask.tokens.push(new TaskToken(tokens[index], TokenTypes.CREATION_DATE));
                            continue;
                        }
                    }
                    else if (index === 1) {
                        if (Parser.priorityRegex.test(tokens[index]) && tdTask.isDone) {
                            tdTask.tokens.push(new TaskToken(tokens[index], TokenTypes.PRIORITY));
                            continue;
                        }
                        else if (Parser.dateRegex.test(tokens[index])) {
                            if(tdTask.isDone) {
                                tdTask.tokens.push(new TaskToken(tokens[index], TokenTypes.COMPLETION_DATE));
                                completionDateParsed = true;
                            } else
                                tdTask.tokens.push(new TaskToken(tokens[index], TokenTypes.CREATION_DATE));
                            continue;
                        }
                    }
                    else if (index === 2) {
                        if (Parser.dateRegex.test(tokens[index])) {
                            if(!completionDateParsed && tdTask.isDone) {
                                tdTask.tokens.push(new TaskToken(tokens[index], TokenTypes.COMPLETION_DATE));
                                completionDateParsed = true;
                            } else
                                tdTask.tokens.push(new TaskToken(tokens[index], TokenTypes.CREATION_DATE));
                            continue;
                        }
                    }
                    else if (index === 3) {
                        if (Parser.dateRegex.test(tokens[index])) {
                            if(completionDateParsed) {
                                tdTask.tokens.push(new TaskToken(tokens[index], TokenTypes.CREATION_DATE));
                                continue;
                            }
                        }
                    }
                }

                if (tokens[index][0] === '@' && tokens[index].length > 1) {
                    tdTask.tokens.push(new TaskToken(tokens[index], TokenTypes.CONTEXT));
                    continue;
                }

                if (tokens[index][0] === '+') {
                    tdTask.tokens.push(new TaskToken(tokens[index], TokenTypes.PROJECT));
                    continue;
                }

                if (tokens[index].indexOf(':') !== -1) {
                    tdTask.tokens.push(new TaskToken(tokens[index], TokenTypes.TAG));
                    continue;
                }
                // if execution comes here that means the token was not
                // parsed
                tdTask.tokens.push(new TaskToken(tokens[index], TokenTypes.NORMAL));
            }
        }
        return tdTask;
    }
}

Parser.priorityRegex = /^\([A-Z]{1}\)$/;
Parser.dateRegex = /^\d{4}-\d{2}-\d{2}$/;
