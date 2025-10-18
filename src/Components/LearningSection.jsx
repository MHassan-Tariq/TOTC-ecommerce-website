import React from "react";
import { Link } from "react-router-dom";

const LearningSection = () => {
  return (
    <section className="w-full bg-[#EAF3FB]">
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-12">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-4 mb-8">
          <h2 className="text-gray-900 font-bold text-lg md:text-xl text-center md:text-left">
            Welcome back, ready for your next lesson?
          </h2>
          <button className="inline-flex items-center rounded-full bg-gradient-to-r from-[#29c3c1] to-[#1eb2a6] px-5 py-2.5 text-sm font-semibold shadow-lg hover:scale-[1.02] transition-transform text-white">
            View History
          </button>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { src: "/img/book1.jpg", id: 1 },
            { src: "/img/book2.jpg", id: 2 },
            { src: "/img/book3.jpg", id: 3 },
          ].map((item, i) => (
            <Link
              to={`/course/${item.id}`}
              key={i}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden block"
            >
              {/* Top Image */}
              <div className="w-full h-40 md:h-44 lg:h-48 overflow-hidden">
                <img
                  src={item.src}
                  alt="Course"
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>

              {/* Card Body */}
              <div className="p-4 md:p-5">
                {/* Title */}
                <h3 className="text-gray-900 font-bold text-base md:text-lg leading-snug">
                  AWS Certified Solutions Architect
                </h3>

                 {/* Instructor */}
                 <div className="mt-3 flex items-center gap-3">
                   <img
                     src="/img/profilephoto.png"
                     alt="Instructor"
                     className="w-8 h-8 rounded-full object-cover"
                   />
                 </div>

                 {/* Progress */}
                 <div className="mt-4">
                   <div className="w-full h-2 bg-gray-200 rounded-full">
                     <div className="h-2 bg-gradient-to-r from-[#29c3c1] to-[#1eb2a6] rounded-full w-[70%]" />
                   </div>
                   <div className="mt-2 flex justify-end">
                     <span className="text-xs text-gray-500">Lessons 5 of 7</span>
                   </div>
                 </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-center md:justify-end">
          <div className="inline-flex items-center gap-3">
      <button
        type="button"
              className="w-9 h-9 rounded-full bg-gradient-to-r from-[#29c3c1] to-[#1eb2a6] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
              aria-label="Previous"
            >
              &lt;
      </button>
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-gradient-to-r from-[#29c3c1] to-[#1eb2a6] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
              aria-label="Next"
            >
              &gt;
            </button>
          </div>
      </div>
    </div>

      {/* Top Categories Section */}
      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-gray-800 font-bold text-xl md:text-2xl">
              Choice favourite course from top category
            </h2>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "/img/design.png",
                title: "Design",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod",
                bgColor: "bg-teal-100",
                iconColor: "text-teal-600",
                link: "/courses"
              },
              {
                icon: "/img/development.png",
                title: "Development",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod",
                bgColor: "bg-blue-100",
                iconColor: "text-blue-600",
                link: "/courses"
              },
              {
                icon: "/img/development2.png",
                title: "Literature",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod",
                bgColor: "bg-purple-100",
                iconColor: "text-purple-600",
                link: "/courses/literature"
              },
              {
                icon: "/img/business.png",
                title: "Business",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod",
                bgColor: "bg-teal-100",
                iconColor: "text-teal-600",
                link: "/courses"
              },
              {
                icon: "/img/analysis.png",
                title: "Marketing",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod",
                bgColor: "bg-orange-100",
                iconColor: "text-orange-600",
                link: "/courses"
              },
              {
                icon: "/img/camera.png",
                title: "Photography",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod",
                bgColor: "bg-red-100",
                iconColor: "text-red-600",
                link: "/courses"
              },
              {
                icon: "/img/acting.png",
                title: "Acting",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod",
                bgColor: "bg-gray-100",
                iconColor: "text-gray-600",
                link: "/courses"
              },
              {
                icon: "/img/business.png",
                title: "Business",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipiscing elit, sed do eiusmod",
                bgColor: "bg-teal-100",
                iconColor: "text-teal-600",
                link: "/courses"
              }
            ].map((category, i) => (
              <Link
                key={i}
                to={category.link || "/courses"}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center p-6 block"
              >
                {/* Icon Container */}
                <div className={`w-10 h-10 ${category.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <img
                    src={category.icon}
                    alt={category.title}
                    className={`w-6 h-6 ${category.iconColor}`}
                  />
                </div>

                {/* Category Title */}
                <h3 className="text-gray-800 font-bold text-lg mt-4 mb-2">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mt-2">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended for You Section */}
      <section className="w-full bg-[#EAF4FB] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-gray-900 font-semibold text-lg md:text-xl">
              Recommended for you
        </h2>
            <a
              href="#"
              className="text-[#1fb6ff] font-medium text-sm cursor-pointer hover:underline"
            >
              See all
            </a>
        </div>

          {/* Cards Carousel */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto no-scrollbar px-1 pb-4">
              {[
                { 
                  src: "/img/book1.jpg", 
                  category: "Design", 
                  duration: "3 Month",
                  title: "AWS Certified Solutions Architect",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                  instructor: "Lina",
                  oldPrice: "$100",
                  newPrice: "$80"
                },
                { 
                  src: "/img/book2.jpg", 
                  category: "Development", 
                  duration: "6 Month",
                  title: "AWS Certified Solutions Architect",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                  instructor: "Lina",
                  oldPrice: "$120",
                  newPrice: "$90"
                },
                { 
                  src: "/img/book3.jpg", 
                  category: "Business", 
                  duration: "4 Month",
                  title: "AWS Certified Solutions Architect",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                  instructor: "Lina",
                  oldPrice: "$150",
                  newPrice: "$110"
                },
                { 
                  src: "/img/book4.jpg", 
                  category: "Marketing", 
                  duration: "2 Month",
                  title: "AWS Certified Solutions Architect",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
                  instructor: "Lina",
                  oldPrice: "$80",
                  newPrice: "$60"
                },
              ].map((course, i) => (
                <Link
                  to={`/course/${i + 1}`}
                  key={i}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 md:p-5 w-72 md:w-80 flex-shrink-0 block"
                >
                  {/* Image */}
                  <div className="w-full h-44 overflow-hidden rounded-xl mb-4">
                    <img
                      src={course.src}
                      alt="Course"
                      className="w-full h-full object-cover"
                    />
      </div>

                  {/* Category & Duration */}
                  <div className="flex justify-between text-gray-400 text-xs font-medium mb-2">
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                      {course.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                      {course.duration}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-gray-800 font-semibold text-base mt-2">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mt-1 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Instructor & Price */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <img
                        src="/img/profilephoto.png"
                        alt="Instructor"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-gray-700 text-sm ml-2">{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 line-through text-sm">{course.oldPrice}</span>
                      <span className="text-[#00b894] font-semibold text-base">{course.newPrice}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center md:justify-end mt-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="bg-[#00bcd4] hover:bg-[#0097a7] text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition"
                  aria-label="Previous"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="bg-[#00bcd4] hover:bg-[#0097a7] text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition"
                  aria-label="Next"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses & Coaching Section */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section 1: Course Showcase */}
          <div className="mb-12">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-gray-800 font-bold text-xl md:text-2xl">
                Get choice of your course
              </h2>
              <a
                href="#"
                className="text-teal-500 font-medium text-sm hover:underline"
              >
                See all
              </a>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  src: "/img/book1.jpg",
                  category: "Design",
                  duration: "3 Month",
                  title: "AWS Certified Solutions Architect",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  author: "Lina",
                  oldPrice: "$100",
                  newPrice: "$80"
                },
                {
                  src: "/img/book2.jpg",
                  category: "Development",
                  duration: "6 Month",
                  title: "AWS Certified Solutions Architect",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  author: "Lina",
                  oldPrice: "$120",
                  newPrice: "$90"
                },
                {
                  src: "/img/book3.jpg",
                  category: "Business",
                  duration: "4 Month",
                  title: "AWS Certified Solutions Architect",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  author: "Lina",
                  oldPrice: "$150",
                  newPrice: "$110"
                },
                {
                  src: "/img/book4.jpg",
                  category: "Marketing",
                  duration: "2 Month",
                  title: "AWS Certified Solutions Architect",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  author: "Lina",
                  oldPrice: "$80",
                  newPrice: "$60"
                }
              ].map((course, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Course Image */}
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={course.src}
                      alt="Course"
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4 md:p-5">
                    {/* Category & Duration */}
                    <div className="flex justify-between text-gray-400 text-xs font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                        {course.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {course.duration}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-gray-800 font-semibold text-lg mb-2 line-clamp-2">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Author & Price */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="/img/profilephoto.png"
                          alt="Author"
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-gray-700 text-sm ml-2">{course.author}</span>
                  </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-sm">{course.oldPrice}</span>
                        <span className="text-[#00BFA5] font-semibold text-base">{course.newPrice}</span>
            </div>
          </div>
        </div>
      </div>
              ))}
            </div>
          </div>

          {/* Section 2: Coaching Banner */}
          <div className="bg-gray-800 rounded-2xl mt-12 py-10 md:py-16">
            <div className="text-center">
              <h3 className="text-white font-bold text-xl md:text-2xl mb-4">
                Online coaching lessons for remote learning.
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-6 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
                Start learning now
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Course Grids Section */}
      <section className="w-full">
        {/* Section 1: The course in personal development */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-gray-800 font-semibold text-xl">
                The course in personal development
              </h2>
              <a
                href="#"
                className="text-teal-500 hover:text-teal-600 font-medium text-sm"
              >
                See all
              </a>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  id: 1,
                  title: "AWS Certified Solutions Architect",
                  category: "Design",
                  duration: "3 months",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                  author: "Lina",
                  authorImage: "/img/profilephoto.png",
                  image: "/img/book1.jpg",
                  oldPrice: "$100",
                  price: "$80"
                },
                {
                  id: 2,
                  title: "AWS Certified Solutions Architect",
                  category: "Development",
                  duration: "6 months",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                  author: "Lina",
                  authorImage: "/img/profilephoto.png",
                  image: "/img/book2.jpg",
                  oldPrice: "$120",
                  price: "$90"
                },
                {
                  id: 3,
                  title: "AWS Certified Solutions Architect",
                  category: "Business",
                  duration: "4 months",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                  author: "Lina",
                  authorImage: "/img/profilephoto.png",
                  image: "/img/book3.jpg",
                  oldPrice: "$150",
                  price: "$110"
                },
                {
                  id: 4,
                  title: "AWS Certified Solutions Architect",
                  category: "Marketing",
                  duration: "2 months",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                  author: "Lina",
                  authorImage: "/img/profilephoto.png",
                  image: "/img/book4.jpg",
                  oldPrice: "$80",
                  price: "$60"
                }
              ].map((course) => (
                <Link
                  to={`/course/${course.id}`}
                  key={course.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden block"
                >
                  {/* Course Image */}
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt="Course"
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    {/* Meta Info Row */}
                    <div className="flex justify-between text-gray-400 text-xs font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                        {course.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {course.duration}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-gray-800 font-semibold text-lg mb-2 line-clamp-2">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Footer Row */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src={course.authorImage}
                          alt="Author"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-gray-700 text-sm ml-2">{course.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-sm">{course.oldPrice}</span>
                        <span className="text-[#00BFA5] font-semibold text-base">{course.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Student are viewing */}
        <div className="bg-[#F3F9FF] py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-gray-800 font-semibold text-xl">
                Student are viewing
              </h2>
              <a
                href="#"
                className="text-teal-500 hover:text-teal-600 font-medium text-sm"
              >
                See all
              </a>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  id: 5,
                  title: "AWS Certified Solutions Architect",
                  category: "Design",
                  duration: "3 months",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                  author: "Lina",
                  authorImage: "/img/profilephoto.png",
                  image: "/img/book5.png",
                  oldPrice: "$100",
                  price: "$80"
                },
                {
                  id: 6,
                  title: "AWS Certified Solutions Architect",
                  category: "Development",
                  duration: "6 months",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                  author: "Lina",
                  authorImage: "/img/profilephoto.png",
                  image: "/img/book6.jpg",
                  oldPrice: "$120",
                  price: "$90"
                },
                {
                  id: 7,
                  title: "AWS Certified Solutions Architect",
                  category: "Business",
                  duration: "4 months",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                  author: "Lina",
                  authorImage: "/img/profilephoto.png",
                  image: "/img/book1.jpg",
                  oldPrice: "$150",
                  price: "$110"
                },
                {
                  id: 8,
                  title: "AWS Certified Solutions Architect",
                  category: "Marketing",
                  duration: "2 months",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                  author: "Lina",
                  authorImage: "/img/profilephoto.png",
                  image: "/img/book2.jpg",
                  oldPrice: "$80",
                  price: "$60"
                }
              ].map((course) => (
                <Link
                  to={`/course/${course.id}`}
                  key={course.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden block"
                >
                  {/* Course Image */}
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt="Course"
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    {/* Meta Info Row */}
                    <div className="flex justify-between text-gray-400 text-xs font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                        {course.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {course.duration}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-gray-800 font-semibold text-lg mb-2 line-clamp-2">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Footer Row */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src={course.authorImage}
                          alt="Author"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-gray-700 text-sm ml-2">{course.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-sm">{course.oldPrice}</span>
                        <span className="text-[#00BFA5] font-semibold text-base">{course.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
      </section>
    </section>
  );
};

export default LearningSection;
