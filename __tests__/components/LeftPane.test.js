import React from 'react';
import { LeftPane } from './../../app/components/LeftPane';
import { shallow } from 'enzyme';

describe('LeftPane Component', () => {
    test('shows total number of tasks', () => {
        let leftPane = shallow(
            <LeftPane totalTaskCount={3} />
        );
        expect(leftPane.find('h2.clickable').text())
        .toBe('Total Task: 3');
    });
});
