class Product:
    def __init__(self, name, price, inventory):
        self.name = name
        self.price = price
        self.inventory = inventory

class ShoppingCartItem:
    def __init__(self, product_name, quantity):
        self.product_name = product_name
        self.quantity = quantity
