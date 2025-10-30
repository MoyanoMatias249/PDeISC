import React from 'react';
import { Modal, View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native';
import { Colors } from '../styles/colors';


// Props que recibe el modal:
// - visible: controla si el modal está visible o no
// - onConfirm: función que se ejecuta al confirmar la acción
// - onCancel: función que se ejecuta al cancelar
// - tipo: define el tipo de acción (borrar, aprobar, etc.) y determina el estilo y mensaje
type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  tipo: 'borrar' | 'aprobar' | 'editar' | 'rechazar' | 'rol';
};

// Modal reutilizable para confirmar acciones críticas.
// Cambia color de fondo, color de botón y mensaje según el tipo de acción.
export default function ConfirmModal({ visible, onConfirm, onCancel, tipo }: Props) {
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  // Configuración visual y textual para cada tipo de acción.
  // Define color de fondo, color del botón de confirmación y mensaje.
  const config = {
    borrar: {
      fondo: Colors.red100,
      color: Colors.red600,
      mensaje: '¿Estás seguro de que quiere eliminarlo?'
    },
    aprobar: {
      fondo: Colors.green100,
      color: Colors.green700,
      mensaje: '¿Estás seguro de que quiere aprobarlo?'
    },
    editar: {
      fondo: Colors.green100,
      color: Colors.green700,
      mensaje: '¿Estás seguro de que quiere guardar los cambios?'
    },
    rechazar: {
      fondo: Colors.red100,
      color: Colors.red600,
      mensaje: '¿Estás seguro de que quiere rechazarlo?'
    },
    rol: {
      fondo: Colors.gray100,
      color: Colors.gray700,
      mensaje: '¿Estás seguro de que quiere cambiarle el rol al usuario?'
    }
  };

  const { fondo, color, mensaje } = config[tipo];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: fondo, width: isDesktop ? 400 : '80%' }]}>
          <Text style={styles.text}>{mensaje}</Text>

          <View style={styles.buttons}>
            <Button title="Confirmar" onPress={onConfirm} color={color} />
            <View style={{ marginTop: 10 }}>
              <Button title="Cancelar" onPress={onCancel} color={Colors.gray600} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// Estilos del modal y su contenido.
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000088'
  },
  modal: {
    padding: 20,
    borderRadius: 12,
    minHeight: 200,
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.gray900
  },
  buttons: {
    flexDirection: 'column',
    alignItems: 'stretch'
  }
});
