// services/ingredients.ts
import { request } from '../utils/request';

// Obtiene todos los ingredientes disponibles.
export function getIngredientes(token: string) {
  return request('/ingredients', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Agregar ingrediente nuevo (Sin uso).
export function subirIngredientesAPI(token: string, ingredientes: { nombre: string }[]) {
  return request('/ingredients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ ingredientes })
  });
}

// Edita el nombre de un ingrediente existente (Sin uso).
export function editarIngrediente(token: string, id: number, nombre: string) {
  return request(`/ingredients/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ nombre })
  });
}

// Elimina un ingrediente por ID (Sin uso).
export function eliminarIngrediente(token: string, id: number) {
  return request(`/ingredients/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}
