import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function App() {
  // 'landing' | 'products' | 'cart'
  const [view, setView] = useState('landing');

  const navigate = (target) => {
    setView(target);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="app">
      <Navbar view={view} onNavigate={navigate} />

      {view === 'landing' && (
        <main className="landing">
          <div className="landing-hero">
            <h1>Paradise Nursery</h1>
            <p className="landing-tagline">
              House plants that clean your air, scent your rooms and look after
              you in return.
            </p>
            <button
              type="button"
              className="btn btn-lime btn-large"
              onClick={() => navigate('products')}
            >
              Get Started
            </button>
          </div>
          <AboutUs />
        </main>
      )}

      {view === 'products' && (
        <main>
          <ProductList />
        </main>
      )}

      {view === 'cart' && (
        <main>
          <CartItem onContinueShopping={() => navigate('products')} />
        </main>
      )}
    </div>
  );
}

export default App;
