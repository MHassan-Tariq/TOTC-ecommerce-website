import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ variant = "dark" }) => {
  const linkBase = variant === "light" ? "text-white/90 hover:text-white" : "text-gray-800 hover:text-gray-900";
  const logoSrc = variant === "light" ? "/img/logo.png" : "/img/logoblack.png";
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <img src={logoSrc} alt="TOTC" className="h-12 w-auto" />
        </div>

        {/* Center: Nav */}
        <nav className={`hidden md:flex items-center gap-8 text-sm font-medium ${variant === "light" ? "text-white/90" : "text-gray-800"}`}>
          <Link to="/" className={`transition-colors ${linkBase}`}>Home</Link>
          <Link to="/courses" className={`transition-colors ${linkBase}`}>Courses</Link>
          <Link to="/search" className={`transition-colors ${linkBase}`}>Search</Link>
          <Link to="/careers" className={`transition-colors ${linkBase}`}>Careers</Link>
          <Link to="/blog" className={`transition-colors ${linkBase}`}>Blog</Link>
          <a href="#" className={`transition-colors ${linkBase}`}>About Us</a>
        </nav>

        {/* Right: Auth buttons */}
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:inline-flex items-center rounded-full border border-white/30 bg-white text-gray-900 px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition">
            Login
          </Link>
          <Link to="/register" className="inline-flex items-center rounded-full bg-gradient-to-r from-[#29c3c1] to-[#1eb2a6] px-5 py-2.5 text-sm font-semibold shadow-lg hover:scale-[1.02] transition-transform">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


