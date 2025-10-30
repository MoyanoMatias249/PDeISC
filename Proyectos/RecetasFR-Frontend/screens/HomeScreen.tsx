import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Button, useWindowDimensions, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import IngredientSelector from '../components/IngredientSelector';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import LogoHome from '../components/LogoHome';
import { getIngredientes } from '../services/ingredients';
import { getRecetasPorIngredientes } from '../services/recipes';
import { Colors } from '../styles/colors';

// Pantalla principal donde los usuarios pueden seleccionar ingredientes
// y buscar recetas que los contengan.
export default function HomeScreen({ navigation }: any) {
  const { user, handleAuthError } = useContext(AuthContext);
  const [ingredientes, setIngredientes] = useState<string[]>([]);
  const [seleccionados, setSeleccionados] = useState<string[]>(['']);
  const [recetas, setRecetas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  // Carga los ingredientes al montar el componente
  useEffect(() => {
    getIngredientes(user!.token).then((data) => {
      if (Array.isArray(data)) {
        setIngredientes(Array.isArray(data) ? data.map((i: any) => i.nombre) : [])
      } else {
        console.error('Error al obtener ingredientes:', data);
        handleAuthError(data);
        setIngredientes([]);
      }
    }).catch((err) => {
      console.error('Error de conexión:', err);
      setIngredientes([]);
    });
  }, []);

  // Busca recetas que contengan los ingredientes seleccionados
  const buscarRecetas = async () => {
    setLoading(true);
    const data = await getRecetasPorIngredientes(user!.token, seleccionados.filter((i) => i));
    if (Array.isArray(data)) {
      setRecetas(data);
    } else {
      console.error('Error al buscar recetas:', data);
      handleAuthError(data);
      setRecetas([]);
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LogoHome />
      <Text style={styles.subtitle}>Seleccioná ingredientes para encontrar recetas:</Text>

      <View style={styles.selectorBox}>
        <IngredientSelector
          ingredientes={ingredientes}
          seleccionados={seleccionados}
          setSeleccionados={setSeleccionados}
        />
        <View style={styles.buttonBox}>
          <Button title="Buscar recetas" onPress={buscarRecetas} color={Colors.green800}/>
        </View>
      </View>

      {loading ? <Loader /> : (
        <View style={[styles.recetasBox, isDesktop && styles.recetasDesktop]}>
          {recetas.length > 0 ? (
            recetas.map((r) => (
              <View key={r.id_receta} style={styles.cardWrapper}>
                <RecipeCard receta={r} onPress={() => navigation.navigate('Detalle', { receta: r })} />
              </View>
            ))
          ) : (
            <Text style={styles.noResults}>No se encontraron recetas</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

// Estilos visuales del componente
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.green700
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: Colors.gray950
  },
  selectorBox: {
    width: '100%',
    maxWidth: 600,
    marginBottom: 20
  },
  buttonBox: {
    marginTop: 10
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
  },
  noResults: {
    marginTop: 20,
    color: Colors.gray600
  }
});