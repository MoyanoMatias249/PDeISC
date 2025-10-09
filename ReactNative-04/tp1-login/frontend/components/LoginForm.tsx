import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Pressable, } from 'react-native';

type Props = {
  onSubmit: (email: string, password: string) => void;
  loading?: boolean;
  errorMessage?: string;
  onClearError?: () => void;
};

export default function LoginForm({ onSubmit, loading, errorMessage, onClearError }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handlePress() {
    if (!email || !password) {
      if (onClearError) onClearError(); // Borra errores previos
      onSubmit(email, password);
      return;
    }
    onSubmit(email, password);
  }

  const showModal = !!errorMessage;

  return (
    <View style={styles.formContainer}>
      <Modal
          transparent
          animationType="fade"
          visible={showModal}
          onRequestClose={onClearError}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Error</Text>
              <Text style={styles.modalMessage}>{errorMessage}</Text>
              <Pressable style={styles.modalButton} onPress={onClearError}>
                <Text style={styles.modalButtonText}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>


      <Text style={styles.label}>Email</Text>
      <TextInput 
        placeholder="ingrese email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        placeholder="ingrese contraseña"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <Button 
          title={loading ? 'Ingresando...' : 'Ingresar'} 
          onPress={handlePress} 
          disabled={loading} 
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    maxWidth: 500,
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    maxWidth: 500,
    borderWidth: 1,
    marginVertical: 8,
    padding: 10,
    borderRadius: 6,
  },
  buttonContainer: {
    maxWidth: 500,
  },

  // Estilos del Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#bb0000ff',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
