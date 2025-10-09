// screens/LoginScreen.tsx

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';
import { login } from '../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { User } from '../types/User';

type RootStackParamList = {
  Login: undefined;
  Welcome: { user: User };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin(email: string, password: string) {
    setLoading(true);
    setErrorMessage(''); // limpiamos error anterior

    try {
      const user = await login({ email, password });
      navigation.navigate('Welcome', { user });
    } catch (error: any) {
      setErrorMessage(error.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <LoginForm 
        onSubmit={handleLogin} 
        loading={loading} 
        errorMessage={errorMessage}
        onClearError={() => setErrorMessage('')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',   
    padding: 20,
  },
});
