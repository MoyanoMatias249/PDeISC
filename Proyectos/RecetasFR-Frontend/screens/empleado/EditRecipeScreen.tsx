// screens/empleado/EditRecipeScreen.tsx
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { actualizarReceta } from '../../services/recipes';
import ConfirmModal from '../../components/ConfirmModal';
import { Colors } from '../../styles/colors';
import { theme } from '../../styles/theme';
import {
  validarIngrediente, validarCantidad,
  validarTextoLibre, limpiarTexto
} from '../../utils/validaciones';

// Tipo de ingrediente utilizado en la receta.
// Cada ingrediente tiene nombre y cantidad.
type Ingrediente = {
  nombre: string;
  cantidad: string;
};

// Permite editar una receta existente.
// Se usa tanto por empleados como por administradores.
// Incluye validaciones, edición de ingredientes y confirmación antes de guardar.
export default function EditRecipeScreen({ route, navigation }: any) {
  const { receta } = route.params;
  const { user, handleAuthError } = useContext(AuthContext);

  const [titulo, setTitulo] = useState(receta.titulo);
  const [descripcion, setDescripcion] = useState(receta.descripcion);
  const [pasos, setPasos] = useState(receta.pasos);
  const [tiempo, setTiempo] = useState(String(receta.tiempo_estimate));
  const [imagen_url, setImagenUrl] = useState(receta.imagen_url || '');
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>(receta.ingredientes || []);
  const [mensaje, setMensaje] = useState('');
  const [confirmar, setConfirmar] = useState(false);

  // Actualiza un campo específico de un ingrediente
  const actualizarIngrediente = (index: number, campo: 'nombre' | 'cantidad', valor: string) => {
    const nuevos = [...ingredientes];
    nuevos[index] = { ...nuevos[index], [campo]: valor };
    setIngredientes(nuevos);
  };

  // Agrega un nuevo ingrediente vacío
  const agregarIngrediente = () => {
    setIngredientes([...ingredientes, { nombre: '', cantidad: '' }]);
  };

  // Envía los cambios al backend
  const enviar = async () => {
    if (
      !validarTextoLibre(titulo, 2) ||
      !validarTextoLibre(descripcion, 5) ||
      !validarTextoLibre(pasos, 5) ||
      isNaN(Number(tiempo)) ||
      Number(tiempo) <= 0
    ) {
      setMensaje('Los campos no cumplen con los requisitos mínimos.');
      return;
    }
    // Filtra ingredientes válidos
    const ingredientesValidos = ingredientes
      .map((ing: Ingrediente) => ({
        nombre: limpiarTexto(ing.nombre),
        cantidad: ing.cantidad.trim()
      }))
      .filter((ing: Ingrediente) => validarIngrediente(ing.nombre) && validarCantidad(ing.cantidad));

    if (ingredientesValidos.length === 0) {
      setMensaje('Debe haber al menos un ingrediente válido.');
      return;
    }

    // Construye el objeto actualizado
    const recetaActualizada = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      pasos: pasos.trim(),
      tiempo_estimate: Number(tiempo),
      imagen_url: imagen_url.trim(),
      estado: receta.estado,
      ingredientes: ingredientesValidos
    };

     // Llama al backend
    const res = await actualizarReceta(user!.token, receta.id_receta, recetaActualizada);
    if (res.error) {
      handleAuthError(res);
      setMensaje(res.error);
    } else {
      setMensaje('Receta actualizada correctamente');
      navigation.goBack();
    }
  };


  return (
    <ScrollView  contentContainerStyle={styles.container} style={styles.scrollContainer}>
      <View style={styles.contentBox}>
        <Text style={theme.title}>Editar receta</Text>
        <TextInput style={theme.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
        <TextInput style={theme.input} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} />
        <TextInput
          style={[theme.input, styles.pasosInput]}
          placeholder="Pasos"
          value={pasos}
          onChangeText={setPasos}
          multiline
          numberOfLines={5}
        />
        <TextInput style={theme.input} placeholder="Tiempo estimado (min)" value={tiempo} onChangeText={setTiempo} keyboardType="numeric" />
        <TextInput style={theme.input} placeholder="URL de imagen" value={imagen_url} onChangeText={setImagenUrl} />

        <Text style={theme.subtitle}>Ingredientes:</Text>
        {ingredientes.map((ing, i) => (
          <View key={i} style={styles.inputRow}>
            <TextInput
              style={[theme.input, styles.inputHalf]}
              placeholder="Nombre"
              value={ing.nombre}
              onChangeText={(val) => actualizarIngrediente(i, 'nombre', val)}
            />
            <TextInput
              style={[theme.input, styles.inputHalf]}
              placeholder="Cantidad"
              value={ing.cantidad}
              onChangeText={(val) => actualizarIngrediente(i, 'cantidad', val)}
            />
          </View>
        ))}
      
        <View style={styles.buttonRow}>
          <View style={styles.halfButton}>
            <Button title="Agregar ingrediente" onPress={agregarIngrediente} color={Colors.green600} />
          </View>
          <View style={styles.halfButton}>
            <Button
              title="Eliminar último"
              onPress={() => {
                if (ingredientes.length > 1) {
                  setIngredientes(ingredientes.slice(0, -1));
                }
              }}
              disabled={ingredientes.length <= 1}
              color={Colors.red600}
            />
          </View>
          
        </View>
        <View style={styles.fullButton}>
          <Button title="Guardar cambios" onPress={() => setConfirmar(true)} color={Colors.green600} />
        </View>
        <ConfirmModal
          visible={confirmar}
          tipo="editar"
          onCancel={() => setConfirmar(false)}
          onConfirm={() => {
            setConfirmar(false);
            enviar();
          }}
        />

        {mensaje ? <Text style={theme.errorText}>{mensaje}</Text> : null}
      </View>
    </ScrollView>
  );
}

// Estilos visuales del formulario
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
  inputRow: {
    flexDirection: 'row',
    flexWrap: "wrap",
    maxWidth: 800,
    gap: 10
  },
  inputHalf: {
    flex: 1
  },
  pasosInput: {
    ...theme.input,
    minHeight: 80,
    textAlignVertical: 'top'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: "wrap",
    maxWidth: 800,
    marginTop: 20,
    gap: 10
  },
  halfButton: {
    flex: 1
  },
  fullButton: {
    marginTop: 10
  }
});