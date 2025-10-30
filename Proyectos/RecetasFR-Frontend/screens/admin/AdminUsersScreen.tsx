// screens/admin/AdminUsersScreen.tsx
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { getUsuarios, cambiarRol, eliminarUsuario } from '../../services/users';
import ConfirmModal from '../../components/ConfirmModal';
import { Colors } from '../../styles/colors';

// Permite al administrador ver todos los usuarios, cambiar sus roles y eliminarlos.
// Usa un modal de confirmación para evitar acciones accidentales.
//
export default function AdminUsersScreen() {
  const { user, handleAuthError } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [accion, setAccion] = useState<{ tipo: 'borrar' | 'rol'; id: number; nuevo_rol?: string } | null>(null);
  const roles = ['Usuario', 'Empleado', 'Administrador'];

  // Carga los usuarios al enfocar la pantalla
  const cargarUsuarios = useCallback(() => {
    getUsuarios(user!.token).then((data) => {
      if (Array.isArray(data)) {
        setUsuarios(data);
      } else {
        console.error('Error al obtener usuarios:', data);
        handleAuthError(data);
      }
    });
  }, [user]);

  useFocusEffect(cargarUsuarios);

  // Ejecuta la acción confirmada
  const confirmarAccion = async () => {
    if (!accion) return;
    const { tipo, id, nuevo_rol } = accion;

    if (tipo === 'borrar') {
      const res = await eliminarUsuario(user!.token, id);
      if (!res?.error) {
        setUsuarios(usuarios.filter((u) => u.id_usuario !== id));
      }
    } else if (tipo === 'rol' && nuevo_rol) {
      const res = await cambiarRol(user!.token, id, nuevo_rol);
      if (!res?.error) {
        setUsuarios(usuarios.map((u) => u.id_usuario === id ? { ...u, rol: nuevo_rol } : u));
      }
    }

    setAccion(null);
  };

  return (
    <ScrollView style={styles.page}>
      <Text style={styles.title}>Gestión de usuarios</Text>
      <View style={styles.grid}>
        {usuarios.map((u) => (
          <View key={u.id_usuario} style={styles.userCard}>
            <Text style={styles.userName}>{u.nombre}</Text>
            <Text style={styles.userEmail}>{u.correo}</Text>

            <Text style={styles.label}>Rol:</Text>
            <View style={styles.pickerWrapper}>
              <RNPickerSelect
                value={u.rol}
                onValueChange={(val) => {
                  if (val !== u.rol) {
                    setAccion({ tipo: 'rol', id: u.id_usuario, nuevo_rol: val });
                  }
                }}
                items={roles.map((r) => ({ label: r, value: r }))}
                style={{
                  inputIOS: styles.picker,
                  inputAndroid: styles.picker
                }}
              />
            </View>

            <View style={styles.buttonRow}>
              <Button
                title="Eliminar"
                color={Colors.red600}
                onPress={() => setAccion({ tipo: 'borrar', id: u.id_usuario })}
              />
            </View>
          </View>

        ))}
      </View>

      {accion && (
        <ConfirmModal
          visible={true}
          tipo={accion.tipo}
          onCancel={() => setAccion(null)}
          onConfirm={confirmarAccion}
        />
      )}
    </ScrollView>

  );
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.gray100,
    padding: 20
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.green800
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center'
  },
  userCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
    color: Colors.gray900
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 10,
    color: Colors.gray700
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    color: Colors.gray800
  },
  pickerWrapper: {
    marginBottom: 12
  },
  picker: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: 8,
    backgroundColor: Colors.white,
    color: Colors.gray900
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  }
});