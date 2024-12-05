// Función para verificar cada campo de forma independiente en tiempo real
function verificarCampo(elemento) {
    const id = elemento.id;
    const error = document.getElementById('error-' + id);

    if (elemento.validity.valid) {
        elemento.style.backgroundColor = '#FFFFFF';
        error.style.display = 'none';
        console.log(`Campo: ${id} verificado correctamente.`);
    } else {
        elemento.style.backgroundColor = '#FFDDDD';
        error.style.display = 'block';
        console.log(`Campo: ${id} no válido.`);
    }
}

// Función para enviar el formulario solo si todo es válido
function enviar() {
    const formulario = document.getElementById('miFormulario');
    const valido = formulario.checkValidity();

    if (valido) {
        console.log('Formulario válido, enviando...');
        // Aquí, el formulario se enviará porque checkValidity() es true
        return true;
    } else {
        console.log('Formulario no válido.');
        return false;
    }
}

