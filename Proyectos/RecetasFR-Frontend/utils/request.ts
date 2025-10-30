// utils/request.ts

const API_URL = 'https://pdeisc-production.up.railway.app/api'

// Función genérica para hacer peticiones al backend.
// Centraliza errores y simplifica llamadas desde los servicios.
export async function request(endpoint: string, options: RequestInit = {}) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, options);
    const data = await res.json();

    if (!res.ok) {
      const error = data?.error || `Error ${res.status}: ${res.statusText}`;
      throw new Error(error);
    }

    return data;
  } catch (err: any) {
    console.error(`Error en ${endpoint}:`, err.message);
    return { error: err.message };
  }
}