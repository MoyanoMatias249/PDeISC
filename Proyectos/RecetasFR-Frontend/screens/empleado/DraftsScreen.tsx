// screens/empleado/DraftScreen.tsx
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { crearBorrador } from '../../services/recipes';
import {
  validarIngrediente, validarCantidad,
  validarTextoLibre, limpiarTexto
} from '../../utils/validaciones';
import { Colors } from '../../styles/colors';

// Tipo de ingrediente utilizado en la receta.
// Cada ingrediente tiene un nombre y una cantidad.
type Ingrediente = {
  nombre: string;
  cantidad: string;
};

// Tipo de ingrediente utilizado en la receta.
// Cada ingrediente tiene un nombre y una cantidad.
export default function DraftsScreen() {
  const { user } = useContext(AuthContext);

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [pasos, setPasos] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [imagen_url, setImagenUrl] = useState('');
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([{ nombre: '', cantidad: '' }]);
  const [mensaje, setMensaje] = useState('');

  // Agrega un nuevo campo de ingrediente vacío
  const agregarIngrediente = () => {
    setIngredientes([...ingredientes, { nombre: '', cantidad: '' }]);
  };

  // Actualiza el valor de un campo de ingrediente específico
  const actualizarIngrediente = (index: number, campo: keyof Ingrediente, valor: string) => {
    const nuevos = [...ingredientes];
    nuevos[index] = { ...nuevos[index], [campo]: valor };
    setIngredientes(nuevos);
  };

  // Envía la receta como borrador al backend
  const enviar = async () => {
    if (
      !validarTextoLibre(titulo, 2) ||
      !validarTextoLibre(descripcion, 5) ||
      !validarTextoLibre(pasos, 5) ||
      isNaN(Number(tiempo)) ||
      Number(tiempo) <= 0
    ) {
      setMensaje('Los campos de la receta no cumplen con los requisitos mínimos.');
      return;
    }

    // Filtra ingredientes válidos
    const ingredientesValidos = ingredientes
      .map((ing) => ({
        nombre: limpiarTexto(ing.nombre),
        cantidad: ing.cantidad.trim()
      }))
      .filter((ing) => validarIngrediente(ing.nombre) && validarCantidad(ing.cantidad));

    if (ingredientesValidos.length === 0) {
      setMensaje('La receta debe tener al menos un ingrediente válido.');
      return;
    }

    // Construye el objeto receta
    const receta = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      pasos: pasos.trim(),
      tiempo_estimate: Number(tiempo),
      imagen_url: imagen_url.trim(),
      ingredientes: ingredientesValidos
    };

    const data = await crearBorrador(user!.token, receta);

    if (data?.error) {
      setMensaje(`Error: ${data.error}`);
    } else {
      setMensaje(data.message || 'Receta enviada como borrador');
      // Limpiar formulario
      setTitulo('');
      setDescripcion('');
      setPasos('');
      setTiempo('');
      setImagenUrl('');
      setIngredientes([{ nombre: '', cantidad: '' }]);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <View style={styles.contentBox}>
        <Text style={styles.title}>Crear receta en borrador</Text>
        <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
        <TextInput style={styles.input} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} />
        <TextInput
          style={[styles.input, styles.pasosInput]}
          placeholder="Pasos"
          value={pasos}
          onChangeText={setPasos}
          multiline
        />
        <TextInput style={styles.input} placeholder="Tiempo estimado (min)" value={tiempo} onChangeText={setTiempo} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="URL de imagen (opcional)" value={imagen_url} onChangeText={setImagenUrl} />

        <Text style={styles.title}>Ingredientes</Text>
        {ingredientes.map((ing, i) => (
          <View key={i} style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Nombre"
              value={ing.nombre}
              onChangeText={(val) => actualizarIngrediente(i, 'nombre', val)}
            />
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Cantidad"
              value={ing.cantidad}
              onChangeText={(val) => actualizarIngrediente(i, 'cantidad', val)}
            />
          </View>
        ))}

        <View style={styles.buttonRow}>
          <View style={styles.button}>
            <Button title="Agregar ingrediente" onPress={agregarIngrediente} color={Colors.green600} />
          </View>
          <View style={styles.button}>
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
          <Button title="Enviar borrador" onPress={enviar} color={Colors.green700} />
        </View>

        {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}
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
    flexWrap: "wrap",
    maxWidth: 800,
    gap: 5
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
    flexWrap: "wrap",
    maxWidth: 800,
    gap: 10,
    marginTop: 20
  },
  button: {
    flexGrow: 1,
  },
  fullButton: {
    marginTop: 10,
  },
  mensaje: {
    marginTop: 10,
    color: Colors.green700
  }
});
