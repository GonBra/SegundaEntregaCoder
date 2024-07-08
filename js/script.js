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
                <img src="${producto.imagen}" class="card-img" alt="Mate numero ${producto.id}">
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
            
        };
    });
}
