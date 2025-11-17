import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Play } from "lucide-react";
import Navbar from "../Components/Navbar.jsx";
import FooterSection from "../Components/FooterSection.jsx";
import { useCart } from "../context/CartContext.jsx";

const Cart = () => {
  const { items, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Your cart</h1>
              <p className="text-sm text-gray-500">{items.length} course{items.length === 1 ? "" : "s"} ready to enroll.</p>
            </div>
            {items.length > 0 && (
              <button
                onClick={() => navigate('/checkout')}
                className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-600"
              >
                Proceed to checkout
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center text-gray-500">
              Your cart is empty. Browse <Link to="/courses" className="text-emerald-600 font-semibold">courses</Link> to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item._id} className="flex flex-col sm:flex-row bg-white shadow-sm border border-gray-200 rounded-3xl overflow-hidden">
                  <div className="sm:w-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-36 object-cover" />
                    ) : (
                      <div className="w-full h-36 flex items-center justify-center text-gray-400 text-xs">No image</div>
                    )}
                  </div>
                  <div className="flex-1 px-6 py-4 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{item.title}</h2>
                        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{item.description}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-600"
                        aria-label="Remove from cart"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      {item.category && (
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-blue-600 font-semibold">
                          {item.category}
                        </span>
                      )}
                      {item.level && (
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-emerald-600 font-semibold">
                          {item.level}
                        </span>
                      )}
                      {item.duration && (
                        <span>
                          {typeof item.duration === "string" && /\d+/.test(item.duration)
                            ? `Week: ${item.duration.match(/\d+/)[0]}`
                            : item.duration}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-emerald-600">${Number(item.price ?? 0).toFixed(2)}</span>
                      <Link
                        to={`/course/${item._id}`}
                        className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between bg-white border border-gray-200 rounded-3xl px-6 py-4">
                <span className="text-sm text-gray-600">Total ({items.length} course{items.length === 1 ? '' : 's'})</span>
                <span className="text-xl font-semibold text-emerald-600">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => navigate('/checkout')}
                  className="inline-flex items-center rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-600"
                >
                  Buy now
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Cart;
