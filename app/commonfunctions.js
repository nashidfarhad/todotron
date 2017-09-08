import React from 'react';
import ReactDOM from 'react-dom';
import {Parser} from './parser';


export function openFile(){
    const {remote} = electronRequire('electron');
    const {Menu,dialog} = remote;
    const fs = electronRequire('fs');
    dialog.showOpenDialog({
                        filters:[
                            {name: 'Todo Text Files', extensions: ['txt']}
                        ]
                    },function(fileNames) {
                        if (fileNames === undefined) {
                            dialog.showErrorBox("Error", "No file selected");
                        } else {
                                alert('inside showOpenDialog');
                                let parser = new Parser(fileNames[0]);
                                parser.getParsedTodoList(function(tdtasks){
                                ReactDOM.render(
                                    <App tdtasks={tdtasks}/>,
                                    document.getElementById('app'));
                                });
                        }
                    });
}