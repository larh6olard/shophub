import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import AuthProvider from "./context/AuthContext";
import NotFound from "./pages/NotFound";
import CartProvider from "./context/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("c_theme") ? localStorage.getItem("c_theme") : "light",
  );

  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Navbar theme={theme} setTheme={setTheme} />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
