import React from 'react';
import { TdTaskComponent } from './TdTaskComponent';
import {initiateMainMenu } from '../menu';
import {ToolBar} from './ToolBar';

const path = electronRequire('path');
const fs = electronRequire('fs');
const {remote} = electronRequire('electron');
const {dialog} = remote;

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
    loadFile() {
        fs.readFile(path.resolve('./TODO.txt'), function(err, data) {
            if (err) {
                return console.error(err);
            }
            document.getElementById('file-content').innerText = data.toString();

        });
    }
    render() {
        let tasksJsx = this.state.tdtasks.map((task, index) => <TdTaskComponent tdtask={task} key={index} />)
        return (
            <div id="main-div">
                <ToolBar/>
                <div className="left-pane">
                    <h1 className="todotron">ToDoTron</h1>
                </div>
                <div className="right-pane">
                    <button onClick={this.loadFile}>Load File</button>
                    <h1>Total Task: {this.state.tdtasks.length}</h1>
                    {tasksJsx}
                </div>
            </div>
        );
    }
}
