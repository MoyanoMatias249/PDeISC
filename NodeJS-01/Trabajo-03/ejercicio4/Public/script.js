/* CREACION DE VARIABLES A USAR */
var enlaces = [];
var urls = [
    "https://www.google.com",
    "https://www.youtube.com",
    "https://www.facebook.com",
    "https://www.amazon.com",
    "https://www.instagram.com"
];

var nuevasUrls = [
    "https://www.bing.com",
    "https://www.netflix.com",
    "https://www.twitter.com",
    "https://www.ebay.com",
    "https://www.tiktok.com"
];
var contador = 0;

// FUNCION CREAR ENLACE, CREAN TEXTO SOBRE EL ENLACE Y CREAR BOTON
function crearEnlace() {
    if (contador >= urls.length) return;
    
    const i = contador;
    // DECLARAMOS LOS CONTENEDORES DEL HTML A MODIFICAR
    const containerEnlaces = document.getElementById('enlaces');
    const containerBotones = document.getElementById('botones-modificar');
    const containerResultado = document.getElementById('resultado');

    // CREAMOS ENLACE
    const a = document.createElement('a');
    a.href = urls[i];
    a.textContent = `Enlace ${i + 1}`;
    a.target = "_blank";
    a.style.display = "block";
    containerEnlaces.appendChild(a);

    // CREAMOS EL TEXTO <p>
    const mensaje = document.createElement('p');
    mensaje.textContent = `Enlace ${i + 1} apunta a: ${a.href}`;
    containerResultado.appendChild(mensaje);

    // GUARDAMOS LOS DATOS DEL ENLACE EN EL VECTOR ENLACE
    enlaces.push({
        elemento: a,
        original: urls[i],
        modificado: false,
        mensaje: mensaje
    });

    // CREAMOS EL BORTON
    const boton = document.createElement('button');
    boton.textContent = `Modificar Enlace ${i + 1}`;
    boton.onclick = () => modificarEnlace(i); 
    containerBotones.appendChild(boton);

    contador++;
}

// FUNCION MODIFICAR ENLACE Y EL TEXTO
function modificarEnlace(indice) {
    // GUARDAMOS LOS DATOS DEL ENLACE A MODIFICAR EN UNA VARIABLE
    const enlaceObj = enlaces[indice];
    
    const a = enlaceObj.elemento;
    const mensaje = enlaceObj.mensaje;
    const anterior = a.href;

    // MODIFICAMOS LOS VALORES DEL URL Y EL MENSAJE
    if (!enlaceObj.modificado) {
        a.href = nuevasUrls[indice];
        enlaceObj.modificado = true;
        mensaje.textContent = `Enlace ${indice + 1} modificado: de ${anterior} a ${a.href}`;
    } else {
        a.href = enlaceObj.original;
        enlaceObj.modificado = false;
        mensaje.textContent = `Enlace ${indice + 1} volvió a su URL original: ${a.href}`;
    }
}
