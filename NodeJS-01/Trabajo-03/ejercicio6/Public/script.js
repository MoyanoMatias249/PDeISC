document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const nombre = formData.get('nombre');
    const edad = formData.get('edad');
    const email = formData.get('email');
    const sexo = formData.get('sexo');
    const pais = formData.get('pais');
    const acepta = formData.get('acepta') ? 'Sí' : 'No';

    const resultado = `
        <h2>Datos Registrados:</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Edad:</strong> ${edad}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sexo:</strong> ${sexo}</p>
        <p><strong>País:</strong> ${pais}</p>
        <p><strong>Acepta Términos:</strong> ${acepta}</p>
    `;

    document.getElementById('resultado').innerHTML = resultado;
});
