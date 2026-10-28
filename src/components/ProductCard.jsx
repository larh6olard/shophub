import { Link } from "react-router-dom";
import useCart from "../hook/useCart";
import { motion } from "motion/react";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.3, type: "spring" }}
      viewport={{ once: true }}
      className="rounded-xl bg-white dark:bg-gray-700 shadow-md hover:shadow-lg dark:hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 dark:border dark:border-gray-500"
    >
      <img
        src={product.image}
        alt="wireless headphone"
        className="w-full rounded-tr-xl rounded-tl-xl h-64 object-cover overflow-clip"
      />
      <div className="p-7 space-y-2 text-[15px]">
        <h3 className="font-bold text-xl text-gray-800 dark:text-white">
          {product.name}
        </h3>
        <p className="text-blue-600 font-bold text-2xl dark:text-white">
          ${product.price}
        </p>
        <div className="space-x-2.5">
          <Link
            to={`product/${product.id}`}
            className="bg-gray-600 cursor-pointer font-medium inline-block rounded-sm p-2 text-white transition-all duration-200 hover:bg-gray-700 dark:bg-black dark:hover:bg-gray-900"
          >
            View Details
          </Link>
          <button
            type="button"
            className="cursor-pointer font-medium inline-block rounded-sm p-2 text-white transition-all duration-200 bg-[var(--signup-color)] hover:bg-blue-700"
            onClick={() => addToCart(product.id)}
          >
            Add to Cart{" "}
            {cartItems.map((item) =>
              item.id === product.id ? (
                <span key={product.id}>{`(${item.quantity})`}</span>
              ) : (
                ""
              ),
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
