import React from "react";

const VerticalTag = ({ label, outer, text }) => (
  <div
    className={`relative inline-flex items-center justify-center ${outer} rounded-2xl p-1 shadow-md -ml-3 rotate-6 first:ml-0`}
  >
    <div className="bg-white rounded-2xl px-3 py-6">
      <span className={`block transform -rotate-90 text-xs sm:text-sm font-semibold ${text}`}>
        {label}
      </span>
    </div>
  </div>
);

const Stars = () => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <img key={i} src="/img/rating.png" alt="star" className="h-4 w-4" />
    ))}
  </div>
);

const CourseCard = ({ image, title, desc, price }) => (
  <div className="bg-white rounded-2xl shadow-lg ring-1 ring-[#00B2FF]/30 p-5 mt-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
    <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] gap-5 items-center">
      <img src={image} alt={title} className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full" />
      <div className="w-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
            <p className="text-gray-500 text-sm leading-relaxed mt-2">{desc}</p>
          </div>
          <div className="text-gray-700 font-semibold whitespace-nowrap">$ {price}</div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Stars />
          <button className="border border-[#00B2FF] text-[#00B2FF] font-semibold rounded-full px-4 py-1 text-xs hover:bg-[#00B2FF] hover:text-white transition-all duration-300">
            EXPLORE
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ExploreCourseSection = () => {
  return (
    <section className="w-full bg-[#F4F9FF] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Explore Course</h2>
          <p className="text-gray-500 text-sm mt-2">Ut sed eros finibus, placerat orci id, dapibus.</p>
        </div>

        {/* Category 1 title before first image */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-bold text-gray-800">Lorem Ipsum</h3>
          <button className="text-[#00B2FF] text-sm font-semibold hover:underline">SEE ALL</button>
        </div>

        {/* Simple image block as requested */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-10">
          <div className="w-full overflow-hidden rounded-xl">
            <img src="/img/h14.png" alt="Explore course visual" className="w-full h-64 object-cover" />
          </div>
        </div>

        {/* Category 1 */}
        <div className="mt-6" />

        {/* Category 2 */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Quisque a Consequat</h3>
            <button className="text-[#00B2FF] text-sm font-semibold hover:underline">SEE ALL</button>
          </div>
          {/* Image block for this group */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 mt-4">
            <div className="w-full overflow-hidden rounded-xl">
              <img src="/img/h15.png" alt="Explore course visual 2" className="w-full h-64 object-cover" />
            </div>
          </div>
          <div className="mt-4" />
        </div>

        {/* Category 3 */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Aenean Facilisis</h3>
            <button className="text-[#00B2FF] text-sm font-semibold hover:underline">SEE ALL</button>
          </div>
          {/* Image block for this group */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 mt-4">
            <div className="w-full overflow-hidden rounded-xl">
              <img src="/img/h16.png" alt="Explore course visual 3" className="w-full h-64 object-cover" />
            </div>
          </div>
          <div className="mt-4" />
        </div>
      </div>
    </section>
  );
};

export default ExploreCourseSection;


