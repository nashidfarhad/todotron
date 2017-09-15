import React from 'react';
import ReactDOM from 'react-dom';
import {Parser} from './parser';
import {App} from './components/App';

export function openFile(){
    const {remote} = require('electron');
    const {Menu,dialog} = remote;
    const fs = require('fs');
    dialog.showOpenDialog({
                        filters:[
                            {name: 'Todo Text Files', extensions: ['txt']}
                        ]
                    },function(fileNames) {
                        if (fileNames === undefined) {
                            dialog.showErrorBox("Error", "No file selected");
                        } else {
                                //alert('inside showOpenDialog');
                                let parser = new Parser(fileNames[0]);
                                parser.getParsedTodoList(function(taskList){
                                ReactDOM.render( 
                                    <App taskList={taskList}/>,
                                    document.getElementById('app'));
                                }); //render call not working - didn't import {App}
                        }
                    });
}
