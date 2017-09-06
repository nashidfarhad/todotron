const electronRequire = require;
import { Parser } from '../app/parser';
import { TokenTypes } from '../app/tokentypes';

const parser = new Parser('');

test('parses correct number of tokens', () => {
    let tdtaskline = "x 2016-09-06 bla bla bal jslfjsdlfjslfjl";
    let tdtask = parser.parseTdTask(tdtaskline);
    expect(tdtask.tokens.length).toBe(6);
});

test('x makes first tokens TokenType COMPLETION', () => {
    let tdtaskline = "x 2016-09-06 bla bla bal jslfjsdlfjslfjl";
    let tdtask = parser.parseTdTask(tdtaskline);
    expect(tdtask.tokens[0].tokenType).toBe(TokenTypes.COMPLETION);
});