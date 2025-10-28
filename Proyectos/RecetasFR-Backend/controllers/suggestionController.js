// controllers/suggestionsController.js
import pool from '../config/db.js';

// Crear una nueva sugerencia desde el usuario autenticado.
export async function createSuggestion(req, res) {
  try {
    const { id_usuario } = req.user;
    const { contenido } = req.body;

    await pool.query(
      `INSERT INTO sugerencias (id_usuario, contenido, fecha_creacion)
      VALUES ($1, $2, NOW())`,
      [id_usuario, contenido]
    );

    res.status(201).json({ message: 'Sugerencia enviada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al enviar sugerencia' });
  }
}

// Listar todas las sugerencias pendientes, incluyendo nombre y rol del autor.
export async function listSuggestions(req, res) {
  try {
    const result = await pool.query(
      `SELECT s.*, u.nombre, r.nombre AS rol
       FROM sugerencias s
       JOIN usuarios u ON s.id_usuario = u.id_usuario
       JOIN roles r ON u.id_rol = r.id_rol
       WHERE s.estado = 'pendiente'
       ORDER BY s.id_sugerencia DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener sugerencias' });
  }
}

// Obtener todas las sugerencias creadas por el usuario autenticado.
export async function getUserSuggestions(req, res) {
  const { id_usuario } = req.user;
  try {
    const result = await pool.query(
      `SELECT * FROM sugerencias WHERE id_usuario = $1 ORDER BY id_sugerencia DESC`,
      [id_usuario]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener sugerencias del usuario:', err);
    res.status(500).json({ error: 'Error al obtener tus sugerencias' });
  }
}

// Modificar el contenido de una sugerencia pendiente creada por el usuario.
export async function updateSuggestion(req, res) {
  const { id } = req.params;
  const { contenido } = req.body;
  const { id_usuario } = req.user;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID de sugerencia inválido' });
  }

  try {
    const result = await pool.query(
      `UPDATE sugerencias SET contenido = $1
       WHERE id_sugerencia = $2 AND id_usuario = $3 AND estado = 'pendiente'
       RETURNING *`,
      [contenido, id, id_usuario]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No se puede modificar esta sugerencia' });
    }

    res.json({ message: 'Sugerencia actualizada', sugerencia: result.rows[0] });
  } catch (err) {
    console.error('Error al actualizar sugerencia:', err);
    res.status(500).json({ error: 'Error al modificar sugerencia' });
  }
}

// Aprobar una sugerencia y cambiar su estado a 'aprobada'.
export async function approveSuggestion(req, res) {
  const { id } = req.params;
  if (isNaN(Number(id))) return res.status(400).json({ error: 'ID inválido' });

  try {
    const result = await pool.query(
      `UPDATE sugerencias SET estado = 'aprobada', fecha_modificacion = NOW()
       WHERE id_sugerencia = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Sugerencia no encontrada' });
    res.json({ message: 'Sugerencia aprobada', sugerencia: result.rows[0] });
  } catch (err) {
    console.error('Error al aprobar sugerencia:', err);
    res.status(500).json({ error: 'Error al aprobar sugerencia' });
  }
}

// Rechazar una sugerencia y cambiar su estado a 'rechazada'.
export async function rejectSuggestion(req, res) {
  const { id } = req.params;
  if (isNaN(Number(id))) return res.status(400).json({ error: 'ID inválido' });

  try {
    const result = await pool.query(
      `UPDATE sugerencias SET estado = 'rechazada', fecha_modificacion = NOW()
       WHERE id_sugerencia = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Sugerencia no encontrada' });
    res.json({ message: 'Sugerencia rechazada', sugerencia: result.rows[0] });
  } catch (err) {
    console.error('Error al rechazar sugerencia:', err);
    res.status(500).json({ error: 'Error al rechazar sugerencia' });
  }
}

// Eliminar una sugerencia creada por el usuario.
export async function deleteSuggestion(req, res) {
  const { id } = req.params;
  const { id_usuario } = req.user;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const result = await pool.query(
      `DELETE FROM sugerencias
       WHERE id_sugerencia = $1 AND id_usuario = $2
       RETURNING *`,
      [id, id_usuario]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No se puede eliminar esta sugerencia' });
    }

    res.json({ message: 'Sugerencia eliminada' });
  } catch (err) {
    console.error('Error al eliminar sugerencia:', err);
    res.status(500).json({ error: 'Error al eliminar sugerencia' });
  }
}