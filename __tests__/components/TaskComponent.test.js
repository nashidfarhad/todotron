import React from 'react';
import { shallow } from 'enzyme';
import { TaskComponent } from '../../app/components/TaskComponent';
import { Task } from '../../app/task';
import { TaskToken } from '../../app/tasktoken';
import { TokenTypes } from '../../app/tokentypes';

describe('Task', () => {
    test('have default className "task"', () => {

        let task = new Task();
        task.tokens = [
            new TaskToken('abc', TokenTypes.NORMAL),
            new TaskToken('abc', TokenTypes.NORMAL)
        ];

        const taskComp = shallow( <TaskComponent task = {task} /> );

        expect(taskComp.find('div').hasClass('task')).toBe(true);
    });

    test('have className "complete" if completion token is present', () => {

        let task = new Task();
        task.tokens = [
            new TaskToken('x', TokenTypes.COMPLETION),
            new TaskToken('abc', TokenTypes.NORMAL)
        ];

        const taskComp = shallow( <TaskComponent task = {task} /> );

        expect(taskComp.find('div').hasClass('complete')).toBe(true);
    });

    test('have className "due" if due token with past date is present', () => {

        let task = new Task();
        task.tokens = [
            new TaskToken('x', TokenTypes.COMPLETION),
            new TaskToken('abc', TokenTypes.NORMAL),
            new TaskToken('due:2017-01-01', TokenTypes.TAG)
        ];

        const taskComp = shallow( <TaskComponent task = {task} /> );

        expect(taskComp.find('div').hasClass('due')).toBe(true);
    });

    test('renders empty span in between tokens', () => {

        let task = new Task();
        task.tokens = [
            new TaskToken('x', TokenTypes.COMPLETION),
            new TaskToken('abc', TokenTypes.NORMAL),
            new TaskToken('due:2017-01-01', TokenTypes.TAG)
        ];

        const taskComp = shallow( <TaskComponent task = {task} /> );

        expect(taskComp.find('div').children().length).toBe(5);
        expect(taskComp.find('div').childAt(1).text()).toBe(" ");
    });
});
