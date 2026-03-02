// script.js

// Product display functionality
const products = [
    { id: 1, name: 'Product 1', category: 'Category 1', price: 10.99 },
    { id: 2, name: 'Product 2', category: 'Category 1', price: 20.99 },
    { id: 3, name: 'Product 3', category: 'Category 2', price: 30.99 },
    // Add more products as needed
];

const displayProducts = (category = null) => {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';
    const filteredProducts = category ? products.filter(p => p.category === category) : products;
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `<h3>${product.name}</h3><p>Price: $${product.price}</p><button onclick='addToCart(${product.id})'>Add to Cart</button>`;
        productContainer.append(productElement);
    });
};

// Shopping cart functionality
let cart = [];

const addToCart = (id) => {
    const product = products.find(p => p.id === id);
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
};

const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCart();
};

const updateCart = () => {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `<h4>${item.name}</h4><p>Price: $${item.price} x ${item.quantity}</p><button onclick='removeFromCart(${item.id})'>Remove</button>`;
        cartContainer.append(itemElement);
    });
};

// Checkout functionality
const checkout = () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Total amount: $${total.toFixed(2)}`);
    cart = []; // Reset cart after checkout
    updateCart();
};

// Contact form handling
const submitContactForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const contactDetails = Object.fromEntries(data);
    alert('Message sent!\n' + JSON.stringify(contactDetails, null, 2));
    form.reset();
};

// Initial load
window.onload = () => {
    displayProducts(); // displaying products on load
};