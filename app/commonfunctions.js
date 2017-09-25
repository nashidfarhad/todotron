import React from 'react';
import ReactDOM from 'react-dom';
import { Parser } from './parser';
import { App } from './components/App';
import { TaskList } from './tasklist';

export function openFile() {
    const { remote } = require('electron');
    const { dialog } = remote;
    dialog.showOpenDialog({
        filters: [{
            name: 'Todo Text Files',
            extensions: ['txt']
        }]
    }, function (fileNames) {
        if (fileNames === undefined) {
            dialog.showErrorBox("Error", "No file selected");
        } else {
            let parser = new Parser(fileNames[0]);
            parser.getParsedTodoList(function (taskList) {
                let tskList = new TaskList(taskList);
                ReactDOM.render( 
                    <App taskList = { tskList } fileName = { fileNames[0] } />,
                    document.getElementById('app'));
            });
        }
    });
}

export function saveFile(toWrite) {
    const { remote } = require('electron');
    const { dialog } = remote;
    var fs = require('fs');
    dialog.showSaveDialog({
        filters: [{
            name: 'Todo Text Files',
            extensions: ['txt']
        }]
    }, function (fileName) {
        if (fileName === undefined) {
            dialog.showErrorBox("Error", "No file selected");
        } else {
            fs.writeFile(fileName, toWrite, function(err){
                dialog.showErrorBox("Error", "Couldn't write to file" + fileName);
            });
        }
    });
}
