let cartProducts = localStorage.getItem("cartProducts");

if (cartProducts) {
    cartProducts = JSON.parse(cartProducts);
} else {
    cartProducts = [];
}

let cartContainer = document.getElementById("cart-section");
let mensajeCarritoVacio = document.getElementById("mensaje-carrito-vacio");
let vaciarCarritoButton = document.getElementById("vaciarCarrito");
let precioTotal = document.getElementById("precio-total");

function renderCarrito(cartItems) {
    cartContainer.innerHTML = ""; // Limpiar el contenedor antes de renderizar

    if (cartItems.length === 0) {
        mensajeCarritoVacio.style.display = "block";
        vaciarCarritoButton.style.display = "none";
        precioTotal.textContent = "0";
    } else {
        mensajeCarritoVacio.style.display = "none";
        vaciarCarritoButton.style.display = "block";

        cartItems.forEach(producto => {
            const card = document.createElement("div");
            card.innerHTML = `
                <div class="card h-100">
                    <img src="../${producto.imagen}" class="card-img" alt="Mate numero ${producto.id}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre} (Cantidad: ${producto.cantidad})</h5>
                        <p class="card-text">${producto.precio}</p>
                        <button class="btn btn-danger productoEliminar" id="${producto.id}">Eliminar</button>
                    </div>
                </div>`;
            cartContainer.appendChild(card);
        });
        deleteToCardButton();
    }

    calcularTotal(cartItems);
}

function calcularTotal(cartItems) {
    const total = cartItems.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    precioTotal.textContent = total;
}

function deleteToCardButton() {
    let deleteButtons = document.querySelectorAll(".productoEliminar");
    deleteButtons.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id;
            const productIndex = cartProducts.findIndex(producto => producto.id === productId);

            if (productIndex !== -1) {
                if (cartProducts[productIndex].cantidad > 1) {
                    cartProducts[productIndex].cantidad--;
                } else {
                    cartProducts.splice(productIndex, 1);
                }

                localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
                renderCarrito(cartProducts); // Re-renderizar el carrito
            }
        }
    });
}

function vaciarCarrito() {
    cartProducts = [];
    localStorage.removeItem("cartProducts");
    renderCarrito(cartProducts);
}

vaciarCarritoButton.onclick = vaciarCarrito;

renderCarrito(cartProducts);