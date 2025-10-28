*Documentación de la API*

**Autenticación (/api/auth)**

***POST /api/auth/register***
Registra un nuevo usuario con rol "Usuario" por defecto.

- Body:
{
  "nombre": "string",
  "correo": "string",
  "contraseña": "string"
}

Respuestas:
- 201 Created: Usuario registrado
- 500 Internal Server Error: Error al registrar

**POST /api/auth/login**
Inicia sesión y devuelve un token JWT.

- Body:
{
  "correo": "string",
  "contraseña": "string"
}

Respuestas:
- 200 OK: Token y datos del usuario
- 400 Bad Request: Credenciales inválidas
- 500 Internal Server Error: Error al iniciar sesión

**Usuarios (/api/users). Requiere token y rol Administrador.***

***GET /api/users***
Obtiene todos los usuarios del sistema.

Respuestas:
- 200 OK: Lista de usuarios
- 500 Internal Server Error: Error al obtener usuarios

***PUT /api/users/:id/rol***
Actualiza el rol de un usuario.

Body:

json
{
  "nuevo_rol": "Administrador" | "Empleado" | "Usuario"
}
Respuestas:

200 OK: Rol actualizado

400 Bad Request: Rol inválido

404 Not Found: Usuario no encontrado

***DELETE /api/users/:id***
Elimina un usuario por ID.

Respuestas:

200 OK: Usuario eliminado

500 Internal Server Error: Error al eliminar

**Recetas (/api/recipes). Requiere token. Roles varían por acción.**

***GET /api/recipes***
Obtiene todas las recetas aprobadas.

Roles permitidos: Usuario, Empleado, Administrador

Respuestas:

200 OK: Lista de recetas

***GET /api/recipes/:id***
Obtiene una receta por ID con ingredientes.

Respuestas:

200 OK: Receta con ingredientes

404 Not Found: Receta no encontrada

***POST /api/recipes***
Crea una receta en estado "borrador".

Roles permitidos: Empleado, Administrador

Body:

json
{
  "titulo": "string",
  "descripcion": "string",
  "pasos": "string",
  "tiempo_estimate": number,
  "imagen_url": "string",
  "ingredientes": [{ "nombre": "string", "cantidad": "string" }]
}
Respuestas:

201 Created: Receta creada

400 Bad Request: Datos inválidos

***PUT /api/recipes/:id***
Actualiza una receta existente.

Roles permitidos: Empleado, Administrador

Body: Igual al POST

Respuestas:

200 OK: Receta actualizada

404 Not Found: Receta no encontrada

***DELETE /api/recipes/:id***
Elimina una receta por ID.

Roles permitidos: Administrador

Respuestas:

200 OK: Receta eliminada

***PUT /api/recipes/:id/aprobar***
Aprueba una receta.

Roles permitidos: Administrador

Respuestas:

200 OK: Receta aprobada

404 Not Found: Receta no encontrada

***GET /api/recipes/mis***
Obtiene recetas creadas por el usuario autenticado.

Roles permitidos: Usuario, Empleado, Administrador

Respuestas:

200 OK: Lista de recetas propias

***GET /api/recipes/drafts***
Obtiene recetas en estado "borrador".

Roles permitidos: Administrador

Respuestas:

200 OK: Lista de borradores

***GET /api/recipes/search?query=...***
Busca recetas por título.

Respuestas:

200 OK: Recetas coincidentes

***POST /api/recipes/filter***
Filtra recetas por ingredientes exactos.

Body:

json
{
  "ingredientes": ["string", "string"]
}
Respuestas:

200 OK: Recetas filtradas

400 Bad Request: Ingredientes faltantes

***POST /api/recipes/:id/like***
Marca una receta con "like".

Roles permitidos: Usuario

Respuestas:

200 OK: Like registrado

400 Bad Request: Ya votaste

***DELETE /api/recipes/:id/like***
Quita el "like" de una receta.

Roles permitidos: Usuario

Respuestas:

200 OK: Like eliminado

***GET /api/recipes/liked***
Obtiene recetas que el usuario marcó con "like".

Roles permitidos: Usuario

Respuestas:

200 OK: Lista de recetas con like

**Sugerencias (/api/suggestions)**

***POST /api/suggestions***
Crea una nueva sugerencia.

Roles permitidos: Usuario, Administrador

Body:

json
{
  "contenido": "string"
}
Respuestas:

201 Created: Sugerencia enviada

***GET /api/suggestions***
Obtiene sugerencias pendientes.

Roles permitidos: Empleado, Administrador

Respuestas:

200 OK: Lista de sugerencias

***GET /api/suggestions/mis***
Obtiene sugerencias propias.

Roles permitidos: Usuario, Administrador

Respuestas:

200 OK: Lista de sugerencias del usuario

***PUT /api/suggestions/:id***
Modifica una sugerencia pendiente propia.

Roles permitidos: Usuario

Body:

json
{
  "contenido": "string"
}
Respuestas:

200 OK: Sugerencia actualizada

404 Not Found: No se puede modificar

***PUT /api/suggestions/:id/aprobar***
Aprueba una sugerencia.

Roles permitidos: Empleado, Administrador

Respuestas:

200 OK: Sugerencia aprobada

***PUT /api/suggestions/:id/rechazar***
Rechaza una sugerencia.

Roles permitidos: Empleado, Administrador

Respuestas:

200 OK: Sugerencia rechazada

***DELETE /api/suggestions/:id***
Elimina una sugerencia propia.

Roles permitidos: Usuario, Administrador

Respuestas:

200 OK: Sugerencia eliminada

404 Not Found: No se puede eliminar

**Ingredientes (/api/ingredients)**

***GET /api/ingredients***
Obtiene todos los ingredientes disponibles.

Roles permitidos: Usuario, Empleado, Administrador

Respuestas:

200 OK: Lista de ingredientes

**Seguridad**
Todos los endpoints (excepto /auth) requieren:

Authorization: Bearer <token>
