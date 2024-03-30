let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
    guardarCarrito();
}

function mostrarCarrito() {
    const contenedorCompra = document.getElementById("contenedorCompra");
    const vehiculosCompra = document.getElementById("vehiculosCompra");
    const total = document.getElementById("total");

    vehiculosCompra.innerHTML = '';
    total.innerText = '';

    carrito.forEach((item, index) => {
        const vehiculoElemento = document.createElement("div");
        vehiculoElemento.innerHTML = `${item.nombre} <button class="eliminar" data-index="${index}">Eliminar</button>`;
        vehiculosCompra.appendChild(vehiculoElemento);
    });

    const precioTotal = carrito.reduce((total, item) => total + item.precio, 0);
    total.innerText = `Total: $${precioTotal}`;

    contenedorCompra.style.display = "block";
}

function agregarAlCarrito(item) {
    carrito.push(item);
    mostrarCarrito();
    guardarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
    guardarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('vaciarCarrito').addEventListener('click', vaciarCarrito);

    const comprarBotones = document.querySelectorAll(".comprar");
    comprarBotones.forEach((boton) => {
        boton.addEventListener("click", () => {
            const vehiculo = {
                nombre: boton.previousElementSibling.textContent.trim(),
                precio: 10000
            };
            agregarAlCarrito(vehiculo);
        });
    });

    const verCarrito = document.getElementById("verCarrito");
    verCarrito.addEventListener("click", mostrarCarrito);

    const finalizarCompraBtn = document.getElementById('finalizarCompra');
    finalizarCompraBtn.addEventListener('click', () => {
        document.getElementById("contenedorCompra").style.display = "none";
    });

    const eliminarBotones = document.querySelectorAll(".eliminar");
    eliminarBotones.forEach((boton) => {
        boton.addEventListener("click", () => {
            const index = parseInt(boton.getAttribute("data-index"));
            eliminarDelCarrito(index);
        });
    });

    const cerrarCarritoBtn = document.getElementById("cerrarCarrito");
    cerrarCarritoBtn.addEventListener("click", () => {
        document.getElementById("contenedorCompra").style.display = "none";
    });
});