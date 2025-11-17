import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../Components/Navbar.jsx'
import BlogSection from '../Components/BlogSection.jsx'
import RelatedBlogSection from '../Components/RelatedBlogSection.jsx'
import MarketingArticles from '../Components/MarketingArticles.jsx'
import FooterSection from '../Components/FooterSection.jsx'
import { fetchBlogs } from '../utils/api.js'
import { Loader2 } from 'lucide-react'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs()
        setBlogs(data.blogs || [])
      } catch (err) {
        setError(err.message || 'Unable to load blogs at the moment.')
      } finally {
        setLoading(false)
      }
    }

    loadBlogs()
  }, [])

  const { featured, readingList, relatedList, marketingList } = useMemo(() => {
    if (!blogs || blogs.length === 0) {
      return {
        featured: null,
        readingList: [],
        relatedList: [],
        marketingList: [],
      }
    }

    const featuredBlog = blogs[0]
    const pool = blogs.length > 1 ? blogs.slice(1) : blogs

    const buildSegment = (source, startIndex, count) => {
      if (!source.length || count <= 0) return []
      const result = []
      for (let i = 0; i < count; i += 1) {
        const idx = (startIndex + i) % source.length
        result.push(source[idx])
      }
      return result
    }

    const reading = buildSegment(pool, 0, 4)
    const related = buildSegment(pool, reading.length, 2)
    const marketing = buildSegment(pool, reading.length + related.length, 4)

    return {
      featured: featuredBlog,
      readingList: reading,
      relatedList: related,
      marketingList: marketing,
    }
  }, [blogs])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar same as other pages */}
      <div className="relative bg-white">
        <Navbar />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-6 py-4 text-center">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
        </div>
      ) : (
        <>
          <BlogSection featured={featured} readingList={readingList} allBlogs={blogs} />
          <RelatedBlogSection posts={relatedList} />
          <MarketingArticles posts={marketingList} />
        </>
      )}

      <FooterSection />
    </div>
  )
}

export default Blog


