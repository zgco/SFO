from flask import Flask, render_template, session, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'

# Sample product catalog
products = {
    1: {'name': 'Widget A', 'price': 10},
    2: {'name': 'Widget B', 'price': 20},
    3: {'name': 'Widget C', 'price': 30}
}

@app.route('/')
def home():
    return render_template('index.html', products=products)

@app.route('/add_to_cart/<int:product_id>')
def add_to_cart(product_id):
    if 'cart' not in session:
        session['cart'] = []
    product = products.get(product_id)
    if product:
        session['cart'].append(product)
        session.modified = True
        flash('Added to cart: ' + product['name'])
    else:
        flash('Product not found.')
    return redirect(url_for('home'))

@app.route('/cart')
def cart():
    cart = session.get('cart', [])
    total_price = sum(item['price'] for item in cart)
    return render_template('cart.html', cart=cart, total_price=total_price)

@app.route('/checkout', methods=['GET', 'POST'])
def checkout():
    if 'cart' in session:
        session.pop('cart')
        flash('Thank you for your order!')
    else:
        flash('Your cart is empty.')
    return render_template('checkout.html')

@app.route('/virtualization')
def virtualization():
    return render_template('virtualization.html')

if __name__ == '__main__':
    app.run(debug=True)