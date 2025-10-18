import React from 'react'

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
  { id: 1, cover: '/img/book-cover-1.jpg', title: 'All Benefits of PLUS', price: '$24' },
  { id: 2, cover: '/img/book-cover-2.jpg', title: 'All Benefits of PLUS', price: '$24' },
  { id: 3, cover: '/img/book-cover-3.jpg', title: 'All Benefits of PLUS', price: '$24' },
  { id: 4, cover: '/img/book-cover-4.jpg', title: 'All Benefits of PLUS', price: '$24' },
  { id: 5, cover: '/img/book-cover-5.jpg', title: 'All Benefits of PLUS', price: '$24' },
  { id: 6, cover: '/img/book-cover-6.jpg', title: 'All Benefits of PLUS', price: '$24' }
]

const Stat = ({ label, value }) => (
  <div className="flex items-center gap-2 text-xs text-gray-600">
    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
    <span className="font-semibold text-gray-800">{value}</span>
    <span className="text-gray-500">{label}</span>
  </div>
)

const UserProfileAndBookstore = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Profile Header Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-6">
        <div className="relative rounded-2xl shadow-lg overflow-hidden bg-white">
          {/* Subtle bg image top third */}
          <div className="relative h-28 md:h-36 bg-gray-100">
            <img
              src="/img/profile-banner-bg.jpg"
              alt="banner"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              onError={(e) => { e.currentTarget.src = '/img/h4.jpg' }}
            />
          </div>

          {/* Content Row */}
          <div className="p-5 md:p-6">
            <div className="flex items-start gap-4 md:gap-6">
              {/* Profile photo */}
              <div className="-mt-14 md:-mt-16 shrink-0">
                <img
                  src="/img/author-lina.jpg"
                  alt="Profile"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-4 ring-white shadow-md"
                  onError={(e) => { e.currentTarget.src = '/img/profilephoto.png' }}
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div>
                    <div className="text-sm text-gray-600">{profileData.name}</div>
                    <div className="text-xs text-gray-400">{profileData.title}</div>
                  </div>
                  <button className="self-start md:self-auto inline-flex items-center rounded-md bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-4 py-2 shadow">
                    Enroll Now
                  </button>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs md:text-sm text-gray-600 max-w-3xl">
                  {profileData.description}
                </p>

                {/* Stats Bar */}
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {profileData.stats.map((s, i) => (
                    <div key={i} className="flex items-center">
                      {i > 0 && <span className="mx-3 h-4 w-px bg-gray-300 hidden md:inline-block" />}
                      <Stat label={s.label} value={s.value} />
                    </div>
                  ))}
                  {/* small round indicators to the right */}
                  <div className="ml-auto hidden md:flex items-center gap-2 text-teal-500">
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    <span className="w-2 h-2 rounded-full bg-teal-400" />
                    <span className="w-2 h-2 rounded-full bg-teal-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex gap-2 overflow-auto no-scrollbar">
          {navTabs.map((tab) => (
            <button
              key={tab}
              className={
                `px-4 py-2 text-xs rounded-md border border-gray-200 whitespace-nowrap ${
                  tab === 'Book' ? 'bg-teal-500 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Book Recommendation Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-6">
        <h2 className="text-sm text-gray-700 mb-3">Literature course</h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {bookData.map((book) => (
            <div key={book.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="aspect-[3/4] w-full bg-gray-100">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = '/img/book1.jpg' }}
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-gray-600">{book.title}</span>
                  <span className="text-[13px] font-semibold text-teal-500">{book.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <button className="w-7 h-7 grid place-items-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">‹</button>
          {[1,2,3,4,5].map((n) => (
            <button
              key={n}
              className={`w-7 h-7 grid place-items-center rounded-md text-sm ${n===3 ? 'bg-teal-500 text-white' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
              {n}
            </button>
          ))}
          <button className="w-7 h-7 grid place-items-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">›</button>
        </div>
      </section>
    </div>
  )
}

export default UserProfileAndBookstore
