import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { TaskComponent } from './TaskComponent';
import {initiateMainMenu } from '../menu';
import {ToolBar} from './ToolBar';
import {LineNumbers} from './LineNumbers';
import {Logo} from './icons/Logo';
import { TaskEntry } from './TaskEntry';
import { TaskList } from '../tasklist';
import {DisplayList} from './DisplayList';
//import {ProjectList} from './ProjectList';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.taskList = new TaskList();
        this.state = {
            tasks: this.taskList.tasks 
        };
        this.addTask = this.addTask.bind(this);
    }
    componentWillMount() {
        initiateMainMenu();
    }
    componentWillReceiveProps(nextProps) {
        this.taskList = nextProps.taskList;
        this.setState({tasks: this.taskList.tasks});
    }
    addTask(task) {
        this.setState({tasks: this.taskList.push(task)});
    }
    render() {
        let tasksJsx = this.state.tasks.map((task, index) => <TaskComponent task={task} key={index} />)
        return (
            <div id="main-div">
                <Logo />
                <ToolBar/>
                <div className="left-pane">
                    <h1 className="todotron">ToDoTron</h1>
                    <h2>Total Task: {this.taskList.tasks.length}</h2>
                    <DisplayList list={this.taskList.getContextList()} type='Contexts'/>
                    <DisplayList list={this.taskList.getProjectList()} type='Projects'/>
                </div>
                <div className="right-pane">
                    <LineNumbers lineNumbers={this.state.tasks.length} />
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
    taskList: PropTypes.object
}
