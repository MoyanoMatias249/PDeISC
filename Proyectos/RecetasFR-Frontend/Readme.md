# RecetasFR – Frontend

Aplicación móvil desarrollada en **React Native con Expo**, que permite a los usuarios registrarse, iniciar sesión (incluyendo login social con Google y Facebook), crear recetas, dar likes, enviar sugerencias y navegar según su rol. Este frontend se conecta con un backend en Node.js y PostgreSQL, cumpliendo con los requisitos funcionales y técnicos del proyecto final.

---

## Funcionalidades principales

- Registro e inicio de sesión con correo y contraseña
- Autenticación social con Google y Facebook
- Persistencia de sesión con JWT
- Filtro de recetas por ingredientes
- Búsqueda por nombre de receta
- Creación, edición y eliminación de recetas
- Likes en recetas y visualización personalizada
- Envío y gestión de sugerencias
- Navegación adaptada al rol del usuario (Usuario, Empleado, Administrador)
- Interfaz responsiva y amigable para móviles

---

## Tecnologías utilizadas

- **React Native + Expo**
- `expo-auth-session` para login social
- `react-navigation` para navegación entre pantallas
- `Context API` para estado global y autenticación
- `EAS Build` para generación de APK
- `expo-web-browser` para manejar redirecciones OAuth

---

##  Estructura del proyecto

RecetasFR-Frontend/ 
    ├── assets/ # Imágenes, íconos
    ├── components/ # Componentes reutilizables 
    ├── context/ # Contexto global de autenticación 
    ├── screens/ # Pantallas principales (Login, Register, Home, etc.) 
    ├── services/ # Funciones para consumir la API 
    ├── styles/ # Paleta de colores y estilos globales 
    ├── app.json # Configuración de Expo y Android 
    ├── eas.json # Perfiles de build para EAS 
    ├── package.json # Dependencias del proyecto

---

##  Login social

- **Google:** configurado con `redirectUri` nativo → `com.recetasfr.app:/oauthredirect`
- **Facebook:** requiere que la app esté activa en Facebook Developers y que el tester esté autorizado

> El login social fue creado para funcionar en APK real, por problemas de plataformas no funcionan del todo bien.

---

##  APK descargable

 [Descargar APK](https://expo.dev/artifacts/eas/6DyrsxPqrq6kyEjgkpzFfc.apk)

---

##  Documentación incluida

- [Manual de Usuario – Frontend](manual-usuario.md)
- [Guía de Instalación – Frontend](setup-frontend.md)

---

## Recomendaciones

- Probar la app en dispositivos Android reales
- Validar login social en APK, no en Expo Go
- Usar cuentas de prueba para roles distintos
- Mantener `.expo/` y `/android` fuera del control de versiones (`.gitignore`)

---

## Autor

**Matias Moyano - 2025 - 7mo 4ta - EESTN5**  