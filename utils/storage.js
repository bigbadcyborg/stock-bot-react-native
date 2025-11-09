import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultSettings, constructFullURL } from '../config/settingsDefaults';

const SETTINGS_KEY = '@webull_auto_settings';

// For web compatibility, use localStorage if AsyncStorage is not available
const getStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return {
      getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
      setItem: (key, value) => Promise.resolve(window.localStorage.setItem(key, value)),
      removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key)),
    };
  }
  return AsyncStorage;
};

const storage = getStorage();

export const saveSettings = async (settings) => {
  try {
    const jsonValue = JSON.stringify(settings);
    await storage.setItem(SETTINGS_KEY, jsonValue);
    
    // Log GET endpoints for testing
    console.log('=== API ENDPOINTS (SAVED) ===');
    const portfolioGetURL = constructFullURL(settings.baseURL, settings.endpoints?.portfolio?.get);
    const marketGetURL = constructFullURL(settings.baseURL, settings.endpoints?.market?.get);
    
    console.log('Portfolio GET Endpoint:', portfolioGetURL || '(not configured)');
    console.log('Market GET Endpoint:', marketGetURL || '(not configured)');
    console.log('=============================');
    
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
};

export const getSettings = async () => {
  try {
    const jsonValue = await storage.getItem(SETTINGS_KEY);
    
    if (jsonValue != null) {
      const settings = JSON.parse(jsonValue);
      
      // Log GET endpoints for testing
      console.log('=== API ENDPOINTS (LOADED) ===');
      const portfolioGetURL = constructFullURL(settings.baseURL, settings.endpoints?.portfolio?.get);
      const marketGetURL = constructFullURL(settings.baseURL, settings.endpoints?.market?.get);
      
      console.log('Portfolio GET Endpoint:', portfolioGetURL || '(not configured)');
      console.log('Market GET Endpoint:', marketGetURL || '(not configured)');
      console.log('=============================');
      
      return settings;
    } else {
      // Return defaults if no settings found
      console.log('=== API ENDPOINTS (DEFAULTS) ===');
      console.log('Portfolio GET Endpoint: (not configured)');
      console.log('Market GET Endpoint: (not configured)');
      console.log('================================');
      
      return defaultSettings;
    }
  } catch (error) {
    console.error('Error loading settings:', error);
    return defaultSettings;
  }
};

export const clearSettings = async () => {
  try {
    await storage.removeItem(SETTINGS_KEY);
    console.log('Settings cleared');
    return true;
  } catch (error) {
    console.error('Error clearing settings:', error);
    return false;
  }
};

