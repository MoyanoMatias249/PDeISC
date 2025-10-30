// components/ReciperCard.tsx
import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { Colors } from '../styles/colors';

// Props que recibe la tarjeta:
// - receta: objeto con datos de la receta (id, título, descripcion, tiempo, imagen, likes, si el usuario le dio like)
// - onPress: función que se ejecuta al tocar la tarjeta
type Props = {
  receta: {
    id_receta: number;
    titulo: string;
    descripcion?: string;
    tiempo_estimate: number;
    imagen_url?: string;
    likes?: number;
    liked?: boolean;
  };
  onPress: () => void;
};

// Muestra una receta con imagen, título, tiempo estimado y likes (si el usuario tiene rol autorizado).
// Se adapta al ancho de pantalla para mejorar visualización en escritorio.
export default function RecipeCard({ receta, onPress }: Props) {
  const { user } = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  return (
    <TouchableOpacity style={[styles.card, isDesktop && styles.cardDesktop]} onPress={onPress}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: receta.imagen_url || 'https://via.placeholder.com/300x200' }}
          style={styles.image}
        />
        {user?.rol === 'Usuario' && receta.liked && (
          <>
            <Ionicons name="heart" size={24} color={Colors.green400} style={styles.topHeartIcon} />
            <Ionicons name="heart-outline" size={24} color={Colors.green900} style={styles.topHeartIcon} />
          </>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{receta.titulo}</Text>
        <Text style={styles.time}>{receta.tiempo_estimate} min</Text>
        {receta.descripcion && <Text style={styles.description}>{receta.descripcion}</Text>}

        {(user?.rol === 'Empleado' || user?.rol === 'Administrador') && typeof receta.likes === 'number' && (
          <View style={styles.likesRow}>
            <Ionicons name="heart-outline" size={18} color={Colors.green700} style={styles.heartIcon} />
            <Text style={styles.likes}>{receta.likes}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

// Estilos visuales de la tarjeta
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3
  },
  cardDesktop: {
    marginHorizontal: 10
  },
  imageWrapper: {
    width: '100%',
    height: 200
  },
  image: {
    width: '100%',
    height: 200
  },
  info: {
    padding: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.green900
  },
  time: {
    fontSize: 14,
    color: Colors.gray700,
    marginTop: 4
  },
  description: {
    fontSize: 14,
    color: Colors.gray800,
    marginTop: 6
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  },
  likes: {
    fontSize: 14,
    color: Colors.green700
  },
  topHeartIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 5,
  },
  heartIcon: {
    marginTop: 2.5,
    marginRight: 2, 
  }
});