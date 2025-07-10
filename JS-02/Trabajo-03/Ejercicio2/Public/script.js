// Variables referentes a elementos al html
const formulario = document.getElementById("formulario");
const archivoInput = document.getElementById("archivo-input");
const resultadoDiv = document.getElementById("resultado");

formulario.addEventListener("submit", e => {
    e.preventDefault();

    const archivo = archivoInput.files[0];

    const reader = new FileReader();
    // Lee el archivo de .txt 
    reader.onload = function(event) {
        const contenido = event.target.result;

        // Almacena solo los numeros encontrdos
        const lineas = contenido.split(/\r?\n/).map(line => line.trim()).filter(line => line !== "");
        const numerosArchivo = lineas.map(Number).filter(n => !isNaN(n));

        // Verifica que los numeros empiesen y terminen igual
        const utiles = numerosArchivo.filter(n => {
            const str = n.toString();
            return str[0] === str[str.length - 1];
        });

        utiles.sort((a,b) => a - b);

        // Gurda los datos para luego mostrarlos por pantalla
        const cantidadUtiles = utiles.length;
        const total = numerosArchivo.length;
        const cantidadNoUtiles = total - cantidadUtiles;
        const porcentajeUtiles = ((cantidadUtiles / total) * 100).toFixed(2);

        resultadoDiv.innerHTML = `
            <h2>Resultado:</h2>
            <p><strong>Números filtrados:</strong> ${utiles.join(", ") || "Ninguno encontrado."}</p>
            <p><strong>Total números:</strong> ${total}</p>
            <p><strong>Útiles:</strong> ${cantidadUtiles}</p>
            <p><strong>No útiles:</strong> ${cantidadNoUtiles}</p>
            <p><strong>Porcentaje útiles:</strong> ${porcentajeUtiles}%</p>
            <button id="descargar-filtrado">Descargar filtrado</button>
        `;

        const botonDescargar = document.getElementById("descargar-filtrado");

        // Al presionar el boton creardo se descargara el archivo
        botonDescargar.addEventListener("click", () => {
            // Se almacenan todas los numeros utiles, separados por saltos de linea en un archivo
            const contenidoFiltrado = utiles.join("\n");
            const blob = new Blob([contenidoFiltrado], { type: "text/plain" });
            const url = URL.createObjectURL(blob);

            // Se crea un enlace para descargar el archivo, se autoclickea y luego se borra
            const a = document.createElement("a");
            a.href = url;
            a.download = "filtrado.txt";
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        });
    };

    reader.readAsText(archivo);
});
