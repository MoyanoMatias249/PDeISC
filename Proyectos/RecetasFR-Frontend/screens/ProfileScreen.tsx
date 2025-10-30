// screens/ProfileScreen.tsx
import React, { useContext, useState, useCallback } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { getLikedRecipes } from '../services/likes';
import { getUserSuggestions, eliminarSugerencia, actualizarSugerencia } from '../services/suggestions';
import { getRecetasDelUsuario } from '../services/recipes';
import RecipeCard from '../components/RecipeCard';
import ConfirmModal from '../components/ConfirmModal';
import { Colors } from '../styles/colors';
import SugerenciaCard from '../components/SugerenciaCard';

// Tipo de sugerencia que el usuario puede ver o editar.
type Sugerencia = {
  id_sugerencia: number;
  contenido: string;
  estado: 'aprobada' | 'rechazada' | 'pendiente';
};

// Muestra los datos del usuario, sus recetas favoritas, sus sugerencias y sus recetas creadas.
// Permite editar o eliminar sugerencias propias.
// Disponible para todos los roles.
export default function ProfileScreen({ navigation }: any) {
  const { user, logout, handleAuthError } = useContext(AuthContext);
  const [liked, setLiked] = useState<any[]>([]);
  const [sugerencias, setSugerencias] = useState<Sugerencia[]>([]);
  const [misRecetas, setMisRecetas] = useState<any[]>([]);
  const [confirmarId, setConfirmarId] = useState<number | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nuevoContenido, setNuevoContenido] = useState('');
  const [confirmarEdicion, setConfirmarEdicion] = useState(false);

  // Carga los datos del usuario al enfocar la pantalla
  const cargarDatos = useCallback(() => {
    if (!user) return;

    getLikedRecipes(user.token).then((data) => {
      if (Array.isArray(data)) setLiked(data);
      else {
        handleAuthError(data);
        setLiked([]);
      }
    });

    getUserSuggestions(user.token).then((data) => {
      if (Array.isArray(data)) setSugerencias(data);
      else {
        handleAuthError(data);
        setSugerencias([]);
      }
    });

    getRecetasDelUsuario(user.token).then((data) => {
      if (Array.isArray(data)) setMisRecetas(data);
      else {
        console.warn('Error al obtener recetas del usuario:', data?.error);
        handleAuthError(data);
        setMisRecetas([]);
      }
    });
  }, [user]);

  useFocusEffect(cargarDatos);

  // Elimina una sugerencia del usuario
  const eliminar = async (id: number) => {
    const res = await eliminarSugerencia(user!.token, id);
    if (!res?.error) {
      setSugerencias(sugerencias.filter((s) => s.id_sugerencia !== id));
    }
    setConfirmarId(null);
  };

  return (
    <ScrollView style={styles.page}>
      <View style={styles.mainContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del perfil</Text>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{user?.nombre}</Text>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.value}>{user?.correo}</Text>
          <Text style={styles.label}>Rol:</Text>
          <Text style={styles.value}>{user?.rol}</Text>
        </View>

        {user?.rol === 'Usuario' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recetas que te gustaron</Text>
              <View style={styles.gridContainer}>
                {liked.map((r) => (
                  <View key={r.id_receta} style={styles.recipeCard}>
                    <RecipeCard receta={r} onPress={() => navigation.navigate('Detalle', { receta: r })} />
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
          {(user?.rol === 'Usuario' || user?.rol === 'Administrador') && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tus sugerencias</Text>
              <View style={styles.suggestionGrid}>
                {sugerencias.map((s) => (
                  <SugerenciaCard
                    key={s.id_sugerencia}
                    sugerencia={s}
                    modo="usuario"
                    estaEditando={editandoId === s.id_sugerencia}
                    nuevoContenido={nuevoContenido}
                    onContenidoChange={setNuevoContenido}
                    onEditar={() => {
                      setEditandoId(s.id_sugerencia);
                      setNuevoContenido(s.contenido);
                    }}
                    onGuardar={() => setConfirmarEdicion(true)}
                    onCancelar={() =>   setEditandoId(null)}
                    onEliminar={() => setConfirmarId(s.id_sugerencia)}
                  />
                ))}
              </View>
            </View>
          )}
        {user?.rol === 'Empleado' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tus recetas creadas</Text>
            <View style={styles.gridContainer}>
              {misRecetas.map((r) => (
                <View key={r.id_receta} style={styles.recipeCard}>
                  <RecipeCard receta={r} onPress={() => navigation.navigate('Detalle', { receta: r })} />
                  <Text style={[styles.estado, { color: r.estado === 'aprobada' ? 'green' : 'gray' }]}>
                    Estado: {r.estado}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Button title="Cerrar sesión" color={Colors.red700} onPress={logout} />
        </View>

        {confirmarId !== null && (
          <ConfirmModal
            visible={true}
            tipo="borrar"
            onCancel={() => setConfirmarId(null)}
            onConfirm={() => eliminar(confirmarId)}
          />
        )}
        {confirmarEdicion && (
          <ConfirmModal
            visible={true}
            tipo="editar"
            onCancel={() => {
              setConfirmarEdicion(false);
              setEditandoId(null);
            }}
            onConfirm={async () => {
              const res = await actualizarSugerencia(user!.token, editandoId!, nuevoContenido);
              if (!res?.error) {
                const actualizadas = sugerencias.map((s) =>
                  s.id_sugerencia === editandoId ? { ...s, contenido: nuevoContenido } : s
                );
                setSugerencias(actualizadas);
              }
              setConfirmarEdicion(false);
              setEditandoId(null);
            }}
          />
        )}
      </View>
    </ScrollView>
  );
}

// Estilos visuales del perfil
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
  section: {
    marginTop: 20,
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.green800
  },
  label: {
    fontWeight: '600',
    marginTop: 4
  },
  value: {
    marginBottom: 6
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    marginTop: 10
  },
  recipeCard: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  suggestionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    marginTop: 10
  },
  estado: {
    fontStyle: 'italic',
    marginTop: 6,
    color: Colors.gray700
  }
});
