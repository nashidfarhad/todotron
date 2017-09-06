const electronRequire = require;
import { Parser } from '../app/parser';
import { TokenTypes } from '../app/tokentypes';

test('x makes first tokens TokenType COMPLETION', () => {
    global.electronRequire = function(){};
    let parser = new Parser('');
    let tdtaskline = "x 2016-09-06 bla bla bal jslfjsdlfjslfjl";
    let tdtask = parser.parseTdTask(tdtaskline);
    expect(tdtask.tokens[0].tokenType).toBe(TokenTypes.COMPLETION);
});