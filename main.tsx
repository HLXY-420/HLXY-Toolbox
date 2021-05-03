import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import path from 'path';

function createWindow () {
  Menu.setApplicationMenu(null);
  const win = new BrowserWindow({
    width: 1000,
    height: 750,
    useContentSize: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  ipcMain.on('min', () => win.minimize());
  ipcMain.on('max', () => {
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }

  });
  ipcMain.on('close', () => win.close());

  win.webContents.openDevTools();
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
