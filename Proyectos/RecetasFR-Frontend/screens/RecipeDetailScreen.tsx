// screens/RecipeDetailScreen.tsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { darLike, quitarLike } from '../services/likes';
import { aprobarReceta, eliminarReceta, getRecetaPorId } from '../services/recipes';
import ConfirmModal from '../components/ConfirmModal';
import { Colors } from '../styles/colors';
import { theme } from '../styles/theme';

// Muestra los detalles completos de una receta.
// Permite dar/quitar like, editar, eliminar o aprobar según el rol del usuario.
export default function RecipeDetailScreen({ route, navigation }: any) {
  const { receta: recetaInicial } = route.params;
  const { user, handleAuthError } = useContext(AuthContext);

  const [receta, setReceta] = useState(recetaInicial);
  const [tieneLike, setTieneLike] = useState(!!recetaInicial.liked);
  const [likes, setLikes] = useState(recetaInicial.likes || 0);
  const [accion, setAccion] = useState<'borrar' | 'aprobar' | null>(null);

  // Al montar, obtiene la receta actualizada desde backend
  useEffect(() => {
    getRecetaPorId(user!.token, recetaInicial.id_receta).then((data) => {
      if (!data?.error) {
        setReceta(data);
        setTieneLike(!!data.liked);
        setLikes(data.likes || 0);
      }
    });
  }, []);

  // Alterna entre dar y quitar like
  const handleToggleLike = async () => {
    const fn = tieneLike ? quitarLike : darLike;
    const res = await fn(user!.token, receta.id_receta);
    if (res.error) {
      handleAuthError(res);
    } else {
      setTieneLike(!tieneLike);
      setLikes((prev: number) => tieneLike ? prev - 1 : prev + 1);
    }
  };

  // Permisos según rol y autoría
  const puedeEditar =
    (user?.rol === 'Empleado' && receta.id_autor === user?.id_usuario) ||
    user?.rol === 'Administrador';

  const puedeEliminar = user?.rol === 'Administrador';
  const esBorrador = receta.estado !== 'aprobada';

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.scrollContainer} >
      <View style={styles.contentBox}>
      <Text style={theme.title}>
        {receta.titulo}{' '}
        {esBorrador && <Text style={styles.borrador}>(borrador)</Text>}
      </Text>
      <Text style={styles.tiempo}>{receta.tiempo_estimate} min</Text>

      {(user?.rol === 'Empleado' || user?.rol === 'Administrador') && (
        <Text style={styles.likes}>{likes} {likes === 1 ? 'like' : 'likes'}</Text>
      )}

      <Image
        source={{ uri: receta.imagen_url || 'https://via.placeholder.com/300x200' }}
        style={styles.image}
      />

      <Text style={theme.subtitle}>Ingredientes:</Text>
      {receta.ingredientes?.map((i: any) => (
        <Text key={i.nombre} style={styles.ingrediente}>
          • {i.nombre} - {i.cantidad}
        </Text>
      ))}

      <Text style={theme.subtitle}>Pasos:</Text>
      <Text style={styles.pasos}>{receta.pasos}</Text>

      <View style={styles.buttonGroup}>
        {user?.rol === 'Usuario' && !esBorrador && (
          <Button
            title={tieneLike ? 'Quitar me gusta' : 'Me gusta'}
            onPress={handleToggleLike}
            color={Colors.green600}
          />
        )}

        {puedeEditar && (
          <Button title="Editar receta" onPress={() => navigation.navigate('Editar receta', { receta })} color={Colors.green600} />
        )}

        {puedeEliminar && (
          <Button title="Eliminar receta" onPress={() => setAccion('borrar')} color={Colors.red600} />
        )}

        <Button title="Volver" onPress={() => navigation.goBack()} color={Colors.gray700} />
      </View>
      {accion && (
        <ConfirmModal
          visible={true}
          tipo={accion}
          onCancel={() => setAccion(null)}
          onConfirm={async () => {
            if (accion === 'borrar') {
              const res = await eliminarReceta(user!.token, receta.id_receta);
              if (!res.error) navigation.goBack();
            } else if (accion === 'aprobar') {
              const res = await aprobarReceta(user!.token, receta.id_receta);
              if (!res.error) navigation.goBack();
            }
            setAccion(null);
          }}
        />
      )}
      </View>
    </ScrollView>
  );
}

// Estilos visuales del detalle
const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: Colors.gray100,
    flex: 1
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%'
  },
  contentBox: {
    width: '100%',
    maxWidth: 900,
    minHeight: '100%',
    paddingVertical: 40,
    paddingHorizontal: 50,
    backgroundColor: Colors.white,
    justifyContent: 'center'
  },
  borrador: {
    color: Colors.gray600,
    fontStyle: 'italic'
  },
  tiempo: {
    marginTop: 4,
    color: Colors.gray700
  },
  likes: {
    marginTop: 4,
    color: Colors.green700
  },
  image: {
    height: 200,
    width: '100%',
    maxWidth: 600,
    borderRadius: 8,
    marginVertical: 10,
    alignSelf: 'center'
  },
  ingrediente: {
    marginVertical: 2,
    color: Colors.gray900
  },
  pasos: {
    marginTop: 6,
    color: Colors.gray800
  },
  buttonGroup: {
    marginTop: 20,
    gap: 10,
    width: '100%',
    maxWidth: 600,
    flex: 1,
    alignSelf: 'center'
  },
  row: {
    flexDirection: 'column',
    gap: 20
  }
});