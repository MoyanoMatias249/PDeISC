// middleware/auth.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1];

  if (!token) {
    console.warn('[AUTH] Token no proporcionado');
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id_usuario, rol }

    console.log('[AUTH] Token verificado. Usuario:', req.user);
    next();
  } catch (err) {
    console.error('[AUTH] Token inválido:', err.message);
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};


export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    if (!allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({ error: `Acceso denegado para rol ${req.user.rol}` });
    }
    next();
  };
};
