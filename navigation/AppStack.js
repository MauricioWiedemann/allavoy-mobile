import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//import InfiniteScroll from '../screens/InfiniteScroll';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="scrollPage" screenOptions={{headerShown: false}}>
        <Stack.Screen name="scrollPage" component={InfiniteScroll}/>
    </Stack.Navigator>
  );
};

export default AppStack;