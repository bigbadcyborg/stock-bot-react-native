import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PortfolioScreen from './components/PortfolioScreen';
import MarketScreen from './components/MarketScreen';
import SettingsScreen from './components/SettingsScreen';

// Create navigation components
const Tab = createBottomTabNavigator();

// Main App Component with Navigation
const App = () => {
  return (
    <View style={styles.appContainer}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              let iconName;
              if (route.name === 'Portfolio') {
                iconName = '📊';
              } else if (route.name === 'Market') {
                iconName = '📈';
              } else if (route.name === 'Settings') {
                iconName = '⚙️';
              }
              return (
                <Text style={{ 
                  fontSize: 24,
                  opacity: focused ? 1 : 0.5,
                }}>
                  {iconName}
                </Text>
              );
            },
            tabBarLabel: route.name === 'Portfolio' ? 'Portfolio' : route.name === 'Market' ? 'Market' : 'Settings',
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#666',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
              marginTop: 4,
              marginBottom: 4,
            },
            tabBarStyle: {
              backgroundColor: 'white',
              borderTopWidth: 1,
              borderTopColor: '#e0e0e0',
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarItemStyle: {
              paddingVertical: 4,
            },
          })}
        >
          <Tab.Screen 
            name="Portfolio" 
            component={PortfolioScreen}
            options={{
              tabBarLabel: 'Portfolio',
            }}
          />
          <Tab.Screen 
            name="Market" 
            component={MarketScreen}
            options={{
              tabBarLabel: 'Market',
            }}
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default App;