import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { NavigationContainer, createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';
import { AuthProvider } from './context/AuthContext';

const Stack = createNativeStackNavigator();


//<AuthProvider>    

export default function App() {
  return (
      <NavigationContainer>    
        <AuthStack />
        {/*<AppStack />*/}
      </NavigationContainer>
  );
}