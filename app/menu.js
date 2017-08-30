export const initiateMainMenu = function() {

const {remote} = electronRequire('electron');
const {Menu,dialog} = remote;
var fs = electronRequire('fs');
const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                click() {
                    dialog.showOpenDialog(function(fileNames) {
                        if (fileNames === undefined) {
                            console.log("No file selected");
                        } else {
                            fs.readFile(fileNames[0], function(err, data) {
                                if (err) {
                                    return console.error(err);
                                }
                                document.getElementById('file-content').innerText = data.toString();
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