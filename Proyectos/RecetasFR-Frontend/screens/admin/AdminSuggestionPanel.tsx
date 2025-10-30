// screens/admin/AdminSuggestionPanel.tsx
import React, { useCallback, useState, useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import {
  getSugerencias,
  enviarSugerencia,
  aprobarSugerencia,
  rechazarSugerencia
} from '../../services/suggestions';
import { validarTextoLibre } from '../../utils/validaciones';
import ConfirmModal from '../../components/ConfirmModal';
import SugerenciaCard from '../../components/SugerenciaCard';
import { Colors } from '../../styles/colors';

// Permite al administrador crear sugerencias para empleados y revisar las sugerencias enviadas por otros.
// Puede aprobar o rechazar sugerencias pendientes.
export default function AdminSuggestionPanel() {
  const { user, handleAuthError } = useContext(AuthContext);
  const [contenido, setContenido] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [sugerencias, setSugerencias] = useState<any[]>([]);
  const [accion, setAccion] = useState<{ tipo: 'aprobar' | 'rechazar'; id: number } | null>(null);

  // Carga las sugerencias al enfocar la pantalla
  const cargar = async () => {
    const data = await getSugerencias(user!.token);
    if (Array.isArray(data)) {
      // Filtra sugerencias que no sean propias
      const filtradas = data.filter((s) => s.id_usuario !== user!.id_usuario);
      setSugerencias(filtradas);
    } else {
      handleAuthError(data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [])
  );

  // Envía una nueva sugerencia
  const enviar = async () => {
    if (!validarTextoLibre(contenido)) {
      setMensaje('La sugerencia debe tener al menos 10 caracteres, 5 palabras y sin símbolos prohibidos.');
      return;
    }

    const res = await enviarSugerencia(user!.token, contenido);
    if (res?.error) {
      handleAuthError(res);
      setMensaje(`Error: ${res.error}`);
    } else {
      setMensaje(res.message || 'Sugerencia enviada');
      setContenido('');
      cargar();
    }
  };

  // Ejecuta la acción confirmada (aprobar o rechazar)
  const confirmarAccion = async () => {
    if (!accion) return;
    const { tipo, id } = accion;
    const fn = tipo === 'aprobar' ? aprobarSugerencia : rechazarSugerencia;
    const res = await fn(user!.token, id);
    if (!res?.error) {
      setSugerencias(sugerencias.filter((s) => s.id_sugerencia !== id));
    }
    setAccion(null);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={styles.tittle}>Panel de sugerencias</Text>

      <View style={styles.formBox}>
        <Text style={styles.subtitle}>Crear nueva sugerencia para empleados:</Text>
        <TextInput
          placeholder="Escribí tu sugerencia..."
          value={contenido}
          onChangeText={setContenido}
          multiline
          style={styles.input}
        />
        <Button title="Enviar sugerencia" onPress={enviar} color={Colors.green700} />
        {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}
      </View>

      <Text style={styles.tittle2}>Sugerencias pendientes:</Text>
      <View style={styles.suggestionGrid}>
        {sugerencias.map((s) => (
          <SugerenciaCard
            key={s.id_sugerencia}
            sugerencia={s}
            modo="admin"
            onAprobar={() => setAccion({ tipo: 'aprobar', id: s.id_sugerencia })}
            onRechazar={() => setAccion({ tipo: 'rechazar', id: s.id_sugerencia })}
          />
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

// Estilos visuales del panel
const styles = StyleSheet.create({
  tittle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.green800,
    marginBottom: 10
  },
  tittle2: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.green700,
    marginBottom: 10
  },
  formBox: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 600,
    marginTop: 10,
    marginBottom: 20
  },
  subtitle: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: Colors.green800
  },
  input: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10
  },
  mensaje: {
    marginTop: 10,
    color: Colors.green700
  },
  suggestionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    marginTop: 20
  }
});
