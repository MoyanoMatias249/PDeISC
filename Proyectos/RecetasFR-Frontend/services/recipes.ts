// services/recipes.ts
import { request } from '../utils/request';

// Filtra recetas por ingredientes.
export function getRecetasPorIngredientes(token: string, ingredientes: string[]) {
  return request('/recipes/filter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ ingredientes })
  });
}

// Buscar recetas por coincidencia en parte del nombre.
export function buscarRecetasPorNombre(token: string, query: string) {
  return request(`/recipes/search?query=${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Obtiene una receta por ID.
export function getRecetaPorId(token: string, id: number) {
  return request(`/recipes/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Crea una receta en estado de borrador.
export function crearBorrador(token: string, receta: any) {
  return request('/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(receta)
  });
}

// Aprueba una receta.
export function aprobarReceta(token: string, id: number) {
  return request(`/recipes/${id}/aprobar`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Actualiza una receta existente.
export function actualizarReceta(token: string, id: number, receta: any) {
  return request(`/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(receta)
  });
}

// Elimina una receta.
export function eliminarReceta(token: string, id: number) {
  return request(`/recipes/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Obtiene todas las recetas en estado de borrador.
export function getBorradores(token: string) {
  return request('/recipes/drafts', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Obtiene todas las recetas creadas por el usuario.
export function getRecetasDelUsuario(token: string) {
  return request('/recipes/mis', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Lista todas las recetas disponibles.
export function listRecipes(token: string) {
  return request('/recipes', {
    headers: { Authorization: `Bearer ${token}` }
  });
}
