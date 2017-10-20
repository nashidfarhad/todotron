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
        taskEntry.find('div').simulate('keyDown', {key: 'b'});
        taskEntry.find('div').simulate('keyDown', {key: 'Enter'});
        expect(task instanceof Task).toBe(true);
    });

    test('set creation date when none is provided', () => {
        let task = null;
        let addTaskFunc = function (ptask) { 
            task = ptask; 
        };
        let taskEntry = mount(<TaskEntry addTask={addTaskFunc} />);
        taskEntry.find('div').simulate('keyDown', {key: 'c'});
        taskEntry.find('div').simulate('keyDown', {key: 'Enter'});
        expect(task.tokens[0].tokenType).toBe(TokenTypes.CREATION_DATE);
    });

    test('doesn\'t set creation date when one is provided', () => {
        let task = null;
        let addTaskFunc = function (ptask) { 
            task = ptask; 
        };
        let taskEntry = mount(<TaskEntry addTask={addTaskFunc} />);
        taskEntry.find('div').simulate('keyDown', {key: '2099-01-01 dsf'});
        taskEntry.find('div').simulate('keyDown', {key: 'Enter'});
        expect(task.tokens[1].tokenType).not.toBe(TokenTypes.CREATION_DATE);
        expect(task.tokens[0].token).not.toBe(DateUtil.currentDateToken().token);
    });

    test('doesn\'t set creation date when updating', () => {
        let task = null;
        let updateTaskFunc = function (seltask, tsk) { 
            task = tsk; 
        };
        let parser = new Parser();
        let selTask = parser.parseTdTask("test task");
        let taskEntry = mount(<TaskEntry updateTask={updateTaskFunc} selectedTask={selTask} />);
        taskEntry.find('div').simulate('keyDown', {key: 'test task'});
        taskEntry.find('div').simulate('keyDown', {key: 'Enter'});
        expect(task.tokens[0].tokenType).not.toBe(TokenTypes.CREATION_DATE);
    });
    
    test('sets innerHTML to empty string when enter is pressed', () => {
        let taskEntry = mount(<TaskEntry addTask={jest.genMockFunction()} />);
        taskEntry.find('div').simulate('keyDown', {key: 'c'});
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

