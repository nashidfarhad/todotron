import React from 'react';
import { shallow } from 'enzyme';
import { ToolBar } from '../../app/components/ToolBar';

describe('TooBar', () => {
    test('have default className "toolbar"', () => {
        let toolBar = shallow( <ToolBar /> );

        expect(toolBar.find('div').hasClass('toolbar')).toBe(true);
    });
});
