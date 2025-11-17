import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Eye, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Navbar = ({ variant = "dark", transparentHover = false }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { items, removeFromCart, totalPrice } = useCart();
  const linkBase = variant === "light" ? "text-white/90 hover:text-white" : "text-gray-800 hover:text-gray-900";
  const logoSrc = variant === "light" ? "/img/logo.png" : "/img/logoblack.png";
  const cartCount = items.length;
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative z-30 ${transparentHover ? "bg-transparent hover:bg-white/20 hover:backdrop-blur-md transition-all duration-300" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
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
          <Link to="/about" className={`transition-colors ${linkBase}`}>About Us</Link>
        </nav>

        {/* Right: Auth buttons or User info */}
        <div className="flex items-center gap-3" ref={cartRef}>
          <button
            type="button"
            onClick={() => setCartOpen((prev) => !prev)}
            className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              variant === "light"
                ? "border-white/40 text-white bg-white/10 hover:bg-white/20"
                : "border-gray-200 text-gray-800 bg-white hover:bg-gray-100"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Cart</span>
            <span
              className={`inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full text-xs font-bold ${
                variant === "light" ? "bg-white text-gray-800" : "bg-emerald-500 text-white"
              }`}
            >
              {cartCount}
            </span>
          </button>

          {cartOpen && (
            <div className="absolute right-4 top-full mt-3 w-80 rounded-2xl border border-gray-200 bg-white shadow-xl">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800">Cart ({cartCount})</span>
                <button
                  onClick={() => navigate('/cart')}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  View cart
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                {items.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-gray-500 text-center">No courses in cart yet.</div>
                ) : (
                  items.map((item) => (
                    <div key={item._id} className="px-4 py-3 flex gap-3 items-start hover:bg-gray-50">
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => {
                          navigate('/cart');
                          setCartOpen(false);
                        }}
                      >
                        <p className="text-sm font-semibold text-gray-800 line-clamp-2">{item.title}</p>
                        <div className="mt-2 text-xs flex flex-wrap gap-2">
                          {item.category && (
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-blue-600 font-semibold">
                              {item.category}
                            </span>
                          )}
                          {item.level && (
                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-emerald-600 font-semibold">
                              {item.level}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-sm font-semibold text-emerald-600">
                          ${Number(item.price ?? 0).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 text-gray-500">
                        <button
                          onClick={() => {
                            navigate(`/course/${item._id}`);
                            setCartOpen(false);
                          }}
                          className="p-1 rounded-full hover:bg-emerald-50 text-emerald-600"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-1 rounded-full hover:bg-red-50 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="px-4 py-3 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Total</span>
                  <span className="text-base font-semibold text-emerald-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-600"
                  disabled={items.length === 0}
                >
                  Buy now
                </button>
              </div>
            </div>
          )}

          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className={`hidden sm:inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm hover:bg-white/20 transition ${variant === "light" ? "text-white" : "text-gray-800"}`}
                >
                  Admin Panel
                </Link>
              )}
              <span className={`text-sm font-medium ${variant === "light" ? "text-white" : "text-gray-800"}`}>
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center rounded-full border border-red-300 bg-red-50 text-red-700 px-4 py-2 text-sm font-semibold hover:bg-red-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hidden sm:inline-flex items-center rounded-full border border-white/30 bg-white text-gray-900 px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition">
                Login
              </Link>
              <Link to="/register" className="inline-flex items-center rounded-full bg-gradient-to-r from-[#29c3c1] to-[#1eb2a6] px-5 py-2.5 text-sm font-semibold shadow-lg hover:scale-[1.02] transition-transform">
                Sign Up
              </Link>
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


