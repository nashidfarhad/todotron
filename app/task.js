import { Parser } from './parser';
import { TokenTypes } from './tokentypes';

export class Task {
    // var task : String;
    // var createdDate : Date;
    // var endDate : Date;
    // var dueDate : Date; // keyvalue [due:YYYY-MM-DD]
    // var taskID : String; // system generated ID to track each task, keyvalue [id:String]
    // var PID : String; // to store the parent task ID, keyvalue [pid:String]
    // var project : Array;
    // var context : Array;
    // var priority : String;
    // var isDone : boolean;
    // var notes : String; // to store additional notes on a task, keyvalue [notes:String]
    // var recur : String;
    // var repeat : int;

    constructor() {
        this.tokens = [];
    }

    get createdDate() {
        if (this.tokens != null) {
            let tks = this.tokens.filter((token) => token.tokenType === TokenTypes.CREATION_DATE);
            if (tks != null && tks.length > 0 && Parser.dateRegex.test(tks[0].token))
                return new Date(tks[0].token);
        }
        return null;
    }

    get endDate() {
        if (this.tokens != null) {
            let tks = this.tokens.filter((token) => token.tokenType === TokenTypes.COMPLETION_DATE);
            if (tks != null && tks.length > 0 && Parser.dateRegex.test(tks[0].token))
                return new Date(tks[0].token);
        }
        return null;
    }

    get dueDate() {
        if (this.tokens != null) {
            let tks = this.tokens.filter((token) => token.tokenType === TokenTypes.TAG && token.tagName === 'due');
            if (tks != null && tks.length > 0 && Parser.dateRegex.test(tks[0].tagValue))
                return new Date(tks[0].tagValue);
        }
        return null;
    }

    get projects() {
        if (this.tokens != null) {
            let tks = this.tokens.filter((token) => token.tokenType === TokenTypes.PROJECT);
            if (tks != null && tks.length > 0)
                return tks.map((tk) => tk.token);
        }
        return null;
    }

    get contexts() {
        if (this.tokens != null) {
            let tks = this.tokens.filter((token) => token.tokenType === TokenTypes.CONTEXT);
            if (tks != null && tks.length > 0)
                return tks.map((tk) => tk.token);
        }
        return null;
    }

    get priority() {
        if (this.tokens != null) {
            let tks = this.tokens.filter((token) => token.tokenType === TokenTypes.PRIORITY);
            if (tks != null && tks.length > 0)
                return tks[0].token;
        }
        return null;
    }

    get isDone() {
        if (this.tokens != null) {
            let tks = this.tokens.filter((token) => token.tokenType === TokenTypes.COMPLETION);
            return tks != null && tks.length > 0;
        }
        return false;
    }

    isDue() {
        if (this.dueDate != null) {
            return ((new Date() - this.dueDate) > 0);
        }
        return false;
    }

    /*
     * this method will allow string generation of task to
     * write in todo.txt file
     */
    toString() {
        //TODO: redo toString method based on tokens array
        let taskLine = "";
        this.tokens.map((token) => {
            // if(token.tokenType === TokenTypes.TAG) {
            //     taskLine += ' ' + token.tagName + ':' + token.tagValue;
            // }
            taskLine = taskLine + ' ' + token.token;
        });
        return taskLine.substr(1);
    }
}
