# Documentación de la API – RecetasFR Backend

Esta API permite gestionar usuarios, recetas, ingredientes, sugerencias y autenticación mediante JWT y login social. A continuación se detallan los endpoints disponibles.

---

## Autenticación

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/auth/register` | `POST` | Registra un nuevo usuario con rol "Usuario" |
| `/api/auth/login` | `POST` | Inicia sesión con correo y contraseña |
| `/api/auth/social` | `POST` | Login social con Google/Facebook |

**Headers requeridos:**  
`Authorization: Bearer <token>` para rutas protegidas

---

## Usuarios

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/users` | `GET` | Lista todos los usuarios con sus roles |
| `/api/users/:id/role` | `PUT` | Actualiza el rol de un usuario |
| `/api/users/:id` | `DELETE` | Elimina un usuario |

---

## Recetas

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/recipes` | `GET` | Lista todas las recetas aprobadas |
| `/api/recipes` | `POST` | Crea una receta en estado borrador |
| `/api/recipes/:id` | `PUT` | Actualiza una receta existente |
| `/api/recipes/:id` | `DELETE` | Elimina una receta (solo admin) |
| `/api/recipes/:id/like` | `POST` | Da like a una receta |
| `/api/recipes/:id/like` | `DELETE` | Quita el like |
| `/api/recipes/liked` | `GET` | Obtiene recetas con like del usuario |
| `/api/recipes/drafts` | `GET` | Lista recetas en borrador (solo admin) |
| `/api/recipes/:id/approve` | `POST` | Aprueba una receta |
| `/api/recipes/search?query=...` | `GET` | Busca recetas por nombre parcial |
| `/api/recipes/filter` | `POST` | Filtra recetas por ingredientes |
| `/api/recipes/:id` | `GET` | Obtiene receta por ID con ingredientes |
| `/api/recipes/mis` | `GET` | Obtiene recetas creadas por el usuario |

---

## Ingredientes

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/ingredients` | `GET` | Lista todos los ingredientes |
| `/api/ingredients` | `POST` | Crea ingredientes desde array (sin uso) |
| `/api/ingredients/:id` | `PUT` | Actualiza ingrediente (sin uso) |
| `/api/ingredients/:id` | `DELETE` | Elimina ingrediente (sin uso) |

---

## Sugerencias

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/suggestions` | `POST` | Crea una sugerencia |
| `/api/suggestions` | `GET` | Lista sugerencias pendientes |
| `/api/suggestions/mis` | `GET` | Lista sugerencias del usuario |
| `/api/suggestions/:id` | `PUT` | Modifica sugerencia pendiente del usuario |
| `/api/suggestions/:id/approve` | `POST` | Aprueba sugerencia |
| `/api/suggestions/:id/reject` | `POST` | Rechaza sugerencia |
| `/api/suggestions/:id` | `DELETE` | Elimina sugerencia del usuario |

---

## Códigos de respuesta comunes

- `200 OK`: operación exitosa
- `201 Created`: recurso creado
- `400 Bad Request`: datos inválidos
- `401 Unauthorized`: token faltante o inválido
- `403 Forbidden`: rol no autorizado
- `404 Not Found`: recurso no encontrado
- `500 Internal Server Error`: error inesperado

---

**Autenticación:** todas las rutas protegidas requieren token JWT en el header `Authorization`.  
**Roles:** algunas rutas están protegidas por rol (`Usuario`, `Administrador`, etc.).