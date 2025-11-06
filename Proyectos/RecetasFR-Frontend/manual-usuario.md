# Manual de Usuario – RecetasFR Frontend

Este manual explica cómo utilizar la aplicación móvil RecetasFR desde el punto de vista del usuario final.

---

## Inicio de sesión

### Registro
- Ingresar nombre, correo y contraseña
- La contraseña debe tener al menos 6 caracteres
- Al registrarse, se crea una cuenta con rol "Usuario"

### Login tradicional
- Ingresar correo y contraseña
- Si las credenciales son válidas, se accede a la app

### Login social
- Tocar el ícono de Google o Facebook
- Seleccionar cuenta y autorizar
- La app redirige automáticamente y muestra el perfil 

---

## Funcionalidades disponibles

### Crear receta (empleados)
- Desde el botón "Crear receta"
- Completar título, descripción, pasos, tiempo estimado e ingredientes
- Se guarda como borrador

### Editar receta (empleados y administradores)
- Desde el listado de "Mis recetas"
- Tocar una receta y modificar los campos

### Eliminar receta (administradores)
- Solo disponible para administradores
- Desde el detalle de receta

### Buscar recetas
- Usar el buscador por nombre
- Filtrar por ingredientes seleccionados

### Dar like (usuarios comunes)
- Tocar el ícono de corazón en una receta
- Se guarda en "Recetas con like"

### Sugerencias
- Enviar sugerencias desde el menú
- Ver, editar o eliminar las propias sugerencias

---

## Roles

- **Usuario:** puede ver recetas, enviar sugerencias y dar likes
- **Empleado:** puede crear recetas borradores, aprobar/rechazar sugerencias y editar recetas
- **Administrador:** puede aprobar recetas, gestionar usuarios y eliminar recetas

---

## Persistencia de sesión

- La sesión se mantiene activa por 24 horas
- Al cerrar y volver a abrir la app, el usuario sigue conectado

---

## Navegación

- Menú inferior con pestañas: 
- - Usuario: Inicio, Buscar, Crear sugerencias, Perfil
- - Empleado: Inicio, Buscar, Crear recetas, ver sugerencias, Perfil
- - Administrador: Inicio, Buscar, administrar Usuarios, ver borradores, Panel sugerencias, Perfil

- Navegación fluida entre pantallas
- Interfaz adaptada a móviles

---

## Manejo de errores

- Mensajes claros si el login falla
- Validación de campos en formularios

---

## Recomendaciones

- Usar la app en dispositivos Android reales
- Probar login social en APK (no funciona en Expo Go)
- Validar que el correo esté bien escrito y la contraseña tenga mínimo 6 caracteres