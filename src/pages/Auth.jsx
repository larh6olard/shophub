import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { LockKeyhole, Mail, X } from "lucide-react";
import { motion } from "motion/react";

const Auth = () => {
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { signup, login } = useAuth();

  const onSubmit = (data) => {
    setError(null);
    let result = {};
    if (mode === "signup") {
      result = signup(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 pt-18 pb-14 md:pt-24">
      <div className="bg-white dark:bg-gray-700 w-full max-w-md max-sm:mx-5 rounded-lg p-8 mt-14 shadow-lg/20 dark:shadow-2xl dark:border dark:border-gray-500">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8 dark:text-white"
        >
          {mode === "signup" ? "Sign Up" : "Login"}
        </motion.h2>
        <div>
          {error && (
            <div className="bg-red-200 p-2 border-l-3 border-l-red-700 mb-2 flex justify-between text-sm">
              {error}{" "}
              <X
                size={1}
                className="cursor-pointer bg-red-500 text-white size-6 text-center rounded-full font-semibold flex justify-center items-center hover:bg-red-700 transition-colors"
                onClick={() => setError(null)}
              />
            </div>
          )}
          <form action="" autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <label
                htmlFor="email"
                className="block mb-2 text-gray-700 font-medium text-lg dark:text-white"
              >
                Email
              </label>

              <div className="flex items-center w-full border border-gray-300 p-2 rounded-lg">
                <Mail
                  color="gray"
                  size={20}
                  strokeWidth={1.5}
                  className="mr-3 ml-2"
                />
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  autoComplete={mode === "signup" ? "email" : "username"}
                  placeholder="Enter your email"
                  className="w-full p-1 outline-none dark:text-white"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <label
                htmlFor="password"
                className="block mb-2 mt-5 text-gray-700 font-medium text-lg dark:text-white"
              >
                Password
              </label>

              <div className="flex items-center w-full border border-gray-300 p-2 rounded-lg">
                <LockKeyhole
                  color="gray"
                  size={20}
                  strokeWidth={1.5}
                  className="mr-3 ml-2"
                />
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    maxLength: {
                      value: 15,
                      message: "Password must not exceed 15 characters",
                    },
                    minLength: {
                      value: 8,
                      message: "Password must contain at least 8 characters",
                    },
                  })}
                  autoComplete={
                    mode === "signup" ? "new-password" : "current-password"
                  }
                  placeholder="Enter your password"
                  className="w-full p-1 outline-none dark:text-white"
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              type="submit"
              className="bg-blue-500 text-white mt-5 px-7 py-4 rounded-sm font-medium hover:bg-blue-700 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer dark:bg-blue-700"
            >
              {mode === "signup" ? "Register" : "Login"}
            </motion.button>
          </form>
          {mode === "signup" ? (
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-gray-600 mt-6 text-center dark:text-white"
            >
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline dark:text-white"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-gray-600 mt-6 text-center dark:text-white"
            >
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline dark:text-white"
                onClick={() => setMode("signup")}
              >
                Sign up
              </span>
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
