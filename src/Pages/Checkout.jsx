import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import FooterSection from '../Components/FooterSection.jsx'
import CheckoutSection from '../Components/CheckoutSection.jsx'
import EducationOffersSection from '../Components/EducationOffersSection.jsx'

const Checkout = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="bg-white shadow-sm">
        <Navbar />
      </div>

      <CheckoutSection />
      <EducationOffersSection />
      <FooterSection />
    </div>
  )
}

export default Checkout


