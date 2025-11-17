import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerUser, loginUser } from "../utils/api.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const LoginRegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login logic
        const response = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        if (response.token && response.user) {
          login(response.user, response.token);
          setSuccess("Login successful! Redirecting...");
          setTimeout(() => navigate(response.user.role === "admin" ? "/admin" : "/"), 1000);
        }
      } else {
        // Register logic
        const response = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });

        setSuccess("Registration successful! Please login.");
        // Reset form
        setFormData({ name: "", email: "", password: "", role: "student" });
        // Switch to login mode after 2 seconds
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (err) {
      setError(err.message || `Failed to ${isLogin ? "login" : "register"}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen gap-6 md:gap-10 px-4 sm:px-6 md:px-10 lg:px-16 py-6 md:py-10">
      {/* Left: Image with overlay text */}
      <div className="relative w-full h-[340px] sm:h-[420px] md:h-auto rounded-2xl md:rounded-r-none overflow-hidden hidden md:block">
        <img
          src="/img/h4.jpg"
          alt="Classroom"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <div className="text-2xl font-semibold">Lorem Ipsum is simply</div>
          <div className="text-sm opacity-80">Lorem Ipsum is simply</div>
        </div>
      </div>

      {/* Right: Form area */}
      <div className="flex flex-col justify-center items-center h-full px-6 md:px-12">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <h2 className="text-gray-700 text-lg font-medium mb-6 text-center">Welcome to lorem.!</h2>

          {/* Toggle buttons - same pill style as LoginPage */}
          <div className="mb-6 flex justify-center">
            <div className="flex items-center rounded-full bg-[#49BBBD99] p-1">
              <button 
                type="button" 
                onClick={() => setIsLogin(true)}
                className={`px-6 sm:px-7 py-2 rounded-full text-white font-medium ${isLogin ? 'bg-[#49BBBD] shadow-[inset_0_-2px_0_rgba(0,0,0,0.05)]' : ''}`}
              >
                Login
              </button>
              <button 
                type="button" 
                onClick={() => setIsLogin(false)}
                className={`px-6 sm:px-7 py-2 rounded-full text-white font-medium ${!isLogin ? 'bg-[#49BBBD] shadow-[inset_0_-2px_0_rgba(0,0,0,0.05)]' : ''}`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm text-center mb-8 px-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Name - only show for register */}
            {!isLogin && (
              <input
                type="text"
                placeholder="Enter your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required={!isLogin}
                className="w-full px-4 py-3 mb-4 border border-[#49BBBD] rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#49BBBD]"
              />
            )}

            {/* Role selection - only for register */}
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Register as</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 border border-[#49BBBD] rounded-full text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#49BBBD]"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            {/* Email */}
            <input
              type="email"
              placeholder="Enter your Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 mb-4 border border-[#49BBBD] rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#49BBBD]"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-3 pr-11 mb-4 border border-[#49BBBD] rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#49BBBD]"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#49BBBD] text-white font-medium py-3 rounded-full mt-4 shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (isLogin ? "Logging in..." : "Registering...") : (isLogin ? "Login" : "Register")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginRegisterPage;


