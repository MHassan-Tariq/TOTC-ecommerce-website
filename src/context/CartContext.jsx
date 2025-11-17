import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { fetchCourse } from "../utils/api.js";

const CartContext = createContext(null);

const STORAGE_KEY = "solinovation_cart";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse cart from storage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to persist cart", error);
    }
  }, [items]);

  const enriching = useRef(false);

  useEffect(() => {
    if (enriching.current) return;
    const missingMedia = items.filter((item) => !item.imageUrl && item._id);
    if (missingMedia.length === 0) return;

    enriching.current = true;
    let cancelled = false;

    (async () => {
      try {
        const results = await Promise.all(
          missingMedia.map(async (item) => {
            try {
              const data = await fetchCourse(item._id);
              return { id: item._id, course: data.course };
            } catch (error) {
              console.warn("Failed to enrich cart item", error);
              return null;
            }
          })
        );

        if (cancelled) return;

        const updates = results.filter(Boolean);
        if (updates.length === 0) return;

        setItems((prev) =>
          prev.map((item) => {
            const update = updates.find((u) => u.id === item._id);
            if (!update || !update.course) {
              return item;
            }
            const { course } = update;
            return {
              ...item,
              imageUrl: course.imageUrl || item.imageUrl,
              videoUrl: course.videoUrl || item.videoUrl,
              category: course.category || item.category,
              level: course.level || item.level,
              duration: course.duration || item.duration,
              price: Number(course.price ?? item.price ?? 0),
              description: course.description || item.description
            };
          })
        );
      } finally {
        enriching.current = false;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [items]);

  const addToCart = (course) => {
    if (!course?._id) return;
    setItems((prev) => {
      if (prev.some((item) => item._id === course._id)) {
        return prev;
      }
      const minimal = {
        _id: course._id,
        title: course.title,
        duration: course.duration,
        level: course.level,
        category: course.category,
        price: Number(course.price ?? 0),
        imageUrl: course.imageUrl,
        videoUrl: course.videoUrl,
        description: course.description
      };
      return [...prev, minimal];
    });
  };

  const removeFromCart = (courseId) => {
    setItems((prev) => prev.filter((item) => item._id !== courseId));
  };

  const clearCart = () => setItems([]);

  const isInCart = (courseId) => items.some((item) => item._id === courseId);

  const totalPrice = items.reduce((sum, item) => sum + Number(item.price ?? 0), 0);

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, clearCart, isInCart, totalPrice }),
    [items, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};
