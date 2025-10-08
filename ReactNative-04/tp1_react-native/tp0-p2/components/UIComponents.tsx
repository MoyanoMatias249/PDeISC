import { View, Text, Button, Switch, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function UIComponents() {
  const [enabled, setEnabled] = useState(false);

  return (
    <View style={styles.group}>
      <Text style={styles.title}>UI Components</Text>
      <Button title="Button: botón simple" onPress={() => {}} />
      <Text>Switch: toggle booleano</Text>
      <Switch value={enabled} onValueChange={setEnabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: 30 },
  title: { marginTop: 30, borderTopWidth: 1, padding: 10, textAlign: "center", fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});
