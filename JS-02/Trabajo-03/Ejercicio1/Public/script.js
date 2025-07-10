// Variables referentes a elementos al html
const formulario = document.getElementById("formulario");
const numeroInput = document.getElementById("numero-input");
const guardarArreglo = document.getElementById("guardar-archivo");
const listaNumeros = document.getElementById("lista-numeros");
const contador = document.getElementById("contador");
const mensaje = document.getElementById("mensaje");

let numeros = [];

formulario.addEventListener("submit", e => {
    e.preventDefault();
    const n = parseInt(numeroInput.value);

    if (numeros.length >= 20) {
        mensaje.textContent = "Límite de 20 números alcanzado.";
        return;
    }

    numeros.push(n);
    numeroInput.value = "";
    actualizarLista();
});

// Mostrar la lista con todos lo numeros ingresados
function actualizarLista() {
    listaNumeros.innerHTML = "";
    numeros.forEach(n => {
        const li = document.createElement("li");
        li.textContent = n;
        listaNumeros.append(li);
    });
    contador.textContent = `Números cargados: ${numeros.length}`;
    guardarArreglo.disabled = numeros.length < 10;
}

guardarArreglo.addEventListener("click", () => {
     // Se almacenan todas los numeros separados por saltos de linea en un archivo de texto plano
    const contenido = numeros.join("\n");
    const blob = new Blob([contenido], { type: "text/plain" });

    // Se crea un enlace para descargar el archivo, se autoclickea y luego se borra
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "numeros.txt";
    document.body.appendChild(a);
    a.click();              
    a.remove();         
    URL.revokeObjectURL(url); 

    mensaje.textContent = "Archivo descargado correctamente.";
});