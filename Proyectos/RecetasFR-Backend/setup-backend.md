# Guía de Instalación – RecetasFR Backend

Esta guía explica cómo instalar y ejecutar el backend de la aplicación RecetasFR, desarrollado en Node.js con Express y PostgreSQL.

---

##  Requisitos previos

- Node.js (v20 o superior)
- npm
- PostgreSQL instalado y corriendo localmente o en la nube
- Editor de código (Visual Studio Code recomendado)

---

##  Instalación

1. Clonar el repositorio:

- git clone https://github.com/MoyanoMatias249/PDeISC.git
- cd PDeISC/Proyectos/RecetasFR-Backend

2. Instalar dependencias:

- npm install
- Crear archivo .env en la raíz del proyecto con el siguiente contenido:

| Nombre de variable | clave privada | 
|--------------------|---------------|
| DATABASE_UR`       | `postgres://usuario:contraseña@localhost:5432/recetasfr` |
| JWT_SECRET         | `tu_clave_secreta` |
| BCRYPT_SALT_ROUNDS | `10` |

Reemplazar usuario, contraseña y recetasfr por los valores reales de tu base de datos.

##  Base de datos
Crear la base de datos PostgreSQL:

`CREATE DATABASE recetasfr;`

Crear las tablas necesarias. Podés usar un script SQL o migraciones. Las tablas mínimas incluyen:

- usuarios
- roles
- recetas
- ingredientes
- receta_ingredientes
- likes
- sugerencias

Asegurate de tener roles como "Usuario" y "Administrador" en la tabla roles.

## Ejecución del servidor

- node server
Esto inicia el servidor en modo desarrollo. Por defecto corre en http://localhost:4000.

## Seguridad y autenticación

- Login tradicional con correo y contraseña
- Login social con Google y Facebook
- Tokens JWT para proteger rutas
- Middleware authenticate y authorizeRoles para validar acceso

# Endpoints principales
- `/api/auth/register` → registro de usuario
- `/api/auth/login` → login tradicional
- `/api/auth/social` → login social
- `/api/recipes` → CRUD de recetas
- `/api/suggestions` → gestión de sugerencias
- `/api/users` → gestión de usuarios y roles

Ver api-doc.md para documentación completa de la API.

## Notas finales
- El backend está preparado para despliegue en servicios como Render, Railway o Heroku
- Se recomienda usar pgAdmin o DBeaver para gestionar la base de datos
- El código está modularizado en controladores, rutas y middleware