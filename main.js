var ua = require('universal-analytics');
var visitor = ua('UA-111374271-3');
visitor.pageview("index.html").send();

const {app, BrowserWindow, Menu, protocol, ipcMain, shell} = require('electron');
const {autoUpdater} = require("electron-updater");
const name = app.getName();
const version = app.getVersion();

console.log('App initialized on platform: ' + process.platform);

let win;

function sendStatusToWindow(text) {
  console.log(text);
  win.webContents.send('message', text);
}
function createDefaultWindow() {
  win = new BrowserWindow
  ({
    width: 1280,
    height: 720,
    minWidth: 1100,
    minHeight: 650,
    maxWidth: 7680,
    maxHeight: 4320,
    frame: false,
    backgroundColor: '#1c1d26',
    autoHideMenuBar: true
  });
  //win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
  win.loadURL(`file://${__dirname}/index.html#v${app.getVersion()}`);
  return win;
}

/*
app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // has a name so `type` is assumed to be "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B'
      }
    ]
  },
  { type: 'frequent' },
  {
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project'
      }
    ]
  }
])
*/

let template = []
  // Windows Menu
  console.log('Menu loaded for ' + name + ' on platform: ' + process.platform);
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'Join the Discord',
        accelerator: 'Shift+Control+D',
        click() { console.log('Shift+Control+D has been pressed'); require('electron').shell.openExternal('https://discord.gg/NaAmbbb'); }
      },
      {
        label: 'Learn More',
        accelerator: 'Control+L',
        click() { console.log('Control+L has been pressed'); require('electron').shell.openExternal('https://www.github.com/austinleath/r6rc'); }
      },
      {
        label: 'Donate',
        accelerator: 'Control+D',
        click() { console.log('Control+D has been pressed'); require('electron').shell.openExternal('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3NS3ZERCW9GD8'); }
      },
      {
        label: 'Fullscreen',
        accelerator: 'F11',
        click() { fullScreenModule(); }
      },
      {
        label: 'Minimize',
        accelerator: 'Control+M',
        click() { console.log('Control+M has been pressed'); win.minimize();}
      },
      {
        label: 'Quit',
        accelerator: 'Control+Q',
        click() { console.log('Control+Q has been pressed'); win.close(); }
      }
    ]
  })

function fullScreenModule() {

  if ( win.isFullScreen(true) ) {
      win.setFullScreen(false);
      console.log('Application exited fullscreen');
  } else {
      win.setFullScreen(true);
      console.log('Application entered fullscreen');
  }
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('An update is available! Downloading...');
});
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('All up to date!');
});
autoUpdater.on('error', (err) => {
  sendStatusToWindow('There was a problem downloading your update. ' + err);
});
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded, restart to install.');
});
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (win) {
      if (win.isMinimized())
      win.restore()
      win.focus()
    }
  })
  app.on('ready', () => {
    autoUpdater.checkForUpdatesAndNotify();
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    createDefaultWindow();
  })
}
app.on('window-all-closed', () => {
  app.quit();
  console.log('Application has been closed successfully');
});
