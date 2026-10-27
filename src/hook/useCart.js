import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function useCart() {
  const context = useContext(CartContext);

  return context;
}

export default useCart;