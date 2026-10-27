import { createContext, useEffect, useState } from "react";
import { getProductById } from "../data/products";
import useAuth from "../hook/useAuth";

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(getCartKey());

    return savedCart ? JSON.parse(savedCart) : [];
  });
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }

    const savedCart = localStorage.getItem(`cart_${user.email}`);
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  }, [user]);

  useEffect(() => {
    const email = localStorage.getItem("currentUserEmail");
    if (!email) return;

    localStorage.setItem(`cart_${email}`, JSON.stringify(cartItems));
  }, [cartItems]);

  function getCartKey() {
    const email = localStorage.getItem("currentUserEmail");

    return email ? `cart_${email}` : null;
  }

  const addToCart = (productId) => {
    const currentUserEmail = localStorage.getItem("currentUserEmail");

    if (!currentUserEmail) {
      alert("Login or signup before you can add items to the cart!");
      return;
    }

    setCartItems((currentItems) => {
      const itemExist = currentItems.find((item) => item.id === productId);

      if (itemExist) {
        return currentItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { id: productId, quantity: 1 }];
    });
  };

  function getCartItemsWithProducts() {
    return cartItems
      .map((item) => ({
        ...item,
        product: getProductById(item.id),
      }))
      .filter((item) => item.product);
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  function getCartTotal() {
    const total = cartItems.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
    return total;
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        getCartItemsWithProducts,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
export default CartProvider;
