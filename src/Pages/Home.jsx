import React from 'react';
import HeroSection from '../Components/HeroSection.jsx';
import SuccessSection from '../Components/SuccessSection.jsx';
import WhatIsTotcSection from '../Components/WhatIsTotcSection.jsx';
import FeaturesSection from '../Components/FeaturesSection.jsx';
import OneOnOneSection from '../Components/OneOnOneSection.jsx';
import ExploreCourseSection from '../Components/ExploreCourseSection.jsx';
import TestimonialAndNewsSection from '../Components/TestimonialAndNewsSection.jsx';
import FooterSection from '../Components/FooterSection.jsx';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <SuccessSection />
      <WhatIsTotcSection />
      <FeaturesSection />
      <OneOnOneSection />
      <ExploreCourseSection />
      <TestimonialAndNewsSection />
      <FooterSection />
    </div>
  );
};

export default Home;
