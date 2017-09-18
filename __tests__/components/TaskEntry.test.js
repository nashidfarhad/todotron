import { TaskEntry } from '../../app/components/TaskEntry';
import { Parser } from '../../app/parser';
import { Task } from '../../app/task';
import { TokenTypes } from '../../app/tokentypes';
import { DateUtil } from '../../app/dateutil';
import { mount } from 'enzyme';
import React from 'react';

describe('TaskEntry', () => {
    test('has a parser as property when constructed', () => {
        let taskEntry = new TaskEntry();
        expect(taskEntry.parser instanceof Parser).toBe(true);
    });

    test('returns task when enter is pressed', () => {
        let task = null;
        let addTaskFunc = function (ptask) { 
            task = ptask; 
        };
        let taskEntry = mount(<TaskEntry addTask={addTaskFunc} />);
        let div = taskEntry.find('div').get(0);
        div.innerHTML = "aBc dsf";
        taskEntry.find('div').simulate('keyDown', {key: 'Enter'});
        expect(task instanceof Task).toBe(true);
    });

    test('set creation date when none is provided', () => {
        let task = null;
        let addTaskFunc = function (ptask) { 
            task = ptask; 
        };
        let taskEntry = mount(<TaskEntry addTask={addTaskFunc} />);
        let div = taskEntry.find('div').get(0);
        div.innerHTML = "aBc dsf";
        taskEntry.find('div').simulate('keyDown', {key: 'Enter'});
        expect(task.tokens[0].tokenType).toBe(TokenTypes.CREATION_DATE);
    });

    test('doesn\'t set creation date when one is provided', () => {
        let task = null;
        let addTaskFunc = function (ptask) { 
            task = ptask; 
        };
        let taskEntry = mount(<TaskEntry addTask={addTaskFunc} />);
        let div = taskEntry.find('div').get(0);
        div.innerHTML = "2099-01-01 dsf";
        taskEntry.find('div').simulate('keyDown', {key: 'Enter'});
        expect(task.tokens[1].tokenType).not.toBe(TokenTypes.CREATION_DATE);
        expect(task.tokens[0].token).not.toBe(DateUtil.currentDateToken().token);
    });

    test('sets innerHTML to empty string when enter is pressed', () => {
        let taskEntry = mount(<TaskEntry addTask={jest.genMockFunction()} />);
        taskEntry.find('div').simulate('keyDown', {key: 'Enter'});
        expect(taskEntry.find('div').text()).toBe('');
    });

    test('addTask callback is not called when Enter is the first key pressed', () => {
        let mockAddTaskFunc = jest.fn();
        let taskEntry = mount(<TaskEntry addTask={mockAddTaskFunc} />);
        taskEntry.find('div').simulate('keyDown', {key: 'Enter'});
        expect(mockAddTaskFunc.mock.calls.length).toBe(0);
    });
});

