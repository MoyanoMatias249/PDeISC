// screens/empleado/SuggestionReviewScreen.tsx
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { getSugerencias, aprobarSugerencia, rechazarSugerencia } from '../../services/suggestions';
import ConfirmModal from '../../components/ConfirmModal';
import SugerenciaCard from '../../components/SugerenciaCard';
import { Colors } from '../../styles/colors';

export default function SuggestionsReviewScreen() {
  const { user, handleAuthError } = useContext(AuthContext);
  const [sugerencias, setSugerencias] = useState<any[]>([]);
  const [accion, setAccion] = useState<{ tipo: 'aprobar' | 'rechazar'; id: number } | null>(null);

  const cargar = async () => {
    const data = await getSugerencias(user!.token);
    if (Array.isArray(data)) {
      setSugerencias(data);
    } else {
      handleAuthError(data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [])
  );

  const confirmarAccion = async () => {
    if (!accion) return;
    const { tipo, id } = accion;
    const fn = tipo === 'aprobar' ? aprobarSugerencia : rechazarSugerencia;
    const res = await fn(user!.token, id);
    if (!res?.error) {
      await cargar();
    }
    setAccion(null);
  };

  return (
    <ScrollView style={styles.page}>
      <View style={styles.mainContent}>
        <Text style={styles.title}>Panel de sugerencias</Text>
        <View style={styles.grid}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.gray100
  },
  mainContent: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1000,
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.green800
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    marginTop: 10
  }
});
