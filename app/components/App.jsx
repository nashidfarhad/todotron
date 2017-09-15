import React from 'react';
import PropTypes from 'prop-types';
import { TdTaskComponent } from './TdTaskComponent';
import {initiateMainMenu } from '../menu';
import {ToolBar} from './ToolBar';
import {LineNumbers} from './LineNumbers';
import {Logo} from './icons/Logo';
import { TaskEntry } from './TaskEntry';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tdtasks: []
        };
        this.addTask = this.addTask.bind(this);
    }
    componentWillMount() {
        initiateMainMenu();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({tdtasks: nextProps.tdtasks});
    }
    addTask(task) {
        let tdtsk = this.state.tdtasks.slice();
        tdtsk.push(task);
        this.setState({tdtasks: tdtsk});
    }
    render() {
        let tasksJsx = this.state.tdtasks.map((task, index) => <TdTaskComponent tdtask={task} key={index} />)
        return (
            <div id="main-div">
                <Logo />
                <ToolBar/>
                <div className="left-pane">
                    <h1 className="todotron">ToDoTron</h1>
                    <h1>Total Task: {this.state.tdtasks.length}</h1>
                </div>
                <div className="right-pane">
                    <LineNumbers lineNumbers={this.state.tdtasks.length} />
                    <div className="tdtasks">
                        <TaskEntry addTask={this.addTask} />
                        {tasksJsx}
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    tdtasks: PropTypes.array
}
