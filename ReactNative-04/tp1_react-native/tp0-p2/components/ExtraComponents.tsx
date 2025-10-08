import { View, Text, Button, StyleSheet, Dimensions, Linking } from 'react-native';

export default function ExtraComponents() {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.group}>
      <Text style={styles.title}>Extras</Text>

      <Text style={styles.label}>Dimensions: tamaño de pantalla</Text>
      <Text>Width: {width.toFixed(0)} px</Text>
      <Text>Height: {height.toFixed(0)} px</Text>

      <Text style={styles.label}>Linking: abrir URL externa</Text>
      <Button title="Abrir Google" onPress={() => Linking.openURL('https://www.google.com')} />
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: 40 },
  title: { marginTop: 30, borderTopWidth: 1, padding: 10, textAlign: "center", fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  label: { fontWeight: '600', marginTop: 10 },
});
