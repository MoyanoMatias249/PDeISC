// components/IngredientSelector.tsx
import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Colors } from '../styles/colors';

// Props que recibe el componente:
// - ingredientes: lista de ingredientes disponibles para seleccionar
// - seleccionados: lista actual de ingredientes seleccionados
// - setSeleccionados: función para actualizar la lista seleccionada
type Props = {
  ingredientes: string[] | undefined;
  seleccionados: string[];
  setSeleccionados: (val: string[]) => void;
};

// Permite seleccionar múltiples ingredientes desde un dropdown.
// Se pueden agregar o eliminar campos dinámicamente.
// Usa RNPickerSelect para compatibilidad multiplataforma.
export default function IngredientSelector({ ingredientes, seleccionados, setSeleccionados }: Props) {
  if (!Array.isArray(seleccionados)) return null;

  // Agrega un nuevo campo vacío si no hay uno ya vacío
  const agregar = () => {
    if (!seleccionados.includes('')) {
      setSeleccionados([...seleccionados, '']);
    }
  };

  // Elimina el último campo si hay más de uno
  const eliminar = () => {
    if (seleccionados.length > 1) {
      setSeleccionados(seleccionados.slice(0, -1));
    }
  };

  // Actualiza el valor de un campo específico
  const actualizar = (index: number, value: string) => {
    const nuevos = [...seleccionados];
    nuevos[index] = value;
    setSeleccionados(nuevos);
  };

  // Genera las opciones para el selector a partir de la lista de ingredientes
  const opciones = Array.isArray(ingredientes)
    ? ingredientes.map((ing, idx) => ({
        label: ing,
        value: ing,
        key: `ing-${idx}-${ing}`
      }))
    : [];

  return (
    <View style={styles.container}>
      {opciones.length === 0 ? (
        <Text style={styles.loadingText}>Cargando ingredientes...</Text>
      ) : (
        seleccionados.map((sel, i) => (
          <RNPickerSelect
            key={`selector-${i}`}
            value={sel}
            onValueChange={(val) => actualizar(i, val)}
            items={opciones}
            placeholder={{ label: 'Seleccionar ingrediente', value: '' }}
            useNativeAndroidPickerStyle={false}
            style={pickerStyles}
          />
        ))
      )}

      <View style={styles.buttonRow}>
        <View style={styles.button}>
          <Button title="Agregar ingrediente" onPress={agregar} color={Colors.green600} />
        </View>
        <View style={styles.button}>
          <Button title="Eliminar último" onPress={eliminar} disabled={seleccionados.length <= 1} color={Colors.red600} />
        </View>
      </View>
    </View>
  );
}

// Estilos del contenedor y botones
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
    maxWidth: 600
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  button: {
    flex: 1,
    marginHorizontal: 5
  },
  loadingText: {
    color: Colors.gray600,
    fontStyle: 'italic',
    marginBottom: 10
  }
});

// Estilos personalizados para RNPickerSelect
const pickerStyles = {
  inputIOS: {
    backgroundColor: Colors.gray100,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    color: Colors.gray900
  },
  inputAndroid: {
    backgroundColor: Colors.gray100,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    color: Colors.gray900
  },
  placeholder: {
    color: Colors.gray500
  }
}