// LLAMADA AL MODULOS
const url = require('url');
// ENLACE DE EJEMPLO 
const enlace = "https://www.w3schools.com/nodejs?tema=node&nivel=basico" //Esto ultimo es inventado pero es para que tenga parametros
const q = url.parse(enlace, true);

// EJEMPLOS DE COSAS QUE SE PUEDEN HACER CON EL HOST
console.log(`url de la para aprendera a programar en Node.js : ${q.host}${q.pathname}${q.search}`);
console.log(`Parametros: Tema = "${q.query.tema}" y Nivel = "${q.query.nivel}"`);