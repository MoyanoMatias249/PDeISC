// components/LogoHome.tsx
import React from 'react';
import { Image, StyleSheet } from 'react-native';

// Muestra el logo principal de la app en tamaño grande.
// Ideal para pantallas de bienvenida o home.
export default function LogoHome() {
  return (
    <Image
      source={require('../assets/logo-pagina.png')}
      style={styles.logo}
      resizeMode="contain"
    />
  );
}

// Estilo del logo
const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200
  }
});