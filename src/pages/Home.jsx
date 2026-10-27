import { getProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import { motion } from "motion/react";

const Home = () => {
  const products = getProducts();

  return (
    <div className="min-h-screen bg-gray-100 pt-18 md:pt-32">
      <div className="text-center px-16 py-26 space-y-6 lg:py-30">
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="font-bold text-4xl"
        >
          Welcome to ShopHub
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-xl tracking-wider text-gray-700"
        >
          Discover amazing products at great prices
        </motion.p>
      </div>

      <div className="p-10 lg:px-24">
        <div className="text-left md:text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="inline-block text-3xl font-bold text-gray-800 mb-10"
          >
            Our Products
          </motion.h2>
        </div>

        <div
          className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
