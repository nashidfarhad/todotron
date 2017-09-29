import React from 'react';
import PropTypes from 'prop-types';
import { TaskComponent } from './TaskComponent';
import { initiateMainMenu } from '../menu';
import { ToolBar } from './ToolBar';
import { LineNumbers } from './LineNumbers';
import { Logo } from './icons/Logo';
import { TaskEntry } from './TaskEntry';
import { TaskList } from '../tasklist';
import { LeftPane } from './LeftPane';

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
    render() {
        let tasksJsx = this.state.tasks.map((task, index) => <TaskComponent task={task} key={index} />)
        return (
            <div id="main-div">
                <Logo />
                <ToolBar/>
                <LeftPane totalTaskCount={this.taskList.tasks.length}
                          contexts={this.taskList.getContextList()}
                          projects={this.taskList.getProjectList()}
                          onContextItemClick={this.filterByContext}
                          onProjectItemClick={this.filterByProject}
                          onTotalTaskClick={this.showAllTasks} />
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
    fileName: PropTypes.string
}
