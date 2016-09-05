var app = require('app');
var BrowserWindow = require('browser-window');

app.on('ready', function() {
  var mainWindow = new BrowserWindow();
  mainWindow.maximize();
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('close', function() {
    app.quit();
  });
});
