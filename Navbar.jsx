import React from 'react';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from './CartSlice.jsx';

function Navbar({ view, onNavigate }) {
  const totalQuantity = useSelector(selectTotalQuantity);
  const link = (target, label) => (
    <button
      type="button"
      className={`nav-link ${view === target ? 'active' : ''}`}
      aria-current={view === target ? 'page' : undefined}
      onClick={() => onNavigate(target)}
    >
      {label}
    </button>
  );

  return (
    <header className="navbar">
      <button type="button" className="brand" onClick={() => onNavigate('landing')}>
        <img
          className="brand-logo"
          alt=""
          src={`data:image/svg+xml;utf8,${encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#D8F26B"/><path d="M20 32V18M20 22c-6 0-9-4-9-9 6 0 9 3 9 9zm0 4c5 0 8-3 8-8-5 0-8 3-8 8z" fill="#1F5C3A" stroke="#1F5C3A" stroke-width="1.5" stroke-linejoin="round"/></svg>'
          )}`}
        />
        <span>
          Paradise Nursery
          <small>Where green meets serenity</small>
        </span>
      </button>
      <nav className="nav-links" aria-label="Main">
        {link('landing', 'Home')}
        {link('products', 'Plants')}
        <button
          type="button"
          className={`nav-link cart-link ${view === 'cart' ? 'active' : ''}`}
          aria-current={view === 'cart' ? 'page' : undefined}
          aria-label={`Shopping cart, ${totalQuantity} items`}
          onClick={() => onNavigate('cart')}
        >
          <svg viewBox="0 0 256 256" width="30" height="30" aria-hidden="true">
            <rect width="256" height="256" fill="none" />
            <circle cx="80" cy="216" r="12" fill="currentColor" />
            <circle cx="184" cy="216" r="12" fill="currentColor" />
            <path
              d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
          <span className="cart-count">{totalQuantity}</span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
