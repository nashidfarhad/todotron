import React from 'react';
import PropTypes from 'prop-types';
import { Token } from './Token';

export class TaskComponent extends React.PureComponent {
	render() {
		let classNames = ['task'];
		if(this.props.task.isDone) classNames.push('complete');
		if(this.props.task.isDue()) classNames.push('due');
		let tokenJsx = this.props.task.tokens.map(
			(token, index) => {
				if(index !== 0)
					return [<span>&nbsp;</span>, <Token token={token} key={index} index={index}/>];
				else
					return <Token token={token} key={index} index={index}/>;
			}
		);
		return (
			<div className={classNames.join(' ')}>{tokenJsx}</div>
		);
	}
}

TaskComponent.propTypes = {
    task: PropTypes.object
}
