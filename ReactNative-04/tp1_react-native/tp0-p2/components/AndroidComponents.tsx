import { View, Text, Button, ToastAndroid, StyleSheet } from 'react-native';

export default function AndroidComponents() {
  return (
    <View style={styles.group}>
      <Text style={styles.title}>Android Components</Text>
      <Button
        title="ToastAndroid"
        onPress={() => ToastAndroid.show('Hola desde Android!', ToastAndroid.SHORT)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: 30 },
  title: { marginTop: 30, borderTopWidth: 1, padding: 10, textAlign: "center", fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});
