import React from 'react';
import { shallow } from 'enzyme';
import { ToolBarButton } from '../../../app/components/icons/ToolBarButton';
import { Task } from '../../../app/task';
import { TaskToken } from '../../../app/tasktoken';
import { TokenTypes } from '../../../app/tokentypes';

describe('ToolBarButton', () => {
    test('passes iconName prop as svg className', () => {
        let toolBarBtn = shallow( <ToolBarButton  iconName="book" fillColor="red"/> );

        expect(toolBarBtn.find('svg').hasClass("book")).toBe(true);
    });
});
