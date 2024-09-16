// Function to load the cart from localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
}

// Function to save the cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add an item to the cart
function addItem(name, price) {
    const cart = loadCart();
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex !== -1) {
        // If item exists, increase quantity
        cart[itemIndex].quantity += 1;
    } else {
        // If item does not exist, add new item
        const item = { name, price, quantity: 1 };
        cart.push(item);
    }

    saveCart(cart);
    displayCart();
}

// Function to remove an item from the cart
function removeItem(name) {
    const cart = loadCart();
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity -= 1;
        
        // Remove item if quantity is 0
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1);
        }

        saveCart(cart);
        displayCart();
    } else {
        console.log('Item not found in cart.');
    }
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}

// Function to display the cart
function displayCart() {
    const cart = loadCart();
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = ''; // Clear existing items

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} (Quantity: ${item.quantity})`;
        cartItemsElement.appendChild(li);
    });

    console.log('Cart:', cart);
}

// Initialize the cart display on page load
document.addEventListener('DOMContentLoaded', displayCart);
