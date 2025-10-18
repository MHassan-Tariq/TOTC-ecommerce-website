import React from 'react'

const PlayIcon = () => (
  <span className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-xl flex items-center justify-center">
    <span className="ml-0.5 inline-block w-0 h-0 border-t-8 border-b-8 border-l-[14px] border-t-transparent border-b-transparent border-l-[#2EBAC6]" />
  </span>
)

const OfferCard = ({ img }) => (
  <div className="relative overflow-hidden rounded-xl shadow-lg bg-black/10 hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
    <img src={img} alt="offer" className="w-full h-60 object-cover" />

    {/* gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />

    {/* discount badge */}
    <div className="absolute left-4 top-4">
      <span className="px-2 py-1 text-xs font-semibold rounded-md bg-[#FF4D4D] text-white shadow">50%</span>
    </div>

    {/* content */}
    <div className="absolute left-6 right-6 bottom-6 text-white">
      <div className="tracking-wide text-xs opacity-90 mb-2">FOR INSTRUCTORS</div>
      <div className="text-sm text-white/90 leading-relaxed">
        TOTC’s school management software helps traditional and online schools manage scheduling.
      </div>
    </div>
  </div>
)

const OffersSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Top hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left copy */}
          <div className="relative">
            {/* decorative dot */}
            <span className="absolute -left-6 -top-4 w-10 h-10 rounded-full bg-[#34D399]/70" />
            <h2 className="text-2xl md:text-[28px] leading-snug font-semibold text-[#1E2B4A]">
              Everything you can do in a physical classroom,
              <br />
              <span className="text-[#2EBAC6]">you can do with TOTC</span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-[#6B7280] max-w-xl">
              TOTC’s school management software helps traditional and online schools manage scheduling, attendance,
              payments, and virtual classrooms all in one secure cloud-based system.
            </p>
            <a href="#" className="mt-4 inline-block text-[#2EBAC6] underline text-sm font-medium">Learn more</a>
          </div>

          {/* Right image with frame */}
          <div className="relative">
            {/* frame accents */}
            <span className="absolute -left-2 -top-2 w-16 h-6 rounded-lg bg-[#2EBAC6]" />
            <span className="absolute -right-2 -bottom-2 w-16 h-6 rounded-lg bg-[#2EBAC6]" />
            <div className="relative rounded-2xl overflow-hidden">
              <img src="/img/h4.jpg" alt="classroom" className="w-full h-72 md:h-80 object-cover rounded-2xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom offers header */}
        <div className="mt-16 flex items-center justify-between">
          <h3 className="text-[#1E2B4A] font-semibold">Top  Education offers and deals are listed here</h3>
          <a href="#" className="text-[#2EBAC6] text-sm font-medium hover:underline">See all</a>
        </div>

        {/* Offer cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['/img/h1.png','/img/h2.png','/img/h3.png'].map((src, i) => (
            <OfferCard key={i} img={src} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default OffersSection


