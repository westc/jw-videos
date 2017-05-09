var path = require('path');
var app = require('app');
var BrowserWindow = require('browser-window');

app.on('ready', function() {
  var mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'assets/icons/JWVideos-128.png')
  });
  mainWindow.maximize();
  mainWindow.loadURL('file:///' + __dirname + '/index.html');
  mainWindow.on('close', function() {
    app.quit();
  });
});
