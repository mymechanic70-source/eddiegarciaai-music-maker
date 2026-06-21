import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from './screens/HomeScreen';
import CreatorScreen from './screens/CreatorScreen';
import LibraryScreen from './screens/LibraryScreen';
import SettingsScreen from './screens/SettingsScreen';
import MusicPlayer from './components/MusicPlayer';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#00d4ff',
            tabBarInactiveTintColor: '#666',
            tabBarStyle: {
              backgroundColor: '#0f3460',
              borderTopColor: '#00d4ff',
              borderTopWidth: 1,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ tabBarLabel: 'Home', tabBarIcon: () => '🏠' }}
          />
          <Tab.Screen
            name="Creator"
            component={CreatorScreen}
            options={{ tabBarLabel: 'Create', tabBarIcon: () => '✨' }}
          />
          <Tab.Screen
            name="Library"
            component={LibraryScreen}
            options={{ tabBarLabel: 'Library', tabBarIcon: () => '📚' }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ tabBarLabel: 'Settings', tabBarIcon: () => '⚙️' }}
          />
        </Tab.Navigator>
        <MusicPlayer />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
