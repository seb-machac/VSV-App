const { app, BrowserWindow, webFrame } = require('electron');

const createWindow = () => {
const win = new BrowserWindow({
width: 420,
height: 915,
zoomFactor: 0.5,
autoHideMenuBar: true,});
win.loadFile('Pages/index.html');
};

app.whenReady().then(() => {
createWindow();

app.on('activate', () => {

if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
});

app.on('window-all-closed', () => {
if (process.platform !== 'darwin') app.quit();
});
