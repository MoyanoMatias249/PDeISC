import { View, Text, ActivityIndicator, Alert, Modal, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function OtherComponents() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.group}>
      <Text style={styles.title}>Otros Components</Text>

      <Text style={styles.label}>ActivityIndicator: indicador de carga</Text>
      <ActivityIndicator size="large" color="blue" />

      <Text style={styles.label}>Alert: mensaje emergente</Text>
      <Button title="Mostrar alerta" onPress={() => Alert.alert('Alerta', 'Esto es una alerta')} />

      <Text style={styles.label}>Modal: contenido flotante</Text>
      <Button title="Abrir modal" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Este es un modal</Text>
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: 40 },
  title: { marginTop: 30, borderTopWidth: 1, padding: 10, textAlign: "center", fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  label: { fontWeight: '600', marginTop: 10 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' },
  modalContent: { backgroundColor: '#fff',padding: 50, borderRadius: 10 },
});