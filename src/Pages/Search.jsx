import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CoursesGridSection from '../Components/CoursesGridSection.jsx'
import LearningPlatformSection from '../Components/LearningPlatformSection.jsx'
import CreatorsSection from '../Components/CreatorsSection.jsx'
import TestimonialsSection from '../Components/TestimonialsSection.jsx'
import EducationOffersSection from '../Components/EducationOffersSection.jsx'
import FooterSection from '../Components/FooterSection.jsx'
import Navbar from '../Components/Navbar.jsx'

const filterOptions = ['Subject', 'Partner', 'Program', 'Language', 'Availability', 'Learning Type']

const SiteHeaderAndSearch = () => {
  const [menuOpen, setMenuOpen] = useState(false)

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
            <div className="w-full flex items-center">
              <input
                type="text"
                placeholder="Search your favourite course"
                className="flex-1 rounded-l-full bg-white px-5 py-3 md:py-4 text-sm md:text-base placeholder-gray-400 focus:outline-none shadow"
              />
              <button className="rounded-r-full bg-teal-500 hover:bg-teal-600 text-white px-5 md:px-6 py-3 md:py-4 font-semibold shadow">
                Search
              </button>
            </div>

            {/* Filters */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {filterOptions.map((opt) => (
                <button key={opt} className="bg-white/95 backdrop-blur rounded-md px-3 py-2 text-sm text-gray-700 border border-gray-200 shadow-sm flex items-center justify-between">
                  <span>{opt}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.02 1.1l-4.22 3.815a.75.75 0 01-1.02 0L5.25 8.33a.75.75 0 01-.02-1.12z" clipRule="evenodd"/></svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Second Section: Courses Grid */}
      <CoursesGridSection />

      {/* Third Section: Learning Platform (hero + recommended) */}
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


