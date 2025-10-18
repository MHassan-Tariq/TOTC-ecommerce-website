import React from "react";
import { Link } from "react-router-dom";

const BlogSection = () => {
  return (
    <section className="w-full bg-[#F9FBFF] py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Featured blog */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-14">
          {/* Left: Text */}
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-sm mb-2">
              By <span className="font-medium text-gray-700">Themadbrains</span> in <span className="text-[#20BFA9] font-medium">inspiration</span>
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E2B4A] leading-snug mb-4">
              Why Swift UI Should Be on the Radar of Every Mobile Developer
            </h2>
            <p className="text-gray-500 text-base mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
            <a href="/meeting" className="inline-block bg-[#20BFA9] text-white px-6 py-3 rounded-md font-medium hover:bg-[#17A796] transition-all">
              Start learning now
            </a>
          </div>

          {/* Right: Image */}
          <div className="rounded-xl overflow-hidden bg-[#EAF3FF] p-4">
            <img src="/img/h4.jpg" alt="featured" className="rounded-lg w-full object-cover h-56 md:h-auto" />
          </div>
        </div>

        {/* Reading blog list */}
        <h3 className="text-xl font-semibold text-[#1E2B4A] mb-8 text-center md:text-left">Reading blog list</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <Link to="/blog/1" className="block">
            <article className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white">
              <img src="/img/b4.jpg" alt="Blog" className="w-full h-56 sm:h-44 object-cover" />
              <div className="p-4 text-center">
                <h4 className="font-semibold text-gray-800 text-base">UX/UI</h4>
              </div>
            </article>
          </Link>

          {/* Card 2 */}
          <Link to="/blog/2" className="block">
            <article className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white">
              <img src="/img/b6.png" alt="Blog" className="w-full h-56 sm:h-44 object-cover" />
              <div className="p-4 text-center">
                <h4 className="font-semibold text-gray-800 text-base">React</h4>
              </div>
            </article>
          </Link>

          {/* Card 3 */}
          <Link to="/blog/3" className="block">
            <article className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white">
              <img src="/img/b7.png" alt="Blog" className="w-full h-56 sm:h-44 object-cover" />
              <div className="p-4 text-center">
                <h4 className="font-semibold text-gray-800 text-base">PHP</h4>
              </div>
            </article>
          </Link>

          {/* Card 4 */}
          <Link to="/blog/4" className="block">
            <article className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white">
              <img src="/img/b9.png" alt="Blog" className="w-full h-56 sm:h-44 object-cover" />
              <div className="p-4 text-center">
                <h4 className="font-semibold text-gray-800 text-base">JavaScript</h4>
              </div>
            </article>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;


