import useAuth from "../hook/useAuth";
import useCart from "../hook/useCart";
import { motion } from "motion/react";

const Checkout = () => {
  const {
    getCartItemsWithProducts,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
  } = useCart();
  const cartItems = getCartItemsWithProducts();
  const total = getCartTotal();
  const { user } = useAuth();

  const handleOrder = () => {
    if (!user) {
      alert("Please login or signup before you can place an order!");
      return;
    }

    if (total !== 0) {
      alert(`Successfully placed order worth $${(total + 3.5).toFixed(2)}`);
      clearCart();
      return total;
    }

    alert(`Add item(s) to cart before placing order.`);
    return;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white py-28 md:py-32 px-5 md:px-16 lg:px-24">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-gray-800 dark:text-white"
      >
        Checkout
      </motion.h2>
      <div className="space-y-8 mt-12 md:space-y-0 md:flex md:space-x-7">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="p-8 bg-white dark:bg-gray-700 shadow-lg rounded-lg space-y-4 md:w-2/3 dark:border dark:border-gray-500 dark:shadow-2xl"
        >
          <h3 className="text-gray-800 dark:text-white font-bold text-2xl mb-8">
            Order Summary
          </h3>
          {cartItems.map((item) => (
            <div key={item.id}>
              <div className="space-y-2 lg:grid lg:grid-cols-2 lg:items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="size-30 rounded-md"
                />
                <p className="text-gray-800 dark:text-white font-bold text-xl">
                  {item.product.name}
                </p>
                <p className="text-gray-700 dark:text-white">$ {item.product.price} each</p>
                <div className="flex space-x-4 items-center font-semibold">
                  <button
                    type="button"
                    className="border border-gray-300 w-7 text-lg cursor-pointer hover:bg-gray-200 dark:hover:text-black transition-colors duration-150"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    type="button"
                    className="border border-gray-300 w-7 font-semibold text-lg cursor-pointer hover:bg-gray-200 dark:hover:text-black transition-colors duration-150"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <p className="font-bold text-gray-800 dark:text-white/90 text-lg">
                  $ {(item.quantity * item.product.price).toFixed(2)}
                </p>
                <button
                  type="button"
                  className="bg-gray-500 dark:bg-red-600 dark:hover:bg-red-500 hover:-translate-y-0.5 dark:font-medium text-white w-24 p-1 rounded-md cursor-pointer hover:bg-gray-700 transition-all duration-200"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
              <hr className="my-5 text-gray-300 dark:text-gray-500" />
            </div>
          ))}
          {cartItems.length === 0 && (
            <p className="text-lg font-medium text-gray-700 dark:text-white">No orders yet</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="p-8 bg-white shadow-lg rounded-lg space-y-6 md:w-1/3 md:h-full md:sticky top-28 dark:bg-gray-700 dark:border dark:border-gray-500 dark:text-white dark:shadow-2xl"
        >
          <h3 className="text-gray-800 text-xl lg:text-2xl font-bold dark:text-white">
            Total
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 lg:text-lg dark:text-white">
              Subtotal:
            </span>
            <span className="lg:text-lg text-gray-800 dark:text-white">
              $ {total.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 text-xl lg:text-lg dark:text-white">
              Total <span className="text-[15px]">{`(tax inclusive)`}</span>:
            </span>
            <span className="text-xl lg:text-2xl font-bold text-blue-500 dark:text-white">
              $ {total ? (total + 3.5).toFixed(2) : total.toFixed(2)}
            </span>
          </div>
          <hr className="text-gray-400" />
          <button
            type="button"
            className="bg-blue-600 text-white text-lg rounded-lg font-medium cursor-pointer w-full p-3 hover:bg-blue-800 transition-all duration-200 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            onClick={handleOrder}
          >
            Place Order
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
