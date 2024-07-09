class Mate {
    static id = 0;
    constructor(nombre, precio, imagen) {
        this.id = 'Mate' + ++Mate.id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = 1; 
    }
}

let productos = [];
let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

let cartContainer = document.getElementById("cart-section");
let mensajeCarritoVacio = document.createElement('li');
mensajeCarritoVacio.classList.add('dropdown-item');
mensajeCarritoVacio.id = "mensaje-carrito-vacio";
mensajeCarritoVacio.textContent = "El carrito está vacío.";
cartContainer.appendChild(mensajeCarritoVacio);
let vaciarCarritoButton = document.createElement('button');
vaciarCarritoButton.classList.add('btn', 'btn-danger', 'w-100', 'dropdown-item');
vaciarCarritoButton.id = "vaciarCarrito";
vaciarCarritoButton.textContent = "Vaciar Carrito";
vaciarCarritoButton.style.display = "none";
cartContainer.appendChild(vaciarCarritoButton);
let precioTotal = document.createElement('li');
precioTotal.classList.add('dropdown-item');
precioTotal.id = "precio-total";
precioTotal.textContent = "Total: $0";
cartContainer.appendChild(precioTotal);


/* Función para agregar un nuevo producto */
function agregarProducto(nombre, precio, imagen) {
    const nuevoProducto = new Mate(nombre, precio, imagen);
    productos.push(nuevoProducto);
}

/* Cargar productos */
agregarProducto('Como un angel', 125, 'img/mate_1.jpg');
agregarProducto('Tan Sólo Amantes', 150, 'img/mate_2.jpg');
agregarProducto('Cómo Podré', 185, 'img/mate_3.jpg');
agregarProducto('Le Pido a Dios', 254, 'img/mate_4.jpg');

/* Cargar productos en el HTML */
let productsContainer = document.getElementById("products-container");
function renderProductos(prodctsArray) {
    prodctsArray.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add("col-sm-12", "col-md-6", "col-lg-4", "col-xl-3", "mb-4", "prueba");
        card.innerHTML = `
            <div class="card h-100">
                <img src="${producto.imagen}" class="card-img d-flex justify-content-center align-items-center" alt="Mate numero ${producto.id}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.precio}</p>
                    <button class="btn btn-primary productoAgregar" id="${producto.id}">Agregar</button>
                </div>
            </div>`;
        productsContainer.appendChild(card);
    });
    addToCartButton();
}
renderProductos(productos);

function addToCartButton() {
    let addButton = document.querySelectorAll(".productoAgregar");
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id;
            const selectedProduct = productos.find(producto => producto.id == productId);
            const productoExistente = cartProducts.find(product => product.id === selectedProduct.id);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                cartProducts.push({ ...selectedProduct });
            }

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            renderCarrito(cartProducts); // Renderizar el carrito después de agregar el producto
        };
    });
}
let scrollevent = document.getElementById("navbarid")
window.addEventListener('scroll', respuestaScroll)
function respuestaScroll(){
    if (window.scrollY > 0) {
        scrollevent.classList.add("navbar-personality")
    } else {
        scrollevent.classList.remove("navbar-personality")
    }
}
function renderCarrito(cartItems) {
    cartContainer.innerHTML = ""; // Limpiar el contenedor antes de renderizar

    if (cartItems.length === 0) {
        cartContainer.appendChild(mensajeCarritoVacio);
        vaciarCarritoButton.style.display = "none";
        precioTotal.textContent = "Total: $0";
    } else {
        vaciarCarritoButton.style.display = "block";
        cartItems.forEach(producto => {
            const cartItem = document.createElement("li");
            cartItem.classList.add('dropdown-item');
            cartItem.innerHTML = `
                <div class="card h-50">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre} (Cantidad: ${producto.cantidad})</h5>
                        <p class="card-text">${producto.precio}</p>
                        <button class="btn btn-danger productoEliminar" id="${producto.id}">Eliminar</button>
                    </div>
                </div>`;
            cartContainer.appendChild(cartItem);
        });
        deleteToCardButton();
        cartContainer.appendChild(vaciarCarritoButton);
        cartContainer.appendChild(precioTotal);
    }
    calcularTotal(cartItems);
}
let dropdownNodo = document.getElementById("dropdownid")
dropdownNodo.appendChild(renderCarrito)

function calcularTotal(cartItems) {
    const total = cartItems.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    precioTotal.textContent = "total $"+total;
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

