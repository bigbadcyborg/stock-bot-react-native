// SettingsScreen.js: This screen allows the user to configure the API endpoints and authentication settings.
//  It saves these settings as persistent storage using AsyncStorage.
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { saveSettings, getSettings, clearSettings } from '../utils/storage';
import { defaultSettings, constructFullURL } from '../config/settingsDefaults';
import { sharedStyles } from '../styles/sharedStyles';

const SettingsScreen = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const savedSettings = await getSettings();
      setSettings(savedSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
      Alert.alert('Error', 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // Validate base URL if endpoints are provided
    if ((settings.endpoints.portfolio.get || settings.endpoints.market.get) && !settings.baseURL) {
      Alert.alert('Validation Error', 'Base URL is required when endpoints are configured');
      return;
    }

    // Validate authentication credentials
    if (settings.authentication.type === 'apiKey' && !settings.authentication.apiKey) {
      Alert.alert('Validation Error', 'API Key is required when API Key authentication is selected');
      return;
    }

    if (settings.authentication.type === 'bearer' && !settings.authentication.bearerToken) {
      Alert.alert('Validation Error', 'Bearer Token is required when Bearer Token authentication is selected');
      return;
    }

    const success = await saveSettings(settings);
    if (success) {
      Alert.alert('Success', 'Settings saved successfully');
      
      // Log GET endpoints after save
      console.log('=== API ENDPOINTS (AFTER SAVE) ===');
      const portfolioGetURL = constructFullURL(settings.baseURL, settings.endpoints.portfolio.get);
      const marketGetURL = constructFullURL(settings.baseURL, settings.endpoints.market.get);
      console.log('Portfolio GET Endpoint:', portfolioGetURL || '(not configured)');
      console.log('Market GET Endpoint:', marketGetURL || '(not configured)');
      console.log('==================================');
    } else {
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const handleReset = async () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to defaults?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await clearSettings();
            setSettings(defaultSettings);
            Alert.alert('Success', 'Settings reset to defaults');
          },
        },
      ]
    );
  };

  const updateSetting = (path, value) => {
    setSettings((prev) => {
      const newSettings = { ...prev };
      const keys = path.split('.');
      let current = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  if (loading) {
    return (
      <View style={[sharedStyles.container, styles.centerContent]}>
        <Text>Loading settings...</Text>
      </View>
    );
  }

  return (
    <View style={sharedStyles.container}>
      <View style={sharedStyles.header}>
        <Text style={sharedStyles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>API Configuration</Text>
          
          <Text style={styles.label}>Base URL</Text>
          <TextInput
            style={styles.input}
            placeholder="https://api.example.com"
            value={settings.baseURL}
            onChangeText={(text) => updateSetting('baseURL', text)}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Portfolio GET Endpoint</Text>
          <TextInput
            style={styles.input}
            placeholder="/api/portfolio"
            value={settings.endpoints.portfolio.get}
            onChangeText={(text) => updateSetting('endpoints.portfolio.get', text)}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Portfolio POST Endpoint</Text>
          <TextInput
            style={styles.input}
            placeholder="/api/portfolio"
            value={settings.endpoints.portfolio.post}
            onChangeText={(text) => updateSetting('endpoints.portfolio.post', text)}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Market GET Endpoint</Text>
          <TextInput
            style={styles.input}
            placeholder="/api/market"
            value={settings.endpoints.market.get}
            onChangeText={(text) => updateSetting('endpoints.market.get', text)}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Market POST Endpoint</Text>
          <TextInput
            style={styles.input}
            placeholder="/api/market"
            value={settings.endpoints.market.post}
            onChangeText={(text) => updateSetting('endpoints.market.post', text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Authentication</Text>
          
          <Text style={styles.label}>Authentication Type</Text>
          <View style={styles.authButtonRow}>
            <TouchableOpacity
              style={[
                styles.authButton,
                settings.authentication.type === 'none' && styles.authButtonActive
              ]}
              onPress={() => updateSetting('authentication.type', 'none')}
            >
              <Text style={[
                styles.authButtonText,
                settings.authentication.type === 'none' && styles.authButtonTextActive
              ]}>
                None
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.authButton,
                settings.authentication.type === 'apiKey' && styles.authButtonActive
              ]}
              onPress={() => updateSetting('authentication.type', 'apiKey')}
            >
              <Text style={[
                styles.authButtonText,
                settings.authentication.type === 'apiKey' && styles.authButtonTextActive
              ]}>
                API Key
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.authButton,
                settings.authentication.type === 'bearer' && styles.authButtonActive,
                { marginRight: 0 }
              ]}
              onPress={() => updateSetting('authentication.type', 'bearer')}
            >
              <Text style={[
                styles.authButtonText,
                settings.authentication.type === 'bearer' && styles.authButtonTextActive
              ]}>
                Bearer Token
              </Text>
            </TouchableOpacity>
          </View>

          {settings.authentication.type === 'apiKey' && (
            <>
              <Text style={styles.label}>API Key</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter API Key"
                value={settings.authentication.apiKey}
                onChangeText={(text) => updateSetting('authentication.apiKey', text)}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </>
          )}

          {settings.authentication.type === 'bearer' && (
            <>
              <Text style={styles.label}>Bearer Token</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Bearer Token"
                value={settings.authentication.bearerToken}
                onChangeText={(text) => updateSetting('authentication.bearerToken', text)}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advanced</Text>
          
          <Text style={styles.label}>Timeout (milliseconds)</Text>
          <TextInput
            style={styles.input}
            placeholder="10000"
            value={settings.timeout.toString()}
            onChangeText={(text) => {
              const num = parseInt(text, 10);
              if (!isNaN(num) && num > 0) {
                updateSetting('timeout', num);
              } else if (text === '') {
                updateSetting('timeout', defaultSettings.timeout);
              }
            }}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={handleReset}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  authButtonRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  authButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    marginRight: 5,
  },
  authButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  authButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  authButtonTextActive: {
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  resetButton: {
    backgroundColor: '#e0e0e0',
  },
  resetButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;

