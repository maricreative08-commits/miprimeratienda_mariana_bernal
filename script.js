const productos = [
  {
    id: 1,
    nombre: "ULTRA SHINE VOLUMIZING LIP GLOSS",
    descripcion: "Tu nuevo favorito para unos labios con volumen y glow.",
    precio: 25000,
    imagen: "https://belahbeauty.com/cdn/shop/files/guava7.jpg?v=1770677135&width=700"
  },
  {
    id: 2,
    nombre: "METALLIC LONGWEAR CREAM EYESHADOW",
    descripcion: "Una mirada dorada que habla por sí sola.",
    precio: 18000,
    imagen: "https://belahbeauty.com/cdn/shop/files/metallic-longwear-crea-eyeshadow-golden-honey.jpg?v=1763930647&width=700"
  },
  {
    id: 3,
    nombre: "EFFORTLESS DEWY CREAM BLUSH",
    descripcion: "Glow de ensueño en una sola aplicación..",
    precio: 30000,
    imagen: "https://belahbeauty.com/cdn/shop/files/lavender-dewy-cream-blush.jpg?v=1779146597&width=700"
  },
  {
    id: 4,
    nombre: "PEARL-INFUSED LIQUID BLUSH",
    descripcion: "El toque de rosa perfecto para unas mejillas naturalmente irresistibles.",
    precio: 18000,
    imagen: "https://belahbeauty.com/cdn/shop/files/PINKBLUSH.jpg?v=1755984297&width=700"
  },
  {
    id: 5,
    nombre: "DUAL-ENDED BRUSH",
    descripcion: "Precisión en cada pincelada. Perfección en cada look.",
    precio: 22000,
    imagen: "https://belahbeauty.com/cdn/shop/files/belah-brushes-1.jpg?v=1757789760&width=700"
  }
];


/* ==============================
   CARRITO
================================ */

const carrito = [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");


/* ==============================
   MOSTRAR PRODUCTOS
================================ */

function mostrarProductos() {

  contenedorProductos.innerHTML = "";

  productos.forEach(prod => {

    const div = document.createElement("div");

    div.className = "producto";

    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">

      <h3>${prod.nombre}</h3>

      <p class="descripcion">
        ${prod.descripcion}
      </p>

      <p class="precio">
        ${prod.precio.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0
        })}
      </p>

      <button onclick="agregarAlCarrito(${prod.id})">
        Agregar al carrito
      </button>
    `;

    contenedorProductos.appendChild(div);

  });

}


/* ==============================
   AGREGAR AL CARRITO
================================ */

function agregarAlCarrito(id) {

  const productoExistente =
    carrito.find(p => p.id === id);

  if (productoExistente) {

    productoExistente.cantidad++;

  } else {

    const producto =
      productos.find(p => p.id === id);

    carrito.push({
      ...producto,
      cantidad: 1
    });

  }

  actualizarCarrito();

}


/* ==============================
   ACTUALIZAR CARRITO
================================ */

function actualizarCarrito() {

  listaCarrito.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  carrito.forEach(item => {

    const li =
      document.createElement("li");

    const subtotal =
      item.precio * item.cantidad;

    li.textContent =
      `${item.nombre} x${item.cantidad} — ` +
      subtotal.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
      });

    listaCarrito.appendChild(li);

    total += subtotal;
    totalItems += item.cantidad;

  });

  totalCarrito.textContent =
    total.toLocaleString("es-CO");

  actualizarTituloCarrito(totalItems);

}


/* ==============================
   CONTADOR DEL CARRITO
================================ */

function actualizarTituloCarrito(cantidad) {

  const titulo =
    document.querySelector(".carrito h2");

  titulo.textContent =
    `🧾 Carrito de Compras (${cantidad})`;

}


/* ==============================
   VACIAR CARRITO
================================ */

function vaciarCarrito() {

  if (carrito.length === 0) {

    alert("🛒 El carrito ya está vacío.");

    return;

  }

  if (
    confirm(
      "¿Estás seguro de que quieres vaciar el carrito?"
    )
  ) {

    carrito.length = 0;

    actualizarCarrito();

  }

}


/* ==============================
   FINALIZAR COMPRA
================================ */

function finalizarCompra() {

  if (carrito.length === 0) {

    alert(
      "🛒 Tu carrito está vacío. Agrega productos antes de finalizar la compra."
    );

    return;

  }

  alert(
    "🎉 ¡Pedido simulado confirmado!\n\n" +
    "En un eCommerce real, ahora entrarían en acción " +
    "el backend, la pasarela de pago y la logística."
  );

  carrito.length = 0;

  actualizarCarrito();

}


/* ==============================
   INICIAR TIENDA
================================ */

mostrarProductos();
