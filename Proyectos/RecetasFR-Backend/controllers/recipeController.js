// controllers/recipeController.js
import pool from '../config/db.js';

function normalizarNombre(nombre) {
  return nombre.trim().toLowerCase().replace(/\s+/g, ' ');
}

async function obtenerOcrearIngrediente(client, nombreOriginal) {
  const nombre = normalizarNombre(nombreOriginal);

  const existente = await client.query(
    `SELECT id_ingrediente FROM ingredientes WHERE LOWER(TRIM(nombre)) = $1`,
    [nombre]
  );

  if (existente.rows.length > 0) {
    return existente.rows[0].id_ingrediente;
  }

  const nuevo = await client.query(
    `INSERT INTO ingredientes (nombre) VALUES ($1)
     RETURNING id_ingrediente`,
    [nombre]
  );

  return nuevo.rows[0].id_ingrediente;
}

// Obtener todas las recetas aprobadas para mostrar en la búsqueda general
export async function listRecipes(req, res) {
  const id_usuario = req.user?.id_usuario || req.user?.id || 0;
  try {
    const result = await pool.query(
      `SELECT r.*, u.nombre AS autor,
      EXISTS (
        SELECT 1 FROM likes l
        WHERE l.id_usuario = $1 AND l.id_receta = r.id_receta
      ) AS liked
      FROM recetas r
      JOIN usuarios u ON r.id_autor = u.id_usuario
      WHERE estado = 'aprobada'`,
      [id_usuario || 0]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener recetas' });
  }
}

// Crear una nueva receta en estado borrador, con ingredientes asociados
export async function createRecipe(req, res) {
  const client = await pool.connect();
  try {
    const { titulo, descripcion, pasos, tiempo_estimate, imagen_url, ingredientes } = req.body;
    const { id_usuario } = req.user;

    // Validaciones básicas
    if (
      !titulo || titulo.trim().length < 5 ||
      !descripcion || descripcion.trim().length < 10 ||
      !pasos || pasos.trim().length < 10 ||
      isNaN(Number(tiempo_estimate)) || Number(tiempo_estimate) <= 0 ||
      !Array.isArray(ingredientes) || ingredientes.length === 0
    ) {
      return res.status(400).json({ error: 'Datos de receta inválidos o incompletos' });
    }

    await client.query('BEGIN');

    const recetaRes = await client.query(
      `INSERT INTO recetas (titulo, descripcion, pasos, tiempo_estimate, imagen_url, estado, id_autor)
       VALUES ($1, $2, $3, $4, $5, 'borrador', $6)
       RETURNING id_receta`,
      [
        titulo.trim(),
        descripcion.trim(),
        pasos.trim(),
        Number(tiempo_estimate),
        imagen_url?.trim() || null,
        id_usuario
      ]
    );

    const id_receta = recetaRes.rows[0].id_receta;
    const nombresProcesados = new Set();

    for (const ing of ingredientes) {
      const nombreLimpio = normalizarNombre(ing.nombre);
      const cantidadLimpia = ing.cantidad?.trim();

      // Validación de ingrediente
      if (
        !nombreLimpio || nombreLimpio.length < 3 ||
        !cantidadLimpia || cantidadLimpia.length < 1 ||
        /[#$/=*_+\-{}[\]\\<>]/.test(nombreLimpio + cantidadLimpia) ||
        nombresProcesados.has(nombreLimpio)
      ) continue;

      nombresProcesados.add(nombreLimpio);

      const id_ingrediente = await obtenerOcrearIngrediente(client, nombreLimpio);

      await client.query(
        `INSERT INTO receta_ingredientes (id_receta, id_ingrediente, cantidad)
         VALUES ($1, $2, $3)`,
        [id_receta, id_ingrediente, cantidadLimpia]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Receta creada en borrador' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error al crear receta:', err);
    res.status(500).json({ error: 'Error al crear receta' });
  } finally {
    client.release();
  }
}

// Actualizar los datos de una receta existente
export async function updateRecipe(req, res) {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID de receta inválido' });
    }

    const { titulo, descripcion, pasos, tiempo_estimate, imagen_url, estado, ingredientes } = req.body;

    await client.query('BEGIN');

    const result = await client.query(
      `UPDATE recetas SET titulo=$1, descripcion=$2, pasos=$3, tiempo_estimate=$4, imagen_url=$5, estado=$6, fecha_modificacion=NOW()
       WHERE id_receta=$7 RETURNING *`,
      [titulo, descripcion, pasos, tiempo_estimate, imagen_url, estado, id]
    );

    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Receta no encontrada' });
    }

    // Eliminar ingredientes actuales
    await client.query(`DELETE FROM receta_ingredientes WHERE id_receta = $1`, [id]);

    const nombresProcesados = new Set();

    for (const ing of ingredientes) {
      const nombreLimpio = normalizarNombre(ing.nombre);
      const cantidadLimpia = ing.cantidad?.trim();

      if (
        !nombreLimpio || nombreLimpio.length < 3 ||
        !cantidadLimpia || cantidadLimpia.length < 1 ||
        /[#$/=*_+\-{}[\]\\<>]/.test(nombreLimpio + cantidadLimpia) ||
        nombresProcesados.has(nombreLimpio)
      ) continue;

      nombresProcesados.add(nombreLimpio);

      const id_ingrediente = await obtenerOcrearIngrediente(client, nombreLimpio);

      await client.query(
        `INSERT INTO receta_ingredientes (id_receta, id_ingrediente, cantidad)
         VALUES ($1, $2, $3)`,
        [id, id_ingrediente, cantidadLimpia]
      );
      await client.query(`
        DELETE FROM ingredientes
        WHERE id_ingrediente NOT IN (
          SELECT DISTINCT id_ingrediente FROM receta_ingredientes
        )
      `);
    }

    await client.query('COMMIT');
    res.json({ message: 'Receta actualizada correctamente' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error al actualizar receta:', err);
    res.status(500).json({ error: 'Error al actualizar receta' });
  } finally {
    client.release();
  }
  
}

// Eliminar una receta por ID (solo administradores)
export async function deleteRecipe(req, res) {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID de receta inválido' });
    }

    await client.query('BEGIN');

    await client.query(`DELETE FROM receta_ingredientes WHERE id_receta = $1`, [id]);
    await client.query(`DELETE FROM likes WHERE id_receta = $1`, [id]);
    await client.query(`DELETE FROM recetas WHERE id_receta = $1`, [id]);

    // Eliminar ingredientes huérfanos
    await client.query(`
      DELETE FROM ingredientes
      WHERE id_ingrediente NOT IN (
        SELECT DISTINCT id_ingrediente FROM receta_ingredientes
      )
    `);

    await client.query('COMMIT');
    res.json({ ok: true });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar receta' });
  } finally {
    client.release();
  }
}

// Registrar un like de un usuario sobre una receta
export const likeRecipe = async (req, res) => {
  const { id_usuario } = req.user;
  const { id } = req.params;

  try {
    const exists = await pool.query(
      `SELECT * FROM likes WHERE id_usuario = $1 AND id_receta = $2`,
      [id_usuario, id]
    );
    if (exists.rows.length > 0) return res.status(400).json({ error: 'Ya votaste esta receta' });

    await pool.query(`INSERT INTO likes (id_usuario, id_receta) VALUES ($1, $2)`, [id_usuario, id]);
    await pool.query(`UPDATE recetas SET likes = likes + 1 WHERE id_receta = $1`, [id]);

    res.json({ message: 'Like registrado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al dar like' });
  }
};

// Obtener recetas que el usuario ha marcado con like
export const getLikedRecipes = async (req, res) => {
  const { id_usuario } = req.user;
  try {
    const result = await pool.query(
      `SELECT r.* FROM recetas r
       JOIN likes l ON r.id_receta = l.id_receta
       WHERE l.id_usuario = $1`,
      [id_usuario]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener recetas con like' });
  }
};

// Eliminar el like de una receta por parte del usuario
export const removeLike = async (req, res) => {
  const { id_usuario } = req.user;
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM likes WHERE id_usuario = $1 AND id_receta = $2`, [id_usuario, id]);
    await pool.query(`UPDATE recetas SET likes = likes - 1 WHERE id_receta = $1 AND likes > 0`, [id]);
    res.json({ message: 'Like eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al quitar like' });
  }
};

// Listar todas las recetas en estado borrador (solo para administradores)
export const listDrafts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, u.nombre AS autor FROM recetas r
       JOIN usuarios u ON r.id_autor = u.id_usuario
       WHERE estado = 'borrador'
       ORDER BY r.fecha_creacion DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener borradores' });
  }
};

// Aprobar una receta y cambiar su estado a 'aprobada'
export const approveRecipe = async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID de receta inválido' });
  }

  try {
    const result = await pool.query(
      `UPDATE recetas SET estado = 'aprobada', fecha_modificacion = NOW()
       WHERE id_receta = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Receta no encontrada' });
    res.json({ message: 'Receta aprobada', receta: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al aprobar receta' });
  }
};

// Buscar recetas por coincidencia parcial en el título
export const searchRecipesByName = async (req, res) => {
  const { query } = req.query;
  try {
    const recetasRes = await pool.query(
      `SELECT r.*, u.nombre AS autor FROM recetas r
       JOIN usuarios u ON r.id_autor = u.id_usuario
       WHERE estado = 'aprobada' AND LOWER(r.titulo) LIKE LOWER($1)`,
      [`%${query}%`]
    );

    const recetas = recetasRes.rows;

    for (const receta of recetas) {
      const ingredientesRes = await pool.query(
        `SELECT i.nombre, ri.cantidad
         FROM receta_ingredientes ri
         JOIN ingredientes i ON ri.id_ingrediente = i.id_ingrediente
         WHERE ri.id_receta = $1`,
        [receta.id_receta]
      );
      receta.ingredientes = ingredientesRes.rows;
    }

    res.json(recetas);
  } catch (err) {
    console.error('Error al buscar recetas:', err);
    res.status(500).json({ error: 'Error al buscar recetas' });
  }
};

// Filtrar recetas que coincidan exactamente con los ingredientes seleccionados
export const filterRecipesByIngredients = async (req, res) => {
  const id_usuario = req.user?.id_usuario || req.user?.id || 0;
  const { ingredientes } = req.body;

  if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
    return res.status(400).json({ error: 'Debes enviar al menos un ingrediente' });
  }

  try {
    const cantidad = ingredientes.length;

    const recetasRes = await pool.query(
      `SELECT r.*, u.nombre AS autor,
      EXISTS (
        SELECT 1 FROM likes l
        WHERE l.id_usuario = $1 AND l.id_receta = r.id_receta
      ) AS liked
      FROM recetas r
      JOIN usuarios u ON r.id_autor = u.id_usuario
      WHERE estado = 'aprobada'
      AND r.id_receta IN (
        SELECT ri.id_receta
        FROM receta_ingredientes ri
        JOIN ingredientes i ON ri.id_ingrediente = i.id_ingrediente
        WHERE i.nombre = ANY($2::text[])
        GROUP BY ri.id_receta
        HAVING COUNT(DISTINCT i.nombre) = $3
      )`,
      [id_usuario || 0, ingredientes, cantidad]
    );

    const recetas = recetasRes.rows;

    for (const receta of recetas) {
      const ingredientesRes = await pool.query(
        `SELECT i.nombre, ri.cantidad
         FROM receta_ingredientes ri
         JOIN ingredientes i ON ri.id_ingrediente = i.id_ingrediente
         WHERE ri.id_receta = $1`,
        [receta.id_receta]
      );
      receta.ingredientes = ingredientesRes.rows;
    }

    res.json(recetas);
  } catch (err) {
    console.error('Error al filtrar recetas:', err);
    res.status(500).json({ error: 'Error al filtrar recetas' });
  }
};

// Obtener receta por ID, incluyendo ingredientes y estado de like
export const getRecetaPorId = async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID de receta inválido' });
  }

  try {
    const recetaRes = await pool.query(
      `SELECT r.*, u.nombre AS autor FROM recetas r
       JOIN usuarios u ON r.id_autor = u.id_usuario
       WHERE r.id_receta = $1`,
      [id]
    );

    if (recetaRes.rows.length === 0) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }

    const ingredientesRes = await pool.query(
      `SELECT i.nombre, ri.cantidad
       FROM receta_ingredientes ri
       JOIN ingredientes i ON ri.id_ingrediente = i.id_ingrediente
       WHERE ri.id_receta = $1`,
      [id]
    );

    const receta = recetaRes.rows[0];
    receta.ingredientes = ingredientesRes.rows;
    
    const { id_usuario } = req.user || {};

    if (id_usuario) {
      const likeRes = await pool.query(
        `SELECT 1 FROM likes WHERE id_usuario = $1 AND id_receta = $2`,
        [id_usuario, id]
      );
      receta.liked = likeRes.rows.length > 0;
    }
    
    res.json(receta);
  } catch (err) {
    console.error('Error al obtener receta:', err);
    res.status(500).json({ error: 'Error al obtener receta' });
  }
};

// Obtener todas las recetas creadas por el usuario autenticado
export const getRecetasDelUsuario = async (req, res) => {
  const id_usuario = req.user?.id_usuario || req.user?.id;
  const rol = req.user?.rol;

  console.log(`[GET /recipes/mis] Acceso desde usuario ${id_usuario} con rol ${rol}`);

  if (!id_usuario) {
    console.warn('[GET /recipes/mis] Usuario no autenticado');
    return res.status(400).json({ error: 'Usuario no autenticado' });
  }

  try {
    const result = await pool.query(
      `SELECT r.*, u.nombre AS autor FROM recetas r
       JOIN usuarios u ON r.id_autor = u.id_usuario
       WHERE r.id_autor = $1
       ORDER BY r.fecha_creacion DESC`,
      [id_usuario]
    );

    console.log(`[GET /recipes/mis] Recetas encontradas: ${result.rows.length}`);

    const recetas = result.rows;

    for (const receta of recetas) {
      const ingredientesRes = await pool.query(
        `SELECT i.nombre, ri.cantidad
         FROM receta_ingredientes ri
         JOIN ingredientes i ON ri.id_ingrediente = i.id_ingrediente
         WHERE ri.id_receta = $1`,
        [receta.id_receta]
      );
      receta.ingredientes = ingredientesRes.rows;
    }

    res.json(recetas);
  } catch (err) {
    console.error('[GET /recipes/mis] Error inesperado:', err);
    res.status(500).json({ error: 'Error al obtener tus recetas' });
  }
};




