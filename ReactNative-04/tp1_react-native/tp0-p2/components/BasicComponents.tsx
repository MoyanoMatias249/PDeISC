import { View, Text, TextInput, Image, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';

export default function BasicComponents() {
  return (
    <View style={styles.group}>
      <Text style={styles.title}>Basic Components</Text>

      <Text style={styles.label}>Text: muestra texto</Text>
      <Text style={styles.text}>Este es un texto simple</Text>

      <Text style={styles.label}>TextInput: campo de entrada</Text>
      <TextInput placeholder="Escribí algo..." style={styles.input} />

      <Text style={styles.label}>Image: imagen remota</Text>
      <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={styles.image} />

      <Text style={styles.label}>Pressable: botón táctil</Text>
      <Pressable style={styles.pressable} onPress={() => Alert.alert('Pressable', '¡Presionaste el botón!')}>
        <Text style={styles.pressableText}>Tocar aquí</Text>
      </Pressable>

      <Text style={styles.label}>ScrollView: contenedor con scroll</Text>
      <View style={styles.scrollContainer}>
        <ScrollView>
          {Array.from({ length: 20 }).map((_, i) => (
            <Text key={i} style={styles.scrollItem}>Elemento scrollable {i + 1}</Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: 40 },
  title: {
    marginTop: 30,
    borderTopWidth: 1,
    padding: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  label: { fontWeight: '600', marginTop: 10 },
  text: { fontSize: 16 },
  input: { borderWidth: 1, padding: 8, borderRadius: 4, backgroundColor: '#fff' },
  image: { width: 60, height: 60, marginVertical: 10 },
  pressable: { backgroundColor: '#4e9', padding: 10, borderRadius: 6, marginVertical: 10 },
  pressableText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  scrollContainer: {
    height: 150,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginTop: 10,
  },
  scrollItem: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
