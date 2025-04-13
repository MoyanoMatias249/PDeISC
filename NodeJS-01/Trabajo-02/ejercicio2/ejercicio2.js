// LLAMADA DE TODOS LOS MODULOS
const http = require('http');
var fs = require('fs');

//SE CREA EL SERVIDOR
http.createServer(function (req, res) {
    //SE ESPESIFICA QUE SE USARA EL ARCHIVO "index.html"
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        //MOSTRAR TEXTO
        res.write("Mostrando texto en un html");
        //MOSTRAR CONTENIDO DEL HTML
        res.write(data);
        //SE CIERRA EL SERVIDOR
        return res.end();
      });
    // SE LLAMA AL HOST: "http://localhost:8080"
  }).listen(8080);