// Declaracion de variables a utilizar
const formId = document.getElementById("form");
const msgId = document.getElementById("msg");
const textId = document.getElementById("form-text");
const modoId = document.getElementById("modo-de-juego");
const submitId = document.getElementById("form-boton");
const reinicioId = document.getElementById("reiniciar");

let jugador1 = null;
let jugador2 = null;

let JuegoTerminado = false;
let modoDeJuego = 0;
let timeout = null; // ID del setTimeout global

// Arreglo que alamacena los valores
valores = ["Piedra", "Papel", "Tijera"];

textId.textContent = "¡Seleccione cuantos juegaran!";
msgId.textContent = "Esperando eleccion...";

// Si se presiona una tecla
document.addEventListener("keydown", (e) => {
    let tecla = e.key.toLowerCase();
    if (tecla === "a") document.getElementById("jugador1-boton1").onclick(); // j1 - piedra
    if (tecla === "s") document.getElementById("jugador1-boton2").onclick(); // j1 - papel
    if (tecla === "d") document.getElementById("jugador1-boton3").onclick(); // j1 - tijera
    if (tecla === "k") document.getElementById("jugador2-boton1").onclick(); // j2 - piedra
    if (tecla === "l") document.getElementById("jugador2-boton2").onclick(); // j2 - papel
    if (tecla === "ñ") document.getElementById("jugador2-boton3").onclick(); // j2 - tijera
});

// SE OPRIME BOTON DE ENVIAR
formId.addEventListener("submit", function(e) {
    // Se evita que se recarge la pagina
    e.preventDefault();
    // Determina el modo de juego gracias al select
    modoDeJuego = parseInt(modoId.value);

    // Desavilitamos las opciones del formulaio
    submitId.disabled = true;
    submitId.classList.add("form-disabled");
    modoId.classList.add("form-disabled");

    // Si se eligue modo de dos jugadores
    if (modoDeJuego === 2) {

        textId.textContent = "¡Modo dos Jugadores!"
        msgId.textContent = "Jugador 1: A S D | Jugador 2: K L Ñ";
        reinicioId.classList.remove("form-disabled");

        // Le agregamos estilo a los botones de ambos jugadores
        for(let j = 1; j <= 2; j++){
            for(let b = 1; b <= 3; b++){
                document.getElementById(`jugador${j}-boton${b}`).classList.add(`boton-activado-j${j}`);
                document.getElementById(`jugador${j}-boton${b}`).classList.remove("boton-desactivado");
            }
        }
        dosJugadores();
    }
    // Si se eligue modo de un jugador
    if (modoDeJuego === 1){

        textId.textContent = "¡Modo Un Jugador!";
        msgId.textContent = "Jugador 1: A S D";
        reinicioId.classList.remove("form-disabled");
        
        //Le agregamos estilo a los botones del jugador 1
        for(let i = 1; i <= 3; i++){
            document.getElementById(`jugador1-boton${i}`).classList.add("boton-activado-j1");
            document.getElementById(`jugador1-boton${i}`).classList.remove("boton-desactivado");
        }
        unJugador();
    }
})

// Funcion Modo dos jugadores
function dosJugadores(){
    // Jugador 1
    for(let i=1; i<=3; i++){
        let boton = document.getElementById(`jugador1-boton${i}`)
        // Si se oprime algun boton del jugador 1
        boton.onclick = function(){
            if (!jugador1) {
                // Verifica que no se presionado antes algun otro boton, le asigna el valor eleguido al jugador 1, desactiva todos los botones del jugador y comprueba el resultado
                jugador1 = valores[i - 1];
                desactivarBotones("jugador1", "j1");
                comprobarResultado();
            }
        }
    }
    //Jugador 2
    for(let i=1; i<=3; i++){
        let boton = document.getElementById(`jugador2-boton${i}`)
        // Si se oprime algun boton del jugador 2
        boton.onclick = function(){
            if (!jugador2) {
                // Verifica que no se presionado antes algun otro boton, le asigna el valor eleguido al jugador 2, desactiva todos los botones del jugador y comprueba el resultado
                jugador2 = valores[i - 1];
                // Desactivamos botones y comprombamos el resultado
                desactivarBotones("jugador2", "j2");
                comprobarResultado();
            }
        }
    }
}
// Funcion Modo un jugador
function unJugador() {
    // Tanto Jugador 1 como maquina
    for (let i = 1; i <= 3; i++) {
        const boton = document.getElementById(`jugador1-boton${i}`);
        // Si se oprime algun boton del jugador 1
        boton.onclick = function () {
            if (!jugador1) {
                // Verificamos que el jugador 1 no haya eleguido antes. Le asignamos el valor eleguido y hacermos que el jugador 2 almacene el valor de una posicion random del arreglo valores
                jugador1 = valores[i - 1];
                jugador2 = valores[Math.floor(Math.random() * 3)]; // Elección aleatoria de la máquina
                // Desactivamos botones y comprombamos el resultado
                desactivarBotones("jugador1", "j1");
                comprobarResultado();
            }
        };
    }
}
// funcion Desactivar botones tanto en lo visual como en lo logico
function desactivarBotones(jugador, j) {
    // recorremos cada boton, lo DESCTIVAMOS y cambiamos CLASES
    for (let i = 1; i <= 3; i++) {
        let boton = document.getElementById(`${jugador}-boton${i}`);
        boton.disabled = true;
        boton.classList.add("boton-desactivado");
        boton.classList.remove(`boton-activado-${j}`);
    }
}
// funcion Comprobar Resultado
function comprobarResultado(){
    if (jugador1 && jugador2) {
        // Si ambos jugadores ya eliguieron
        msgId.textContent = "Calculando resultado...";
        JuegoTerminado = true;

        // En un tiempo de espera de 1 segundo mostrara al ganador y se marcaran los botones eleguidos
        timeout = setTimeout(() => {
            textId.textContent = determinarGanador(jugador1, jugador2);
            msgId.textContent = `${jugador1} vs ${jugador2}`

            // Mostrar qué botones eligieron
            marcarBotonElegido("jugador1", jugador1);
            marcarBotonElegido("jugador2", jugador2);
        }, 1000); 
    }
}
// funcion Marcar botones elejidos
function marcarBotonElegido(jugador, jugada) {
    let posicion = valores.indexOf(jugada) + 1; // +1 porque los botones van del 1 al 3
    let boton = document.getElementById(`${jugador}-boton${posicion}`);
    boton.classList.remove("boton-desactivado");
}
// funcion determinar si hay un ganador o hay empate
function determinarGanador(j1, j2) {
    if (j1 === j2) return "¡Empate!";
    else if (
        (j1 === "Piedra" && j2 === "Tijera") ||
        (j1 === "Papel" && j2 === "Piedra") ||
        (j1 === "Tijera" && j2 === "Papel")
    ) return "¡Jugador 1 gana!";
    else return "¡Jugador 2 gana!";
}
// funcion reiniciar juego (que todos lo valores se reinicien)
reinicioId.onclick = function(){
    // Cancelar tiempo de espera si estaba corriendo
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    // Reiniciar estado lógico
    jugador1 = null;
    jugador2 = null;
    JuegoTerminado = false;

    // Restaurar textos
    textId.textContent = "¡Seleccione cuantos juegaran!";
    msgId.textContent = "Esperando eleccion...";

    // Restaurar botones
    for (let j = 1; j <= 2; j++) {
        for (let b = 1; b <= 3; b++) {
            const boton = document.getElementById(`jugador${j}-boton${b}`);
            boton.disabled = false;

            // Limpiar todos los estilos aplicados
            boton.classList.remove(`boton-activado-j${j}`);
            boton.classList.add("boton-desactivado"); 

            // Eliminar cualquier evento anterior
            boton.onclick = null;
        }
    }
    // Ocultar botón reinicio
    reinicioId.classList.add("form-disabled");

    // Restaurar formulario
    modoId.classList.remove("form-disabled");
    submitId.disabled = false;
    submitId.classList.remove("form-disabled");
}