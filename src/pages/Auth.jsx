import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { LockKeyhole, Mail } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-18 pb-14 md:pt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="bg-white w-full max-w-md rounded-lg p-8 mt-14 shadow-lg/20"
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8">
          {mode === "signup" ? "Sign Up" : "Login"}
        </h2>
        <div>
          {error && (
            <div className="bg-red-200 p-2 border-l-3 border-l-red-700 mb-2 flex justify-between text-sm">
              {error}{" "}
              <span
                className="cursor-pointer bg-red-500 text-white size-6 text-center rounded-full font-semibold flex justify-center items-center hover:bg-red-700 transition-colors"
                onClick={() => setError(null)}
              >
                X
              </span>
            </div>
          )}
          <form action="" autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-gray-700 font-medium text-lg"
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
                  className="w-full p-1 outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 mt-5 text-gray-700 font-medium text-lg"
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
                  className="w-full p-1 outline-none"
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white mt-5 px-7 py-4 rounded-sm font-medium hover:bg-blue-700 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              {mode === "signup" ? "Register" : "Login"}
            </button>
          </form>
          {mode === "signup" ? (
            <p className="text-gray-600 mt-6 text-center">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-gray-600 mt-6 text-center">
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setMode("signup")}
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
