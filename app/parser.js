import { TdTask } from './tdtask';
import { TaskToken } from './tasktoken';
const { remote } = electronRequire('electron');
const { Menu, dialog } = remote;
const fs = electronRequire('fs');
const readline = electronRequire('readline');

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
			
			let lines = [];

			rl.on('line', function (line) {
				lines.push(that.parseTdTask(line));
			}).on('close',function(){
				callback(lines);
			});
		}
	}

	parseTdTask(taskLine) {
		let tokens = taskLine.split(' '); // each word is a token
		let tdTask = new TdTask();
		let taskString = '';
		let currentTagName = '';

		if(tokens.length !== 0) {
			for(var index = 0; index < tokens.length; index++) {
				//check if task is complete
				if (index == 0 && tokens[index] === 'x') {
					tdTask.isDone = true;
					currentTagName = '';
					tdTask.tokens.push(new TaskTo)
					continue;
				}
				else if (index < 1)
					tdTask.isDone = false;

				if(index < 2 && Parser.priorityRegex.test(tokens[index])) {
					tdTask.priority = tokens[index];
					currentTagName = '';
					continue;
				}

				if (index < 4 && Parser.dateRegex.test(tokens[index])) {
					if(Parser.dateRegex.test(tokens[index + 1])) {
						tdTask.endDate = tokens[index];
						tdTask.createdDate = tokens[++index];
					}
					else
						tdTask.createdDate = tokens[index];
					currentTagName = '';
					continue;
				}

				if(tokens[index][0] === '@') {
					if(tdTask.contexts == null)
						tdTask.contexts = [];
					tdTask.contexts.push(tokens[index]);
					currentTagName = '';
					continue;
				}

				if(tokens[index][0] === '+') {
					if(tdTask.projects == null)
						tdTask.projects = [];
					tdTask.projects.push(tokens[index]);
					currentTagName = '';
					continue;
				}

				//handling due tag separately since it is widely used
				if(tokens[index].indexOf('due:') !== -1) {
					if(tdTask.tags == null)
						tdTask.tags = {}; //tags will be a dictionary
					let tagTokens = tokens[index].split(':');
					tdTask.tags[tagTokens[0]] = tagTokens[1];
					tdTask.dueDate = tagTokens[1];
					currentTagName = '';
					continue;
				}

				if(tokens[index].indexOf(':') !== -1) {
					if(tdTask.tags == null)
						tdTask.tags = {}; //tags will be a dictionary
					let tagTokens = tokens[index].split(':');
					tdTask.tags[tagTokens[0]] = tagTokens[1];
					currentTagName = tagTokens[0];
					continue;
				}
				// if execution comes here that means the token was not
				// parsed
				if(currentTagName.length === 0)
					taskString += ' ' + tokens[index];
				else
					tdTask.tags[currentTagName] += ' ' + tokens[index];

			}
		}
		if(taskString.length !== 0)
			tdTask.task = taskString;
		return tdTask;
	}
}

Parser.priorityRegex = /^\([A-Za-z]{1}\)$/;
Parser.dateRegex = /^\d{4}\-\d{2}\-\d{2}$/;