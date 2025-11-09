# Troubleshooting Blank Page Issue

## Steps to Debug

### 1. Check Browser Console
Open your browser's Developer Tools (F12) and check the Console tab for any JavaScript errors.

### 2. Clear Cache and Restart
```bash
# Stop the current server (Ctrl+C)
# Then run:
npx expo start --web --clear
```

### 3. Verify the Setup
Make sure you have:
- ✅ `index.js` with `registerRootComponent`
- ✅ `babel.config.js` with proper presets
- ✅ All dependencies installed: `npm install`
- ✅ `react-native-gesture-handler` imported at the top of `App.js`

### 4. Test with a Simple Component
If the issue persists, temporarily replace the App component with a simple test:

```javascript
// In App.js, temporarily replace the App component with:
const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text style={{ fontSize: 24 }}>Hello World!</Text>
    </View>
  );
};
```

If this works, the issue is with React Navigation setup for web.

### 5. React Navigation Web Issues
React Navigation on web sometimes needs additional configuration. Common issues:

- **Missing dependencies**: Ensure all React Navigation packages are installed
- **Gesture handler**: Must be imported at the very top of the entry file
- **react-native-screens**: May need web-specific setup

### 6. Check Network Tab
In browser DevTools, check the Network tab to see if all JavaScript files are loading correctly.

### 7. Try Different Browser
Sometimes browser extensions or settings can cause issues. Try:
- Chrome/Edge (recommended)
- Firefox
- Incognito/Private mode

## Common Solutions

### Solution 1: Reinstall Dependencies
```bash
rm -rf node_modules
npm install
npx expo start --web --clear
```

### Solution 2: Check React Navigation Version Compatibility
Make sure your React Navigation version is compatible with your React Native version:
- React Navigation v6 works with React Native 0.60+
- Check: https://reactnavigation.org/docs/getting-started

### Solution 3: Add Web-Specific Navigation Config
You might need to configure React Navigation differently for web. Check the React Navigation web documentation.

## Still Having Issues?

1. Check the terminal/console for build errors
2. Verify all imports are correct
3. Check if `react-native-web` is properly configured
4. Ensure Expo web is properly set up in `app.json`

