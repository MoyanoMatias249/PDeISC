import { View, Text, Button, ActionSheetIOS, StyleSheet } from 'react-native';

export default function IOSComponents() {
  return (
    <View style={styles.group}>
      <Text style={styles.title}>iOS Components</Text>
      <Button
        title="ActionSheetIOS"
        onPress={() =>
          ActionSheetIOS.showActionSheetWithOptions({
            options: ['Cancelar', 'Opción 1', 'Opción 2'],
            cancelButtonIndex: 0,
          }, () => {})
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: 30 },
  title: { marginTop: 30, borderTopWidth: 1, padding: 10, textAlign: "center", fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});
