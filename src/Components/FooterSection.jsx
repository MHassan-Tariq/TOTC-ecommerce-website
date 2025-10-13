import React from "react";

const FooterSection = () => {
  return (
    <footer className="bg-[#1B1D3C] text-[#B8B8D1]">
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        {/* Header row */}
        <div className="flex justify-center items-center gap-4 mb-10">
          <img src="/img/logo.png" alt="TOTC" className="h-10 object-contain" />
          <div className="w-px h-6 bg-gray-500 opacity-50" />
          <div className="text-gray-300 text-sm font-medium">Virtual Class for Zoom</div>
        </div>

        {/* Newsletter */}
        <h4 className="text-gray-300 text-lg md:text-xl font-medium mb-6">Subscribe to get our Newsletter</h4>
        <div className="flex justify-center items-center gap-3 flex-wrap md:flex-nowrap">
          <input
            type="email"
            placeholder="Your Email"
            className="w-72 md:w-96 px-4 py-3 rounded-full bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#4DE0D9] transition-all duration-300"
          />
          <button className="bg-gradient-to-r from-[#4DE0D9] to-[#23A7F1] text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            Subscribe
          </button>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-6 mt-8 text-gray-400 text-sm">
          <a href="#" className="hover:text-[#4DE0D9] transition-colors">Careers</a>
          <a href="#" className="hover:text-[#4DE0D9] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#4DE0D9] transition-colors">Terms & Conditions</a>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 text-xs mt-4">© 2021 Class Technologies Inc.</div>
      </div>
    </footer>
  );
};

export default FooterSection;


