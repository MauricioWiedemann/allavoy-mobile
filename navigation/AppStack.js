import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Users from '../screens/UserScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="userScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="userScreen" component={Users}/>
    </Stack.Navigator>
  );
};

export default AppStack;