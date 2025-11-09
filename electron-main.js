const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    icon: fs.existsSync(path.join(__dirname, 'assets', 'icon.png')) 
      ? path.join(__dirname, 'assets', 'icon.png')
      : undefined,
    show: false,
    titleBarStyle: 'default'
  });

  // Load the app
  if (isDev) {
    // In development, load from Expo dev server
    mainWindow.loadURL('http://localhost:8081');
    // Open DevTools in development
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load from the built web files
    // Try multiple possible export directories
    const possiblePaths = [
      path.join(__dirname, 'dist', 'index.html'),
      path.join(__dirname, 'web-build', 'index.html'),
      path.join(__dirname, 'build', 'index.html')
    ];
    
    let webPath = possiblePaths.find(p => fs.existsSync(p));
    if (!webPath) {
      console.error('Could not find built web files. Please run "npm run build:web" first.');
      webPath = possiblePaths[0]; // Default to first path
    }
    
    mainWindow.loadFile(webPath).catch(err => {
      console.error('Failed to load app:', err);
    });
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus on window
    if (isDev) {
      mainWindow.focus();
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    // Dereference the window object
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS, keep app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // Open external URLs in the default browser
    require('electron').shell.openExternal(url);
    return { action: 'deny' };
  });
});

