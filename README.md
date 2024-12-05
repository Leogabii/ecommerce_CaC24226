# 📦 **ecommerce_CaC24226 - Tienda Web**

Bienvenido a **ecommerce_CaC24226**, un proyecto de **tienda web (e-commerce)** desarrollado como parte del curso de **Full Stack**. Esta tienda permite a los usuarios navegar por productos, agregar artículos al carrito, realizar pagos y generar facturas en formato **PDF**. Además, el proyecto implementa un sistema **CRUD** (Crear, Leer, Actualizar, Eliminar) utilizando **localStorage** para persistir los datos entre sesiones.

---

## 🚀 **Características**

- **Estructura HTML semántica**: Utiliza etiquetas semánticas como `<header>`, `<nav>`, `<main>`, `<section>`, y `<footer>` para mejorar la accesibilidad y organización del contenido.
- **Formulario de contacto**: Un formulario funcional con integración de **Formspree** para gestionar los envíos de datos del usuario.
- **Estilos CSS responsivos**: Uso de **Flexbox** y **Grid** para crear una disposición dinámica y adaptable de los productos y reseñas en la tienda.
- **Carrito de compras interactivo**: Los usuarios pueden agregar productos al carrito, ver el total de la compra y realizar pagos. El carrito se guarda de manera persistente en **localStorage** para que no se pierda entre sesiones.
- **Generación de factura en PDF**: Después de realizar una compra, se genera una factura en formato **PDF** utilizando **jsPDF**, que incluye los detalles de los productos comprados y la información de la compra.

---

## ⚙️ **Funcionalidades CRUD**

Este proyecto cubre las operaciones básicas de un CRUD (Crear, Leer, Actualizar, Eliminar) en el contexto de un carrito de compras. A continuación, te explicamos cómo se implementan estas operaciones:

### 1. **Crear (Agregar productos al carrito)**
Cuando un usuario agrega un producto al carrito, se ejecuta la función `addToCart(productId)`. Esta función busca el producto correspondiente y lo agrega al carrito almacenado en **localStorage**. Si el producto ya existe, simplemente se incrementa su cantidad.

**Ejemplo de código**:

```javascript
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(p => p.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;  // Aumentar la cantidad si ya está en el carrito
    } else {
        cart.push({ ...product, quantity: 1 });  // Agregar nuevo producto
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();  // Actualizar el contador del carrito
    renderCart();       // Mostrar los productos del carrito
}
```

### 2. **Leer (Visualizar el carrito)**
Cuando el usuario visualiza el carrito, se llama a la función `renderCart()`, que obtiene los productos del carrito desde `localStorage` y los muestra en la interfaz de usuario.

**Ejemplo**: Los productos en el carrito son leídos desde `localStorage` y mostrados en una lista

**Ejemplo de código**:

```javascript
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    
    // Limpiar la lista de productos en el carrito
    cartItemsList.innerHTML = '';

    // Recorrer los productos y mostrarlos en el carrito
    let total = 0;
    cart.forEach((product, index) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div>
                <strong>${product.title}</strong> - $${product.precio} x ${product.quantity}
            </div>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItemsList.appendChild(cartItem);

        // Calcular el total de la compra
        total += product.precio * product.quantity;
    });

    // Mostrar el total en la interfaz
    cartTotal.innerText = total.toFixed(2);
}
```

### 3. **Actualizar (Modificar la cantidad del producto)**
Cuando un usuario cambia la cantidad de un producto en el carrito, se ejecuta la función `updateQuantity(index, quantity)`. Esta función actualiza la cantidad del producto en `localStorage` y vuelve a renderizar el carrito.

**Ejemplo**: Si un usuario aumenta la cantidad de un producto, se actualiza la cantidad en `localStorage` y el carrito se vuelve a mostrar con la cantidad modificada:

**Ejemplo de código**:

```javascript
function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (quantity > 0) {
        cart[index].quantity = parseInt(quantity);
    }
    localStorage.setItem('cart', JSON.stringify(cart));  // Guardar cambios en localStorage
    updateCartCount();  // Actualizar el contador del carrito
    renderCart();       // Renderizar el carrito actualizado
}
```

### 4. **Eliminar (Eliminar producto del carrito)**
Cuando un usuario elimina un producto del carrito, se llama a la función `removeFromCart(index)`. Esta función elimina el producto del carrito en `localStorage` y luego actualiza la interfaz.

**Ejemplo**: Si un usuario elimina un producto, se elimina de `localStorage` y se vuelve a renderizar el carrito sin ese producto:

**Ejemplo de código**:

```javascript
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);  // Eliminar producto del carrito
    localStorage.setItem('cart', JSON.stringify(cart));  // Guardar carrito actualizado en localStorage
    updateCartCount();  // Actualizar el contador del carrito
    renderCart();       // Renderizar el carrito actualizado
}
```

### Uso de localStorage

En este proyecto, `localStorage` se utiliza para persistir los datos del carrito de compras entre sesiones. `localStorage` almacena los datos en el navegador del usuario de manera persistente, lo que significa que aunque el usuario cierre el navegador o recargue la página, los productos del carrito seguirán allí.

**Flujo de trabajo con localStorage**:
1. **Guardar productos en el carrito**: Cada vez que un producto se agrega al carrito, se guarda el carrito completo en `localStorage` usando `localStorage.setItem('cart', JSON.stringify(cart))`.
2. **Leer productos del carrito**: Al cargar la página, los productos se leen de `localStorage` con `JSON.parse(localStorage.getItem('cart'))` y se muestran en la interfaz.
3. **Actualizar el carrito**: Cualquier cambio en la cantidad o eliminación de productos actualiza el carrito en `localStorage`, lo que asegura que el carrito se mantenga sincronizado con la interfaz.
4. **Eliminar el carrito**: Después de realizar una compra, el carrito se limpia de `localStorage` usando `localStorage.clear()`.

### Instrucciones

1. Clona este repositorio en tu máquina local.
2. Abre el archivo `index.html` en tu navegador para visualizar la tienda web.
3. Modifica el ID del formulario en Formspree para que funcione correctamente con tu cuenta.

### Funcionalidades CRUD

Este proyecto cubre las operaciones básicas de un CRUD (Crear, Leer, Actualizar, Eliminar) en el contexto de un carrito de compras. A continuación, se explica cómo se implementan estas operaciones:

#### 1. Crear (Agregar productos al carrito)
Se agrega un producto al carrito mediante la función `addToCart`, que agrega el producto al arreglo almacenado en `localStorage`.

#### 2. Leer (Mostrar productos en el carrito)
El carrito se lee desde `localStorage` y se muestra en la interfaz utilizando la función `renderCart`.

#### 3. Actualizar (Modificar cantidad de productos)
La cantidad de productos en el carrito se puede actualizar mediante la función `updateQuantity`. Esta actualización se refleja tanto en `localStorage` como en la interfaz.

#### 4. Eliminar (Eliminar productos del carrito)
Los productos pueden eliminarse del carrito mediante la función `removeFromCart`. Esto también actualiza `localStorage` y la interfaz de usuario.


