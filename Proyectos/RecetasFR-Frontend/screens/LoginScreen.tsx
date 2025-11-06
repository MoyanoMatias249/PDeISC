// screens/LoginScreen.tsx
import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import { loginUser, loginSocialUser } from '../services/auth';
import { AuthContext } from '../context/AuthContext';
import { Colors } from '../styles/colors';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

// Tipo de perfil social recibido tras login con Google o Facebook
type SocialProfile = {
  nombre: string;
  correo: string;
  token: string;
};

// Permite iniciar sesión con correo/contraseña o mediante login social (Google/Facebook).
// Al autenticar, guarda el usuario en contexto global.
export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const redirectUri = AuthSession.makeRedirectUri({ native: 'com.recetasfr.app:/oauthredirect' });

// Google OAuth, solo android
  const [googleRequest, googleResponse, promptGoogle] = Google.useAuthRequest({
    clientId: '603349239063-7pepdnogo0f24gtu3atpdpth8gltp1d4.apps.googleusercontent.com',
    redirectUri
  });

  // Facebook OAuth
  const [fbRequest, fbResponse, promptFacebook] = Facebook.useAuthRequest({
    clientId: '1535057430867724'
  });

// Efecto que escucha respuestas de login social y obtiene perfil del usuario.
  useEffect(() => {
    const fetchGoogleProfile = async () => {
      try {
        if (googleResponse?.type !== 'success') return;
        const token = (googleResponse as any).authentication?.accessToken;
        if (!token) return;

        await WebBrowser.dismissBrowser(); // fuerza cierre del navegador

        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const profile = await res.json();
        await loginConBackend({
          nombre: profile.name,
          correo: profile.email,
          token
        });
      } catch {
        setError('Error al obtener perfil de Google');
      }
    };

    const fetchFacebookProfile = async () => {
      try {
        if (fbResponse?.type !== 'success') return;
        const token = (fbResponse as any).authentication?.accessToken;
        if (!token) return;

        const res = await fetch(`https://graph.facebook.com/me?fields=name,email&access_token=${token}`);
        const profile = await res.json();
        await loginConBackend({
          nombre: profile.name,
          correo: profile.email,
          token
        });
      } catch {
        setError('Error al obtener perfil de Facebook');
      }
    };

    fetchGoogleProfile();
    fetchFacebookProfile();
  }, [googleResponse, fbResponse]);

  // Envía los datos del login social al backend.
  const loginConBackend = async (profile: SocialProfile) => {
    try {
      const res = await loginSocialUser(profile.nombre, profile.correo, profile.token);
      if (res.token && res.user) {
        login({ ...res.user, token: res.token });
      } else {
        setError('Error al iniciar sesión con proveedor');
      }
    } catch (err) {
      setError('Error de conexión con backend');
    }
  };

  // Maneja el login tradicional con correo y contraseña.
  const handleLogin = async () => {
    if (!correo.includes('@') || contraseña.length < 6) {
      setError('Correo o contraseña inválidos');
      return;
    }

    const res = await loginUser(correo, contraseña);
    if (res.token) {
      login({ ...res.user, token: res.token });
    } else {
      setError(res.error || 'Error desconocido');
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.box}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput
          placeholder="Correo"
          value={correo}
          onChangeText={setCorreo}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={contraseña}
          onChangeText={setContraseña}
          style={styles.input}
        />
        <View style={styles.buttonRow}>
          <Button title="Ingresar" onPress={handleLogin} color={Colors.green700} />
          <Button title="Registrarse" onPress={() => navigation.navigate('Register')} color={Colors.gray600} />
        </View>

        <View style={styles.socialRow}>
          <Pressable onPress={() => promptGoogle()} style={styles.circleButton}>
            <Image source={require('../assets/google-icon.png')} style={styles.circleIcon} />
          </Pressable>

          <Pressable onPress={() => promptFacebook()} style={[styles.circleButton, styles.fbCircle]}>
            <Image source={require('../assets/facebook-icon.png')} style={styles.circleIcon} />
          </Pressable>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <Text style={{ color: 'black', textAlign: 'center', marginTop: 20 }}>
        Bienvenido a Recetas FR
      </Text>
      <Text style={{ fontSize: 12, color: 'gray', textAlign: 'center' }}>
        URI: {redirectUri}
      </Text>
    </View>
  );
}

// Estilos visuales de la pantalla
const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.gray100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.green800
  },
  input: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.gray300
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  error: {
    marginTop: 12,
    color: Colors.red600,
    textAlign: 'center'
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginVertical: 20
  },
  circleButton: {
    width: 50,
    height: 50,
    backgroundColor: Colors.gray100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  fbCircle: {},
  circleIcon: {
    width: 37,
    height: 37,
  }
});
