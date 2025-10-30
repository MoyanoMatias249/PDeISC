// services/likes.ts
import { request } from '../utils/request';

// Da like a una receta.
export function darLike(token: string, id_receta: number) {
  return request(`/recipes/${id_receta}/like`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Quita el like de una receta.
export function quitarLike(token: string, id_receta: number) {
  return request(`/recipes/${id_receta}/like`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Obtiene todas las recetas que el usuario ha marcado con like.
export function getLikedRecipes(token: string) {
  return request('/recipes/liked', {
    headers: { Authorization: `Bearer ${token}` }
  });
}
