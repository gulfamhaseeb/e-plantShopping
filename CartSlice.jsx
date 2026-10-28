import { createSlice } from '@reduxjs/toolkit';

// Each cart item: { name, image, description, cost, quantity }
const initialState = {
  items: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a plant, or increase its quantity if it is already in the cart
    addItem: (state, action) => {
      const { name, image, description, cost } = action.payload;
      const existing = state.items.find((item) => item.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        state.items.push({ name, image, description, cost, quantity: 1 });
      }
    },
    // Remove a plant type from the cart entirely
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    // Set a plant's quantity; a quantity of 0 or less removes it
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existing = state.items.find((item) => item.name === name);
      if (!existing) return;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.name !== name);
      } else {
        existing.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectTotalAmount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.cost * item.quantity, 0);

export default CartSlice.reducer;
