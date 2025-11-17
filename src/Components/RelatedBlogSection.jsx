import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const fallbackPosts = [
  {
    slug: 'sample-1',
    title: 'Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution',
    categoryImage: '/img/h5.jpg',
    author: 'Team TOTC',
    excerpt: 'Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...',
    views: '251,232',
  },
  {
    slug: 'sample-2',
    title: 'Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution',
    categoryImage: '/img/h6.png',
    author: 'Team TOTC',
    excerpt: 'Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...',
    views: '251,232',
  },
]

const RelatedBlogSection = ({ posts = [] }) => {
  const blogPosts = posts.length > 0 ? posts : fallbackPosts
  const [startIndex, setStartIndex] = useState(0)

  const visiblePosts = useMemo(() => {
    if (blogPosts.length <= 2) return blogPosts

    const result = []
    for (let i = 0; i < 2; i += 1) {
      const idx = (startIndex + i) % blogPosts.length
      result.push(blogPosts[idx])
    }
    return result
  }, [blogPosts, startIndex])

  const handlePrev = () => {
    if (blogPosts.length <= 2) return
    setStartIndex((prev) => (prev - 2 + blogPosts.length) % blogPosts.length)
  }

  const handleNext = () => {
    if (blogPosts.length <= 2) return
    setStartIndex((prev) => (prev + 2) % blogPosts.length)
  }

  return (
    <section className="w-full bg-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Related Blog</h2>
          <a href="#" className="text-sm text-blue-500 hover:underline">See all</a>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {visiblePosts.map((post, index) => (
            <article key={`${post.slug || post._id || 'related'}-${index}`} className="bg-white rounded-xl shadow-xl overflow-hidden">
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.categoryImage || post.coverImage || '/img/h5.jpg'} 
                  alt={post.title}
                  className="w-full h-full object-cover rounded-t-xl"
                  onError={(e) => {
                    e.currentTarget.src = '/img/h5.jpg'
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4 leading-snug">
                  {post.title}
                </h3>

                {/* Author */}
                <div className="flex items-center gap-2 mb-4">
                  <img 
                    src="/img/profilephoto.png" 
                    alt={post.author || 'Author'}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-500">{post.author || 'Team TOTC'}</span>
                </div>

                {/* Description */}
                <p className="text-base text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt || 'Stay tuned for more insights from our community.'}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center">
                  <Link
                    to={post.slug ? `/blog/${post.slug}` : '#'}
                    className="text-blue-500 text-sm underline hover:no-underline"
                    state={post._id ? { blogId: post._id } : undefined}
                  >
                    Read more
                  </Link>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span>{post.views || '—'}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handlePrev}
            disabled={blogPosts.length <= 2}
            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition disabled:opacity-40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={blogPosts.length <= 2}
            className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition disabled:opacity-40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default RelatedBlogSection