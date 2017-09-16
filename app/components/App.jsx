import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { TaskComponent } from './TaskComponent';
import {initiateMainMenu } from '../menu';
import {ToolBar} from './ToolBar';
import {LineNumbers} from './LineNumbers';
import {Logo} from './icons/Logo';
import { TaskEntry } from './TaskEntry';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: []
        };
        this.addTask = this.addTask.bind(this);
    }
    componentWillMount() {
        initiateMainMenu();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({task: nextProps.taskList});
    }
    addTask(task) {
        this.setState({task: update(this.state.task, {$push: [task]})});
    }
    render() {
        let tasksJsx = this.state.task.map((task, index) => <TaskComponent task={task} key={index} />)
        return (
            <div id="main-div">
                <Logo />
                <ToolBar/>
                <div className="left-pane">
                    <h1 className="todotron">ToDoTron</h1>
                    <h1>Total Task: {this.state.task.length}</h1>
                </div>
                <div className="right-pane">
                    <LineNumbers lineNumbers={this.state.task.length} />
                    <div className="task-list">
                        <TaskEntry addTask={this.addTask} />
                        {tasksJsx}
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    taskList: PropTypes.array
}
