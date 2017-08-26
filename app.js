import React from 'react';
import ReactDOM from 'react-dom';

const path = require('path')
const fs = require('fs');

class App extends React.Component{
  loadFile(){
        fs.readFile(path.join(__dirname, 'TODO.txt'), function (err, data) {
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

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
