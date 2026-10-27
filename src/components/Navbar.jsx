import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import useCart from "../hook/useCart";
import { motion } from "motion/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    clearCart();
    logout();
    navigate("/auth");
  };

  const navLinkClass = {
    normal: `font-medium flex justify-center items-center hover:text-white transition-all duration-200  p-2 w-42 rounded-xl hover:bg-blue-400 text-gray-800 hover:scale-105`,
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
      className="fixed right-0 left-0 bg-white w-full z-10"
    >
      {/* Dark Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Navigation */}
      <div>
        <div className="flex justify-between px-10 py-5 shadow-md lg:hidden">
          <Link to="/" className="font-bold text-2xl">
            ShopHub
          </Link>
          <button type="button" className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26px"
              viewBox="0 -960 960 960"
              width="26px"
              fill="#1f1f1f"
              onClick={handleToggle}
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
        </div>

        {/* Mobile Nav Links */}
        <div className="">
          <div
            className={`flex flex-col space-y-5 bg-gray-100 w-70 items-center h-screen py-30 top-0 right-0 fixed z-50 transform transition-transform duration-300 ease-in-out shadow-lg/20 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <button
              type="button"
              className="fixed top-10 right-10 cursor-pointer bg-red-500 rounded-full p-1 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </button>
            {/* Home */}
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `${navLinkClass.normal} ${isActive ? "bg-blue-400 text-white" : "bg-gray-300"}`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                className="inline-block mr-1.5"
                fill="#1f1f1f"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
              </svg>{" "}
              Home
            </NavLink>
            {/* Cart */}
            <NavLink
              to="/checkout"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `${navLinkClass.normal} ${isActive ? "bg-blue-400 text-white" : "bg-gray-300"}`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
                className="inline-block mr-1.5"
              >
                <path d="m480-560-56-56 63-64H320v-80h167l-64-64 57-56 160 160-160 160ZM223.5-103.5Q200-127 200-160t23.5-56.5Q247-240 280-240t56.5 23.5Q360-193 360-160t-23.5 56.5Q313-80 280-80t-56.5-23.5Zm400 0Q600-127 600-160t23.5-56.5Q647-240 680-240t56.5 23.5Q760-193 760-160t-23.5 56.5Q713-80 680-80t-56.5-23.5ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" />
              </svg>
              Cart
            </NavLink>
            {/* Login */}
            {!user ? (
              <div className="space-y-5">
                <NavLink
                  to="/auth"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `${navLinkClass.normal} ${isActive ? "bg-blue-400 text-white" : "bg-gray-300"}`
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1f1f1f"
                    className="inline-block mr-1.5"
                  >
                    <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                  </svg>{" "}
                  Login
                </NavLink>
                {/* Signup */}
                <NavLink
                  to="/auth"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `${navLinkClass.normal} ${isActive ? "bg-blue-400 text-white" : "bg-gray-300"}`
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1f1f1f"
                    className="inline-block mr-1.5"
                  >
                    <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-640Zm0 400Z" />
                  </svg>{" "}
                  Singup
                </NavLink>
              </div>
            ) : (
              <div className="text-center">
                <button
                  type="button"
                  className="bg-red-800 text-white cursor-pointer text-base font-medium inline-block rounded-xl p-2 w-42 transition-all duration-200 hover:scale-105 hover:bg-red-600"
                  onClick={() => {
                    (handleLogout(), setIsMenuOpen(false));
                  }}
                >
                  Logout
                </button>
                <p className="mt-5">Hello, {user.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="flex justify-between items-center px-30 py-5 shadow-md">
          <div>
            <Link to="/" className="font-bold text-2xl">
              ShobHub
            </Link>
          </div>
          <div className="space-x-10 font-semibold text-gray-700">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-blue-500 transition-colors duration-200 text-lg ${isActive ? "text-blue-500" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/checkout"
              className={({ isActive }) =>
                `hover:text-blue-500 transition-colors duration-200 text-lg ${isActive ? "text-blue-500" : ""}`
              }
            >
              Cart
            </NavLink>
          </div>

          {!user ? (
            <div className="space-x-5">
              <Link
                to="/auth"
                className="bg-gray-600 cursor-pointer text-lg font-medium inline-block rounded-sm px-4 py-3 text-white transition-all duration-200 hover:bg-gray-700 hover:-translate-y-0.5"
              >
                Login
              </Link>
              <Link
                to="/auth"
                className="cursor-pointer text-lg font-medium inline-block rounded-sm px-4 py-3 text-white transition-all duration-200 hover:-translate-y-0.5 bg-[var(--signup-color)] hover:bg-blue-700"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="space-x-7">
              <span className="font-semibold text-gray-700">
                Hello, {user.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-red-800 text-white cursor-pointer text-lg font-medium inline-block rounded-sm px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
