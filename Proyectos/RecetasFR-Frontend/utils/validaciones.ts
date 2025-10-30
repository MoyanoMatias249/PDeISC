// utils/validaciones.ts

// Caracteres no permitidos en textos
const caracteresProhibidos = /[#$/=*_+\-{}[\]\\<>]/;

// Limpia texto: quita espacios y lo pasa a minúsculas
export function limpiarTexto(texto: string): string {
  return texto.trim().toLowerCase().replace(/\s+/g, ' ');
}

// Valida nombre de ingrediente
export function validarIngrediente(nombre: string): boolean {
  const limpio = limpiarTexto(nombre);
  return /^[a-záéíóúñ\s]+$/i.test(limpio) &&
         !caracteresProhibidos.test(limpio) &&
         limpio.length >= 3;
}

// Valida cantidad (puede ser número o texto corto)
export function validarCantidad(cantidad: string): boolean {
  return cantidad.trim().length >= 1 && !caracteresProhibidos.test(cantidad);
}

// Valida sugerencia o descripción
export function validarTextoLibre(texto: string, minimoPalabras = 5): boolean {
  const limpio = texto.trim();
  const palabras = limpio.split(/\s+/);
  return limpio.length >= 10 &&
         palabras.length >= minimoPalabras &&
         !caracteresProhibidos.test(limpio);
}

// Valida campos de registro
export function validarRegistro(nombre: string, correo: string, contraseña: string): boolean {
  return nombre.trim().length >= 3 &&
         correo.includes('@') &&
         contraseña.length >= 6 &&
         !caracteresProhibidos.test(nombre + correo + contraseña);
}
