// LLAMADA DE TODOS LOS MODULOS
const mayuscula = require('upper-case');// Pimero se debe ingresar: npm install upper-case
const fechaYhora = require('moment');//Pimero se debe ingresar: npm install moment
const color = require('chalk');//Pimero se debe ingresar: npm install chalk

// USO DEL PRIMER MODULO UPPERCASE
let mensaje = "Hola este mensaje se mostrara en mayuscula";
let mensajeMayus = mayuscula.upperCase(mensaje);
console.log(`Mensaje normal: ${mensaje}`);
console.log(`Mensaje en mayúsculas: ${mensajeMayus}`);

// USO DEL SEGUNDO MODULO MOMENT 
console.log(`Fecha y hora actual: ${fechaYhora().format('DD/MM/YYYY HH:mm:ss')}`);

// USO DEL TERCER MODULO CHALK
let mensajeColor = "Hola este texto tendra otro color"
console.log(`Texto a colorear version 1: ${color.green(mensajeColor)}`);
console.log(`Texto a colorear version 2: ${color.blue.bold(mensajeColor)}`);
console.log(`Texto a colorear version 3: ${color.bgRed.white(mensajeColor)}`);

