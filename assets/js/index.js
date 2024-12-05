import { Render } from "./render.js";
import { funcionPattern } from "./funcionPattern.js";

const app = new Render("app");

const JSON_LOCAL ="../productos.json";

// const API_ICE="https://api.sampleapis.com/coffee/iced";
app.fetchData(JSON_LOCAL, funcionPattern);


/*

#######################################################################3

*/

// Función para mostrar la descripción ampliada al hacer clic
function mostrarDescripcion(id) {
    var descripcion = document.getElementById(id);

    // Si la descripción está oculta, la mostramos
    if (descripcion.style.display === "none" || descripcion.style.display === "") {
        descripcion.style.display = "block";
    } else {
        // Si la descripción ya está visible, la ocultamos
        descripcion.style.display = "none";
    }
}
// Función para actualizar el contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, product) => {
        // Asegurarse de que quantity sea un número
        return total + (parseInt(product.quantity) || 0);
    }, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount(); // Llama a la función cuando el DOM esté completamente cargado
});