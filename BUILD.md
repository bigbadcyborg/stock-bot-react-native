# Build Instructions

This guide explains how to build the Webull Auto app to executable state for different platforms.

## Prerequisites

1. Install Node.js (v16 or higher recommended)
2. Install dependencies:
   ```bash
   npm install
   ```

## Building for Desktop (Windows Executable)

### Option 1: Full Installer (NSIS)
Creates a Windows installer (.exe) that users can install:
```bash
npm run dist
```
This will create an installer in the `release` folder.

### Option 2: Portable Executable
Creates a portable .exe file that doesn't require installation:
```bash
npm run build:electron
```
The portable executable will be in the `release` folder.

### Option 3: Development Build (Testing)
To test the Electron app in development mode:
```bash
npm run electron:dev
```
This starts the Expo dev server and launches Electron connected to it.

## Building for Web

To build a production web version:
```bash
npm run build:web
```
The built files will be in the `dist` folder (Expo's default export directory). You can serve these with any static web server.

## Building for Mobile

### Android
1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Configure EAS:
   ```bash
   eas build:configure
   ```

3. Build APK:
   ```bash
   eas build --platform android --profile preview
   ```

### iOS
1. Install EAS CLI (same as above)

2. Build IPA:
   ```bash
   eas build --platform ios --profile preview
   ```

## Build Outputs

- **Desktop Windows**: `release/Webull Auto Setup X.X.X.exe` (installer) or `release/Webull Auto X.X.X.exe` (portable)
- **Web**: `dist/` directory (default Expo export location)
- **Mobile**: Download from EAS Build dashboard

## Troubleshooting

### Electron Build Issues
- Make sure you have all dependencies installed: `npm install`
- Check that the web build completed successfully before building Electron
- On Windows, you may need to install Windows Build Tools: `npm install -g windows-build-tools`

### Web Build Issues
- Ensure Expo CLI is up to date: `npm install -g expo-cli`
- Clear cache: `expo start -c`
- Check that all assets are properly referenced

### Icon Issues
- For Windows: Place `icon.ico` in the `assets/` folder
- For macOS: Place `icon.icns` in the `assets/` folder
- For Linux: Place `icon.png` in the `assets/` folder

## Development

To run in development mode:
```bash
npm start
```

Then open:
- Web: Press `w` in the terminal or go to http://localhost:8081
- Electron: Run `npm run electron:dev` in another terminal

