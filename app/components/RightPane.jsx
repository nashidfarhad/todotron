import React from 'react';
import PropTypes from 'prop-types';
import { LineNumbers } from './LineNumbers';
import { TaskComponent } from './TaskComponent';
import { TaskEntry } from './TaskEntry';

export class RightPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTask: null
        };
        this.selectTaskForUpdate = this.selectTaskForUpdate.bind(this);
    }

    selectTaskForUpdate(task) {
        this.setState({ selectedTask: task });
    }

    render() {
        let tasksJsx = this.props.tasks.map(
            (task, index) => <TaskComponent task={task} key={index} selectTaskForUpdate={this.selectTaskForUpdate} />
        );
        return (
            <div className="right-pane">
                <LineNumbers lineNumbers={this.props.totalTaskCount} />
                <div className="task-list">
                    <TaskEntry selectedTask={this.state.selectedTask} addTask={this.props.addTask} />
                    {tasksJsx}
                </div>
            </div>
        );
    }
}

RightPane.propTypes = {
    totalTaskCount: PropTypes.number,
    tasks: PropTypes.array,
    addTask: PropTypes.func
};
