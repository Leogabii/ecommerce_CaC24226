// Esperar a que jsPDF se haya cargado completamente
window.addEventListener('load', function () {
    const { jsPDF } = window.jspdf; // Asegurarnos de que jsPDF esté disponible
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Si no existe, se crea un array vacío

    let total = 0;
    const cartItemsList = document.getElementById('cart-items-list');  // Contenedor de productos
    const cartTotalElement = document.getElementById('cart-total');
    const modalTotalElement = document.getElementById('modal-total');

    // Recorrer los productos y mostrarlos en la factura
    cart.forEach((product, index) => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        cartItem.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="item-info">
                    <strong>${product.title}</strong>
                    <p>$ ${product.precio.toFixed(2)}</p>
                </div>
                <div class="item-actions">
                    <span>${product.quantity}</span> x $${product.precio.toFixed(2)}
                </div>
            </div>
        `;
        cartItemsList.appendChild(cartItem);

        // Calcular el total
        total += (parseInt(product.precio)) * (parseInt(product.quantity));
    });

    // Mostrar el total en la página y en el modal
    cartTotalElement.innerText = total.toFixed(2);
    modalTotalElement.innerText = total.toFixed(2);

    // Manejar el clic en el botón de pago
    document.getElementById('confirm-payment').addEventListener('click', () => {
        // Generar PDF de la factura
        generatePDF();
    });

    // Función para generar la factura en PDF
    function generatePDF() {
        // Crear una nueva instancia de jsPDF
        const doc = new jsPDF();

        // Incluir título
        doc.text("Factura de Compra", 20, 20);
        doc.text(`Nombre: ${document.getElementById('customer-name').value}`, 20, 30);
        doc.text(`Correo: ${document.getElementById('customer-email').value}`, 20, 40);
        doc.text(`Dirección: ${document.getElementById('customer-address').value}`, 20, 50);
        doc.text(`Teléfono: ${document.getElementById('customer-phone').value}`, 20, 60);

        let yPosition = 70;

        // Esperar a que la imagen se cargue correctamente
        cart.forEach((product) => {
            const img = new Image();
            img.src = product.image; // Usar la URL del producto

            img.onload = () => {
                doc.addImage(img, 'PNG', 20, yPosition, 20, 20);
                doc.text(`${product.title} - $${product.precio.toFixed(2)} x ${product.quantity}`, 90, yPosition);

                yPosition += 70;  // Ajustamos la altura para que no se superpongan las imágenes

                // Cuando terminen de cargar todas las imágenes, generar el PDF
                if (cart.indexOf(product) === cart.length - 1) {
                    doc.text(`Total: $${total.toFixed(2)}`, 20, yPosition + 10);
                    doc.save("factura.pdf");
                    // Cerrar el modal después de generar el PDF
                    const modal = new bootstrap.Modal(document.getElementById('confirm-payment'));
                    modal.hide();
                    limpiarLocalStorage();
                    // Redirigir a la página de agradecimiento
                    window.location.href = 'gracias.html';
                }
            };
        });

    }
});

// limpia el carrito
function limpiarLocalStorage() {
    localStorage.clear();
    console.log("El localStorage ha sido limpiado.");
}


document.getElementById('cancel-button').addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirige al archivo index.html
});
