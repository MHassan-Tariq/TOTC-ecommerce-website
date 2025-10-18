import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import BlogSection from '../Components/BlogSection.jsx'
import RelatedBlogSection from '../Components/RelatedBlogSection.jsx'
import MarketingArticles from '../Components/MarketingArticles.jsx'
import FooterSection from '../Components/FooterSection.jsx'

const Blog = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar same as other pages */}
      <div className="relative bg-white">
        <Navbar />
      </div>

      {/* Use the same sections as Courses page */}
      <BlogSection />
      <RelatedBlogSection />
      <MarketingArticles />

      <FooterSection />
    </div>
  )
}

export default Blog


