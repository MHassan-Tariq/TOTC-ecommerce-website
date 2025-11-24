import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../Components/Navbar.jsx'
import FooterSection from '../Components/FooterSection.jsx'
import { fetchCourses } from '../utils/api.js'

const Meeting = () => {
  const [activeTab, setActiveTab] = useState('1 hour')
  const [expandedSections, setExpandedSections] = useState(['Get Started'])
  const [mainImageSrc, setMainImageSrc] = useState('/img/h4.jpg')
  const [participantImages, setParticipantImages] = useState([
    '/img/profilephoto.png',
    '/img/profilephoto.png',
    '/img/profilephoto.png'
  ])
  const [bookRecommendations, setBookRecommendations] = useState([
    {
      id: 'fallback-1',
      title: 'All Benefits of PLUS',
      price: '$24',
      image: '/img/book1.jpg'
    },
    {
      id: 'fallback-2',
      title: 'All Benefits of PLUS',
      price: '$24',
      image: '/img/book1.jpg'
    }
  ])

  useEffect(() => {
    let isMounted = true

    const loadMediaContent = async () => {
      try {
        const data = await fetchCourses()
        const courses = Array.isArray(data?.courses) ? data.courses.filter(Boolean) : []

        if (!isMounted || courses.length === 0) return

        const normalizedCourses = courses.map((course, index) => ({
          id: course._id || course.id || `course-${index}`,
          title: course.title || 'Featured Course',
          price: Number.isFinite(Number(course.price)) && Number(course.price) > 0
            ? `$${Number(course.price).toFixed(2)}`
            : 'Free',
          image:
            course.imageUrl ||
            course.thumbnail ||
            course.coverImage ||
            course.bannerImage ||
            '/img/h4.jpg'
        }))

        const [heroCourse, ...restCourses] = normalizedCourses
        if (heroCourse?.image) {
          setMainImageSrc(heroCourse.image)
        }

        const participantSlice = restCourses.slice(0, 3)
        if (participantSlice.length > 0) {
          setParticipantImages(
            participantSlice.map((course) => course.image || '/img/profilephoto.png')
          )
        }

        const recommendations = normalizedCourses.slice(0, 2)
        if (recommendations.length > 0) {
          setBookRecommendations(recommendations)
        }
      } catch (error) {
        console.error('Failed to load meeting media content:', error)
      }
    }

    loadMediaContent()

    return () => {
      isMounted = false
    }
  }, [])

  const displayedParticipantImages = useMemo(() => {
    if (participantImages.length >= 3) {
      return participantImages.slice(0, 3)
    }
    return [...participantImages, ...Array(3 - participantImages.length).fill('/img/profilephoto.png')]
  }, [participantImages])

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Video Conference Player */}
          <div className="lg:col-span-2">
            {/* Video Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">UX/UI Design Conference Meeting</h1>
                <p className="text-sm text-gray-600">8 Lesson | 0h 30min</p>
              </div>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Main Video Area */}
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
              <img 
                src={mainImageSrc} 
                alt="Main speaker" 
                className="w-full h-80 object-cover"
                onError={(e) => { e.target.src = '/img/profilephoto.png' }}
              />
              
              {/* Participant Side Panel */}
              <div className="absolute right-4 top-4 space-y-2">
                {displayedParticipantImages.map((img, i) => (
                  <div key={i} className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md">
                    <img src={img} alt={`Participant ${i+1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Controls Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                <div className="flex justify-center space-x-4">
                  <button className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Course Contents and Book Recommendations */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Course Contents */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Course Contents</h3>
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Tabs */}
                <div className="flex mb-4">
                  <button 
                    onClick={() => setActiveTab('1 hour')}
                    className={`px-3 py-1 text-sm rounded-md mr-2 ${
                      activeTab === '1 hour' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'text-gray-500'
                    }`}
                  >
                    1 hour
                  </button>
                  <button 
                    onClick={() => setActiveTab('1 day')}
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeTab === '1 day' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'text-gray-500'
                    }`}
                  >
                    1 day
                  </button>
                </div>

                {/* Course Sections */}
                <div className="space-y-2">
                  {[
                    { title: 'Get Started', lessons: ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet'], completed: true },
                    { title: 'Using Relative', lessons: ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet'], completed: false },
                    { title: 'What is Fontest', lessons: ['Lorem ipsum dolor sit amet'], completed: false },
                    { title: 'Work with Truilogy', lessons: ['Lorem ipsum dolor sit amet'], completed: false }
                  ].map((section, i) => (
                    <div key={i} className="border-l-2 border-gray-200 pl-4">
                      <button 
                        onClick={() => toggleSection(section.title)}
                        className="w-full flex items-center justify-between py-2 text-left"
                      >
                        <span className="font-medium text-gray-900">{section.title}</span>
                        <div className="flex items-center space-x-2">
                          {section.completed && (
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                          <svg className={`w-4 h-4 text-gray-400 ${expandedSections.includes(section.title) ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </button>
                      
                      {expandedSections.includes(section.title) && (
                        <div className="ml-4 space-y-2">
                          {section.lessons.map((lesson, j) => (
                            <div key={j} className="flex items-center justify-between py-1">
                              <span className="text-sm text-gray-700">{lesson}</span>
                              <span className="text-xs text-gray-500">21 hour</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Book for You */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Book for you</h3>
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {bookRecommendations.map((book) => (
                    <div key={book.id} className="bg-gray-50 rounded-xl p-3 shadow-sm">
                      <img 
                        src={book.image} 
                        alt={book.title} 
                        className="w-full h-20 object-cover rounded-lg mb-2"
                        onError={(e) => { e.target.src = '/img/profilephoto.png' }}
                      />
                      <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{book.title}</h4>
                      <p className="text-sm font-bold text-gray-900">{book.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  )
}

export default Meeting
