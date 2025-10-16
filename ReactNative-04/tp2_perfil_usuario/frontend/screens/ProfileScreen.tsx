import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { User } from '../types/User';
import { updateUser } from '../services/api';

type RootStackParamList = {
  Profile: { user: User };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ route, navigation }: Props) {
    const { user } = route.params;

    // Estado local que guarda el usuario completo
    const [userState, setUserState] = useState<User>(user);

    // Campos individuales que editarás
    const [name, setName] = useState(user.nombre);
    const [location, setLocation] = useState(user.direccion || '');
    const [phone, setPhone] = useState(user.telefono || '');
    const [photo, setPhoto] = useState<string | null>(user.fotoUrl || null);
    const [docScan, setDocScan] = useState<string | null>(user.documentScanUrl || null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    // Cuando cambie userState, actualizar los campos del formulario
    useEffect(() => {
        setName(userState.nombre);
        setLocation(userState.direccion || '');
        setPhone(userState.telefono || '');
        setPhoto(userState.fotoUrl || null);
        setDocScan(userState.documentScanUrl || null);
    }, [userState]);

    async function pickImage(setter: React.Dispatch<React.SetStateAction<string | null>>) {
        const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        });

        if (!result.canceled) {
        setter(result.assets[0].uri);
        }
    }

    async function handleSave() {
        // Validaciones básicas antes de guardar
        if (!name.trim()) {
            setMessage('El nombre es obligatorio.');
            return;
        }
        if (phone && !/^\+?\d{7,15}$/.test(phone.trim())) {
            setMessage('El teléfono no es válido.');
            return;
        }
        // Puedes agregar más validaciones si quieres

        setLoading(true);
        setMessage(null);
        try {
            const userUpdated = await updateUser({
                ...userState,|
                nombre: name.trim(),
                telefono: phone.trim(),
                direccion: location.trim(),
                fotoUrl: photo,
                documentScanUrl: docScan,
            });

            setUserState(userUpdated);
            setLoading(false);
            setMessage('Perfil actualizado correctamente');
            // También puedes actualizar los params si quieres
            navigation.setParams({ user: userUpdated });
        } catch (error) {
            setLoading(false);
            setMessage('No se pudo actualizar el perfil. Intenta nuevamente.');
        }
    }


  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
        <Text>Guardando cambios...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      {!!message && (
        <Text style={[styles.message, message.includes('correctamente') ? styles.success : styles.error]}>
          {message}
        </Text>
      )}

      <Text>Nombre:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text>Teléfono:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text>Dirección:</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} />

      <Text>Foto de perfil:</Text>
      <Button title="Seleccionar Foto" onPress={() => pickImage(setPhoto)} />
      {photo && <Image source={{ uri: photo }} style={styles.image} />}

      <Text>Escaneo de Documento:</Text>
      <Button title="Seleccionar Documento" onPress={() => pickImage(setDocScan)} />
      {docScan && <Image source={{ uri: docScan }} style={styles.image} />}

      <Button title="Guardar Cambios" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
  image: { width: 100, height: 100, marginVertical: 10, borderRadius: 10 },
  message: { marginBottom: 15, fontSize: 16 },
  success: { color: 'green' },
  error: { color: 'red' },
});
