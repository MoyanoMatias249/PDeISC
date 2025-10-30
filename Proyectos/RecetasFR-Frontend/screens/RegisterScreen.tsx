// screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { registerUser } from '../services/auth';
import { validarRegistro } from '../utils/validaciones';
import { Colors } from '../styles/colors';

// Permite a nuevos usuarios registrarse en la plataforma.
// Valida los datos antes de enviarlos al backend.
// Muestra mensajes de éxito o error según la respuesta.
export default function RegisterScreen({ navigation }: any) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Maneja el envío del formulario de registro
  const handleRegister = async () => {
    if (!validarRegistro(nombre, correo, contraseña)) {
      setMensaje('Los datos ingresados no son válidos. Verificá el formato y la longitud mínima.');
      return;
    }

    // Llama al backend para registrar el usuario
    const res = await registerUser(nombre, correo, contraseña);
    if (res.id_usuario) {
      setMensaje('Registro exitoso. Ahora podés iniciar sesión.');
      setNombre('');
      setCorreo('');
      setContraseña('');
    } else {
      setMensaje(res.error || 'Error al registrar');
    }
  };

  // Estilos visuales del formulario
  return (
    <View style={styles.page}>
      <View style={styles.box}>
        <Text style={styles.title}>Registro</Text>
        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
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
          <Button title="Registrarse" onPress={handleRegister} color={Colors.green700} />
          <Button title="Volver al login" onPress={() => navigation.navigate('Login')} color={Colors.gray600} />
        </View>
        {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.gray100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  mensaje: {
    marginTop: 12,
    color: Colors.green700,
    textAlign: 'center'
  }
});
