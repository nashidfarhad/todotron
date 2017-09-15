import React from 'react';
import { shallow } from 'enzyme';
import { Token } from '../../app/components/Token';
import { TaskToken } from '../../app/tasktoken';
import { TokenTypes } from '../../app/tokentypes';

describe('TokenComponent', () => {
    test('shows token string correctly', () => {

        let taskToken = new TaskToken('abc', TokenTypes.NORMAL);

        const tokenComp = shallow( 
            <Token token = { taskToken } />
        );

        expect(tokenComp.text()).toEqual('abc');
    });
    test('default css class is "token"', () => {

        let taskToken = new TaskToken('abc', TokenTypes.NORMAL);

        const tokenComp = shallow( 
            <Token token = { taskToken } />
        );

        expect(tokenComp.find('span').hasClass('token')).toBe(true);
    });
    test('context token has css class "token" & "context"', () => {

        let taskToken = new TaskToken('abc', TokenTypes.CONTEXT);

        const tokenComp = shallow( 
            <Token token = { taskToken } />
        );

        expect(tokenComp.find('span').hasClass('token')).toBe(true);
        expect(tokenComp.find('span').hasClass('context')).toBe(true);
    });
    test('project token has css class "token" & "project"', () => {

        let taskToken = new TaskToken('abc', TokenTypes.PROJECT);

        const tokenComp = shallow( 
            <Token token = { taskToken } />
        );

        expect(tokenComp.find('span').hasClass('token')).toBe(true);
        expect(tokenComp.find('span').hasClass('project')).toBe(true);
    });
});
