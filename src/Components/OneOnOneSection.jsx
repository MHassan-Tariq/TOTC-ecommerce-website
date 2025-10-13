import React from "react";
import { motion } from "framer-motion";

const OneOnOneSection = () => {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-20">
          {/* Left: layered images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative w-full flex justify-center"
          >
            {/* floating icon */}
            <div className="absolute -top-5 -left-5 bg-blue-500 text-white p-3 rounded-full shadow-md z-20 hidden sm:block">
              <img src="/img/Group.png" alt="users" className="h-4 w-4" />
            </div>

            {/* back image */}
            <img
              src="/img/h4.jpg"
              alt="Discussion background"
              className="rounded-2xl shadow-xl opacity-80 blur-[1px] transform translate-x-6 translate-y-6 scale-95 w-full max-w-md"
            />

            {/* front image */}
            <img
              src="/img/h12.png"
              alt="Discussion front"
              className="absolute inset-0 m-auto rounded-2xl shadow-xl w-full max-w-md"
            />
          </motion.div>

          {/* Right: text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl md:text-3xl font-semibold">
              <span className="text-[#2E3A59]">One-on-One</span>{" "}
              <span className="bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">Discussions</span>
            </h3>
            <p className="text-gray-500 text-base leading-relaxed mt-4 max-w-md mx-auto md:mx-0">
              Teachers and teacher assistants can talk with students privately without leaving the
              Zoom environment.
            </p>

          </motion.div>
        </div>

        {/* Centered CTA at end of section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16 flex justify-center"
        >
          <button className="border border-teal-400 text-teal-500 rounded-full px-6 py-2 hover:bg-teal-500 hover:text-white transition-colors duration-300">
            See more features
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default OneOnOneSection;


