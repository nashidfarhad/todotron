import React from 'react';
import {initiateMainMenu } from '../menu';

const path = electronRequire('path');
const fs = electronRequire('fs');
const {remote} = electronRequire('electron');
const {dialog} = remote;

export class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tdtasks : []
    };
  }
  componentWillMount() {
    initiateMainMenu();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({tdtasks: nextProps.tdtasks});
  }
  loadFile(){
        fs.readFile(path.resolve('./TODO.txt'), function (err, data) {
            if (err) {
                return console.error(err);
            }
            document.getElementById('file-content').innerText = data.toString();

        });
  }
  render(){
    return(
      <div>
      <button onClick={this.loadFile}>Load File</button>
      <h1>Total Task: {this.state.tdtasks.length}</h1>
      </div>
    );
  }
}
