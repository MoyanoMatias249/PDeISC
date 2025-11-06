# Guía de Instalación – RecetasFR Frontend

Esta guía explica cómo instalar y ejecutar el frontend de la aplicación RecetasFR, desarrollada en React Native con Expo.

---

##  Requisitos previos

- Node.js (v20 o superior)
- npm o yarn
- Expo CLI → `npm install -g expo-cli`
- EAS CLI → `npm install -g eas-cli`
- Cuenta en Expo (https://expo.dev)
- Editor de código (Visual Studio Code recomendado)

---

## Instalación

1. Clonar el repositorio:

- git clone https://github.com/MoyanoMatias249/PDeISC.git
- cd PDeISC/Proyectos/RecetasFR-Frontend

2. Instalar dependencias:

- npm install

---

## Ejecución en desarrollo

- npx expo start

---

## Compilación de APK
Asegurarse de tener eas.json configurado

Ejecutar:
- eas build --platform android --profile production
- Descargar el APK desde el enlace generado por Expo

---

## Configuración de login social

- Google: configurado con redirectUri nativo → com.recetasfr.app:/oauthredirect
- Facebook: requiere que la app esté activa en Facebook Developers y que el tester esté autorizado

---

## Variables importantes

- app.json: contiene configuración de íconos, splash, intentFilters, etc.
- LoginScreen.tsx: contiene la lógica de login tradicional y social
- AuthContext: gestiona el estado global del usuario
- eas.json: define perfiles de build como production

---

## Notas finales

- La sesión se mantiene con JWT cada 24 horas
- El login social funciona parcialmente en APK real, no en Expo Go
- La app está optimizada para dispositivos móviles Android