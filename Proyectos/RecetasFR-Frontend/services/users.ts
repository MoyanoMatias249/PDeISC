// services/users.ts
import { request } from '../utils/request';

// Obtiene todos los usuarios registrados.
export function getUsuarios(token: string) {
  return request('/users', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Cambia el rol de un usuario.
export function cambiarRol(token: string, id: number, nuevo_rol: string) {
  return request(`/users/${id}/rol`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ nuevo_rol })
  });
}

// Elimina un usuario por ID.
export function eliminarUsuario(token: string, id: number) {
  return request(`/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}
