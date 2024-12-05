// Vaciar los campos del formulario al cargar la página
window.onload = function () {
    document.getElementById('miFormulario').reset();
};

// iframe
let player;

// Función que se llama cuando la API de YouTube está lista
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video', {
        events: {
            'onReady': function (event) {
                event.target.playVideo(); // Asegura que el video se reproduzca automáticamente
            }
        }
    });
}

// Manejo del evento clic del botón
document.getElementById('skipButton').onclick = function () {
    const overlay = document.getElementById('videoOverlay');
    overlay.style.display = 'none';

    // Pausar el video
    if (player) {
        player.pauseVideo(); // Pausa el video
    }
};

// Referencias a los elementos
const menuHamburguesa = document.getElementById('menuHamburguesa');
const carritoNavItem = document.getElementById('carritoNavItem');
const navbarCollapse = document.querySelector('.navbar-collapse');

// Escucha el clic del menú hamburguesa
menuHamburguesa.addEventListener('click', () => {
    // Si el menú hamburguesa está abierto, mostramos el carrito
    if (navbarCollapse.classList.contains('show')) {
        carritoNavItem.style.display = 'block'; // Muestra el carrito como un link más
    } else {
        carritoNavItem.style.display = 'none'; // Oculta el carrito cuando el menú está cerrado
    }
});
