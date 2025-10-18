import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const navLinks = ['Home', 'Courses', 'Careers', 'Blog', 'About Us']
const filterOptions = ['Subject', 'Partner', 'Program', 'Language', 'Availability', 'Learning Type']

const SiteHeaderAndSearch = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border-2 border-teal-500 text-teal-500 font-semibold">T</span>
            <span className="font-semibold text-teal-600 tracking-wide">TOTC</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((label) => (
              <Link
                key={label}
                to={label === 'Home' ? '/' : `/${label.toLowerCase().replace(/\s+/g, '')}`}
                className="text-sm text-gray-700 hover:text-teal-600 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right: Avatar and Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link to="#" className="hidden md:flex items-center gap-2">
              <img
                src="/img/user-lina.jpg"
                onError={(e) => { e.currentTarget.src = '/img/profilephoto.png' }}
                alt="Lina"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm text-gray-800">Lina</span>
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.02 1.1l-4.22 3.815a.75.75 0 01-1.02 0L5.25 8.33a.75.75 0 01-.02-1.12z" clipRule="evenodd"/></svg>
            </Link>
            <button onClick={() => setMenuOpen((v) => !v)} className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-200">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-4 py-3 flex items-center gap-3">
              <img src="/img/user-lina.jpg" onError={(e)=>{e.currentTarget.src='/img/profilephoto.png'}} alt="Lina" className="w-8 h-8 rounded-full object-cover" />
              <span className="text-sm text-gray-800">Lina</span>
            </div>
            <nav className="px-4 pb-3 grid grid-cols-2 gap-2">
              {navLinks.map((label) => (
                <Link
                  key={label}
                  to={label === 'Home' ? '/' : `/${label.toLowerCase().replace(/\s+/g, '')}`}
                  className="px-3 py-2 text-sm rounded-md border border-gray-200 text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

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
    </div>
  )
}

export default SiteHeaderAndSearch


