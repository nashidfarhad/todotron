import React from 'react';
import {initiateMainMenu } from '../menu';

const path = electronRequire('path');
const fs = electronRequire('fs');
const {remote} = electronRequire('electron');
const {dialog} = remote;

export class App extends React.Component{
  componentWillMount() {
    initiateMainMenu();
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
      <h1>Hello World</h1>
      <button onClick={this.loadFile}>Load File</button>
      </div>
    );
  }
}
