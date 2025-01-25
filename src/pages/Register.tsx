/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { motion } from "framer-motion";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [error, setError] = useState({
    email: "",
    password: "",
    username: "",
    mobileNumber: "",
  });
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email:string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobileNumber = (mobile:string) => /^\d{10}$/.test(mobile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = {
      email: validateEmail(email) ? "" : "Invalid email address",
      password:
        password.length >= 6 ? "" : "Password must be at least 6 characters",
      username: username.trim() !== "" ? "" : "Username is required",
      mobileNumber: validateMobileNumber(mobileNumber)
        ? ""
        : "Mobile number must be 10 digits",
    };

    setError(newError);

    if (Object.values(newError).some((err) => err !== "")) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please correct the errors in the form",
      });
      return;
    }

    try {
      await signUp(email, password);
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Your account has been created!",
      });
      navigate("/login");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "An error occurred. Please try again.",
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
          Create your account
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
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`mt-1 block w-full rounded-md border-2 shadow-sm focus:ring-indigo-500 px-4 py-3 ${
                  error.username ? "border-red-500" : "border-gray-300 focus:border-indigo-500"
                }`}
              />
              {error.username && (
                <p className="text-red-500 text-sm mt-1">{error.username}</p>
              )}
            </div>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full rounded-md border-2 shadow-sm focus:ring-indigo-500 px-4 py-3 ${
                  error.email ? "border-red-500" : "border-gray-300 focus:border-indigo-500"
                }`}
              />
              {error.email && (
                <p className="text-red-500 text-sm mt-1">{error.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="mobileNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number
              </label>
              <div className="flex items-center space-x-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="block w-1/3 rounded-md border-2 border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="+1">+1 (US)</option>
                  <option value="+91">+91 (India)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+61">+61 (Australia)</option>
                  <option value="+81">+81 (Japan)</option>
                </select>
                <input
                  id="mobileNumber"
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className={`block w-full rounded-md border-2 shadow-sm px-4 py-3 ${
                    error.mobileNumber ? "border-red-500" : "border-gray-300 focus:border-indigo-500"
                  }`}
                />
              </div>
              {error.mobileNumber && (
                <p className="text-red-500 text-sm mt-1">{error.mobileNumber}</p>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full rounded-md border-2 shadow-sm focus:ring-indigo-500 px-4 py-3 ${
                  error.password ? "border-red-500" : "border-gray-300 focus:border-indigo-500"
                }`}
              />
              {error.password && (
                <p className="text-red-500 text-sm mt-1">{error.password}</p>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
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
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
