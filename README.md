# Paradise Nursery – e-plantShopping

An online plant shop built with **React**, **Redux Toolkit** and **Vite**.

## Features

- **Landing page** with a company description (`AboutUs.jsx`) and a **Get Started** button that opens the product list.
- **Navigation bar** with links to Home, Plants and the Shopping Cart. The cart icon shows the live total number of plants in the cart.
- **Product listing** with three sections (Air Purifying, Aromatic and Medicinal plants). Each plant card shows an image, name, description, price and an **Add to Cart** button. A plant already in the cart shows a disabled **Added to Cart** button.
- **Shopping cart** with a card for each plant type: thumbnail, unit cost, subtotal, **+ / −** quantity buttons (decreasing from 1 removes the plant) and a **Delete** button. The total cart amount updates instantly.
- **Continue Shopping** (returns to the product list) and **Checkout** (shows a "coming soon" message) buttons.

## Project structure

```
e-plantShopping/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx        # entry point, wraps the app in the Redux Provider
    ├── store.js        # Redux store
    ├── CartSlice.jsx   # addItem, removeItem, updateQuantity + selectors
    ├── App.jsx         # landing page and view switching
    ├── Navbar.jsx      # navigation bar with cart count
    ├── AboutUs.jsx     # company description
    ├── ProductList.jsx # plant sections and cards
    ├── CartItem.jsx    # shopping cart page
    └── App.css         # styles
```

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Create a **public** GitHub repository named `e-plantShopping` and push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Paradise Nursery shopping cart"
   git branch -M main
   git remote add origin https://github.com/YOUR-GITHUB-USERNAME/e-plantShopping.git
   git push -u origin main
   ```
2. In `package.json`, replace `YOUR-GITHUB-USERNAME` in the `homepage` field.
3. Run:
   ```bash
   npm run deploy
   ```
4. In the repository, go to **Settings → Pages** and set the source to the `gh-pages` branch (root).
5. Your live URL will be `https://YOUR-GITHUB-USERNAME.github.io/e-plantShopping/`.

> `vite.config.js` uses `base: '/e-plantShopping/'`. If you name the repository differently, change it to match.

## Live application

`https://YOUR-GITHUB-USERNAME.github.io/e-plantShopping/`  *(update after deploying)*

## Repository

`https://github.com/YOUR-GITHUB-USERNAME/e-plantShopping`
