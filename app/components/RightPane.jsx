import React from 'react';
import PropTypes from 'prop-types';
import { LineNumbers } from './LineNumbers';
import { TaskComponent } from './TaskComponent';
import { TaskEntry } from './TaskEntry';

export class RightPane extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let tasksJsx = this.props.tasks.map((task, index) => <TaskComponent task={task} key={index} />);
        return (
            <div className="right-pane">
                <LineNumbers lineNumbers={this.props.totalTaskCount} />
                <div className="task-list">
                    <TaskEntry addTask={this.props.addTask} />
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
