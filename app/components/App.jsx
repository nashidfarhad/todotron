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
import * as commFunc from '../commonfunctions';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.taskList = new TaskList();
        this.state = {
            tasks: this.taskList.tasks
        };
        this.bindFunctions();
    }
    bindFunctions() {
        this.addTask = this.addTask.bind(this);
        this.filterByContext = this.filterByContext.bind(this);
        this.filterByProject = this.filterByProject.bind(this);
        this.showAllTasks = this.showAllTasks.bind(this);
        this.saveFile = this.saveFile.bind(this);
    }
    componentWillMount() {
        initiateMainMenu();
    }
    componentWillReceiveProps(nextProps) {
        switch(nextProps.event) {
            case 'open':
                commFunc.openFile();
            break;
            case 'save':
                this.saveFile();
            break;
            case 'new-save':
                this.setState({fileName: nextProps.fileName});
            break;
            default:
            this.taskList = nextProps.taskList;
            this.setState({tasks: this.taskList.tasks});
            if (nextProps.fileName) this.setState({fileName: nextProps.fileName});
        }
    }
    addTask(task) {
        this.setState({tasks: this.taskList.push(task)});
    }
    filterByContext(context) {
        this.setState({
            tasks: this.taskList.filterByContext(context)
        });
    }
    filterByProject(project) {
        this.setState({
            tasks: this.taskList.filterByProject(project)
        });
    }
    showAllTasks() {
        this.setState({
            tasks: this.taskList.tasks
        });
    }
    saveFile(){
        if (this.state.fileName) commFunc.saveFile(this.taskList.toString(), this.state.fileName);
        else commFunc.saveNewFile(this.taskList.toString());
    }
    render() {
        let tasksJsx = this.state.tasks.map((task, index) => <TaskComponent task={task} key={index} />)
        return (
            <div id="main-div">
                <Logo />
                <ToolBar saveFile={this.saveFile}/>
                <div className="left-pane">
                    <h1 className="todotron">ToDoTron</h1>
                    <h2 className="clickable" onClick={this.showAllTasks}>Total Task: {this.taskList.tasks.length}</h2>
                    <DisplayList list={this.taskList.getContextList()} onClick={this.filterByContext} type='context'/>
                    <DisplayList list={this.taskList.getProjectList()} onClick={this.filterByProject} type='project'/>
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
    taskList: PropTypes.object,
    fileName: PropTypes.string,
    event: PropTypes.string
}
