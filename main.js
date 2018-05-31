// This is free and unencumbered software released into the public domain.
// See LICENSE for details

const {app, BrowserWindow, Menu, protocol, ipcMain, shell} = require('electron');
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");

//-------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

//-------------------------------------------------------------------
// Define the menu
//
// THIS SECTION IS NOT REQUIRED
//-------------------------------------------------------------------
let template = []
let version = app.getversion
if (process.platform === 'darwin') {
  log.info('Successfully loaded menu for Darwin...');
  // OS X Menu
  const version = app.getVersion();
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        role: 'about',
        accelerator: 'Command+A',
      },
      {
        label: 'View License',
        accelerator: 'Command+L',
        click () { require('electron').shell.openExternal('https://www.github.com/AustinLeath/mmrcalculator/blame/master/LICENSE') }
      },
      {
        label: 'Version ' + version,
        enabled: 'false'
      },
      {
        label: 'Learn More',
        accelerator: 'Shift+Command+L',
        click () { require('electron').shell.openExternal('https://www.electronjs.org/apps/mmrcalculator') }
      },
      {
        type: 'separator'
      },
      {
        label: 'Donate',
        accelerator: 'Command+D',
        click () { require('electron').shell.openExternal('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3NS3ZERCW9GD8') }
      },
      {
        type: 'separator'
      },
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
        label: name + ' Version Info',
        accelerator: 'Command+A',
        role: 'about'
      }
    ]
  })
} else {
  log.info('Successfully loaded menu for Win32...');
  // Windows Menu
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: name + ' Version Info',
        accelerator: 'Control+A',
        role: 'about'
      },
      {
        label: 'Learn More About ' + name,
        accelerator: 'Control+L',
        click () { require('electron').shell.openExternal('https://www.electronjs.org/apps/mmrcalculator') }
      },
      {
        type: 'separator'
      },
      {
        label: 'Donate',
        accelerator: 'Control+D',
        click () { require('electron').shell.openExternal('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3NS3ZERCW9GD8') }
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Control+H',
        click () { win.hide(); }
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Control+Q',
        click() { app.quit(); }
      },
    ]
  },
  {
    label: 'help',
    submenu: [
      {
        label: name + ' Version Info',
        accelerator: 'Control+A',
        role: 'about'
      }
    ]
  })
}

//-------------------------------------------------------------------
// Open a window that displays the version
//
// THIS SECTION IS NOT REQUIRED
//
// This isn't required for auto-updates to work, but it's easier
// for the app to show a window than to have to click "About" to see
// that updates are working.
//-------------------------------------------------------------------
let win;

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}
function createDefaultWindow() {                                                                                    //frame: true if packaging for mac
  win = new BrowserWindow({width: 1280, height: 720, minWidth: 1100, minHeight: 650, maxWidth: 7680, maxHeight: 4320, frame: true, backgroundColor: '#1c1d26', autoHideMenuBar: true});
  //win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });                            //indexmac.html if packaging for mac
  win.loadURL(`file://${__dirname}/indexmac.html#v${app.getVersion()}`);
  return win;
}
autoUpdater.on('checking-for-update', () => {
  log.info('Checking for update...');
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  log.info('An update is available! Downloading...');
  sendStatusToWindow('An update is available! Downloading...');
})
autoUpdater.on('update-not-available', (info) => {
  log.info('All up to date!');
  sendStatusToWindow('All up to date!');
})
autoUpdater.on('error', (err) => {
  log.info('There was a problem downloading your update.');
  sendStatusToWindow('There was a problem downloading your update. ' + err);
})
//autoUpdater.on('download-progress', (progressObj) => {
//  let log_message = "Download speed: " + progressObj.bytesPerSecond;
//  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
//  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
//  sendStatusToWindow(log_message);
//})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded, restart to install.');
});
app.on('ready', function() {
  // Create the Menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  createDefaultWindow();
});
app.on('window-all-closed', () => {
  app.quit();
});

//
// CHOOSE one of the following options for Auto updates
//

//-------------------------------------------------------------------
// Auto updates - Option 1 - Simplest version
//
// This will immediately download an update, then install when the
// app quits.
//-------------------------------------------------------------------
app.on('ready', function()  {
  autoUpdater.checkForUpdatesAndNotify();
});
//-------------------------------------------------------------------
// Auto updates - Option 2 - More control
//
// For details about these events, see the Wiki:
// https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
//
// The app doesn't need to listen to any events except `update-downloaded`
//
// Uncomment any of the below events to listen for them.  Also,
// look in the previous section to see them being used.
//-------------------------------------------------------------------
// app.on('ready', function()  {
//   autoUpdater.checkForUpdates();
// });
// autoUpdater.on('checking-for-update', () => {
// })
// autoUpdater.on('update-available', (info) => {
// })
// autoUpdater.on('update-not-available', (info) => {
// })
// autoUpdater.on('error', (err) => {
// })
// autoUpdater.on('download-progress', (progressObj) => {
// })
// autoUpdater.on('update-downloaded', (info) => {
//   autoUpdater.quitAndInstall();
// })
