var ua = require("universal-analytics");
var visitor = ua("UA-111374271-3");
visitor.pageview("index.html").send();

const {
  app,
  BrowserWindow,
  Menu,
  protocol,
  ipcMain,
  shell
} = require("electron");

const {
  autoUpdater
} = require("electron-updater");
const name = app.getName();
const version = app.getVersion();

const client = require("discord-rich-presence")("434432973362954241");

client.updatePresence({
  //state: 'Calculating for R6: Siege',
  details: "Calculating for R6: Siege 🐍",
  startTimestamp: Date.now(),
  //endTimestamp: Date.now() + 1337,
  largeImageKey: "r6rc-calc-logo",
  //smallImageKey: 'snek_small',
  instance: true
});

console.log("App initialized on platform: " + process.platform);

let win;
let loadwin;

function createDefaultWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1100,
    minHeight: 650,
    maxWidth: 7680,
    maxHeight: 4320,
    frame: false,
    show: false,
    backgroundColor: "#1c1d26",
    autoHideMenuBar: true
  });
  //win.webContents.openDevTools();
  win.on("closed", () => {
    win = null;
  });
  win.loadURL(`file://${__dirname}/index.html#v${version}`);
  return win;
}

function createLoadWindow() {
  loadwin = new BrowserWindow({
    width: 500,
    height: 300,
    frame: false,
    resizable: false,
    show: false,
    backgroundColor: "#1c1d26",
    autoHideMenuBar: true,
    alwaysontop: true
  });
  loadwin.on("closed", () => {
    loadwinwin = null;
  });
  loadwin.loadURL(`file://${__dirname}/loader.html#v${version}`);
  return loadwin;
}

function updateSplashStatus(text) {
  loadwin.webContents.send("message", text);
}

let template = [];
// Windows Menu
console.log("Menu loaded for " + name + " on platform: " + process.platform);
template.unshift({
  label: name,
  submenu: [
  {
    label: "Join the Discord",
    accelerator: "Shift+Control+D",
    click() {
      console.log("Shift+Control+D has been pressed");
      shell.openExternal("https://discord.gg/NaAmbbb");
    }
  },
  {
    label: "Learn More",
    accelerator: "Control+L",
    click() {
      console.log("Control+L has been pressed");
      shell.openExternal("https://www.github.com/austinleath/r6rc");
    }
  },
  {
    label: "Donate",
    accelerator: "Control+D",
    click() {
      console.log("Control+D has been pressed");
      shell.openExternal(
        "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3NS3ZERCW9GD8"
      );
    }
  },
  {
    label: "Fullscreen",
    accelerator: "F11",
    click() {
      fullScreenModule();
    }
  },
  {
    label: "Minimize",
    accelerator: "Control+M",
    click() {
      console.log("Control+M has been pressed");
      win.minimize();
    }
  },
  {
    label: "Quit",
    accelerator: "Control+Q",
    click() {
      console.log("Control+Q has been pressed");
      win.close();
    }
  }]
});

function fullScreenModule() {
  if (win.isFullScreen(true)) {
    win.setFullScreen(false);
    console.log("Application exited fullscreen");
  } else {
    win.setFullScreen(true);
    console.log("Application entered fullscreen");
  }
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) return app.quit();

app.on("second-instance", (event, commandLine, workingDirectory) => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});
app.on("ready", () => {
  let isDev = true
  let statusArray = ["[A MEME]", "Error 404: Joke Not Found", "We at pumpkin hill, you ready?", "ULTIMATE IS READY!", "Building Lore", "Wubba Lubba Dub Dub"];
  if (isDev = true) {
    createLoadWindow();
    createDefaultWindow();
    loadwin.show();
    win.show();
    setInterval(function() {
      updateSplashStatus(statusArray[Math.floor(Math.random() * 6)]);
      console.log(Math.floor(Math.random() * 7));
    }, 1000);
  } else {
    createLoadWindow();
    setTimeout(function() {
      loadwin.show();
      autoUpdater.checkForUpdatesAndNotify();
    }, 500);
  }
});
autoUpdater.on("checking-for-update", () => {
  updateSplashStatus("Checking for updates");
  console.log("Checking for updates");
});
autoUpdater.on("update-available", info => {
  updateSplashStatus("Downloading updates");
  console.log("Downloading updates");
});
autoUpdater.on("update-not-available", info => {
  updateSplashStatus("Up to date, starting R6RC");
  console.log("All up to date!");
  createDefaultWindow();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  setTimeout(function() {
    win.show();
    loadwin.destroy();
  }, 3500);
});
autoUpdater.on("error", err => {
  updateSplashStatus("An unexpected error occurred " + err);
  console.log("An unexpected error occurred " + err);
  createDefaultWindow();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  setTimeout(function() {
    win.show();
    loadwin.destroy();
  }, 5500);
});
autoUpdater.on("update-downloaded", info => {
  updateSplashStatus("Update downloaded, restart to install.");
  console.log("Update downloaded, restart to install.");
  setTimeout(function() {
    app.relaunch();
    app.exit();
  }, 3500);
});
app.on("window-all-closed", () => {
  app.quit();
  console.log("Application has been closed successfully");
});