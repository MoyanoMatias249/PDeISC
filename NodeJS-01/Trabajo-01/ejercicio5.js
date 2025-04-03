var http = require('http');

//INICIAMOS SERVIDOR
http.createServer(function (req, res) {
    //TIPO DE SERVIDOR
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EJERCICIO 5</title>
        <style>
            h1{
                text-align: center;
            }
            table{
                padding: 20px;
                width: 80vh;
            }

            th{
                background-color: #aaaaff;
                border-bottom: 1px solid black;
                border-right: 1px solid black;
                padding: 10px;
            }
            td{
                border-bottom: 1px solid black;
                padding: 10px
            }
        </style>
    </head>
    <body>
        <h1>Ejercicio trabajo en clase</h1>
        <center>
            <table>
                <tr>
                    <th>Ejercicio 1</th>
                    <td>
                        <script>
                            document.write("Hola mundo desde Node.js <br>")
                            document.write("Fin")
                        </script>
                    </td>
                </tr>
                <tr>
                    <th>Ejercicio 2</th>
                    <td>
                        <script>
                            //CREAR VARIABLES
                            var suma = 4+5;
                            var resta = 3-6;
                            var multiplicacion = 2*7;
                            var division = 20/4;

                            //MOSTRAR RESULTADOS DE VARIABLES
                            document.write("Suma: " + suma)
                            document.write("<br>Resta: " + resta)
                            document.write("<br>Multiplicacion: " + multiplicacion)
                            document.write("<br>division: "+ division)
                        </script>
                    </td>
                </tr>
                <tr>
                    <th>Ejercicio 3</th>
                    <td>
                        <script>
                            function Calculadora(){
                                var suma = 4+5;
                                var resta = 3-6;
                                var multiplicacion = 2*7;
                                var division = 20/4;

                                document.write("Suma: " + suma);
                                document.write("<br>Resta: " + resta);
                                document.write("<br>Multiplicacion: " + multiplicacion);
                                document.write("<br>division: "+ division);
                            }

                            Calculadora();
                        </script>
                    </td>
                </tr>
                <tr>
                    <th>Ejercicio 4</th>
                    <td>
                        <script>
                            function Suma(n1, n2){
                                return n1 + n2;
                            }

                            function Restar(n1, n2){
                                return n1 - n2;
                            }

                            function Multiplicar(n1, n2){
                                return n1 * n2;
                            }

                            function Division(n1, n2){
                                return n1 / n2;
                            }

                            document.write("Suma: " + Suma(5,3));
                            document.write("<br>Resta: " + Restar(8,6));
                            document.write("<br>Multiplicacion: " + Multiplicar(3,11));
                            document.write("<br>Division: " + Division(30,5));
                        </script>
                    </td>
                </tr>
            </table>
        </center>
    </body>
    </html>
  `);
}).listen(8080);
//CERRAMOS SERVIDOR 
//EL SERVIDOR SE MUESTRA DESDE "http://localhost:8080"