import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar.jsx";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#0b1f38] text-white">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#103b55] via-[#0b5660] to-[#0b1f38]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#081726] to-transparent" />

      {/* Decorative accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-32 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      {/* Header/Nav */}
      <Navbar variant="light" />

      {/* Main hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-20">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-medium text-white/90">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              Trusted by 250k+ lifelong learners
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.6rem] leading-tight font-bold">
              Learn without limits and
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-200 to-white">
                build your best career
              </span>
            </h1>

            <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto lg:mx-0">
              Solinovation connects you with world-class mentors, personalized learning paths, and collaborative communities to accelerate your growth in tech, design, and business.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white text-[#0b1f38] px-6 py-3 text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 hover:shadow-xl transition">
                Start Learning Today
              </button>
              <a
                href="#"
                className="inline-flex items-center text-white/90 hover:text-white transition"
              >
                <span className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 border border-white/20">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                Explore platform tour
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8">
              {[
                { value: "40+", label: "Interactive programs" },
                { value: "250k", label: "Students worldwide" },
                { value: "92%", label: "Career transition success" }
              ].map(({ value, label }) => (
                <div
                  key={value}
                  className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm px-4 py-3 text-left"
                >
                  <div className="text-lg sm:text-xl font-semibold text-white">{value}</div>
                  <div className="text-xs sm:text-sm text-white/70 leading-snug">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-cyan-300/20 via-emerald-300/10 to-transparent blur-2xl" />

              <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl shadow-emerald-500/20">
                <img
                  src="/img/h1.png"
                  alt="Learner hero"
                  className="w-full object-cover"
                />

                <div className="absolute top-120 left-5 right-5 flex items-center justify-between rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-3 text-sm">
                  <div>
                    <p className="text-white font-semibold">Live Design Sprint</p>
                    <p className="text-white/70 text-xs">Today • 12:00 PM – 1:30 PM</p>
                  </div>
                  <button className="inline-flex items-center rounded-full bg-emerald-400/90 px-3 py-1.5 text-xs font-semibold text-[#05202f] hover:bg-emerald-300 transition">
                    Join session
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


