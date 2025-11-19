import React, { useEffect, useState } from 'react'
import CoursesGridSection from '../Components/CoursesGridSection.jsx'
import LearningPlatformSection from '../Components/LearningPlatformSection.jsx'
import CreatorsSection from '../Components/CreatorsSection.jsx'
import TestimonialsSection from '../Components/TestimonialsSection.jsx'
import EducationOffersSection from '../Components/EducationOffersSection.jsx'
import FooterSection from '../Components/FooterSection.jsx'
import Navbar from '../Components/Navbar.jsx'

const SiteHeaderAndSearch = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [activeSearchTerm, setActiveSearchTerm] = useState('')

  useEffect(() => {
    if (searchInput.trim() === '') {
      setActiveSearchTerm('')
    }
  }, [searchInput])

  const handleSubmit = (event) => {
    event.preventDefault()
    setActiveSearchTerm(searchInput.trim())
  }

  const handleClearSearch = () => {
    setSearchInput('')
    setActiveSearchTerm('')
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Shared Navbar for consistent alignment */}
      <Navbar />

      {/* Search Banner */}
      <section className="relative w-full">
        {/* Background */}
        <div className="relative h-56 md:h-64 lg:h-72">
          <img
            src="/img/banner-bg.jpg"
            alt="banner"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = '/img/h4.jpg' }}
          />
          <div className="absolute inset-0 bg-teal-500/70" />

          {/* Centered Content */}
          <div className="relative z-10 max-w-5xl mx-auto h-full px-4 sm:px-6 flex flex-col items-center justify-center gap-4">
            {/* Search Group */}
            <form className="w-full flex items-center" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search your favourite course"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                className="flex-1 rounded-l-full bg-white px-5 py-3 md:py-4 text-sm md:text-base placeholder-gray-400 focus:outline-none shadow"
              />
              <button
                type="submit"
                className="rounded-r-full bg-teal-500 hover:bg-teal-600 text-white px-5 md:px-6 py-3 md:py-4 font-semibold shadow"
              >
                Search
              </button>
            </form>

            {/* Filters */}
            <div className="w-full" />
          </div>
        </div>
      </section>

      {/* Second Section: Courses Grid */}
      <CoursesGridSection searchTerm={activeSearchTerm} onClearSearch={handleClearSearch} />

      {/* Third Section: Learning Platform (hero only) */}
      <LearningPlatformSection />

      {/* Fourth Section: Creators */}
      <CreatorsSection />

      {/* Fifth Section: Testimonials */}
      <TestimonialsSection />

      {/* Sixth Section: Education Offers */}
      <EducationOffersSection />

      {/* Footer */}
      <FooterSection />
    </div>
  )
}

export default SiteHeaderAndSearch


