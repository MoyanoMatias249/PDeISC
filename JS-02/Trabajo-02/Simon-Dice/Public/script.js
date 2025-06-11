// Variables a utilizar
const formId = document.getElementById("form");
const msgId = document.getElementById("msg");
const textId = document.getElementById("form-text");
const submitId = document.getElementById("form-boton");
const reinicioId = document.getElementById("reiniciar");

// Botoned es un arreglo que guarda los cuatro botones
const botones = document.querySelectorAll(".boton");
const colores = ["verde", "rojo", "amarillo", "azul"]; 

let secuencia = []; // Guarda la secuencia de colores de la maquina
let respuesta = []; // Guarda las imitaciones del jugador 

let JuegoTerminado = false;
let esperaTurno = true;

textId.textContent = "Empezar Juego";
msgId.textContent = "Esperando solicitud...";

formId.addEventListener("submit", e => {
    // Se evita que se recarge la pagina
    e.preventDefault();

    // Desavilitamos las opciones del formulaio
    submitId.disabled = true;
    submitId.classList.add("form-disabled");
    reinicioId.classList.remove("form-disabled");

    // Reiniciamos la secuencia de eleccion de la maquina
    secuencia = [];
    // empieza el juego
    empezarTurno();
});

// Funcion Empezar turno: Agregar color a la secuencia y enviar a mostrar secuencia
function empezarTurno() {
    // Verifica que el juego no haya terminado
    if (JuegoTerminado) return;

    // Vaciamos respuesta, ya que el jugador siempre tiene que ingresar todas las secuencias desde el inicio
    respuesta = [];

    // Creamos una variable que va a tener el valor random de uno de los colores y lo agregamos a la secuencia
    const nuevoColor = colores[Math.floor(Math.random() * 4)]; // posicion random de colores

    secuencia.push(nuevoColor);
    textId.textContent = `Nivel ${secuencia.length}`;

    // Mostramos visualmente la secuencia
    MostrarSecuencia();
}
// Funcion mostrar visualmete toda la secuencia
function MostrarSecuencia() {
    // Creamos variable de posicion
    let i = 0;
    msgId.textContent = "Espere...";
    esperaTurno = true; 
    // Le removemos la clase boton-eleguir a todos los botones
    botones.forEach(b => {
        b.classList.remove("boton-eleguir")
        b.onclick = null; // evitar múltiples clics mientras reproduce
    });

    // Creamos un intervalo que se repetira la cantidad de veses necesarias hasta que ya se hayan mostrado todas las elecciones de la maquina
    const interval = setInterval(() => {
        // color almacena el valor (color) de la posicion de secuencia
        const color = secuencia[i]; 
        // indice almacena la posicion del color dentro del arreglo colores
        const indice = colores.indexOf(color); 
        // boton va a ser igual al elemento .boton con el color del indice seleccionad
        const boton = botones[indice]; 

        boton.classList.remove(`boton-${indice + 1}`);
        // Al elemento boton se le agrega su respectiva clase durante 0.7 segundos
        boton.classList.add(`boton-${indice + 1}`);
        void boton.offsetWidth;
        setTimeout(() => boton.classList.remove(`boton-${indice + 1}`), 700);
        // Se aumenta el valor de i para analizar la siguiente posicion
        i++;

        // Si no hay una siguiente posicion
        if (i >= secuencia.length) {
            // Se rompe el intervalo
            clearInterval(interval);
            // se activa la funcion respectiva para que juege el jugador en medio segundo
            setTimeout(() => {
                msgId.textContent = "Repite";
                esperaTurno = false;
                activarJugador();
            }, 500);
        }
    }, 700);
}
// Funcion activar Jugador: El jugador se activa y debe replicar la secuencia de la maquina
function activarJugador() {
    if (esperaTurno) return;
    // Recorre todos los botones:
    botones.forEach((boton, i) => {
        boton.classList.add("boton-eleguir");
        // Si se presiona el boton
        boton.onclick = () => {
            if (JuegoTerminado || esperaTurno) return; // Verifica que el juego no termino

            // eleguido va a ser igual al color del boton presionado
            const elegido = colores[i];
            // Se ajunta al arreglo respuesta el color presionado
            respuesta.push(elegido);

            // verifica si el jugador se equivoco, si no es asi, verifica si ambos arreglos tienem la misma cantidad de posiciones
            if (!verificar()) {
                terminarJuego("¡Secuencia incorrecta!");
            } else if (respuesta.length === secuencia.length) {
                // Si ambos arreglos tienen el mismo tamaños se inicia la funcion empezar turno en un segundo
                setTimeout(empezarTurno, 1000);
            }
        };
    });
}
// Funcion verificar respuesta del jugador
function verificar() {
    // Verifica que todos los valores de ambos arreglos sea iguales, retorn true o false
    return respuesta.every((color, i) => color === secuencia[i]);
}
// Funcion cuando termina el juego
function terminarJuego(msj) {
    // Decimos que el juego termino, mostramos mensaje almacenado como parametro y en que nivel se quedo
    JuegoTerminado = true;
    textId.textContent = msj;
    msgId.textContent = `Te quedaste en el nivel ${secuencia.length}`;
    // Retiramos todas las clases
    botones.forEach(b => b.classList.remove("boton-eleguir"));
}

// Declarmos que el boton con id de reinicio, al presionarse ejecurara la funcion reinciar()
reinicioId.addEventListener("click", reiniciar);
// Restablecemos todo el juego
function reiniciar() {
    JuegoTerminado = false;
    esperaTurno = true;
    secuencia = [];
    respuesta = [];
    textId.textContent = "¡Seleccione para jugar!";
    msgId.textContent = "Esperando solicitud...";

    submitId.disabled = false;
    submitId.classList.remove("form-disabled");
    reinicioId.classList.add("form-disabled");

    botones.forEach(b => {
        b.classList.remove("boton-eleguir", "boton-1", "boton-2", "boton-3", "boton-4");
    });
}
