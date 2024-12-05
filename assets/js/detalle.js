// Obtener parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const title = urlParams.get('title');
const image = urlParams.get('image');
const description = urlParams.get('description');
const precio = parseFloat(urlParams.get('precio'));  // Asegurarnos de que el precio sea un número
const color = urlParams.get('color');
const stock = parseInt(urlParams.get('stock'), 10);  // Asegurarnos de que el stock sea un número entero


const carritoinput = document.getElementById('stock-input');
let carritocantidad = parseInt(carritoinput.value);
// Crear un objeto del producto usando los parámetros de la URL
const product = {
    id,
    title,
    image,
    description,
    precio,
    color,
    stock,
};



// Asignar los valores a los elementos HTML
document.getElementById('detalle-imagen').src = image;
document.getElementById('detalle-imagen').alt = `Imagen de ${title}`;
document.getElementById('detalle-titulo').textContent = title;
document.getElementById('detalle-descripcion').textContent = description;
// document.getElementById('detalle-precio').textContent = `Precio: $${precio}`;
document.getElementById('detalle-color').textContent = color;


function formatearPrecio(pr) {
    // Obtener el precio con 2 decimales
    const precioFormateado = parseFloat(pr).toFixed(2);

    // Dividir el precio en entero y centavos
    const partes = precioFormateado.split('.');
    // Asignar manualmente las partes
    const entero = partes[0];
    const centavos = partes[1];

    // Si no hay centavos, simplemente mostrar el precio entero
    if (!centavos) return `${entero}`;

    // Colocar los centavos como superíndice

    return `${entero}<sup class="centavos-superindice">${centavos}</sup>`;
}



// Mostrar el precio con la línea atravesada (tachado)
const precioOriginal = precio; //  precio original
const precioFormateadoOriginal = formatearPrecio(precio);
const precioConDescuento = (parseFloat(precio) * 0.8).toFixed(2); // Ejemplo de un descuento del 20%
const precioFormateado = formatearPrecio(precioConDescuento);
       
        

// Calcular cuota del producto
const precioEnCuotas = (parseFloat(precio) / 6).toFixed(2); // en 6 cuotas
const cuotaFormateada = formatearPrecio(precioEnCuotas);
// Crear el HTML con el precio tachado y el precio con descuento
document.getElementById('detalle-precio').innerHTML = `
        <h2><span style="text-decoration: line-through;">$${precioFormateadoOriginal}</span></h2> 
        <span class="text-dark fs-6">-20% </span><span>$ ${precioFormateado}</span>`

// Crear el HTML con el precio tachado y el precio con descuento
document.getElementById('detalle-cuotas').innerHTML = `
        <p class="text-dark fs-6";>En 6 cuotas de <span class="fs-5"> <strong>$ ${cuotaFormateada} </strong> </span></p>`

function mostrarAlerta() {
    alert("La función que estás esperando está en desarrollo. ¡Vuelve más tarde!");
}




        
// document.getElementById("precio").innerHTML = formatearPrecio(precioConDescuento);

if (stock) {
    // Actualizar el valor del campo input
    document.getElementById('stock-input').setAttribute('max', stock);
    document.getElementById('stock-input').setAttribute('value', 1);

    // Actualizar el texto del stock disponible
    document.getElementById('stock-info').textContent = `(${stock} disponibles)`;
} else {
    console.error('El parámetro stock no se encuentra en la URL');
}


// Función para validar la cantidad ingresada
function validarCantidad() {
    const input = document.getElementById('stock-input');
    let cantidad = parseInt(input.value);
    // Si el valor es mayor que el stock disponible, ajustarlo al máximo disponible
    if (cantidad > stock) {
        input.value = stock;
    }
    // Si el valor es menor que el mínimo (1), ajustarlo al mínimo permitido
    if (cantidad < 1) {
        input.value = 1;
    }
}


function agregarAlCarrito() {

    // Datos del producto (esto es solo un ejemplo, debes usar datos reales)

    const input = document.getElementById('stock-input');
    let cantidad = parseInt(input.value);

    // Establecer los datos en el modal
    document.getElementById('producto-imagen').src = image;
    document.getElementById('producto-nombre').textContent = title;
    document.getElementById('producto-cantidad').textContent = cantidad;

    // Inicializar el modal
    let modalCarrito = new bootstrap.Modal(document.getElementById('modalCarrito'));

    // Mostrar el modal de agregar al carrito
    modalCarrito.show();

    // Obtener el carrito actual desde el localStorage o inicializarlo como un arreglo vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(p => p.id === id);
    if (existingProduct) {
        existingProduct.quantity += parseInt(cantidad);  // Si ya existe, incrementamos la cantidad
    } else {
        cart.push({ ...product, quantity: parseInt(cantidad) });
        //cart.push(product);  // Si no existe, lo agregamos con cantidad 1
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Actualizar el contador del carrito (esto debe estar implementado en otra parte de tu código)
    updateCartCount();
}

// Asegúrate de tener el uso correcto de Bootstrap 5 para cerrar el modal
document.addEventListener('DOMContentLoaded', function () {
    // Usando el nuevo método de Bootstrap 5 para cerrar el modal
    const modalElement = document.getElementById('modalCarrito');
    const modal = new bootstrap.Modal(modalElement);

    // El modal se cierra automáticamente cuando se hace clic en el botón "Cerrar" o la X
    const closeButton = document.querySelector('.btn-close');
    const closeFooterButton = document.querySelector('.btn-secondary');

    // Agregar eventos a los botones para cerrar el modal
    closeButton.addEventListener('click', function () {
        modal.hide(); // Cierra el modal
    });

    closeFooterButton.addEventListener('click', function () {
        modal.hide(); // Cierra el modal
    });
});


// Función para actualizar el contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, product) => {

        // Asegurarse de que quantity sea un número
        return total + (parseInt(product.quantity) || 0);
    }, 0);
    document.getElementById('cart-count').innerText = cartCount;
}




// Script para mostrar el modal 
function mostrarModal() {
    $('#modalComingSoon').modal('show');
}


  // Cerrar el modal manualmente
$(document).ready(function(){
  
    $('.close, .btn-success').click(function() {
        $('#modalComingSoon').modal('hide');
    });
});


document.addEventListener('DOMContentLoaded', function () {
    updateCartCount(); // Llama a la función cuando el DOM esté completamente cargado
});
