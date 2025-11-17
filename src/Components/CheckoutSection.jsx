import React, { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { createCheckoutSession } from "../utils/api.js";
import { tokenStorage } from "../utils/api.js";

const publishableKey =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
  "pk_test_51STffjLBE4gBq3WEsmqSfrmew0Dimz218tQYT8ycXvaIuGrzJFVgEbSFEFERGha2KMG6MXuokpANrMYny4weAbqL00I4Dfy6BU";

if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY && import.meta.env.DEV) {
  console.warn(
    "Stripe publishable key was not found in environment. Falling back to the provided test key."
  );
}

const stripePromise = loadStripe(publishableKey);

const formatDuration = (duration) => {
  if (!duration) return "";
  const match = typeof duration === "number"
    ? duration
    : duration.toString().match(/\d+(?:\.\d+)?/);

  if (match) {
    const value = typeof match === "number" ? match : match[0];
    return `Week: ${value}`;
  }

  return typeof duration === "string" ? duration : `${duration}`;
};

const ProductRow = ({ imageUrl, videoUrl, title, desc, price }) => (
  <div className="py-3">
    <div className="flex items-center gap-3">
      <div className="w-14 h-14 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : videoUrl ? (
          <video
            src={videoUrl}
            className="w-full h-full object-cover"
            muted
            playsInline
          />
        ) : (
          <span className="text-xs text-gray-400">No media</span>
        )}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-700 leading-snug line-clamp-2">{title}</div>
        <div className="text-xs text-gray-500 leading-snug flex flex-wrap gap-2 mt-1">
          {desc.level && (
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-600 font-semibold">
              {desc.level}
            </span>
          )}
          {desc.category && (
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-600 font-semibold">
              {desc.category}
            </span>
          )}
          {desc.duration && <span className="text-gray-400">{desc.duration}</span>}
        </div>
      </div>
      <div className="text-sm font-medium text-gray-800">${Number(price ?? 0).toFixed(2)}</div>
    </div>
    <div className="border-b border-gray-300 my-3" />
  </div>
);

const CheckoutSection = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [reviewOpen, setReviewOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const summaryRows = useMemo(() => {
    return items.map((item) => ({
      id: item._id,
      imageUrl: item.imageUrl,
      videoUrl: item.videoUrl,
      title: item.title,
      desc: {
        category: item.category,
        level: item.level || "Beginner",
        duration: formatDuration(item.duration)
      },
      price: item.price
    }));
  }, [items]);

  const subtotal = totalPrice;
  const grandTotal = subtotal;

  const prepareStripeItems = () =>
    items.map((item) => ({
      _id: item._id,
      title: item.title,
      price: Number(item.price ?? 0),
      quantity: Number(item.quantity ?? 1),
    }));

  const handleStripeCheckout = async () => {
    if (!items.length) return;

    setCheckoutError("");
    setIsProcessing(true);

    try {
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe could not be initialised. Check your publishable key.");
      }

      const token = tokenStorage.get();

      if (!token) {
        throw new Error("You need to be logged in to complete the payment.");
      }

      const session = await createCheckoutSession(
        prepareStripeItems(),
        token,
        user?.email || undefined
      );

      setReviewOpen(false);

      if (session?.url) {
        window.location.assign(session.url);
        return;
      }

      throw new Error("Stripe session created without a redirect URL.");
    } catch (error) {
      console.error("Stripe checkout failed", error);
      setCheckoutError(error.message || "Unable to continue to payment. Please try again later.");
      setReviewOpen(false);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const status = searchParams.get("status");

    if (status === "success") {
      setCheckoutError("");
      if (items.length) {
        clearCart();
      }
      setConfirmMessage(`Thank you, ${user?.name || 'guest'}! Your payment is confirmed.`);
      const timeout = setTimeout(() => {
        setConfirmMessage("");
        navigate('/', { replace: true });
      }, 1800);

      return () => clearTimeout(timeout);
    }

    if (status === "cancelled") {
      setCheckoutError("Payment was cancelled. You can try again when ready.");
    }
  }, [navigate, searchParams, user?.name, clearCart, items.length]);

  return (
    <section className="w-full bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-10">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#1E2B4A]">Checkout Summary</h2>
              <p className="text-sm text-gray-500">Review your courses before completing payment.</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
              {items.length} course{items.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="bg-[#F3F8FC] rounded-2xl shadow p-6 md:p-8">
            <h3 className="text-gray-800 font-semibold">Summary</h3>
            <div className="mt-4">
              {summaryRows.length === 0 ? (
                <div className="text-sm text-gray-500 text-center py-6">No courses in cart yet.</div>
              ) : (
                summaryRows.map((row) => (
                  <ProductRow
                    key={row.id}
                    imageUrl={row.imageUrl}
                    videoUrl={row.videoUrl}
                    title={row.title}
                    desc={row.desc}
                    price={row.price}
                  />
                ))
              )}
            </div>
            <div className="text-sm">
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 font-semibold text-black">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  setCheckoutError("");
                  setReviewOpen(true);
                }}
                className="w-full rounded-full bg-[#2EBAC6] py-3 text-sm font-semibold text-white transition hover:bg-[#24a3b1] disabled:opacity-60"
                disabled={items.length === 0 || isProcessing}
              >
                {isProcessing ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>

          {checkoutError && (
            <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {checkoutError}
            </p>
          )}
        </div>
      </div>
      {reviewOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Review order</h3>
              <button onClick={() => setReviewOpen(false)} className="text-sm text-gray-500 hover:text-gray-700">×</button>
            </div>
            <div className="px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {summaryRows.map((row) => (
                <div key={row.id} className="flex gap-3">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
                    {row.imageUrl ? (
                      <img src={row.imageUrl} alt={row.title} className="w-full h-full object-cover" />
                    ) : row.videoUrl ? (
                      <video src={row.videoUrl} className="w-full h-full object-cover" muted playsInline />
                    ) : (
                      <span className="text-xs text-gray-400">No media</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900 line-clamp-2">{row.title}</div>
                    <div className="mt-1 text-xs text-gray-500 flex flex-wrap gap-2">
                      {row.desc.category && <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-600 font-semibold">{row.desc.category}</span>}
                      {row.desc.level && <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-600 font-semibold">{row.desc.level}</span>}
                      {row.desc.duration && <span>{row.desc.duration}</span>}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-emerald-600">${Number(row.price ?? 0).toFixed(2)}</div>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4 text-sm space-y-2">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between font-semibold text-gray-900"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 bg-gray-50 px-6 py-4 rounded-b-2xl">
              <button
                onClick={() => setReviewOpen(false)}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
              >
                Discard
              </button>
              <button
                onClick={handleStripeCheckout}
                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-600 disabled:opacity-70"
                disabled={isProcessing}
              >
                {isProcessing ? "Redirecting…" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
      {confirmMessage && (
        <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
          <div className="rounded-full bg-emerald-500/90 text-white text-sm font-semibold px-6 py-3 shadow-lg">
            {confirmMessage}
          </div>
        </div>
      )}
    </section>
  );
};

export default CheckoutSection;


