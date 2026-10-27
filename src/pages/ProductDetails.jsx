import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/products.js";
import { useEffect, useState } from "react";
import useCart from "../hook/useCart.js";
import { motion } from "motion/react";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    const foundProduct = getProductById(id);

    if (!foundProduct) {
      navigate("/");
      return;
    }

    setProduct(foundProduct);
  }, [id, navigate]);

  if (!product) {
    return <div>Loading...</div>
  }
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className="min-h-screen bg-gray-100 p-12 pt-32 pb-14 md:pt-44"
    >
      <div className="bg-white mx-auto rounded-xl p-7 shadow-lg/20 md:flex md:space-x-10">
        <motion.img
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          src={product.image}
          className="object-cover w-full rounded-tr-xl rounded-xl overflow-clip md:w-2/3"
          alt={product.name}
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 space-y-7 md:mt-0"
        >
          <h3 className="font-bold text-4xl text-gray-800">{product.name}</h3>
          <p className="text-blue-600 font-bold text-4xl">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>
          <button
            type="button"
            className="bg-blue-600 text-white w-40 p-3 cursor-pointer rounded-lg hover:bg-blue-800 transition-all duration-200 hover:-translate-y-0.5 text-lg font-medium"
            onClick={() => addToCart(product.id)}
          >
            Add to cart{" "}
            {cartItems.map((item) =>
              item.id === product.id ? (
                <span>{`(${item.quantity})`}</span>
              ) : (
                <span>{""}</span>
              ),
            )}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
