import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectTotalAmount,
  selectTotalQuantity,
} from './CartSlice.jsx';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalQuantity = useSelector(selectTotalQuantity);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));

  const handleRemove = (item) => dispatch(removeItem(item.name));

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Checkout is coming soon!');
  };

  const calculateItemTotal = (item) => item.cost * item.quantity;

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h1>Your cart is empty</h1>
          <p>Add a few plants and they will show up here.</p>
          <button type="button" className="get-started-button" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping cart</h1>
      <p className="cart-total-amount">
        Total Cart Amount: <strong>${totalAmount}</strong>
        <span className="cart-total-qty">
          {' '}({totalQuantity} {totalQuantity === 1 ? 'plant' : 'plants'})
        </span>
      </p>

      <div className="cart-items">
        {cart.map((item) => (
          <article className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-unit">Unit price: ${item.cost}</p>
              <div className="cart-item-quantity">
                <button
                  type="button"
                  className="qty-btn"
                  aria-label={`Decrease quantity of ${item.name}`}
                  onClick={() => handleDecrement(item)}
                >
                  −
                </button>
                <span className="qty-value" aria-live="polite">{item.quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  aria-label={`Increase quantity of ${item.name}`}
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <p className="cart-item-total">Subtotal: ${calculateItemTotal(item)}</p>
            </div>
            <button type="button" className="cart-item-delete" onClick={() => handleRemove(item)}>
              Delete
            </button>
          </article>
        ))}
      </div>

      <div className="cart-actions">
        <button type="button" className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <button type="button" className="get-started-button1" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
