import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { User } from '../types/User';

export type RootStackParamList = {
  Login: undefined;
  Welcome: { user: User };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Ingreso' }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Bienvenida' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
