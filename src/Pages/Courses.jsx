import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import LearningSection from '../Components/LearningSection.jsx'
import FooterSection from '../Components/FooterSection.jsx'

const Courses = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top Navbar */}
      <div className="relative bg-white">
        <Navbar />
      </div>

      {/* Dashboard learning section */}
      <LearningSection />

      {/* Footer same as home page */}
      <FooterSection />
    </div>
  )
}

export default Courses


