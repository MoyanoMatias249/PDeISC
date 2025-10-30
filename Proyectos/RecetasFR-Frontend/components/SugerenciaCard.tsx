// components/SugerenciaCard.tsx
import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';

// Tipo de sugerencia:
// - contenido: texto de la sugerencia
// - estado: estado actual (aprobada, rechazada, pendiente)
// - nombre, rol, id_usuario: datos del autor
type Sugerencia = {
  id_sugerencia: number;
  contenido: string;
  estado: 'aprobada' | 'rechazada' | 'pendiente';
  nombre?: string;
  rol?: string;
  id_usuario?: number;
};

// Props que recibe la tarjeta:
// - sugerencia: objeto con datos de la sugerencia
// - modo: define si el usuario es 'usuario' o 'admin'
// - estaEditando: si está en modo edición
// - nuevoContenido: contenido editado
// - onContenidoChange: función para actualizar el contenido
// - onEditar, onGuardar, onCancelar, onEliminar, onAprobar, onRechazar: acciones disponibles
type Props = {
  sugerencia: Sugerencia;
  modo: 'usuario' | 'admin';
  estaEditando?: boolean;
  nuevoContenido?: string;
  onContenidoChange?: (text: string) => void;
  onEditar?: () => void;
  onGuardar?: () => void;
  onCancelar?: () => void;
  onEliminar?: () => void;
  onAprobar?: () => void;
  onRechazar?: () => void;
};

// Muestra una sugerencia con estado visual, autor y acciones disponibles.
// Permite edición si está en modo usuario y la sugerencia está pendiente.
// Admin puede aprobar o rechazar.
export default function SugerenciaCard({
  sugerencia,
  modo,
  estaEditando,
  nuevoContenido,
  onContenidoChange,
  onEditar,
  onGuardar,
  onCancelar,
  onEliminar,
  onAprobar,
  onRechazar
}: Props) {
  const esAutorAdmin = sugerencia.rol === 'Administrador';

  return (
    <View style={[
      styles.card,
      styles[sugerencia.estado],
      esAutorAdmin && styles.adminCard
    ]}>
      <Text style={styles.autor}>
        {esAutorAdmin && <Text style={styles.adminBadge}>ADMIN</Text>}
        {sugerencia.nombre} ({sugerencia.rol}) dijo:
      </Text>

      {estaEditando ? (
        <TextInput
          value={nuevoContenido}
          onChangeText={onContenidoChange}
          multiline
          style={styles.textInput}
        />
      ) : (
        <Text>{sugerencia.contenido}</Text>
      )}

      <Text style={styles.estado}>Estado: {sugerencia.estado}</Text>

      {modo === 'usuario' && (
        <View style={styles.buttonGroup}>
          <View style={styles.editRow}>
            {sugerencia.estado === 'pendiente' && !estaEditando && (
              <Button title="Editar" color={Colors.gray600} onPress={onEditar} />
            )}
            {estaEditando && (
              <>
                <Button title="Cancelar" color={Colors.gray600} onPress={onCancelar} />
                <Button title="Guardar" color={Colors.green700} onPress={onGuardar} />
              </>
            )}
          </View>
          <View style={styles.deleteRow}>
            <Button title="Eliminar" color={Colors.red600} onPress={onEliminar} />
          </View>
        </View>
      )}

      {modo === 'admin' && (
        <View style={styles.editRow}>
          <Button title="Aprobar" color={Colors.green700} onPress={onAprobar} />
          <Button title="Rechazar" color={Colors.red600} onPress={onRechazar} />
        </View>
      )}
    </View>
  );
}

// Estilos visuales de la tarjeta y sus variantes
const styles = StyleSheet.create({
  card: {
    maxWidth: 400,
    minWidth: 300,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 16
  },
  adminCard: {
    borderWidth: 2,
    borderColor: Colors.green800
  },
  aprobada: {
    borderColor: 'green',
    borderWidth: 1,
    backgroundColor: Colors.green100
  },
  rechazada: {
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: Colors.red100
  },
  pendiente: {
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: Colors.gray100
  },
  autor: {
    fontWeight: '600',
    marginBottom: 4,
    color: Colors.gray800
  },
  adminBadge: {
    backgroundColor: Colors.green800,
    color: Colors.white,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    marginRight: 6
  },
  estado: {
    fontStyle: 'italic',
    marginTop: 6,
    color: Colors.gray700
  },
  textInput: {
    backgroundColor: Colors.white,
    padding: 6,
    borderRadius: 6
  },
  buttonGroup: {
    marginTop: 10
  },
  editRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    marginBottom: 10
  },
  deleteRow: {
    alignItems: 'flex-start'
  }
});
