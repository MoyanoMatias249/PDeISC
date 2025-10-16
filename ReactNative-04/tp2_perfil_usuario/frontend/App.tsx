import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';


export default function App() {
  console.log(AuthSession.makeRedirectUri({ useProxy: true }));
  return <AppNavigator />;
}
