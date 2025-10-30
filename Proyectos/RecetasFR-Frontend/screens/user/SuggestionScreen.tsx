// screens/user/SuggestionScreen.tsx
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { enviarSugerencia } from '../../services/suggestions';
import { validarTextoLibre } from '../../utils/validaciones';
import { Colors } from '../../styles/colors';

// Permite a los usuarios enviar sugerencias al sistema.
// Valida el contenido antes de enviarlo.
// Exclusivo para rol 'Usuario'.
export default function SuggestionScreen() {
  const { user, handleAuthError } = useContext(AuthContext);
  const [contenido, setContenido] = useState('');
  const [mensaje, setMensaje] = useState(''); 

  // Envía la sugerencia al backend
  const enviar = async () => {
    if (!validarTextoLibre(contenido)) {
      setMensaje('La sugerencia debe tener al menos 10 caracteres, 5 palabras y sin símbolos prohibidos.');
      return;
    }

    const data = await enviarSugerencia(user!.token, contenido);
    if (data?.error) {
      handleAuthError(data);
      setMensaje(`Error: ${data.error}`);
    } else {
      setMensaje(data.message || 'Sugerencia enviada');
      setContenido('');
    }
  };

  return (
    <ScrollView style={styles.page}>
      <View style={styles.mainContent}>
        <Text style={styles.title}>Sugerencias</Text>
        <TextInput
          placeholder="Escribí tu sugerencia..."
          value={contenido}
          onChangeText={setContenido}
          multiline
          style={styles.input}
        />
        <Button title="Enviar" onPress={enviar} color={Colors.green700} />
        {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}
      </View>
    </ScrollView>
  );
}

// Estilos visuales
const styles = StyleSheet.create({
  page: { backgroundColor: Colors.gray100 },
  mainContent: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 600,
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.green800
  },
  input: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  mensaje: {
    marginTop: 10,
    color: Colors.green700
  }
});
