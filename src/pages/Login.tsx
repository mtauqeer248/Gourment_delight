import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Login-specific email and password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    } else if (password.trim().length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    } else {
      setError("");
    }

    try {
      await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have successfully logged in!",
      });
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-600 text-sm mb-2">{error}</div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full rounded-md border-2 shadow-sm focus:ring-indigo-500 px-4 py-3 ${
                  email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                    ? "border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
              />
              {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                <p className="text-red-500 text-sm mt-1">Invalid email address</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full rounded-md border-2 shadow-sm focus:ring-indigo-500 px-4 py-3 ${
                  password && password.length < 6
                    ? "border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
              />
              {password && password.length < 6 && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </motion.div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don&apos;t have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/register"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create an account
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}


