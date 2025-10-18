import React from 'react'

const OfferCard = ({ offer }) => (
  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg group">
    {/* Background Image */}
    <img
      src={offer.image}
      alt={offer.alt}
      className="w-full h-full object-cover"
    />
    
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/50" />
    
    {/* Discount Badge */}
    <div className="absolute top-4 left-4">
      <span className="bg-teal-400 text-white font-bold px-3 py-1 rounded-lg text-sm">
        {offer.discount}
      </span>
    </div>
    
    {/* Text Content */}
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <h3 className="text-white font-bold text-lg mb-3">
        {offer.title}
      </h3>
      <p className="text-white text-sm leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      </p>
    </div>
  </div>
)

const EducationOffersSection = () => {
  const educationOffers = [
    { id: 1, discount: '50%', title: 'Lorem ipsum dolor', image: '/img/h4.jpg', alt: 'Laptop with video call' },
    { id: 2, discount: '10%', title: 'Lorem ipsum dolor', image: '/img/h5.jpg', alt: 'Young girl studying' },
    { id: 3, discount: '50%', title: 'Lorem ipsum dolor', image: '/img/h6.png', alt: 'Cat peeking over laptop' },
  ]

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Top Education offers and deals are listed here
          </h2>
          <a 
            href="#" 
            className="text-teal-400 font-medium text-sm hover:underline"
          >
            See all
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {educationOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EducationOffersSection
