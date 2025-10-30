// context/AuthContext.tsx

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipo de usuario autenticado.
// Incluye datos básicos y el token JWT.
type User = {
  id_usuario: number;
  nombre: string;
  correo: string;
  rol: string;
  token: string;
};

// Tipo del contexto de autenticación:
// - user: usuario actual
// - login: función para iniciar sesión
// - logout: función para cerrar sesión
// - handleAuthError: función para manejar errores de autenticación
type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  handleAuthError: (error: any) => void;
};

// Contexto global de autenticación
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},  
  logout: () => {},
  handleAuthError: () => {}
});

// Proveedor del contexto de autenticación:
// Maneja el estado del usuario y persiste la sesión en AsyncStorage.
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Al montar, intenta recuperar el usuario guardado en almacenamiento local
  useEffect(() => {
    AsyncStorage.getItem('user').then((stored) => {
      if (stored) setUser(JSON.parse(stored));
    });
  }, []);

  // Inicia sesión y guarda el usuario en memoria y almacenamiento
  const login = async (userData: User) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

   // Cierra sesión y limpia el almacenamiento
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  // Maneja errores relacionados con autenticación (ej: token expirado)
  const handleAuthError = (error: any) => {
    if (error?.error?.includes('Token') || error?.message?.includes('401')) {
      console.warn('Token expirado, cerrando sesión');
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, handleAuthError }}>
      {children}
    </AuthContext.Provider>
  );
};
