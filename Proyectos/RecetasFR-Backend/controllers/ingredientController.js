// controllers/ingredientController.js
import pool from '../config/db.js';

// Obtener todos los ingredientes disponibles para selección
export const listAllIngredients = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM ingredientes ORDER BY nombre`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener ingredientes' });
  }
};

// Subir ingredientes desde un array. (Sin uso)
export const createIngredients = async (req, res) => {
  try {
    const { ingredientes } = req.body;

    if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
      return res.status(400).json({ error: 'No se recibieron ingredientes válidos' });
    }

    for (const ing of ingredientes) {
      if (!ing.nombre || typeof ing.nombre !== 'string') continue;

      await pool.query(
        `INSERT INTO ingredientes (nombre) VALUES ($1)
         ON CONFLICT (nombre) DO NOTHING`,
        [ing.nombre.trim()]
      );
    }

    res.status(201).json({ message: 'Ingredientes subidos correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno al subir ingredientes' });
  }
};

// Modificar el nombre de un ingrediente (sin uso). 
export const updateIngredient = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const result = await pool.query(
      `UPDATE ingredientes SET nombre = $1 WHERE id_ingrediente = $2 RETURNING *`,
      [nombre, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Ingrediente no encontrado' });
    res.json({ message: 'Ingrediente actualizado', ingrediente: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar ingrediente' });
  }
};

// Eliminar un ingrediente por ID (sin uso).
export const deleteIngredient = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM ingredientes WHERE id_ingrediente = $1`, [id]);
    res.json({ message: 'Ingrediente eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar ingrediente' });
  }
};