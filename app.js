var path = require('path');
const {app, BrowserWindow, Menu} = require('electron');

app.on('ready', function() {
  var mainWindow = new BrowserWindow({
    // https://codepen.io/cwestify/pen/eWVNwx
    icon: path.join(__dirname, 'assets/icons/256×256.png')
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
          click() { mainWindow.reload(); }
        },
        { type: 'separator' },
        {
          label: 'Toggle Dev Tools',
          accelerator: 'CmdOrCtrl+Alt+I',
          click() {
            var focusedWindow = BrowserWindow.getFocusedWindow();
            focusedWindow && focusedWindow.webContents.toggleDevTools();
          }
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
});
