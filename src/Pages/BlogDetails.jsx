import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import FooterSection from '../Components/FooterSection.jsx'
import RelatedBlogSection from '../Components/RelatedBlogSection.jsx'

const BlogDetails = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Hero Image */}
      <div className="w-full">
        <img
          src="/img/h4.jpg"
          alt="Article hero"
          className="w-full h-64 md:h-80 object-cover"
        />
      </div>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left text-[#333366] mb-8">
          Why Swift UI Should Be on the Radar of Every Mobile Developer
        </h1>

        {/* Main Content */}
        <div className="space-y-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            TOTC is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.
          </p>
          <p className="text-gray-700 leading-relaxed">
            TOTC is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.
          </p>
          <p className="text-gray-700 leading-relaxed">
            TOTC is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {['affordable', 'Stunning', 'making', 'madbrowns'].map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-800 border border-gray-200 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Author Bio */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/img/profilephoto.png"
              alt="Lina"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="text-sm text-gray-500">Written by</div>
              <div className="font-bold text-gray-800">Lina</div>
            </div>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-[#2EBAC6] font-medium hover:bg-gray-50 transition">
            Follow
          </button>
        </div>
      </section>

      <RelatedBlogSection />
      <FooterSection />
    </div>
  )
}

export default BlogDetails



