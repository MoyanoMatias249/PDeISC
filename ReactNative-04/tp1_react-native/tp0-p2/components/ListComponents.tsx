import { View, Text, FlatList, SectionList, StyleSheet } from 'react-native';

export default function ListComponents() {
  return (
    <View style={styles.group}>
      <Text style={styles.title}>List Views</Text>

      <Text style={styles.label}>FlatList: lista simple</Text>
      <FlatList
        data={['Item 1', 'Item 2']}
        renderItem={({ item }) => <Text style={styles.item}>• {item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text style={styles.label}>SectionList: lista con secciones</Text>
      <SectionList
        sections={[{ title: 'Sección A', data: ['A1', 'A2'] }]}
        renderItem={({ item }) => <Text style={styles.item}>• {item}</Text>}
        renderSectionHeader={({ section }) => <Text style={styles.header}>{section.title}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: 40 },
  title: { marginTop: 30, borderTopWidth: 1, padding: 10, textAlign: "center", fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  label: { fontWeight: '600', marginTop: 10 },
  item: { paddingLeft: 10 },
  header: { fontWeight: 'bold', marginTop: 10, backgroundColor: '#ddd', padding: 5 },
});
