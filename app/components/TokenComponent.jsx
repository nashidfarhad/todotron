import React from 'react';
import { TokenTypes } from '../tokentypes';

export class TokenComponent extends React.Component {
	render() {
		let classNames = ['token'];
		if(this.props.token.tokenType == TokenTypes.CONTEXT)
			classNames.push('context');
		else if(this.props.token.tokenType == TokenTypes.PROJECT)
			classNames.push('project');

		return (
			<span className={classNames.join(' ')}>{this.props.token.token}</span>
		);
	}
}