var ua = require('universal-analytics');
var visitor = ua('UA-111374271-3');
visitor.pageview("index.html").send();

const {app, BrowserWindow, Menu, protocol, ipcMain, shell} = require('electron');
const {autoUpdater} = require("electron-updater");
const name = app.getName();
const version = app.getVersion();

console.log('App initialized on platform: ' + process.platform);

let win;
let loadwin;

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
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  //win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
  win.loadURL(`file://${__dirname}/index.html#v${version}`);
    loadwin.destroy();
  return win;
}


function createLoadWindow() {
  loadwin = new BrowserWindow
  ({
    width: 300,
    height: 300,
    frame: false,
    resizable: false,
    backgroundColor: '#1c1d26',
    autoHideMenuBar: true,
    alwaysontop: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  loadwin.on('closed', () => {
    loadwinwin = null;
  });
  loadwin.loadURL(`file://${__dirname}/loader.html#v${version}`);

  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('checking-for-update', () => {
    updateSplashStatus("Checking for update");
    console.log('Checking for update...');
  });
  autoUpdater.on('update-available', (info) => {
    updateSplashStatus('An update is available! Downloading...');
    console.log('An update is available! Downloading...');
  });
  autoUpdater.on('update-not-available', (info) => {
    updateSplashStatus('All up to date!');
    console.log('All up to date!');

    setTimeout(function () {
      createDefaultWindow();
    }, 2000);
  });
  autoUpdater.on('error', (err) => {
    updateSplashStatus('There was a problem downloading your update. ' + err);
    console.log('There was a problem downloading your update. ' + err);

    setTimeout(function () {
      createDefaultWindow();
    }, 2000);
  });
  autoUpdater.on('update-downloaded', (info) => {
    updateSplashStatus('Update downloaded, restart to install.');
    console.log('Update downloaded, restart to install.');
  });

  return loadwin;
}

function updateSplashStatus(text) {
    loadwin.webContents.send('message', text);
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
        click() { console.log('Shift+Control+D has been pressed'); shell.openExternal('https://discord.gg/NaAmbbb'); }
      },
      {
        label: 'Learn More',
        accelerator: 'Control+L',
        click() { console.log('Control+L has been pressed'); shell.openExternal('https://www.github.com/austinleath/r6rc'); }
      },
      {
        label: 'Donate',
        accelerator: 'Control+D',
        click() { console.log('Control+D has been pressed'); shell.openExternal('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3NS3ZERCW9GD8'); }
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

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) return app.quit();

app.on('second-instance', (event, commandLine, workingDirectory) => {
  if (win) {
    if (win.isMinimized())
    win.restore()
    win.focus()
  }
});

app.on('ready', () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  createLoadWindow();
});

app.on('window-all-closed', () => {
  app.quit();
  console.log('Application has been closed successfully');
});
