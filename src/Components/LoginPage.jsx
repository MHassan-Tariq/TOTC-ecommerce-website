import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../utils/api.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call backend API
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      // Store token and user data in context
      if (response.token && response.user) {
        login(response.user, response.token);
        console.log("Login successful! User:", response.user.name);
        
        // Redirect to home page or dashboard
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 sm:px-6 md:px-10 lg:px-16 py-6 md:py-10">
      {/* Left: Image (web only), hidden on mobile/app */}
      <div className="relative w-full h-[320px] sm:h-[420px] md:h-auto rounded-2xl md:rounded-r-none overflow-hidden hidden md:block">
        <img
          src="/img/login.png"
          alt="Classroom"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <div className="text-2xl font-semibold">Lorem Ipsum is simply</div>
          <div className="text-sm opacity-80">Lorem Ipsum is simply</div>
        </div>
      </div>

      {/* Right: Login form */}
      <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-md">
          {/* Heading */}
          <h2 className="text-gray-700 text-lg font-medium mb-4 text-center">Welcome to lorem.!</h2>

          {/* Toggle buttons - pill container with active capsule */}
          <div className="mb-6 flex justify-center">
            <div className="flex items-center rounded-full bg-[#49BBBD99] p-1">
              <button
                type="button"
                className="px-6 sm:px-7 py-2 rounded-full bg-[#49BBBD] text-white font-medium shadow-[inset_0_-2px_0_rgba(0,0,0,0.05)]"
              >
                Login
              </button>
              <button
                type="button"
                className="px-6 sm:px-7 py-2 rounded-full text-white font-medium"
              >
                Register
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm text-center mb-8 px-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-full border border-[#4DE0D9] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4DE0D9]"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-3 pr-11 rounded-full border border-[#4DE0D9] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4DE0D9]"
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

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#23A7F1] focus:ring-[#23A7F1]" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="hover:text-[#4DE0D9] cursor-pointer">Forgot Password?</Link>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#49BBBD] text-white font-medium py-3 rounded-full mt-4 shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;


