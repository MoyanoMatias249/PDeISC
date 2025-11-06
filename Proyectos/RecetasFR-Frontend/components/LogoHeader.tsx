// components/LogoHeader.tsx
import React from 'react';
import { Image, StyleSheet } from 'react-native';

// Muestra el logo pequeño de la app, ideal para encabezados o navegación.
// Se suele usar en la parte superior derecha del header.
export default function LogoHeader() {
  return (
    <Image
      source={require('../assets/logo.png')}
      style={styles.logo}
      resizeMode="contain"
    />
  );
}

// Estilo del logo: tamaño pequeño y margen derecho para separación visual
const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginRight: 10,
    marginBottom: 10,
  }
});
