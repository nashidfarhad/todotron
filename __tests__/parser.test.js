import { Parser } from '../app/parser';
import {Task} from '../app/task';
import { TokenTypes } from '../app/tokentypes';

const parser = new Parser('');

test('parseTdTask returns Type Task', () => {
    let tdtaskline = "x 2016-09-06 bla bla bal jslfjsdlfjslfjl";
    let tdtask = parser.parseTdTask(tdtaskline);
    expect(tdtask instanceof Task).toBe(true);
});

test('parses correct number of tokens', () => {
    let tdtaskline = "x 2016-09-06 bla bla bal jslfjsdlfjslfjl";
    let tdtask = parser.parseTdTask(tdtaskline);
    expect(tdtask.tokens.length).toBe(6);
});

test('x is parsed as completion token', () => {
    let tdtaskline = "x 2016-09-06 bla bla bal jslfjsdlfjslfjl";
    let tdtask = parser.parseTdTask(tdtaskline);
    expect(tdtask.tokens[0].tokenType).toBe(TokenTypes.COMPLETION);
});

test('X is NOT parsed as completion token', () => {
    let tdtaskline = "X 2016-09-06 bla bla bal jslfjsdlfjslfjl";
    let tdtask = parser.parseTdTask(tdtaskline);
    expect(tdtask.tokens[0].tokenType).not.toBe(TokenTypes.COMPLETION);
});

test('priority symbol is parsed as priority token', () => {
    [
        "(A) 2016-09-06 bla bla bal jslfjsdlfjslfjl",
        "(B) 2016-09-06 bla bla bal jslfjsdlfjslfjl",
        "(Z) 2016-09-06 bla bla bal jslfjsdlfjslfjl"
    ].forEach((tdTaskLine) => {
        let tdtask = parser.parseTdTask(tdTaskLine);
        expect(tdtask.tokens[0].tokenType).toBe(TokenTypes.PRIORITY);
    });
});

test('priority symbol should always be uppercase letter', () => {
    [
        "(a) 2016-09-06 bla bla bal jslfjsdlfjslfjl",
        "(b) 2016-09-06 bla bla bal jslfjsdlfjslfjl",
        "(z) 2016-09-06 bla bla bal jslfjsdlfjslfjl"
    ].forEach((tdTaskLine) => {
        let tdtask = parser.parseTdTask(tdTaskLine);
        expect(tdtask.tokens[0].tokenType).toBe(TokenTypes.NORMAL);
    });
});

test('priority symbol should be between A to Z', () => {
    [
        "(1) 2016-09-06 bla bla bal jslfjsdlfjslfjl",
        "(@) 2016-09-06 bla bla bal jslfjsdlfjslfjl",
        "(a) 2016-09-06 bla bla bal jslfjsdlfjslfjl"
    ].forEach((tdTaskLine) => {
        let tdtask = parser.parseTdTask(tdTaskLine);
        expect(tdtask.tokens[0].tokenType).toBe(TokenTypes.NORMAL);
    });
});

test('single date at beggining is parsed as creation date', () => {
    let tdtaskline = "2016-09-06 bla bla bal jslfjsdlfjslfjl";
    let tdtask = parser.parseTdTask(tdtaskline);
    expect(tdtask.tokens[0].tokenType).toBe(TokenTypes.CREATION_DATE);
});

test('first date should be parsed as completion date when task marked as complete', () => {
    ["x 2016-09-06 2016-09-06 bla bla bal jslfjsdlfjslfjl",
     "x (A) 2016-09-06 2016-09-06 bla bla bal jslfjsdlfjslfjl"]
    .forEach((tdtaskline, index) => {
        let tdtask = parser.parseTdTask(tdtaskline);
        expect(tdtask.tokens[index + 1].tokenType).toBe(TokenTypes.COMPLETION_DATE);
    });
});

test('second date is parsed as creation date', () => {
    let tdtaskline = "2016-09-06 2016-09-06 bla bla bal jslfjsdlfjslfjl";
    let tdtask = parser.parseTdTask(tdtaskline);
    expect(tdtask.tokens[1].tokenType).toBe(TokenTypes.CREATION_DATE);
});

test("single date followed by close token should be completion date", () => {
    let tdtaskline = "x 2016-09-06 bla bla bal jslfjsdlfjslfjl";
    let tdtask = parser.parseTdTask(tdtaskline);
    expect(tdtask.tokens[1].tokenType).toBe(TokenTypes.COMPLETION_DATE);
});

test("single date followed by priority token should be creation date", () => {
    let tdtaskline = "(A) 2016-09-06 bla bla bal jslfjsdlfjslfjl";
    let tdtask = parser.parseTdTask(tdtaskline);
    expect(tdtask.tokens[1].tokenType).toBe(TokenTypes.CREATION_DATE);
});

test("third date should not be parsed as date token", () => {
    let idx = [3,2,3,4];
    [
        "(A) 2016-09-06 2016-09-06 2016-09-06 bla bla bal jslfjsdlfjslfjl",
        "2016-09-06 2016-09-06 2016-09-06 bla bla bal jslfjsdlfjslfjl",
        "x 2016-09-06 2016-09-06 2016-09-06 bla bla bal jslfjsdlfjslfjl",
        "x (A) 2016-09-06 2016-09-06 2016-09-06 bla bla bal jslfjsdlfjslfjl"
    ].forEach((tdTaskLine, index) => {
        let tdtask = parser.parseTdTask(tdTaskLine);
        expect([TokenTypes.COMPLETION_DATE, TokenTypes.COMPLETION_DATE]).not.toContain(tdtask.tokens[idx[index]].tokenType);
    });
});

test("second date should not be parsed as date token if there's other tokens between first and second date", () => {
    [
        "x 2016-09-06 abc 2016-09-06 bla bla bal jslfjsdlfjslfjl",
        "x (A) 2016-09-06 abc 2016-09-06 bla bla bal jslfjsdlfjslfjl"
    ].forEach((tdTaskLine, index) => {
        let tdtask = parser.parseTdTask(tdTaskLine);
        expect(tdtask.tokens[index + 4].tokenType).toBe(TokenTypes.NORMAL);
    });
});

test("priority cannot be second token except when first token is x", () => {
    let tdtaskline = "first (A) 2016-09-06 bla bla bla";
    let tdtask = parser.parseTdTask(tdtaskline);
    expect(tdtask.tokens[1].tokenType).not.toBe(TokenTypes.PRIORITY);
});

test("context should be parsed as context", () => {
    [
        "test templates @krost +ringtoneissue",
        "phone issue @impressive",
        "router upgrade @impressive"
    ].map((task) =>{
        let tokens = parser.parseTdTask(task);
        expect(tokens.tokens[2].tokenType).toBe(TokenTypes.CONTEXT);
    });
});

test("email addresses shouldn't be parsed as context", () => {
    [
        "email k@kkkk.com",
        "s's email address is s@ssss.com.au"
    ].map((task) => {
        let tasktokens = parser.parseTdTask(task);
        let anyContext = false;
        tasktokens.tokens.map((token) => {
            if(token.tokenType === TokenTypes.CONTEXT)
                anyContext = true;
        });
        expect(anyContext).toBe(false);
    });
});

test("@ by itself shouldn't be parsed as context", () => {
    [
        "meet jeff @ train station",
        "sierra is @ charlie"
    ].map((task) => {
        let tasktokens = parser.parseTdTask(task);
        let anyContext = false;
        tasktokens.tokens.forEach((token) => {
            if(token.tokenType === TokenTypes.CONTEXT){
                anyContext = true;
            }
        });
        expect(anyContext).toBe(false);
    });
})

test("tokens ending with @ shouldn't be context", () => {
    [
        "let it be@",
        "what@ is it?"
    ].map((task) => {
        let tokens = parser.parseTdTask(task);
        let anyContext = false;
        tokens.tokens.map((token) => {
            if(token.tokenType === TokenTypes.CONTEXT){
                anyContext = true;
            }
        });
        expect(anyContext).toBe(false);
    });
})

test("projects should be parsed as projects", () => {
    let count = 0;
    [
        "test templates @krost +ringtoneissue",
        "phone issue @impressive",
        "router upgrade @impressive +newproject"
    ].map((task) => {
        let tokens = parser.parseTdTask(task);
        tokens.tokens.map((token) => {
            if(token.tokenType === TokenTypes.PROJECT){
                count++;
            }
        });
    });
    expect(count).toBe(2);
});

test("+ by itself shouldn't be parsed as context", () => {
    [
        "meet jeff + train station",
        "sierra is + charlie"
    ].map((task) => {
        let tasktokens = parser.parseTdTask(task);
        let anyContext = false;
        tasktokens.tokens.forEach((token) => {
            if(token.tokenType === TokenTypes.CONTEXT){
                anyContext = true;
            }
        });
        expect(anyContext).toBe(false);
    });
})

test("tokens ending with + shouldn't be context", () => {
    [
        "let it be+",
        "what+ is it?"
    ].map((task) => {
        let tokens = parser.parseTdTask(task);
        let anyContext = false;
        tokens.tokens.map((token) => {
            if(token.tokenType === TokenTypes.CONTEXT){
                anyContext = true;
            }
        });
        expect(anyContext).toBe(false);
    });
})
