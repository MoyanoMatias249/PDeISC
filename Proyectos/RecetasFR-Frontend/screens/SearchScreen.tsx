// screens/SearchScreen.tsx
import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, ScrollView, StyleSheet, useWindowDimensions, Text } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { buscarRecetasPorNombre, listRecipes } from '../services/recipes';
import { AuthContext } from '../context/AuthContext';
import { Colors } from '../styles/colors';

// Permite buscar recetas por nombre.
// Muestra todas las recetas al iniciar y filtra según el texto ingresado.
export default function SearchScreen({ navigation }: any) {
  const { user, handleAuthError } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState<any[]>([]);

  // Detecta si es escritorio para adaptar el layout
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  // Carga todas las recetas al montar
  useEffect(() => {
    cargarTodas();
  }, []);

  // Obtiene todas las recetas disponibles
  const cargarTodas = async () => {
    const data = await listRecipes(user!.token);
    if (Array.isArray(data)) {
      setResultados(data);
    } else {
      console.error('Error al obtener recetas:', data);
      handleAuthError(data);
      setResultados([]);
    }
  };

  // Realiza la búsqueda por nombre
  const buscar = async (texto: string) => {
    setQuery(texto);
    if (texto.trim() === '') {
      cargarTodas();
      return;
    }

    const data = await buscarRecetasPorNombre(user!.token, texto);
    if (Array.isArray(data)) {
      setResultados(data);
    } else {
      console.error('Error al buscar recetas:', data);
      handleAuthError(data);
      setResultados([]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Buscar recetas</Text>
      <TextInput
        placeholder="Buscar recetas por nombre..."
        value={query}
        onChangeText={buscar}
        style={styles.input}
      />
      <View style={[styles.recetasBox, isDesktop && styles.recetasDesktop]}>
        {resultados.map((r) => (
          <View key={r.id_receta} style={styles.cardWrapper}>
            <RecipeCard receta={r} onPress={() => navigation.navigate('Detalle', { receta: r })} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
// Estilos visuales
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: Colors.green700
  },
  input: {
    backgroundColor: Colors.gray100,
    padding: 10,
    borderRadius: 8,
    width: '100%',
    maxWidth: 600,
    marginBottom: 20,
    color: Colors.gray900
  },
  recetasBox: {
    width: '100%'
  },
  recetasDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  cardWrapper: {
    marginBottom: 20,
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 10
  }
});
