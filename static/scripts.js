document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        { id: 1, name: 'Product A', price: 20.00, inventory: 5 },
        { id: 2, name: 'Product B', price: 30.00, inventory: 10 },
        { id: 3, name: 'Product C', price: 25.00, inventory: 3 },
    ];

    // Sample shopping cart data
    const shoppingCart = [];

    // Display products
    const productList = document.getElementById('productList');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <span>${product.name}</span>
            <span>$${product.price.toFixed(2)}</span>
            <span>Inventory: ${product.inventory}</span>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });

    // Add event listener for "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(button.dataset.id);
            const product = products.find(p => p.id === productId);

            // Check inventory before adding to cart
            if (product && product.inventory > 0) {
                // Reduce inventory
                product.inventory--;

                // Update server-side data (simulate server-side logic)
                // This step would involve making an API call to update server data
                // For now we just log the change to the console
                console.log(`Reduced inventory for ${product.name}. Remaining: ${product.inventory}`);

                // Add to shopping cart
                const existingCartItem = shoppingCart.find(item => item.productId === productId);
                if (existingCartItem) {
                    existingCartItem.quantity++;
                } else {
                    shoppingCart.push({ productId, quantity: 1 });
                }

                // Update cart display
                updateCartDisplay();
            } else {
                alert('Product is out of stock!');
            }
        });
    });

    // Function to update cart display
    function updateCartDisplay() {
        const cart = document.getElementById('cart');
        const totalPriceElement = document.getElementById('totalPrice');
        let totalPrice = 0;

        // Clear existing cart items
        cart.innerHTML = '<h2>Shopping Cart</h2>';

        // Display cart items
        shoppingCart.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <span>${product.name}</span>
                    <span>Quantity: ${item.quantity}</span>
                `;
                cart.appendChild(cartItemDiv);

                // Calculate total price
                totalPrice += product.price * item.quantity;
            }
        });

        // Update total price
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    // Add event listener for "Proceed to Checkout" button
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.addEventListener('click', function() {
        // Hide cart and show order confirmation
        document.getElementById('cart').classList.add('hidden');
        document.getElementById('orderConfirmation').classList.remove('hidden');

        // Simulate server-side checkout process (e.g., order confirmation email)
        console.log('Simulating server-side checkout process...');
    });
});
