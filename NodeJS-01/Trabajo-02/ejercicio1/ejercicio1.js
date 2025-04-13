// LLAMADA DE TODOS LOS MODULOS
const http = require('http');
const calculo = require('./calculos');
const tiempoActual = require('./tiempo');
const mensaje = require('./mensaje');

//se acorta la linea para cada vez que se quiera pedir el tiempo
const ahora = tiempoActual.tiempo();

//SE CREA EL SERVIDOR
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    // PRIMER MODULO
    res.write("MODULO DE SUMA<br>")
    res.write(`Suma de 10 + 20: ${calculo.suma(10,20)}<br>`);
    res.write(`Resta de 10 - 20: ${ calculo.resta(10,20)}<br>`);
    res.write(`Multiplicacion de 10 * 20: ${calculo.multiplicacion(10,20)}<br><br>`);
    
    // SEGUNDO MODULO
    res.write("MODULO DE TIEMPO<br>")
    res.write(`Fecha completa: ${ahora.getDay()}/${ahora.getHours()}/${ahora.getFullYear()}<br>`)
    res.write(`Hora: ${ahora.getHours()}:${ahora.getMinutes()}<br><br>`);

    // TERCER MODULO
    res.write("MODULO DE MENSAJE<br>")
    res.write(`Mensaje 1: ${mensaje.primerMensaje()}<br>`);
    res.write(`Mensaje 2: ${mensaje.segundoMensaje()}<br>`);
    
    //SE CIERRA EL SERVIDOR
    res.end();  
    // SE LLAMA AL HOST: "http://localhost:8080"
  }).listen(8080);