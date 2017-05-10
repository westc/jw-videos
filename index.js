var path = require('path');
const {app, globalShortcut, BrowserWindow, Menu} = require('electron');

app.on('ready', function() {
  var mainWindow = new BrowserWindow({
    // https://codepen.io/cwestify/pen/eWVNwx?editors=0010
    icon: path.join(__dirname, 'assets/icons/JWVideos-128.png')
  });
  mainWindow.maximize();
  mainWindow.loadURL('file:///' + __dirname + '/index.html');
  mainWindow.on('close', function() {
    app.quit();
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: "JW Videos",
      submenu: [
        { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: function() { app.quit(); } }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: 'Redo', accelerator: 'CmdOrCtrl+Shift+Z', role: 'redo' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectall' }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function () { mainWindow.reload(); }
        },
        { type: 'separator' },
        {
          label: 'Toggle Fullscreen',
          role: 'togglefullscreen',
          click: function() {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
          }
        }
      ]
    }
  ]));

  globalShortcut.register('CmdOrCtrl+Alt+I', function() {
    mainWindow.webContents.toggleDevTools();
  });
});
