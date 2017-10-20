import React from 'react';
import PropTypes from 'prop-types';
import { Token } from './Token';

export class TaskComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
    }

    handleDoubleClick(event) {
        this.props.selectTaskForUpdate(this.props.task);
    }

    render() {
        let classNames = ['task'];
        if(this.props.task.isDone) classNames.push('complete');
        if(this.props.task.isDue()) classNames.push('due');
        let tokenJsx = this.props.task.tokens.map(
            (token, index) => {
                if(index !== 0)
                    return [
                        <span key={'empty' + index}>&nbsp;</span>, 
                        <Token token={token} key={index} index={index}/>
                    ];
                else
                    return <Token token={token} key={index} index={index}/>;
            }
        );
        return (
            <div className={classNames.join(' ')} onDoubleClick={this.handleDoubleClick}>{tokenJsx}</div>
        );
    }
}

TaskComponent.propTypes = {
    task: PropTypes.object,
    selectTaskForUpdate: PropTypes.func
}
