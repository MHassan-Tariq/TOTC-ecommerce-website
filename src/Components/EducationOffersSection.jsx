import React from "react";

const educationOffers = [
  { id: 1, discount: '50%', title: 'Lorem ipsum dolor', image: '/img/h4.jpg', alt: 'Laptop with a video call grid visible' },
  { id: 2, discount: '10%', title: 'Lorem ipsum dolor', image: '/img/h5.jpg', alt: 'Young girl studying online' },
  { id: 3, discount: '50%', title: 'Lorem ipsum dolor', image: '/img/h21.png', alt: 'A cat peeking over a laptop screen' },
];

const EducationOffersSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[18px] md:text-[20px] font-semibold text-[#1C1C1C]">
            Top Education offers and deals are listed here
          </h2>
          <a href="#" className="text-teal-600 text-sm hover:underline">See all</a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {educationOffers.map((item) => (
            <article
              key={item.id}
              className="relative overflow-hidden rounded-2xl shadow-md shadow-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Background image */}
              <div className="relative h-64 w-full">
                <img
                  src={item.image}
                  alt={item.alt}
                  onError={(e) => { e.currentTarget.src = '/img/h4.jpg' }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Discount badge */}
              <div className="absolute left-4 top-4 rounded-lg bg-teal-400 px-3 py-2">
                <span className="text-white text-lg font-bold leading-none">{item.discount}</span>
              </div>

              {/* Text content overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="text-sm md:text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-[11px] leading-5 opacity-95">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationOffersSection;

