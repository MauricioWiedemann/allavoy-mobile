import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/LoginScreen';
import SignUp from '../screens/SignUpScreen';
import ForgotPass from '../screens/ForgotPassword';

///////////////////////////////////////////////
//sacar luego de test, van solo en appstack.js
///////////////////////////////////////////////
import SearchBus from '../screens/SearchScreen';
import TripList from '../screens/TripListScreen';
///////////////////////////////////////////////
///////////////////////////////////////////////

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Loguearse" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loguearse" component={Login}/>
        <Stack.Screen name="Registrarse" component={SignUp}/>
        <Stack.Screen name="RecuperarPass" component={ForgotPass}/>
        <Stack.Screen name="SearchScreen" component={SearchBus}/>
        <Stack.Screen name="TripListScreen" component={TripList}/>
    </Stack.Navigator>
  );
};

export default AuthStack;