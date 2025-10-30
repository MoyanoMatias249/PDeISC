// services/suggestions.ts
import { request } from '../utils/request';

// Envía una nueva sugerencia.
export function enviarSugerencia(token: string, contenido: string) {
  return request('/suggestions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ contenido })
  });
}

// Obtiene todas las sugerencias del sistema
export function getSugerencias(token: string) {
  return request('/suggestions', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Obtiene las sugerencias del usuario ac
export function getUserSuggestions(token: string) {
  return request('/suggestions/mis', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Actualiza el contenido de una sugerencia.
export function actualizarSugerencia(token: string, id: number, contenido: string) {
  return request(`/suggestions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ contenido })
  });
}

// Aprueba una sugerencia.
export function aprobarSugerencia(token: string, id: number) {
  return request(`/suggestions/${id}/aprobar`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Rechaza una sugerencia.
export function rechazarSugerencia(token: string, id: number) {
  return request(`/suggestions/${id}/rechazar`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Elimina una sugerencia.
export function eliminarSugerencia(token: string, id: number) {
  return request(`/suggestions/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}