import React from 'react';
import ReactDOM from 'react-dom';
import {Parser} from './parser';
import {App} from './components/App';
export const initiateMainMenu = function() {

const {remote} = electronRequire('electron');
const {Menu,dialog} = remote;
const fs = electronRequire('fs');
const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                click() {
                    dialog.showOpenDialog({
                        filters:[
                            {name: 'Todo Text Files', extensions: ['txt']}
                        ]
                    },function(fileNames) {
                        if (fileNames === undefined) {
                            dialog.showErrorBox("Error", "No file selected");
                        } else {
                                let parser = new Parser(fileNames[0]);
                                parser.getParsedTodoList(function(tdtasks){
                                ReactDOM.render(
                                    <App tdtasks={tdtasks}/>,
                                    document.getElementById('app'));
                                });
                        }
                    });
                }
            }, {
                role: 'close'
            }
        ]
    }, {
        label: 'Edit',
        submenu: [
            {
                role: 'undo'
            }, {
                role: 'redo'
            }, {
                type: 'separator'
            }, {
                role: 'cut'
            }, {
                role: 'copy'
            }, {
                role: 'paste'
            }, {
                role: 'pasteandmatchstyle'
            }, {
                role: 'delete'
            }, {
                role: 'selectall'
            }
        ]
    }, {
        label: 'View',
        submenu: [
            {
                role: 'reload'
            }, {
                role: 'forcereload'
            }, {
                role: 'toggledevtools'
            }, {
                type: 'separator'
            }, {
                role: 'resetzoom'
            }, {
                role: 'zoomin'
            }, {
                role: 'zoomout'
            }, {
                type: 'separator'
            }, {
                role: 'togglefullscreen'
            }
        ]
    }, {
        role: 'window',
        submenu: [
            {
                role: 'minimize'
            }, {
                role: 'close'
            }
        ]
    }, {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() {
                    require('electron').shell.openExternal('https://electron.atom.io')
                }
            }
        ]
    }
]

if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            {
                role: 'about'
            }, {
                type: 'separator'
            }, {
                role: 'services',
                submenu: []
            }, {
                type: 'separator'
            }, {
                role: 'hide'
            }, {
                role: 'hideothers'
            }, {
                role: 'unhide'
            }, {
                type: 'separator'
            }, {
                role: 'quit'
            }
        ]
    })
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
};