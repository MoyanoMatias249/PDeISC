// components/Loader.tsx
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

// Muestra un spinner centrado en pantalla.
// Útil para indicar que se está cargando contenido o procesando una acción.
export default function Loader() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#6200ee" />
    </View>
  );
}