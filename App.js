import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import {
  NavigationContainer,
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Users from "./screens/Users";

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Loguearse">
      <Stack.Screen name="Loguearse" component={Login} />
      <Stack.Screen name="Registrarse" component={SignUp} />
      <Stack.Screen name="Usuarios" component={Users} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
