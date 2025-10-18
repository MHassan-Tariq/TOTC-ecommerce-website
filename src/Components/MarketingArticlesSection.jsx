import React from 'react'

const ArticleCard = ({ img, title, authorImg }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-4 md:p-6">
    {/* Thumb */}
    <div className="w-full h-40 md:h-44 overflow-hidden rounded-xl">
      <img src={img} alt="thumb" className="w-full h-full object-cover" />
    </div>

    {/* Meta */}
    <div className="mt-3 flex items-center justify-between text-xs text-gray-400 font-medium">
      <span className="flex items-center gap-1">Design</span>
      <span className="flex items-center gap-1">3 Month</span>
    </div>

    {/* Title */}
    <h3 className="mt-2 text-[#1E2B4A] font-semibold text-base leading-snug">
      {title}
    </h3>

    {/* Description */}
    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    </p>

    {/* Footer */}
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src={authorImg} alt="Lina" className="w-6 h-6 rounded-full object-cover" />
        <span className="ml-2 text-sm text-gray-600">Lina</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-400 line-through">$100</span>
        <span className="text-[#2EBAC6] font-semibold">$80</span>
      </div>
    </div>
  </div>
)

const MarketingArticlesSection = () => {
  const cards = [
    { img: '/img/book1.jpg', title: 'AWS Certified solutions Architect' },
    { img: '/img/book3.jpg', title: 'AWS Certified solutions Architect' },
    { img: '/img/book4.jpg', title: 'AWS Certified solutions Architect' },
    { img: '/img/b3.jpg', title: 'AWS Certified solutions Architect' },
  ]

  return (
    <section className="w-full bg-[#E8F3FF]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#1E2B4A] font-semibold text-lg md:text-xl">Marketing Articles</h2>
          <a href="#" className="text-[#2EBAC6] text-sm font-medium hover:underline">See all</a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <ArticleCard key={i} img={c.img} title={c.title} authorImg={'/img/profilephoto.png'} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MarketingArticlesSection


