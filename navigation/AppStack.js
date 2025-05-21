import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Users from '../screens/UserScreen';
import SearchBus from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="userScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="userScreen" component={Users}/>
        <Stack.Screen name="searchScreen" component={SearchBus}/>
    </Stack.Navigator>
  );
};

export default AppStack;