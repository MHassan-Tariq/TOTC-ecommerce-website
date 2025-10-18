import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const LoginRegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

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
              <button type="button" className="px-6 sm:px-7 py-2 rounded-full text-white font-medium">Login</button>
              <button type="button" className="px-6 sm:px-7 py-2 rounded-full bg-[#49BBBD] text-white font-medium shadow-[inset_0_-2px_0_rgba(0,0,0,0.05)]">Register</button>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm text-center mb-8 px-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          {/* Form */}
          <form>
            {/* Email */}
            <input
              type="email"
              placeholder="Enter your Email Address"
              className="w-full px-4 py-3 mb-4 border border-[#49BBBD] rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#49BBBD]"
            />

            {/* Username */}
            <input
              type="text"
              placeholder="Enter your User name"
              className="w-full px-4 py-3 mb-4 border border-[#49BBBD] rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#49BBBD]"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
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

            {/* Register button */}
            <button
              type="submit"
              className="w-full bg-[#49BBBD] text-white font-medium py-3 rounded-full mt-4 shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginRegisterPage;


