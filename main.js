const {app, BrowserWindow, Menu, protocol, ipcMain, shell} = require('electron');
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");
const name = app.getName();
const version = app.getVersion();
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

log.info('App initialized on platform: ' + process.platform);

let win;

function sendStatusToWindow(text) {
  log.info(text);
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
    frame: true, //frame: true if packaging for mac
    backgroundColor: '#1c1d26',
    autoHideMenuBar: false
  });
  //win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });                            //indexmac.html if packaging for mac
  win.loadURL(`file://${__dirname}/index.html#v${app.getVersion()}`);
  return win;
}

//-------------------------------------------------------------------
// Only allows one instance of the application to be open at a time
const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}
//-------------------------------------------------------------------

//app.setJumpList([
//  {
//    type: 'custom',
//    name: 'Recent Projects',
//    items: [
//      { type: 'file', path: 'C:\\Projects\\project1.proj' },
//      { type: 'file', path: 'C:\\Projects\\project2.proj' }
//    ]
//  },
//  { // has a name so `type` is assumed to be "custom"
//    name: 'Tools',
//    items: [
//      {
//        type: 'task',
//        title: 'Tool A',
//        program: process.execPath,
//        args: '--run-tool-a',
//        icon: process.execPath,
//        iconIndex: 0,
//        description: 'Runs Tool A'
//      },
//      {
//        type: 'task',
//        title: 'Tool B',
//        program: process.execPath,
//        args: '--run-tool-b',
//        icon: process.execPath,
//        iconIndex: 0,
//        description: 'Runs Tool B'
//      }
//    ]
//  },
//  { type: 'frequent' },
//  {
//    items: [
//      {
//        type: 'task',
//        title: 'New Project',
//        program: process.execPath,
//        args: '--new-project',
//        description: 'Create a new project.'
//      },
//      { type: 'separator' },
//      {
//        type: 'task',
//        title: 'Recover Project',
//        program: process.execPath,
//        args: '--recover-project',
//        description: 'Recover Project'
//      }
//    ]
//  }
//])

//-------------------------------------------------------------------
// Menu definitions
//-------------------------------------------------------------------
let template = []
if (process.platform === 'darwin') {
  // OS X Menu
  log.info('Menu loaded for ' + name + ' on platform: ' + process.platform);
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'Hide',
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Shift+Command+H',
        role: 'hideothers'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        role: 'quit'
      },
    ]
  },
  {
    label: 'Community',
    submenu: [
      {
        label: 'Join the Discord',
        accelerator: 'Shift+Command+D',
        click () { require('electron').shell.openExternal('https://discord.gg/h5zXUBw') }
      },
      {
        label: 'Support ' + name,
        accelerator: 'Command+D',
        click () { require('electron').shell.openExternal('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3NS3ZERCW9GD8') }
      },
    ]
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'Command+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        role: 'close'
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Version ' + version,
        enabled: false
      },
      {
        label: 'Check for update',
        enabled: false
      },
      {
        label: 'Donate',
        accelerator: 'Command+D',
        click () { require('electron').shell.openExternal('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3NS3ZERCW9GD8') }
      },
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://www.github.com/austinleath/r6rc') }
      }
    ]
  })
} else {
  // Windows Menu
  log.info('Menu loaded for ' + name + ' on platform: ' + process.platform);
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'Quit',
        accelerator: 'Control+Q',
        click() { app.quit(); }
      },
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Version ' + version,
        enabled: false
      },
      {
        label: 'Check for update',
        enabled: false
      },
      {
        label: 'Donate',
        accelerator: 'Control+D',
        click () { require('electron').shell.openExternal('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3NS3ZERCW9GD8') }
      },
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://www.github.com/austinleath/r6rc') }
      },
    ]
  })
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
app.on('ready', function() {
  autoUpdater.checkForUpdatesAndNotify();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  createDefaultWindow();
});
app.on('window-all-closed', () => {
  app.quit();
});
