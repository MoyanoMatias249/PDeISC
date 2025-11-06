# Manual de Usuario – RecetasFR Backend

Este manual explica cómo utilizar las funcionalidades del backend de RecetasFR desde el frontend o herramientas como Postman. Está orientado a usuarios finales y testers.

---

## Autenticación

### Registro
- Endpoint: `POST /api/auth/register`
- Datos requeridos: `nombre`, `correo`, `contraseña`
- Resultado: Usuario creado con rol "Usuario"

### Login
- Endpoint: `POST /api/auth/login`
- Datos requeridos: `correo`, `contraseña`
- Resultado: Token JWT + datos del usuario

### Login social
- Endpoint: `POST /api/auth/social`
- Datos requeridos: `nombre`, `correo`, `token`, `proveedor`
- Resultado: Token JWT + datos del usuario

---

## Gestión de usuarios

### Ver usuarios (admin)
- Endpoint: `GET /api/users`
- Requiere token con rol "Administrador"

### Cambiar rol
- Endpoint: `PUT /api/users/:id/role`
- Datos: `nuevo_rol` (ej: `"Administrador"`)

### Eliminar usuario
- Endpoint: `DELETE /api/users/:id`

---

## Recetas

### Crear receta
- Endpoint: `POST /api/recipes`
- Datos: `titulo`, `descripcion`, `pasos`, `tiempo_estimate`, `imagen_url`, `ingredientes[]`
- Resultado: Receta en estado "borrador"

### Ver recetas aprobadas
- Endpoint: `GET /api/recipes`

### Ver mis recetas
- Endpoint: `GET /api/recipes/mis`

### Editar receta
- Endpoint: `PUT /api/recipes/:id`

### Eliminar receta
- Endpoint: `DELETE /api/recipes/:id` (solo admin)

### Buscar por nombre
- Endpoint: `GET /api/recipes/search?query=arroz`

### Filtrar por ingredientes
- Endpoint: `POST /api/recipes/filter`
- Datos: `ingredientes[]`

---

## Likes

### Dar like
- Endpoint: `POST /api/recipes/:id/like`

### Quitar like
- Endpoint: `DELETE /api/recipes/:id/like`

### Ver recetas con like
- Endpoint: `GET /api/recipes/liked`

---

## Sugerencias

### Crear sugerencia
- Endpoint: `POST /api/suggestions`
- Datos: `contenido`

### Ver mis sugerencias
- Endpoint: `GET /api/suggestions/mis`

### Editar sugerencia
- Endpoint: `PUT /api/suggestions/:id`

### Eliminar sugerencia
- Endpoint: `DELETE /api/suggestions/:id`

### Ver sugerencias pendientes
- Endpoint: `GET /api/suggestions`

### Aprobar / Rechazar sugerencia
- Endpoint: `POST /api/suggestions/:id/approve`  
- Endpoint: `POST /api/suggestions/:id/reject`

---

## Recomendaciones

- Usar Postman para probar cada endpoint
- Incluir el token JWT en el header:  
  `Authorization: Bearer <token>`
- Validar roles antes de acceder a rutas protegidas
