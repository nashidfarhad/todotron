import React from 'react';
import { shallow } from 'enzyme';
import { TdTaskComponent } from '../../app/components/TdTaskComponent';
import { TdTask } from '../../app/tdtask';
import { TaskToken } from '../../app/tasktoken';
import { TokenTypes } from '../../app/tokentypes';

describe('TdTaskComponent', () => {
    test('have default className "tdtask"', () => {

        let tdtask = new TdTask();
        tdtask.tokens = [
            new TaskToken('abc', TokenTypes.NORMAL),
            new TaskToken('abc', TokenTypes.NORMAL)
        ];

        const taskComp = shallow( <TdTaskComponent tdtask = {tdtask} /> );

        expect(taskComp.find('div').hasClass('tdtask')).toBe(true);
    });

    test('have className "complete" if completion token is present', () => {

        let tdtask = new TdTask();
        tdtask.tokens = [
            new TaskToken('x', TokenTypes.COMPLETION),
            new TaskToken('abc', TokenTypes.NORMAL)
        ];

        const taskComp = shallow( <TdTaskComponent tdtask = {tdtask} /> );

        expect(taskComp.find('div').hasClass('complete')).toBe(true);
    });

    test('have className "due" if due token with past date is present', () => {

        let tdtask = new TdTask();
        tdtask.tokens = [
            new TaskToken('x', TokenTypes.COMPLETION),
            new TaskToken('abc', TokenTypes.NORMAL),
            new TaskToken('due:2017-01-01', TokenTypes.TAG)
        ];

        const taskComp = shallow( <TdTaskComponent tdtask = {tdtask} /> );

        expect(taskComp.find('div').hasClass('due')).toBe(true);
    });

    test('renders empty span in between tokens', () => {

        let tdtask = new TdTask();
        tdtask.tokens = [
            new TaskToken('x', TokenTypes.COMPLETION),
            new TaskToken('abc', TokenTypes.NORMAL),
            new TaskToken('due:2017-01-01', TokenTypes.TAG)
        ];

        const taskComp = shallow( <TdTaskComponent tdtask = {tdtask} /> );

        expect(taskComp.find('div').children().length).toBe(5);
        expect(taskComp.find('div').childAt(1).text()).toBe(" ");
    });
});
