import React from 'react';
import PropTypes from 'prop-types';
import { TdTaskComponent } from './TdTaskComponent';
import {initiateMainMenu } from '../menu';
import {ToolBar} from './ToolBar';
import {LineNumbers} from './LineNumbers';
import {Logo} from './icons/Logo';
import { TaskEntry } from './TaskEntry';
//const path = require('path'); //MARK FOR DELETION
//const fs = require('fs'); //MARK FOR DELETION
//const {remote} = require('electron'); //MARK FOR DELETION
//const {dialog} = remote; //MARK FOR DELETION

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tdtasks: []
        };
    }
    componentWillMount() {
        initiateMainMenu();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({tdtasks: nextProps.tdtasks});
    }
    /* MARK FOR DELETION
    loadFile() {
        fs.readFile(path.resolve('./TODO.txt'), function(err, data) {
            if (err) {
                return console.error(err);
            }
            document.getElementById('file-content').innerText = data.toString();

        });
    }
    */
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
                        <TaskEntry />
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
