import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar.jsx";

const HeroSection = () => {
  return (
    <section className="relative bg-white text-gray-900 overflow-hidden rounded-b-[120px] lg:rounded-b-[200px]">
      {/* TOTC-style teal background with white bottom curve */}
      <div className="hero-bg" />
      <div className="hero-bottom-curve" />

      {/* Header/Nav */}
      <Navbar variant="light" />

      {/* Main hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center pt-6 pb-12 lg:pt-10 lg:pb-20">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 -mt-4 sm:-mt-6 lg:-mt-16 text-center lg:text-left"
          >
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              <span className="text-[#f9a826] font-extrabold">Studying</span>
              <span className="ml-2 font-black">Online is now much easier</span>
            </h1>
            <p className="text-white/90 max-w-sm mx-auto lg:mx-0 text-xs sm:text-sm font-medium">
              TOTC is an interesting platform that will teach you in a more
              interactive way.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-5 pt-3">
              <button className="inline-flex items-center justify-center rounded-full bg-white text-gray-900 px-5 py-2 text-sm font-semibold shadow-md hover:bg-white/90 transition">
                Join for free
              </button>
              <a href="#" className="inline-flex items-center text-white font-medium hover:opacity-90">
                <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </span>
                Watch how it works
              </a>
            </div>
          </motion.div>

          {/* Right: Student image + floating cards */}
          <div className="relative">
            <motion.img
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              src="/img/h1.png"
              alt="Student"
              className="w-full max-w-md mx-auto drop-shadow-2xl transform scale-75 lg:scale-[0.7] -translate-y-3 sm:-translate-y-5 lg:-translate-y-6"
            />

            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute left-1/2 -translate-x-1/2 -top-3 sm:-top-4 lg:-translate-x-0 lg:-left-16 lg:top-4 bg-white/80 backdrop-blur-md text-gray-900 rounded-xl border border-blue-400/30 shadow-lg shadow-blue-500/20 px-2.5 py-2 flex items-center gap-2 w-44 sm:w-48"
            >
              <img src="/img/Group.png" alt="Icon" className="h-8 w-8" />
              <div className="text-xs font-semibold leading-tight">
                250k Assisted Students
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute right-2 top-16 sm:right-4 sm:top-20 lg:right-0 lg:top-28 bg-white/80 backdrop-blur-md text-gray-900 rounded-xl border border-blue-400/30 shadow-lg shadow-blue-500/20 p-3 w-60 sm:w-64"
            >
              <div className="text-sm font-semibold">User Experience Class</div>
              <div className="text-xs text-gray-600 mt-1">Today at 12:00 PM</div>
              <button className="mt-3 inline-flex items-center rounded-full bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-600 transition">
                Join Now
              </button>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-24 sm:bottom-28 lg:translate-x-0 lg:left-20 lg:bottom-40 bg-white/80 backdrop-blur-md text-gray-900 rounded-lg border border-blue-400/30 shadow-md shadow-blue-500/20 px-3 py-2 flex items-center gap-2"
            >
              <img src="/img/Vector.png" alt="Check" className="h-5 w-5" />
              <span className="text-xs font-medium">Congratulations, your admission completed.</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background decorative circles */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute right-10 top-24 w-40 h-40 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute left-10 bottom-10 w-28 h-28 rounded-full bg-white/20 blur-xl" />
      </div>
    </section>
  );
};

export default HeroSection;


