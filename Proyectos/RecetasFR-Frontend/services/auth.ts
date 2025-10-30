// services/auth.ts
import { request } from '../utils/request';

// Inicia sesión con correo y contraseña.
export function loginUser(correo: string, contraseña: string) {
  return request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, contraseña })
  });
}

// Registra un nuevo usuario.
export function registerUser(nombre: string, correo: string, contraseña: string) {
  return request('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo, contraseña })
  });
}

// Login mediante proveedor social (Google/Facebook).
export function loginSocialUser(nombre: string, correo: string, token: string) {
  return request('/auth/social-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo, token })
  });
}