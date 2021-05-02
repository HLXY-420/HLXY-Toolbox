import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';

function createWindow () {
  Menu.setApplicationMenu(null);
  const win = new BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.ts')
    }
  });

  win.loadFile('index.html').then();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
