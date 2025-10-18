import React from 'react'
import Navbar from '../Components/Navbar.jsx'

const profileData = {
  name: 'John Anderson',
  title: 'Assistant Professor at Moncaster University',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
  stats: [
    { label: 'Modules', value: 43 },
    { label: 'Students', value: 120 },
    { label: 'Courses', value: 7 }
  ]
}

const navTabs = ['About', 'Course', 'Notes', 'Project', 'Podcast', 'Book', 'Review']

const bookData = [
  { id: 1, cover: '/img/book1.jpg', title: 'All Benefits of PLUS', price: '$24' },
  { id: 2, cover: '/img/book2.jpg', title: 'All Benefits of PLUS', price: '$24' },
  { id: 3, cover: '/img/book3.jpg', title: 'All Benefits of PLUS', price: '$24' },
  { id: 4, cover: '/img/book4.jpg', title: 'All Benefits of PLUS', price: '$24' },
  { id: 5, cover: '/img/book5.png', title: 'All Benefits of PLUS', price: '$24' },
  { id: 6, cover: '/img/book6.jpg', title: 'All Benefits of PLUS', price: '$24' }
]

const CourseLanding = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main White Card Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          
          {/* Profile Banner Section */}
          <div className="relative">
            {/* Background Image - Top Section */}
            <div className="relative h-32 bg-gray-100">
              <img
                src="/img/h4.jpg"
                alt="banner"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
            </div>

            {/* Profile Content */}
            <div className="px-8 py-8">
              <div className="flex items-start gap-8">
                {/* Profile Photo - Position lower (no overlap) */}
                <div className="mt-6 md:mt-8 flex-shrink-0">
                  <img
                    src="/img/profilephoto.png"
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                </div>

                {/* User Details */}
                <div className="flex-1 pt-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                      <p className="text-base text-gray-600 mt-2">{profileData.title}</p>
                    </div>
                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium text-sm shadow-md">
                      Enroll Now
                    </button>
                  </div>

                  {/* Description */}
                  <p className="mt-6 text-base text-gray-600 leading-relaxed max-w-4xl">
                    {profileData.description}
                  </p>

                  {/* Stats Bar */}
                  <div className="mt-8 flex items-center gap-8">
                    {profileData.stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-3">
                        {i > 0 && <div className="w-px h-6 bg-gray-300" />}
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-teal-500" />
                          <span className="text-base font-semibold text-gray-800">{stat.value}</span>
                          <span className="text-base text-gray-500">{stat.label}</span>
                        </div>
                      </div>
                    ))}
                    
                    {/* Decorative Dots */}
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-teal-300" />
                      <div className="w-2 h-2 rounded-full bg-teal-400" />
                      <div className="w-2 h-2 rounded-full bg-teal-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-8 pb-6">
            <div className="flex gap-4 overflow-x-auto">
              {navTabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-3 text-sm rounded-lg border whitespace-nowrap transition-colors ${
                    tab === 'Book' 
                      ? 'bg-teal-500 text-white border-teal-500 shadow-md' 
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Book Recommendation Grid */}
          <div className="px-8 pb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Literature course</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {bookData.map((book) => (
                <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="aspect-[3/4] w-full bg-gray-100">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-center">
                      <h3 className="text-base font-bold text-gray-800 mb-2">{book.title}</h3>
                      <p className="text-lg font-bold text-teal-500">{book.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-3">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium ${
                    n === 1 
                      ? 'bg-teal-500 text-white' 
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {n}
                </button>
              ))}
              <span className="text-gray-400">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-teal-500 text-white hover:bg-teal-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseLanding


