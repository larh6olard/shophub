# ShopHub

A responsive e-commerce front end built with React. Users can browse products, view details, sign up or log in, manage a personal cart, and place an order at checkout.

**Live demo:** [https://shophub-five-alpha.vercel.app/](https://shophub-five-alpha.vercel.app/)

## Features

- **Product catalogue:** browse a grid of products on the home page, with a dedicated details page for each item (`/product/:id`).
- **Authentication:** sign up and log in with form validation (valid email, password of 8–15 characters).
- **Persistent cart:** add items, adjust quantities, or remove them. Each user's cart is saved separately and restored on login.
- **Protected checkout:** the checkout page is only accessible to logged-in users. It shows an order summary, subtotal, and total (including a flat $3.50 fee).
- **Responsive layout:** desktop navbar and a slide-in mobile menu.
- **Animations:** scroll-triggered and entrance animations with Motion.
- **Routing extras:** scroll-to-top on navigation and a 404 page for unknown routes.

## Tech Stack

- [React](https://react.dev/) with Hooks and the Context API
- [React Router](https://reactrouter.com/) for routing
- [React Hook Form](https://react-hook-form.com/) for form handling and validation
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Motion](https://motion.dev/) for animations
- [Lucide React](https://lucide.dev/) for icons
- [Vercel](https://vercel.com/) for deployment

## Project Structure

```
src/
├── components/     # Navbar, Footer, ProductCard, ProtectedRoute, ScrollToTop
├── context/        # AuthContext, CartContext
├── data/           # products.js (static product data)
├── hook/           # useAuth, useCart
├── pages/          # Home, Auth, ProductDetails, Checkout, NotFound
├── App.jsx         # Routes and providers
├── main.jsx        # App entry point
└── index.css       # Tailwind setup and theme
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/larh6olard/shophub.git
cd <your-repo-folder>

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open the local URL shown in your terminal.

## How It Works

- **Data:** products are stored in a static array in `src/data/products.js`. There is no backend.
- **Auth:** accounts and the active session are stored in the browser's `localStorage`. Protected routes check for a saved session.
- **Cart:** state lives in `CartContext` and is saved per user under a `cart_<email>` key, so each account keeps its own cart.
- **Orders:** placing an order shows a confirmation alert and clears the cart. No payment or order data is sent anywhere.

## Notes

This is a front-end demo project. Because authentication uses `localStorage` and passwords are stored in plain text in the browser, **do not use real credentials**. A production version would need a backend with secure authentication and payment processing.

## Possible Improvements

- Connect to a backend API and database
- Secure authentication (hashed passwords, tokens)
- Real payment integration
- Search, filtering, and sorting for products
- Order history

## Author

Built by Habeeb Lasisi.
