import React from 'react';
import { shallow } from 'enzyme';
import { RightPane } from '../../app/components/RightPane';
import { Task } from '../../app/task';

describe('RightPane', () => {
    test('renders LineNumbers', () => {
        let rightPane = shallow(
            <RightPane totalTaskCount={0} tasks={[]} />
        );
        expect(rightPane.find('LineNumbers').length).toBe(1);
    });

    test('renders TaskEntry', () => {
        let rightPane = shallow(
            <RightPane totalTaskCount={0} tasks={[]} />
        );
        expect(rightPane.find('TaskEntry').length).toBe(1);
    });

    test('renders task list when tasks prop is not empty', () => {
        let rightPane = shallow(
            <RightPane totalTaskCount={0} tasks={[ new Task() ]} />
        );
        expect(rightPane.find('TaskComponent').length > 0).toBe(true);
    });

    test('doesn\'t render task list when tasks prop is empty', () => {
        let rightPane = shallow(
            <RightPane totalTaskCount={0} tasks={[]} />
        );
        expect(rightPane.find('TaskComponent').length).toBe(0);
    });
});
