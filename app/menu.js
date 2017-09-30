import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';

export const initiateMainMenu = function () {
    const { remote } = require('electron');
    const { Menu, dialog, app } = remote;
    const template = [{
        label: 'File',
        submenu: [{
            label: 'Open',
            click() {
                ReactDOM.render(
                    <App event="open" />,
                    document.getElementById('app')
                );
            }
        }, {
            label: 'Save',
            click() {
                ReactDOM.render(
                    <App event="save" />,
                    document.getElementById('app')
                );
            }
        }, {
            role: 'close'
        }]
    }, {
        label: 'Edit',
        submenu: [{
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
        }]
    }, {
        label: 'View',
        submenu: [{
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
        }]
    }, {
        role: 'window',
        submenu: [{
            role: 'minimize'
        }, {
            role: 'close'
        }]
    }, {
        role: 'help',
        submenu: [{
            label: 'Learn More',
            click() {
                require('electron').shell.openExternal('https://electron.atom.io')
            }
        }]
    }]

    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [{
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
            }]
        })
    }

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
};
