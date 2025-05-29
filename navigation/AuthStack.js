import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/LoginScreen';
import SignUp from '../screens/SignUpScreen';
import ForgotPass from '../screens/ForgotPassword';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Loguearse" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loguearse" component={Login}/>
        <Stack.Screen name="Registrarse" component={SignUp}/>
        <Stack.Screen name="RecuperarPass" component={ForgotPass}/>
    </Stack.Navigator>
  );
};

export default AuthStack;