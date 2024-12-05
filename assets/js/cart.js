
// Función para agregar al carrito
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(p => p.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    // Guardar carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
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

// Función para mostrar los productos en el carrito
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');

    // Limpiar lista de productos en carrito
    cartItemsList.innerHTML = '';

    // Mostrar productos en carrito
    let total = 0;
    cart.forEach((product, index) => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        cartItem.innerHTML = `
            <div class="d-flex align-items-center" style="flex: 1; justify-content: center;">
            <!-- Imagen del producto -->
            <img src="${product.image}" alt="${product.title}" class="product-image" style="width: 60px; height: 60px; object-fit: cover;">
            <!-- Información del producto -->
             <div class="d-flex align-items-center" style="flex: 2; justify-content: center;">
            <div class="item-info">
            <span><strong>${product.title}</strong></span>
            <p>$ ${product.precio}</p>
            </div>
            </div>
            <!-- Input de cantidad y validación de stock -->
            <div class="item-actions">
            <div class="d-flex align-items-center" style="flex: 1; justify-content: center;">
            <!-- Si la cantidad es mayor que el stock, deshabilitamos el input -->
            <input type="number" 
                   class="quantity-input" 
                   value="${product.quantity}" 
                   min="1" 
                   max="${product.stock}" 
                   ${product.quantity > product.stock ? 'disabled' : ''} 
                   data-index="${index}" 
                   onchange="updateQuantity(${index}, this.value)" 
                   style="width: 60px;">
            </div>
            <!-- Mensaje si la cantidad supera el stock -->
            ${product.quantity > product.stock ?
                '<span class="text-danger" style="font-size: 0.9rem;">Cantidad máxima: ' + product.stock + '</span>' : ''}
            </div>
            <div class="d-flex align-items-center" style="flex: 1; justify-content: center;">
            <!-- Botón para eliminar producto -->
            <button class="btn btn-danger" onclick="removeFromCart(${index})">&times;</button>
            </div>
            </div>
            `;
        cartItemsList.appendChild(cartItem);

        // Calcular total
        total += product.precio * (parseInt(product.quantity));
    });

    // Actualizar el total
    cartTotal.innerText = total.toFixed(2);
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Eliminar el producto
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (quantity > 0) {
        cart[index].quantity = parseInt(quantity);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

// Mostrar el carrito al hacer clic en el botón
// document.getElementById('cart-btn').addEventListener('click', () => {
//     const cartContainer = document.getElementById('cart-container');
//     cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
// });

// Escuchar cambios en la cantidad
document.getElementById('cart-items-list').addEventListener('input', (event) => {
    if (event.target.classList.contains('quantity-input')) {
        const index = event.target.getAttribute('data-index');
        const quantity = parseInt(event.target.value);
        quantity = parseInt(quantity)
        updateQuantity(index, quantity);
        updateCartCount();
    }
});

// Inicializar el carrito
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
});

document.getElementById('liquidacion-button').addEventListener('click', function () {
    // Recuperamos el carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificamos si el carrito está vacío
    if (carrito.length === 0) {
        alert("No hay productos a facturar.");
    } else {
        window.location.href = 'liquidacion.html'; // Redirige a la página de liquidación
    }
});