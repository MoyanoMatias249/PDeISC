import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { User } from '../types/User';

type RootStackParamList = {
  Login: undefined;
  Welcome: { user: User };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ route }: Props) {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {user.nombre}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 10,
    textAlign: 'center',
  },
});
