import { useState } from 'react';
import './App.css';

const products = [
  { id: 1, name: 'Wireless Headphones', price: 59.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
  { id: 2, name: 'Classic Watch', price: 89.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
  { id: 3, name: 'Red Sneakers', price: 74.50, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
  { id: 4, name: 'Travel Backpack', price: 45.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' },
  { id: 5, name: 'Digital Camera', price: 129.99, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500' },
  { id: 6, name: 'Desk Lamp', price: 35.99, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500' }
];

function ShoppingCart({ cart, increase, decrease, remove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside className="cart">
      <h2>🛒 Your Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</h2>
      {cart.length === 0 ? <p className="empty">Your cart is empty. Add some products!</p> :
        cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="cart-info">
              <h4>{item.name}</h4>
              <p>${item.price.toFixed(2)}</p>
              <div className="quantity">
                <button onClick={() => decrease(item.id)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => increase(item.id)}>+</button>
              </div>
            </div>
            <button className="remove" onClick={() => remove(item.id)}>Remove</button>
          </div>
        ))
      }
      <div className="total">Total: <strong>${total.toFixed(2)}</strong></div>
    </aside>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart(current => {
      const found = current.find(item => item.id === product.id);
      if (found) {
        return current.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function increase(id) {
    setCart(current => current.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  }

  function decrease(id) {
    setCart(current => current
      .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
      .filter(item => item.quantity > 0)
    );
  }

  function remove(id) {
    setCart(current => current.filter(item => item.id !== id));
  }

  return (
    <div className="page">
      <header>
        <h1>LUMI<span>.</span></h1>
        <p>Discover your everyday favorites.</p>
      </header>

      <main>
        <section className="products">
          <h2>Our Products</h2>
          <div className="product-grid">
            {products.map(product => (
              <article className="product" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <strong>${product.price.toFixed(2)}</strong>
                  <button onClick={() => addToCart(product)}>Add to Cart +</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ShoppingCart
          cart={cart}
          increase={increase}
          decrease={decrease}
          remove={remove}
        />
      </main>

      <footer>© 2026 LUMI Store | React Shopping Cart Homework</footer>
    </div>
  );
}

export default App;
