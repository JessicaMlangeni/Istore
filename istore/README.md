# 🛍 ShopLux — Premium Tech E-Commerce App

A fully responsive e-commerce app built with **React + Redux Toolkit + React Router + Bootstrap 5**, following the Vite React template structure.

---

## 📁 Project Structure

```
shoplux/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx              ← Entry point (Redux Provider + Bootstrap)
    ├── App.jsx               ← Router + route definitions
    ├── styles/
    │   └── global.css        ← CSS variables, animations, global resets
    ├── store/
    │   ├── store.js          ← Redux configureStore
    │   ├── productsSlice.js  ← Product catalogue (static data)
    │   ├── bagSlice.js       ← Shopping bag state + selectors
    │   └── checkoutSlice.js  ← Addresses, payments, order state
    ├── utils/
    │   └── helpers.js        ← formatPrice, discountPct
    ├── components/
    │   ├── Navbar.jsx          ← Sticky nav with live bag count badge
    │   ├── ProductCard.jsx     ← Hover card with quick-add button
    │   ├── Stars.jsx           ← Star rating display
    │   ├── Toast.jsx           ← Slide-up notification
    │   └── OrderSuccessModal.jsx
    └── pages/
        ├── Dashboard.jsx     ← Product grid with search + category filters
        ├── ItemView.jsx      ← Product detail, tabs, related products
        ├── Bag.jsx           ← Bag items, qty controls, order summary
        ├── Checkout.jsx      ← Address + payment selection, place order
        ├── AddPayment.jsx    ← 3D card flip form
        └── AddAddress.jsx    ← Address form with live preview
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔧 Tech Stack

| Tool               | Purpose                         |
|--------------------|---------------------------------|
| **Vite**           | Build tool & dev server         |
| **React 18**       | UI framework                    |
| **Redux Toolkit**  | Global state management         |
| **React Redux**    | React bindings for Redux        |
| **React Router 6** | Client-side routing             |
| **Bootstrap 5**    | Responsive grid & utilities     |

---

## 📱 Pages / Routes

| Route           | Page          | Description                              |
|-----------------|---------------|------------------------------------------|
| `/`             | Dashboard     | Product grid with search & category tabs |
| `/product/:id`  | Item View     | Product detail, specs, reviews           |
| `/bag`          | Bag           | Cart items with qty controls             |
| `/checkout`     | Checkout      | Address + payment selection              |
| `/add-payment`  | Add Payment   | 3D flip card form                        |
| `/add-address`  | Add Address   | Shipping address form                    |

---

## 🎨 Design Tokens (CSS Variables)

Defined in `src/styles/global.css`:

```css
--primary:        #e94560   /* Brand red */
--dark:           #1a1a2e   /* Dark navy */
--success:        #10b981   /* Green */
--font-body:      'DM Sans'
--font-display:   'Playfair Display'
--radius-lg:      16px
--shadow-sm / md / lg
```
