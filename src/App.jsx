import { useState } from 'react';
import './App.css';

const products = [
  {
    id: 1,
    name: 'Seam XVIII Signature',
    brand: 'ONE8 × VIRAT KOHLI',
    category: 'SIGNATURE SNEAKERS',
    price: 8999,
    image: 'https://one8.com/cdn/shop/files/V10018202_03_85eb5a22-87ae-4a9e-ac46-58b67e110510.jpg?v=1794831912&width=1500',
    featured: true,
    description: 'Cricket-inspired lifestyle sneaker, co-created with Virat Kohli.'
  },
  {
    id: 2,
    name: 'Performance Training Tee',
    brand: 'SPORTS ESSENTIALS',
    category: 'APPAREL',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700',
    description: 'A clean everyday training essential.'
  },
  {
    id: 3,
    name: 'Active Training Shoes',
    brand: 'SPORTS ESSENTIALS',
    category: 'FOOTWEAR',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700',
    description: 'Sport-inspired footwear for everyday movement.'
  },
  {
    id: 4,
    name: 'Performance Gym Bag',
    brand: 'SPORTS ESSENTIALS',
    category: 'ACCESSORIES',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700',
    description: 'Carry your everyday training essentials.'
  },
  {
    id: 5,
    name: 'Classic Sports Cap',
    brand: 'SPORTS ESSENTIALS',
    category: 'ACCESSORIES',
    price: 899,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=700',
    description: 'A versatile finishing touch for a sporty look.'
  },
  {
    id: 6,
    name: 'Training Sports Watch',
    brand: 'SPORTS ESSENTIALS',
    category: 'ACCESSORIES',
    price: 2799,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700',
    description: 'A sporty everyday accessory.'
  }
];

const formatPrice = price => `₹${price.toLocaleString('en-IN')}`;

function ShoppingCart({ cart, increase, decrease, remove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <aside className="cart" id="shopping-cart">
      <div className="cart-heading">
        <div>
          <span className="eyebrow">YOUR SELECTION</span>
          <h2>Your Bag <span>({count})</span></h2>
        </div>
        <span className="bag-icon">01</span>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🛍</div>
          <h3>Your bag is waiting</h3>
          <p>Discover your favourites and add something you love.</p>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>{formatPrice(item.price)}</p>
                <div className="quantity">
                  <button onClick={() => decrease(item.id)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increase(item.id)}>+</button>
                </div>
              </div>
              <button className="remove" onClick={() => remove(item.id)}>×</button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <div className="subtotal">
          <span>Subtotal</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <p className="shipping-note">Shipping calculated at checkout.</p>
        <div className="total">
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <button
          className="checkout-button"
          disabled={cart.length === 0}
          onClick={() => alert('Thank you! This is a shopping cart demo project.')}
        >
          CONTINUE <span>→</span>
        </button>
        <p className="secure-note">✦ Shopping cart demonstration project</p>
      </div>
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
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0)
    );
  }

  function remove(id) {
    setCart(current => current.filter(item => item.id !== id));
  }

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="store">
      <div className="announcement">
        BUILT FOR THE GAME. DESIGNED FOR EVERY DAY.
      </div>

      <header className="site-header">
        <a className="logo" href="#">
          ONE<span>8</span><small>SPORTS EDIT</small>
        </a>

        <nav>
          <a href="#home">HOME</a>
          <a href="#products">COLLECTION</a>
          <a href="#signature">SIGNATURE</a>
        </nav>

        <a className="header-bag" href="#shopping-cart">
          BAG <span>{itemCount}</span>
        </a>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <span className="hero-label">THE SIGNATURE COLLECTION · 18</span>
          <h1>PLAY YOUR<br /><em>OWN GAME.</em></h1>
          <p>
            Inspired by the spirit of cricket. Created for those
            who bring their own style to every moment.
          </p>
          <a href="#products" className="hero-button">
            EXPLORE COLLECTION <span>↗</span>
          </a>
          <div className="hero-bottom">SPORT IS A STATE OF MIND.</div>
        </div>

        <div className="hero-image">
          <img
            src={products[0].image}
            alt="ONE8 signature sneaker"
          />
          <div className="hero-image-caption">
            <span>01 / SIGNATURE SERIES</span>
            <span>VIRAT KOHLI × ONE8</span>
          </div>
        </div>
      </section>

      <section className="collection-intro" id="signature">
        <div>
          <span className="eyebrow">THE COLLECTION</span>
          <h2>Performance meets <em>personality.</em></h2>
        </div>
        <p>
          Explore signature footwear and sport-inspired everyday
          essentials. Find your style. Make your move.
        </p>
      </section>

      <main className="shop-layout" id="products">
        <section className="products-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CURATED FOR YOU</span>
              <h2>Shop the collection</h2>
            </div>
            <span className="product-count">06 PRODUCTS</span>
          </div>

          <div className="product-grid">
            {products.map((product, index) => (
              <article
                className={`product-card ${product.featured ? 'featured-product' : ''}`}
                key={product.id}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  {product.featured && (
                    <span className="product-badge">VIRAT KOHLI SIGNATURE</span>
                  )}
                  <span className="product-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="product-details">
                  <span className="product-category">{product.brand}</span>
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-bottom">
                    <strong>{formatPrice(product.price)}</strong>
                    <button onClick={() => addToCart(product)}>
                      ADD TO BAG <span>+</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="demo-disclaimer">
            Demo store: only the featured ONE8 sneaker uses official
            product details. Other products and prices are sample items
            created for this React assignment.
          </p>
        </section>

        <ShoppingCart
          cart={cart}
          increase={increase}
          decrease={decrease}
          remove={remove}
        />
      </main>

      <footer>
        <div className="footer-logo">ONE<span>8</span></div>
        <p>BUILT FOR THE GAME. DESIGNED FOR EVERY DAY.</p>
        <span>© 2026 ONE8 SPORTS EDIT · STUDENT PROJECT</span>
      </footer>
    </div>
  );
}

export default App;
