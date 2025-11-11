import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import CourseDetailSection from '../Components/CourseDetailSection.jsx'

const CourseCalendar = () => {
  return (
    <div className="min-h-screen bg-[#E9F1F9]">
      <div className="bg-white shadow-sm">
        <Navbar />
      </div>
      <CourseDetailSection />
    </div>
  )
}

export default CourseCalendar


