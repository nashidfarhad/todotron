import React from 'react';
import ReactDOM from 'react-dom';

const path = require('path')
const fs = require('fs');

<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';

class MyComponentClass extends React.Component{
    render(){
        return <h1> Test </h1>;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const btnLoadFile = document.getElementById('btn-load-file');

    btnLoadFile.addEventListener('click', function (event) {
        console.log(__dirname);

=======
class App extends React.Component{
  loadFile(){
>>>>>>> 1c331c0fa86729a2da47225d562830dcb7f4b888
        fs.readFile(path.join(__dirname, 'TODO.txt'), function (err, data) {
            if (err) {
                return console.error(err);
            }
            document.getElementById('file-content').innerText = data.toString();
            
        });
<<<<<<< HEAD
    });
});

ReactDOM.render(<MyComponentClass />,document.getElementById('test-div'));
=======
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
>>>>>>> 1c331c0fa86729a2da47225d562830dcb7f4b888
