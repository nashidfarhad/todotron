import React from 'react';
import PropTypes from 'prop-types';
import { Parser } from '../parser';
import { DateUtil } from '../dateutil';

export class TaskEntry extends React.Component {
    constructor (props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.parser = new Parser();
    }
    handleKeyDown (event) {
        if(event.key === 'Enter') {
            let taskLine = event.target.innerHTML;
            if(taskLine.length > 0) {
                let task = this.parser.parseTdTask(taskLine);
                if(this.props.selectedTask == null && task.createdDate === null)
                    task.tokens.unshift(DateUtil.currentDateToken());
                if(this.props.selectedTask != null)
                    this.props.updateTask(this.props.selectedTask, task);
                else
                    this.props.addTask(task);
                event.target.innerHTML = "";
            }
            event.preventDefault();
        }
    }
    render () {
        let taskString;
        if(this.props.selectedTask)
            taskString = this.props.selectedTask.toString();
        return (
            <div className="task-entry" contentEditable={true} suppressContentEditableWarning={true}
                 dangerouslySetInnerHTML={{__html: taskString}}
                 onKeyDown={this.handleKeyDown} >
            </div>
        );
    }
}

TaskEntry.propTypes = {
    addTask: PropTypes.func,
    updateTask: PropTypes.func,
    selectedTask: PropTypes.object
}
