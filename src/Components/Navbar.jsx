import React from "react";

const Navbar = () => {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <img src="/img/logo.png" alt="TOTC" className="h-12 w-auto" />
        </div>

        {/* Center: Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Courses</a>
          <a href="#" className="hover:text-white transition-colors">Careers</a>
          <a href="#" className="hover:text-white transition-colors">Blog</a>
          <a href="#" className="hover:text-white transition-colors">About Us</a>
        </nav>

        {/* Right: Auth buttons */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex items-center rounded-full border border-white/30 bg-white text-gray-900 px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition">
            Login
          </button>
          <button className="inline-flex items-center rounded-full bg-gradient-to-r from-[#29c3c1] to-[#1eb2a6] px-5 py-2.5 text-sm font-semibold shadow-lg hover:scale-[1.02] transition-transform">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


