// screens/admin/ReviewDraftsScreen.tsx
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState, useContext } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { getBorradores, aprobarReceta, getRecetaPorId } from '../../services/recipes';
import ConfirmModal from '../../components/ConfirmModal';
import { Colors } from '../../styles/colors';

// Muestra una lista de recetas en estado de borrador.
// Permite ver el detalle de cada receta y aprobarlas.
export default function ReviewDraftsScreen({ navigation }: any) {
  const { user, handleAuthError } = useContext(AuthContext);
  const [borradores, setBorradores] = useState<any[]>([]);
  const [mensaje, setMensaje] = useState('');
  const [confirmarId, setConfirmarId] = useState<number | null>(null);

  // Carga los borradores al enfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      getBorradores(user!.token).then((data) => {
        if (Array.isArray(data)) {
          setBorradores(data);
        } else {
          console.error('Error al obtener borradores:', data);
          handleAuthError(data);
        }
      });
    }, [user])
  );

  // Aprueba una receta y la elimina de la lista local
  const aprobar = async (id: number) => {
    const res = await aprobarReceta(user!.token, id);
    if (res?.error) {
      handleAuthError(res);
    } else {
      setMensaje(res.message || 'Receta aprobada');
      setBorradores(borradores.filter((r) => r.id_receta !== id));
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <View style={styles.contentBox}>
        <Text style={styles.title}>Revisión de borradores</Text>
        {borradores.map((r) => (
          <View key={r.id_receta} style={styles.card}>
            <Text style={styles.cardTitle}>{r.titulo}</Text>
            <Text style={styles.cardText}>Autor: {r.autor}</Text>
            <Text style={styles.cardText}>{r.descripcion}</Text>

            <View style={styles.buttonRow}>
              <Button
                title="Ver receta"
                onPress={async () => {
                  const res = await getRecetaPorId(user!.token, r.id_receta);
                  if (res?.error) {
                    handleAuthError(res);
                  } else {
                    navigation.navigate('Detalle', { receta: res });
                  }
                }}
                color={Colors.green600}
              />
              <Button title="Aprobar receta" onPress={() => setConfirmarId(r.id_receta)} color={Colors.green700} />
            </View>
          </View>
        ))}

        {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}

        {confirmarId !== null && (
          <ConfirmModal
            visible={true}
            tipo="aprobar"
            onCancel={() => setConfirmarId(null)}
            onConfirm={async () => {
              await aprobar(confirmarId);
              setConfirmarId(null);
            }}
          />
        )}
      </View>
    </ScrollView>
  );
}

// Estilos visuales del componente
const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: Colors.white
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  contentBox: {
    width: '100%',
    maxWidth: 900,
    paddingVertical: 40,
    paddingHorizontal: 50,
    backgroundColor: Colors.white
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.green800
  },
  input: {
    backgroundColor: Colors.gray100,
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    color: Colors.gray900
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10
  },
  inputHalf: {
    flex: 1
  },
  pasosInput: {
    minHeight: 100,
    textAlignVertical: 'top'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20
  },
  fullButton: {
    marginTop: 10
  },
  mensaje: {
    marginTop: 10,
    color: Colors.green700
  },
  card: {
    backgroundColor: Colors.gray100,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: Colors.green900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.green800,
    marginBottom: 4
  },
  cardText: {
    color: Colors.gray800,
    marginBottom: 4
  }
});
