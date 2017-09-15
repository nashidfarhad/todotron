import React from 'react';
import PropTypes from 'prop-types';
import { TokenTypes } from '../tokentypes';

export class Token extends React.Component {
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

Token.propTypes = {
    token: PropTypes.object
}
