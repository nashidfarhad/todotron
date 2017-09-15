import React from 'react';
import PropTypes from 'prop-types';
import { Parser } from '../parser';

export class TaskEntry extends React.Component {
    constructor (props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.parser = new Parser();
    }
    handleKeyDown (event) {
        if(event.key === 'Enter') {
            let taskLine = event.target.innerHTML;
            this.props.addTask(this.parser.parseTdTask(taskLine));
            event.target.innerHTML = "";
            event.preventDefault();
        }
    }
    render () {
        return (
            <div className="task-entry" contentEditable={true}
                 onKeyDown={this.handleKeyDown} >
            </div>
        );
    }
}

TaskEntry.propTypes = {
    addTask: PropTypes.func
}
