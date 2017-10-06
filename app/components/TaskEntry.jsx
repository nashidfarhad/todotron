import React from 'react';
import PropTypes from 'prop-types';
import { Parser } from '../parser';
import { DateUtil } from '../dateutil';

export class TaskEntry extends React.Component {
    constructor (props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.parser = new Parser();
        this.taskLine = '';
    }
    handleKeyDown (event) {
        if(event.key === 'Enter') {
            if(this.taskLine.length > 0) {
                let task = this.parser.parseTdTask(this.taskLine);
                if(this.props.selectedTask == null && task.createdDate === null)
                    task.tokens.unshift(DateUtil.currentDateToken());
                if(this.props.selectedTask != null)
                    this.props.updateTask(this.props.selectedTask, task);
                else
                    this.props.addTask(task);
                event.target.innerHTML = "";
                this.taskLine = "";
            }
            event.preventDefault();
        }
        else {
            this.taskLine = event.target.innerHTML + event.key;
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
