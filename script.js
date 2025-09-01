// daftar produk dengan gambar
const products = [
  { id: 1, name: "better", price: 5000, img: "img/better.jpeg" },
  { id: 2, name: "chitato", price: 1000, img: "img/chitato.jpeg" },
  { id: 3, name: "Qtela", price: 1000, img: "img/Qitela.jpeg" },
  { id: 4, name: "sari roti", price: 2000, img: "img/sari roti.jpeg" },
  { id: 5, name: "garuda rosta", price: 1000, img: "img/garuda rosta.jpeg" }
];

//keranjang belanja
let cart = [];

//fungsi untuk menampilkan daftar produk
function displayProducts() {
  const productsContainer = document.getElementById('products');
  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Rp ${product.price}</p>
      <button onclick="addToCart(${product.id})">Tambah ke keranjang</button>
      `;
    productsContainer.appendChild(productDiv);
  });
}

//fungsi untuk menambah produk ke keranjang belanja
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity +=1;
  } else {
    cart.push({... product,quantity: 1 });
  }

  updateCart();
}

//Fungsi untuk menampilkan isi keranjang belanja
function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  let totalPrice = 0;
  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} x ${item.quantity} — Rp ${item.price * item.quantity}`;
    cartItemsContainer.appendChild(listItem);

    totalPrice += item.price * item.quantity;
  });

  document.getElementById('total-price').textContent = `Rp ${totalPrice}`;
}

//fungsi untuk melakukan checkout
function checkout() {
  if (cart.length === 0) {
    alert('Keranjang Anda kosong.');
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const payment =prompt(`Total belanja Anda Rp ${total}. Masukkan jumlah pembayaran:`);
  
  if (payment >= total) {
    alert('Pembayaran berhasil! Kembalian Anda: Rp ${payment - total}');
    cart = [];
    updateCart();
  } else {
    alert('Uang Anda tidak mencukupi.');
  }
}

//Event listener untuk tombol checkout
document.getElementById('checkout-btn')?.addEventListener('click', checkout);

//tampilkan produk saat halaman di muat
displayProducts();