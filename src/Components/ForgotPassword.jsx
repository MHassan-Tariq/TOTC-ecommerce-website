import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOTP } from "../utils/api.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await sendOTP(email);
      
      setSuccess(response.message || "OTP sent successfully!");
      
      // Store email for next step
      sessionStorage.setItem('resetEmail', email);
      
      // In development, show OTP in console if provided
      if (response.otp) {
        console.log("🔑 OTP (Development only):", response.otp);
        setSuccess(`${response.message} OTP: ${response.otp} (Check console in development)`);
      }
      
      // Navigate to OTP verification page after 2 seconds
      setTimeout(() => {
        navigate("/verify-otp");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 py-6 md:py-10">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
          <p className="text-gray-600 text-sm">
            Enter your email address and we'll send you an OTP to reset your password.
          </p>
        </div>

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
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full border border-[#4DE0D9] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4DE0D9]"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#49BBBD] text-white font-medium py-3 rounded-full mt-4 shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm text-[#49BBBD] hover:text-[#1eb2a6] font-medium"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;

