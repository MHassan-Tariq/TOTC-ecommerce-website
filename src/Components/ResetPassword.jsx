import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { resetPassword } from "../utils/api.js";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get email and reset token from sessionStorage
    const storedEmail = sessionStorage.getItem('resetEmail');
    const storedToken = sessionStorage.getItem('resetToken');
    
    if (!storedEmail || !storedToken) {
      navigate("/forgot-password");
      return;
    }
    
    setEmail(storedEmail);
    setResetToken(storedToken);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword(email, resetToken, formData.newPassword);
      
      setSuccess(response.message || "Password reset successfully!");
      
      // Clear session storage
      sessionStorage.removeItem('resetEmail');
      sessionStorage.removeItem('resetToken');
      
      // Navigate to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 py-6 md:py-10">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h2>
          <p className="text-gray-600 text-sm">
            Enter your new password below.
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
          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                required
                minLength={6}
                className="w-full px-4 py-3 pr-11 rounded-full border border-[#4DE0D9] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4DE0D9]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                minLength={6}
                className="w-full px-4 py-3 pr-11 rounded-full border border-[#4DE0D9] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4DE0D9]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#49BBBD] text-white font-medium py-3 rounded-full mt-4 shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting Password..." : "Reset Password"}
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

export default ResetPassword;

