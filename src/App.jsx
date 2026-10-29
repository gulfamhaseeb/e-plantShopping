import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function App() {
  const [view, setView] = useState('landing');
  const [showProductList, setShowProductList] = useState(false);

  const navigate = (target) => {
    setView(target);
    setShowProductList(target === 'products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetStartedClick = () => {
    setShowProductList(true);
    setView('products');
  };

  return (
    <div className="app-container">
      <Navbar view={view} onNavigate={navigate} />

      {view === 'landing' && (
        <main className="landing-page background-image">
          <div className="landing-hero">
            <h1>Welcome to Paradise Nursery</h1>
            <p className="landing-tagline">
              House plants that clean your air, scent your rooms and look after
              you in return.
            </p>
            <button
              type="button"
              className="get-started-button"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
          </div>
          <AboutUs />
        </main>
      )}

      {showProductList && view === 'products' && (
        <ProductList onNavigate={navigate} />
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
