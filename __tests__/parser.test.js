import { Parser } from '../app/parser';
import { TokenTypes } from '../app/tokentypes';

const parser = new Parser('');

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

test('first date is parsed as completion date when second date exists', () => {
    let tdtaskline = "2016-09-06 2016-09-06 bla bla bal jslfjsdlfjslfjl";
    let tdtask = parser.parseTdTask(tdtaskline);
    expect(tdtask.tokens[0].tokenType).toBe(TokenTypes.COMPLETION_DATE);
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
    [
        "(A) 2016-09-06 2016-09-06 2016-09-06 bla bla bal jslfjsdlfjslfjl",
        "2016-09-06 2016-09-06 2016-09-06 bla bla bal jslfjsdlfjslfjl",
        "x 2016-09-06 2016-09-06 2016-09-06 bla bla bal jslfjsdlfjslfjl",
        "x (A) 2016-09-06 2016-09-06 2016-09-06 bla bla bal jslfjsdlfjslfjl"
    ].forEach((tdTaskLine) => {
        let tdtask = parser.parseTdTask(tdTaskLine);
        expect([TokenTypes.COMPLETION_DATE, TokenTypes.COMPLETION_DATE]).not.toContain(tdtask.tokens[0].tokenType);
    });
});

test("second date should not be parsed as date token if there's other tokens between first and second date", () => {
    [
        "(A) 2016-09-06 abc 2016-09-06 bla bla bla jslfjsdlfjslfjl",
        "2016-09-06 abc 2016-09-06 bla bla bal jslfjsdlfjslfjl",
        "x 2016-09-06 abc 2016-09-06 bla bla bal jslfjsdlfjslfjl",
        "x (A) 2016-09-06 abc 2016-09-06 bla bla bal jslfjsdlfjslfjl"
    ].forEach((tdTaskLine) => {
        let tdtask = parser.parseTdTask(tdTaskLine);
        expect(tdtask.tokens.filter(token => token.tokenType === TokenTypes.CREATION_DATE).length).toBe(0);
    });
});

test("priority cannot be second token except when first token is x", () => {
    let tdtaskline = "first (A) 2016-09-06 bla bla bla";
    let tdtask = parser.parseTdTask(tdtaskline);
    expect(tdtask.tokens[1].tokenType).not.toBe(TokenTypes.PRIORITY);
});