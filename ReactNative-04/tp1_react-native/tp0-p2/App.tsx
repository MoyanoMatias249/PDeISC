import { ScrollView, StyleSheet } from 'react-native';
import BasicComponents from './components/BasicComponents';
import UIComponents from './components/UIComponents';
import ListComponents from './components/ListComponents';
import AndroidComponents from './components/AndroidComponents';
import IOSComponents from './components/IOSComponents';
import OtherComponents from './components/OtherComponents';
import ExtraComponents from './components/ExtraComponents';

export default function App() {
  return (
     <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <BasicComponents />
      <UIComponents />
      <ListComponents />
      <AndroidComponents />
      <IOSComponents />
      <OtherComponents />
      <ExtraComponents />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 30,
    paddingBottom: 100, // para que no se corte el último componente
  },
});
