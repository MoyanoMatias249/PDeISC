// components/GoogleLoginButton.tsx
import React, { useEffect } from 'react';
import { Text, Pressable, StyleSheet, View, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { loginWithOAuth } from '../services/api';
//import imagen from "@assets/google-"

WebBrowser.maybeCompleteAuthSession();

type Props = {
  onLoginSuccess: (user: any) => void;
  onError: (error: string) => void;
};

export default function GoogleLoginButton({ onLoginSuccess, onError }: Props) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '603349239063-8fhmg3e7n7l7v7dtctdhmsnebs9clm3m.apps.googleusercontent.com',
    webClientId: '603349239063-8fhmg3e7n7l7v7dtctdhmsnebs9clm3m.apps.googleusercontent.com',
  }, { useProxy: true });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${authentication?.accessToken}` },
      })
        .then(res => res.json())
        .then(userInfo => {
          loginWithOAuth({
            email: userInfo.email,
            nombre: userInfo.name,
            googleId: userInfo.id,
          })
            .then(userFromDb => onLoginSuccess(userFromDb))
            .catch(err => onError(err.message || 'Error OAuth'));
        })
        .catch(err => onError(err.message || 'Error al obtener info de Google'));
    }
  }, [response]);

  return (
    <Pressable
      onPress={() => promptAsync()}
      disabled={!request}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        !request && styles.buttonDisabled,
      ]}
    >
      <View style={styles.content}>
        <Image source={require('../assets/google-icon.png')} style={styles.icon} />
        <Text style={styles.text}>Continuar con Google</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#222',
    color:"#000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    maxWidth: 500
  },
  buttonPressed: {
    backgroundColor: '#3367D6',
  },
  buttonDisabled: {
    backgroundColor: '#a0c1f7',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  text: {
    color:"#eee",
    fontWeight: 'bold',
    fontSize: 16,
  },
});
