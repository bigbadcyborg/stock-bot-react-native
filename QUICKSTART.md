# Quick Start Guide - Building Webull Auto

## Prerequisites
- Node.js (v16 or higher recommended, v18+ preferred)
- npm or yarn

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

## Running on Localhost (Browser)

### Quick Start
```bash
npm run web
```
Or directly:
```bash
npx expo start --web
```

This starts the Expo dev server and opens the app in your default browser at `http://localhost:8081`.

### If you get errors, try clearing cache:
```bash
npx expo start --web --clear
```

### Alternative Method
```bash
npm start
```
Then press `w` in the terminal to open the web version, or manually navigate to `http://localhost:8081` in your browser.

## Building a Windows Executable

### Step 1: Build the Web Version
```bash
npm run build:web
```
This creates the production web build in the `dist` folder.

### Step 2: Build the Electron Executable
```bash
npm run dist
```
This creates the Windows installer in the `release` folder.

**Output:**
- Installer: `release/Webull Auto Setup 1.0.0.exe`
- Portable: `release/Webull Auto 1.0.0.exe`

## Testing the Build

### Development Mode with Electron (Hot Reload)
```bash
npm run electron:dev
```
This starts the Expo dev server and launches Electron connected to it.

### Production Test
After building, you can test the production build:
```bash
npm run build:web
npm run electron
```

## Troubleshooting

### If npm run web fails
- Try running directly: `npx expo start --web`
- Clear cache: `npx expo start --web --clear`
- Make sure Expo CLI is available: `npm install -g expo-cli` (optional)
- Check that all dependencies are installed: `npm install`

### If build:web fails
- Make sure Expo CLI is installed: `npm install -g expo-cli`
- Clear cache: `npx expo start -c`
- Check that all dependencies are installed: `npm install`

### If electron build fails
- Make sure the web build completed successfully first
- Install Windows Build Tools if needed: `npm install -g windows-build-tools`
- Check that electron and electron-builder are installed: `npm install`

### Missing Icons
The app will work without icons, but for a polished look:
- Add `icon.ico` to `assets/` folder for Windows
- The app will use default Electron icon if not found

### WSL/Windows Path Issues
If you're running in WSL and encounter path issues:
- Try running commands from Windows PowerShell instead
- Or ensure you're in the correct directory: `cd /mnt/c/Users/sully/Desktop/webull-auto`

## Next Steps

1. **Customize the app icon**: Add `assets/icon.ico` (Windows), `assets/icon.icns` (macOS), or `assets/icon.png` (Linux)
2. **Update app metadata**: Edit `app.json` to change app name, version, etc.
3. **Configure signing**: For distribution, configure code signing in `package.json` build section

For more detailed information, see [BUILD.md](./BUILD.md).
