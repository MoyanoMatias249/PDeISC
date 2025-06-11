// Declaracion de variables a utilizar
const formId = document.getElementById("form");
const msgId = document.getElementById("msg");
const textId = document.getElementById("form-text");
const modoId = document.getElementById("modo-de-juego");
const submitId = document.getElementById("form-boton");

let jugador1 = "close";
let jugador2 = "radio_button_unchecked";
let jugadorActual = jugador1;

let JuegoTerminado = false;
let esperarTurno = false;
let modoDeJuego = 0;

// Arreglo que alamacena las partidas
let casillas = [1, 2, 3, 4, 5, 6, 7, 8, 9];

textId.textContent = "¡Seleccione cuantos jugaran!"
msgId.textContent = "Esperando eleccion..."

// SE OPRIME BOTON DE ENVIAR
formId.addEventListener("submit", function(e) {
    // Se evita que se recarge la pagina
    e.preventDefault(); 
    // Obtiene el modo de juego por el select
    modoDeJuego = parseInt(modoId.value);

    // Desavilitamos las opciones del formulaio
    submitId.disabled = true;
    submitId.classList.add("form-disabled");
    modoId.classList.add("form-disabled");

    msgId.textContent = "Turno Jugador: X";

    // Si se eligue modo de dos jugadores
    if (modoDeJuego === 2) {
        textId.textContent = "¡Modo dos Jugadores!"

        if (!JuegoTerminado) dosJugadores();
        
    }  
    // Si se eligue modo de un jugador
    if (modoDeJuego === 1){
        textId.textContent = "¡Modo Un Jugador!";
        
        if (!JuegoTerminado) turnoJugador();
    }
});
// Funcion modo dos Jugadores 
function dosJugadores(){
    // Recorre todas las casillas
    for(let i=1; i<=9; i++){
        // Declaramos variable a cada casilla, le añadimos clases y 
        let boton = document.getElementById("b"+ i);
        boton.classList.add("boton-rojo", "boton-verde");

        // Verificamos si se presiono alguna casilla
        boton.onclick = function() {
            // Verifica que el juego no este terminado y que esa casilla no tenga el valor de algun jugador
            if(JuegoTerminado || casillas[i-1] == jugador1 ||  casillas[i-1] == jugador2) return

            // le da el valor del jugador a la casilla, lo muestra y le saca la clase boton-verde
            casillas[i-1] = jugadorActual;
            document.getElementById("b"+ i).innerText = casillas[i-1]; // Mostrar
            document.getElementById("b"+ i).classList.remove("boton-verde");
            
            // Verificamos el estado del juego
            if(verificarEstadoDelJuego()) return;

            // Cambia de jugador
            if(jugadorActual == jugador1){
                jugadorActual = jugador2;
                msgId.textContent = `Turno Jugador: O`;

            } else {
                jugadorActual = jugador1;
                msgId.textContent = `Turno Jugador: X`;
            } 
            console.log(casillas); 
        }
    }
}
// Funcion modo un jugador: Turno del jugador
function turnoJugador() {
    // Solamente se ejecuta si el jugador actual es el jugador 1
    if (jugadorActual != jugador1) return
    for (let i = 1; i <= 9; i++) {
         // Declaramos variable a cada casilla y le añadimos clases
        let boton = document.getElementById("b"+ i);
        boton.classList.add("boton-rojo", "boton-verde");
        
        // Verificamos si la casilla se presiona
        boton.onclick = function() {
            if (esperarTurno) return; // Si no es el turno del jugador sale

            // Verifica que el juego no este terminado y que esa casilla no tenga el valor de algun jugador
            if (JuegoTerminado || casillas[i - 1] == jugador1 || casillas[i - 1] == jugador2) return;

            // le da el valor del jugador a la casilla, lo muestra visualmente y le saca la clase
            casillas[i - 1] = jugadorActual;
            document.getElementById("b" + i).innerText = jugadorActual; // Mostrar
            document.getElementById("b" + i).classList.remove("boton-verde");

            // Verifica como esta el estado del juego. Si el juego no fue terminado, sigue el turno de la maquina
            if (!verificarEstadoDelJuego()) {
                jugadorActual = jugador2;
                esperarTurno = true;
                msgId.textContent = "Turno Jugador: O";
                setTimeout(turnoMaquina, 500); // Ejecuta la funcion en 500 milisegundos
            }
        };
    }
}
// Funcion modo un jugador: Turno de la maquina
function turnoMaquina() {
    // Creamos un arraglo vacio para almacena posiciones
    let posicionesDisponibles = [];

    // Verificamos las posiciones no esten en uso y las agregamos al arreglo creado
    for (let i = 0; i < casillas.length; i++) {
        if (casillas[i] != jugador1 && casillas[i] != jugador2) {
            posicionesDisponibles.push(i);
        }
    }
    console.log(posicionesDisponibles);
    // Si hay alguna posicion disponible
    if (posicionesDisponibles.length > 0) {
        // Creamos una variable que almacene un numero random entre 0 y el tamaño del arreglo
        let aleatoria = Math.floor(Math.random() * posicionesDisponibles.length);
        
        // Creamos otra variable que tenga ese numero de posicion aleatoria del arreglo
        let posicionElegida = posicionesDisponibles[aleatoria];

        // Le damos el valor del jugador2 a esa posicion aleatoria y le sacamos clase.
        casillas[posicionElegida] = jugador2;
        document.getElementById("b" + (posicionElegida + 1)).innerText = jugador2; // Mostrar
        document.getElementById("b" + (posicionElegida + 1)).classList.remove("boton-verde");

        // Verifica que el juego no este terminado.
        if (!verificarEstadoDelJuego()) {
            jugadorActual = jugador1;
            esperarTurno = false;
            msgId.textContent = "Turno Jugador: X";
        }
    }
}
// Funcion verifica si algun jugador gano o si hay empate
function verificarEstadoDelJuego() {
    // Si algun jugador gano, imprime mensaje y le cambia estilo al boton reiniciar
    if (ChequearJugada()) {
        if (jugadorActual === jugador1) {
            textId.textContent = `¡Gano Jugador: X!`;
        } else {
            textId.textContent = `¡Gano Jugador: O!`;
        }
        msgId.textContent = `Gracias Por Jugar`;
        // Cambiar estilo al boton reinciar
        document.getElementById("reiniciar").classList.add("boton-terminar")
        return true;
    }
    // Si hubo un empate, imprime mensaje y le cambia estilo al boton reiniciar
    else if (esEmpate()) {
        textId.textContent = `¡Empate!`;
        msgId.textContent = `Gracias Por Jugar`;
        
        document.getElementById("reiniciar").classList.add("boton-terminar")
        return true;
        
    } 
    else return false;
}
// Funcion Verificar si algun jugador gano
function ChequearJugada() {
    // Creamos 3 variables para determinar las casillas ganadoras.
    let c1, c2, c3;
    // Creamos multiples condicionales donde verificamos si tres posicion tienen el mismo valor y cumplen con los requisitos para ganar
    // Horizontal
    if (casillas[0] == casillas[1] && casillas[1] == casillas[2]) {
        c1 = 1, c2 = 2, c3 = 3;
        JuegoTerminado = true;
    } else if (casillas[3] == casillas[4] && casillas[4] == casillas[5]) {
        c1 = 4, c2 = 5, c3 = 6;
        JuegoTerminado = true;
    } else if (casillas[6] == casillas[7] && casillas[7] == casillas[8]) {
        c1 = 7, c2 = 8, c3 = 9;
        JuegoTerminado = true;
    } 
    // Vertical
    else if (casillas[0] == casillas[3] && casillas[3] == casillas[6]) {
        c1 = 1, c2 = 4, c3 = 7;
        JuegoTerminado = true;
    } else if (casillas[1] == casillas[4] && casillas[4] == casillas[7]) {
        c1 = 2, c2 = 5, c3 = 8;
        JuegoTerminado = true;
    } else if (casillas[2] == casillas[5] && casillas[5] == casillas[8]) {
        c1 = 3, c2 = 6, c3 = 9;
        JuegoTerminado = true;
    } 
    // Cruzado
    else if (casillas[0] == casillas[4] && casillas[4] == casillas[8]) {
        c1 = 1, c2 = 5, c3 = 9;
        JuegoTerminado = true;
    } else if (casillas[2] == casillas[4] && casillas[4] == casillas[6]) {
        c1 = 3, c2 = 5, c3 = 7;
        JuegoTerminado = true;
    }

    if(JuegoTerminado){
        // las casillas ganadoras cambiaran de estilo
        document.getElementById('b' + c1).classList.add("boton-azul");
        document.getElementById('b' + c2).classList.add("boton-azul");
        document.getElementById('b' + c3).classList.add("boton-azul");
        // Le sacamos las demas clases a todas las casillas
        for(let i=1; i<=9; i++){
            document.getElementById("b"+ i).classList.remove("boton-rojo", "boton-verde")
        }
    }
    return JuegoTerminado;
}

function esEmpate() {
    // Verifica si todas las posiciones son "strings"
    let empate = casillas.every(c => typeof c === "string");
    
    // Si todas las posiciones son "strings"
    if(empate) {
        // El juego termina y le saca los estilos a los botones
        JuegoTerminado = true;
        for(let i=1; i<=9; i++){
            document.getElementById("b"+ i).classList.remove("boton-rojo", "boton-verde");
        }
    } 
    else JuegoTerminado = false;

    return JuegoTerminado;
}

function reiniciar() {
    // Reiniciar variables
    casillas = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    JuegoTerminado = false;
    esperarTurno = false;
    jugadorActual = jugador1;                        

    // Mensaje inicial
    textId.textContent = "¡Seleccione cuantos jugaran!";
    msgId.textContent = "Esperando eleccion...";

    // Sacamos todo el contenido de las casillas
    for (let i = 1; i <= 9; i++) {
        let casilla = document.getElementById("b" + i);
        casilla.innerText = "";
        casilla.classList.remove("boton-azul", "boton-rojo", "boton-verde");

        // Eliminar cualquier evento anterior
        casilla.onclick = null;
    }
    // Restaurar formulario
    document.getElementById("reiniciar").classList.remove("boton-terminar")
    submitId.disabled = false;
    submitId.classList.remove("form-disabled");
    modoId.classList.remove("form-disabled");
}