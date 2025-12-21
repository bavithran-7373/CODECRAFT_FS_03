        const products = [
            { id: 1, name: 'Cotton T-Shirt', category: 'shirts', price: 1100, image: 'images/img3.webp', description: 'Comfortable cotton t-shirt perfect for casual wear.' },
            { id: 2, name: 'Slim Fit Jeans', category: 'pants', price: 1000, image: 'images/img7.webp', description: 'Modern slim fit jeans with a sleek design.' },
            { id: 3, name: 'Leather Jacket', category: 'jackets', price: 1600, image: 'images/img5.jpg', description: 'Classic leather jacket for a stylish look.' },
            { id: 4, name: 'Running Sneakers', category: 'shoes', price: 2500, image: 'images/img6.avif', description: 'Comfortable sneakers ideal for running and sports.' },
            { id: 5, name: 'Wool Blazer', category: 'jackets', price: 2000, image: 'images/img9.webp', description: 'Elegant wool blazer for formal occasions.' },
            { id: 6, name: 'Casual Shirt', category: 'shirts', price: 800, image: 'images/img1.0.jpg', description: 'Versatile casual shirt in various colors.' },
            { id: 7, name: 'Leather Belt', category: 'accessories', price: 400, image: 'images/img4.webp', description: 'Genuine leather belt to complement your outfit.' },
            { id: 8, name: 'Chinos Pants', category: 'pants', price: 900, image: 'images/img2.0.webp', description: 'Comfortable chinos for everyday wear.' },
            { id: 9, name: 'Sunglasses', category: 'accessories', price: 1150, image: 'images/img8.webp', description: 'Stylish sunglasses to protect your eyes.' },
        ];

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        function renderProducts() {
            const list = document.getElementById('product-list');
            const sort = document.getElementById('sort').value;
            const filter = document.getElementById('filter').value;
            let filtered = products.filter(p => filter === 'all' || p.category === filter);
            if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
            else if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
            else filtered.sort((a, b) => a.name.localeCompare(b.name));
            list.innerHTML = filtered.map(p => `
                <div class="product">
                    <img src="${p.image}" alt="${p.name}">
                    <div class="product-content">
                        <h3>${p.name}</h3>
                        <p>${p.description}</p>
                        <p class="price">₹${p.price}</p>
                        <button onclick="addToCart(${p.id})">Add to Cart</button>
                    </div>
                </div>
            `).join('');
        }

        function addToCart(id) {
            const product = products.find(p => p.id === id);
            const existing = cart.find(item => item.id === id);
            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }

        function updateCart() {
            document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            const items = document.getElementById('cart-items');
            const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
            document.getElementById('cart-total').textContent = `Total: ₹${total.toFixed(2)}`;
            items.innerHTML = cart.map((p, i) => `
                <div class="cart-item">
                    <span>${p.name} - ₹${p.price} x ${p.quantity || 1}</span>
                    <button onclick="removeFromCart(${i})">Remove</button>
                </div>
            `).join('');
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }

        function toggleCart() {
            document.getElementById('cart').classList.toggle('show');
        }

        function checkout() {
            alert('Checkout not implemented. In a real site, integrate with payment gateway.');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
            toggleCart();
        }

        document.getElementById('sort').addEventListener('change', renderProducts);
        document.getElementById('filter').addEventListener('change', renderProducts);

        document.getElementById('tracking-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const orderId = document.getElementById('order-id').value;
            // Mock tracking
            document.getElementById('tracking-result').innerHTML = `<p>Order ${orderId}: Shipped on ${new Date().toLocaleDateString()}. Expected delivery: ${new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()}.</p>`;
        });

        document.getElementById('support-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent! We\'ll get back to you soon.');
            e.target.reset();
        });

        renderProducts();
        updateCart();