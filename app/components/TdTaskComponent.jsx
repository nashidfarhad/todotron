import React from 'react';
import { TokenComponent } from './TokenComponent';

export class TdTaskComponent extends React.PureComponent {
	render() {
		let classNames = ['tdtask'];
		if(this.props.tdtask.isDone) classNames.push('complete');
		if(this.props.tdtask.isDue()) classNames.push('due');
		let tokenJsx = this.props.tdtask.tokens.map(
			(token, index) => {
				if(index !== 0)
					return [<span>&nbsp;</span>, <TokenComponent token={token} key={index} index={index}/>];
				else
					return <TokenComponent token={token} key={index} index={index}/>;
			}
		);
		return (
			<div className={classNames.join(' ')}>{tokenJsx}</div>
		);
	}
}
