import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar.jsx'
import FooterSection from '../Components/FooterSection.jsx'
import RelatedBlogSection from '../Components/RelatedBlogSection.jsx'
import { fetchBlogBySlug, fetchBlogs } from '../utils/api.js'
import { Loader2, ArrowLeft } from 'lucide-react'

const BlogDetails = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true)
        const [{ blog: blogData }, { blogs: allBlogs }] = await Promise.all([
          fetchBlogBySlug(slug),
          fetchBlogs(),
        ])
        setBlog(blogData)
        const others = (allBlogs || []).filter((item) => item._id !== blogData._id)
        setRelated(others.slice(0, 2))
      } catch (err) {
        setError(err.message || 'Unable to load blog details.')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadBlog()
    }
  }, [slug])

  const tags = useMemo(() => (blog?.tags || []).filter(Boolean), [blog])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="bg-white shadow-sm">
        <Navbar />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
        </div>
      ) : error ? (
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-600">
            {error}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative w-full">
            <img
              src={blog?.categoryImage || blog?.coverImage || '/img/h4.jpg'}
              alt={blog?.title}
              className="w-full h-64 md:h-80 object-cover"
              onError={(e) => {
                e.currentTarget.src = '/img/h4.jpg'
              }}
            />
          </div>

          <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                <ArrowLeft className="h-4 w-4" /> Back to blog
              </button>
              <span className="text-xs text-gray-500 uppercase tracking-[0.2em]">
                {blog?.category || 'Blog'}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left text-[#333366] mb-6">
              {blog?.title}
            </h1>

            <div className="space-y-6 mb-8 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog?.content || '' }} />

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-12">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-800 border border-gray-200 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-end">
              <Link
                to="/meeting"
                className="px-4 py-2 border border-gray-300 rounded-md text-[#2EBAC6] font-medium hover:bg-gray-50 transition"
              >
                Follow
              </Link>
            </div>
          </section>

          <RelatedBlogSection posts={related} />
        </>
      )}

      <FooterSection />
    </div>
  )
}

export default BlogDetails



