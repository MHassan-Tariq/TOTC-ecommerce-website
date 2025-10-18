import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import PricingSection from '../Components/PricingSection.jsx'
import LearningSection from '../Components/LearningSection.jsx'
import ApplySection from '../Components/ApplySection.jsx'
import FooterSection from '../Components/FooterSection.jsx'

const Careers = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top Navbar (same as Courses page) */}
      <div className="relative bg-white">
        <Navbar />
      </div>

      {/* First section: Affordable Pricing */}
      <PricingSection />

      {/* Second section: Learning (Accordion, Testimonials, App) */}
      <LearningSection />

      {/* Third section: Apply cards */}
      <ApplySection />

      {/* Footer same as home page */}
      <FooterSection />
    </div>
  )
}

export default Careers


