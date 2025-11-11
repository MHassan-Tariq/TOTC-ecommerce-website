import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyOTP } from "../utils/api.js";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    // Get email from sessionStorage
    const storedEmail = sessionStorage.getItem('resetEmail');
    if (!storedEmail) {
      navigate("/forgot-password");
      return;
    }
    setEmail(storedEmail);

    // Timer countdown
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
    // Focus last filled input or last input
    const lastFilledIndex = newOtp.findIndex((val) => !val);
    const focusIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex - 1;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    const otpString = otp.join("");
    
    if (otpString.length !== 6) {
      setError("Please enter a complete 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const response = await verifyOTP(email, otpString);
      
      setSuccess(response.message || "OTP verified successfully!");
      
      // Store reset token for next step
      sessionStorage.setItem('resetToken', response.resetToken);
      
      // Navigate to reset password page after 1 second
      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
      // Clear OTP on error
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    // Navigate back to forgot password to resend
    navigate("/forgot-password");
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 py-6 md:py-10">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h2>
          <p className="text-gray-600 text-sm mb-2">
            Enter the 6-digit OTP sent to <span className="font-semibold">{email}</span>
          </p>
          {timer > 0 && (
            <p className="text-sm text-gray-500">
              OTP expires in: <span className="font-semibold text-[#49BBBD]">{formatTime(timer)}</span>
            </p>
          )}
          {timer === 0 && (
            <p className="text-sm text-red-600 font-semibold">
              OTP has expired. Please request a new one.
            </p>
          )}
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

        {/* OTP Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={loading || timer === 0}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-bold border-2 border-[#4DE0D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DE0D9] focus:border-[#49BBBD] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            ))}
          </div>

          {/* Verify button */}
          <button
            type="submit"
            disabled={loading || timer === 0 || otp.join("").length !== 6}
            className="w-full bg-[#49BBBD] text-white font-medium py-3 rounded-full mt-4 shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Didn't receive the OTP?
          </p>
          <button
            onClick={handleResend}
            className="text-sm text-[#49BBBD] hover:text-[#1eb2a6] font-medium"
          >
            Resend OTP
          </button>
        </div>

        {/* Back to Login */}
        <div className="mt-4 text-center">
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

export default OTPVerification;

