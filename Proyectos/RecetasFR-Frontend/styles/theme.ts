// styles/theme.ts
import { StyleSheet } from 'react-native';
import { Colors } from './colors';

// Theme centralizado:
// Estilos reutilizables para inputs, títulos, botones, errores, etc.
// Ideal para mantener consistencia visual en toda la app.
export const theme = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.green800
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.green600,
    marginTop: 10
  },
  input: {
    backgroundColor: Colors.gray100,
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    color: Colors.gray900
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.green600,
    alignItems: 'center'
},
    buttonContainer: {
    marginVertical: 10,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center'
},
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold'
  },
  errorText: {
    color: Colors.red700,
    marginTop: 5
  }
});
