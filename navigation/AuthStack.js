import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Loguearse" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loguearse" component={Login}/>
        <Stack.Screen name="Registrarse" component={SignUp}/>
    </Stack.Navigator>
  );
};

export default AuthStack;