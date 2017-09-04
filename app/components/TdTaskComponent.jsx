import React from 'react';

export class TdTaskComponent extends React.Component {
	render() {
		let classNames = ['tdtask'];
		if(this.props.tdtask.isDone) classNames.push('complete');
		if(this.props.tdtask.isDue()) classNames.push('due');
		return (
			<div className={classNames.join(' ')}>{this.props.tdtask.task}</div>
		);
	}
}