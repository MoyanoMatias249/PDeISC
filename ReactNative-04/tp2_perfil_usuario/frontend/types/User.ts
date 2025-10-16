export type User = {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
  fotoUrl?: string | null;
  documentScanUrl?: string | null;
};