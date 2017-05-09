var path = require('path');
var app = require('app');
var BrowserWindow = require('browser-window');

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
});
