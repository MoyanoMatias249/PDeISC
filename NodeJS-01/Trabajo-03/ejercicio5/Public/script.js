const contenedor = document.getElementById('container');
var html = "";

// FUNCION AGREGAR ELEMENTO HTML DEPENDIENDO EL PARAMETRO
function agregarElemento(tipo) {
    if (tipo === "parrafo") {
        html = `<p>Este es un nuevo párrafo agregado dinámicamente.</p>`;
    } 
    else if (tipo === "imagen") {
        html = `<img src="https://picsum.photos/300/200" alt="Imagen aleatoria">`;
    } 
    else if (tipo === "lista") {
        html = `
            <ul>
                <li>Elemento 1</li>
                <li>Elemento 2</li>
                <li>Elemento 3</li>
            </ul>`;
    } 
    else if (tipo === "input") {
        html = `<input type="text" placeholder="Nuevo campo de texto">`;
    } 
    else if (tipo === "video") {
        html = `
            <video width="320" height="240" loop autoplay muted control>
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                Tu navegador no soporta video.
            </video>`;
    }
    // MOSTRAR POR PANTALLA EL ElEMENTO RESULTANTE
    contenedor.innerHTML = html; 
    
}
