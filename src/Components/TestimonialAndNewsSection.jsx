import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../utils/api.js";

const Star = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M11.48 3.499a.75.75 0 0 1 1.04 0l2.42 2.356a.75.75 0 0 0 .564.218l3.35-.29a.75.75 0 0 1 .67 1.09l-1.534 3.07a.75.75 0 0 0 .082.78l2.052 2.812a.75.75 0 0 1-.5 1.17l-3.312.594a.75.75 0 0 0-.57.44l-1.31 3.09a.75.75 0 0 1-1.35.06l-1.67-2.91a.75.75 0 0 0-.66-.37h-.07a.75.75 0 0 0-.66.37l-1.67 2.91a.75.75 0 0 1-1.35-.06l-1.31-3.09a.75.75 0 0 0-.57-.44l-3.31-.594a.75.75 0 0 1-.5-1.17l2.05-2.812a.75.75 0 0 0 .083-.78L3.475 6.873a.75.75 0 0 1 .67-1.09l3.35.29a.75.75 0 0 0 .565-.218l2.42-2.356Z"/>
  </svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path fillRule="evenodd" d="M12.97 4.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4.5a.75.75 0 0 1 0-1.5h13.19l-4.72-4.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"/>
  </svg>
);

const FALLBACK_MAIN_IMAGE = "/img/h4.jpg";
const FALLBACK_SECONDARY_IMAGE = "/img/h10.png";

const createExcerpt = (blog) => {
  if (!blog) return "";
  if (blog.excerpt) return blog.excerpt;

  if (blog.content) {
    const stripped = blog.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    if (stripped.length > 140) {
      return `${stripped.slice(0, 140).trim()}…`;
    }
    return stripped;
  }

  return "";
};

const TestimonialAndNewsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadBlogs = async () => {
      try {
        const result = await fetchBlogs();
        const blogList = Array.isArray(result?.blogs)
          ? result.blogs
          : Array.isArray(result)
            ? result
            : [];

        if (isMounted) {
          setBlogs(blogList);
        }
      } catch (error) {
        console.error("Failed to load blogs for news section", error);
        if (isMounted) {
          setBlogs([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  const { featureBlog, secondaryBlogs } = useMemo(() => {
    if (!blogs.length) {
      return {
        featureBlog: null,
        secondaryBlogs: [],
      };
    }

    return {
      featureBlog: blogs[0],
      secondaryBlogs: blogs.slice(1, 4),
    };
  }, [blogs]);

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <div>
            <div className="text-[#6B7A99] uppercase text-sm tracking-wider font-medium">Testimonial</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A40] mt-2">What They Say?</h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              TOTC has got more than 100k positive ratings from our users around the world. Some of the
              students and teachers were greatly helped by the Skilline.
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed">Are you too? Please give your assessment</p>
            <button className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-full border border-[#00B2FF] text-[#00B2FF] font-semibold hover:bg-[#00B2FF] hover:text-white transition-all duration-300">
              Write your assessment
              <ArrowRight />
            </button>
          </div>

          {/* Right image + overlay card */}
          <div className="relative flex justify-center lg:justify-end">
            {/* image container with inner margins */}
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-md">
              <img src="/img/profilephoto.png" alt="Smiling person with notebooks" className="w-full h-auto object-cover" />
            </div>
            {/* blue nav button */}
            <button className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#00B2FF] text-white rounded-full p-3 shadow-lg"> 
              <ArrowRight />
            </button>
            {/* testimonial card */}
            <div className="absolute right-6 -bottom-6 bg-white shadow-lg rounded-2xl p-6 max-w-sm w-[85%]">
              <p className="text-gray-600 text-sm leading-relaxed">
                “Thank you so much for your help. It’s exactly what I’ve been looking for. You won’t regret it. It
                really saves me time and effort. TOTC is exactly what our business has been lacking.”
              </p>
              <div className="mt-4">
                <div className="font-semibold text-gray-900">Gloria Rose</div>
                <div className="text-xs text-gray-400">12 reviews at Yelp</div>
                <div className="flex gap-1 text-yellow-400 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* News */}
        <div className="mt-24 pt-12 border-t border-gray-200">
          <h3 className="text-2xl md:text-3xl font-semibold text-[#1A1A40] text-center">Lastest News and Resources</h3>
          <p className="text-gray-500 text-sm mt-2 text-center">See the developments that have occurred to TOTC in the world</p>

          {/* Complex grid: big left card, stacked list on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {/* Big left card */}
            {loading ? (
              <article className="bg-white rounded-2xl overflow-hidden shadow transition-all duration-300">
                <div className="relative">
                  <div className="w-full h-64 bg-gray-200 animate-pulse" />
                  <span className="absolute left-4 bottom-4 inline-block px-3 py-1 text-xs font-semibold rounded-full text-white bg-gradient-to-r from-[#00B2FF] to-[#0078FF]">
                    Loading
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="h-5 w-3/4 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-3 w-full bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-3 w-5/6 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </article>
            ) : featureBlog ? (
              <article className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <div className="relative">
                  <img
                    src={featureBlog.coverImage || featureBlog.categoryImage || FALLBACK_MAIN_IMAGE}
                    alt={featureBlog.title}
                    className="w-full h-64 object-cover"
                    onError={(event) => {
                      event.currentTarget.src = FALLBACK_MAIN_IMAGE;
                    }}
                  />
                  <span className="absolute left-4 bottom-4 inline-block px-3 py-1 text-xs font-semibold rounded-full text-white bg-gradient-to-r from-[#00B2FF] to-[#0078FF]">
                    {(featureBlog.category || "News").toUpperCase()}
                  </span>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mt-4 hover:text-[#00B2FF] cursor-pointer">
                    {featureBlog.title}
                  </h4>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    {createExcerpt(featureBlog) || "Explore the latest stories, insights, and updates from our community of learners and educators."}
                  </p>
                  <Link
                    to={featureBlog.slug ? `/blog/${featureBlog.slug}` : `/blog/${featureBlog._id}`}
                    className="text-[#00B2FF] font-medium mt-4 inline-block hover:underline"
                  >
                    Read more
                  </Link>
                </div>
              </article>
            ) : (
              <article className="bg-white rounded-2xl overflow-hidden shadow transition-all duration-300">
                <div className="relative">
                  <img src={FALLBACK_MAIN_IMAGE} alt="Blog placeholder" className="w-full h-64 object-cover" />
                  <span className="absolute left-4 bottom-4 inline-block px-3 py-1 text-xs font-semibold rounded-full text-white bg-gradient-to-r from-[#00B2FF] to-[#0078FF]">
                    NEWS
                  </span>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mt-4">
                    Fresh insights are on their way
                  </h4>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    Publish a blog post from the admin panel to showcase it here automatically.
                  </p>
                  <span className="text-[#00B2FF] font-medium mt-4 inline-block">
                    Read more
                  </span>
                </div>
              </article>
            )}

            {/* Right stacked cards */}
            <div className="grid grid-cols-1 gap-6">
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <article
                      key={`news-placeholder-${index}`}
                      className="bg-white rounded-2xl overflow-hidden shadow transition-all duration-300"
                    >
                      <div className="flex gap-4 p-6">
                        <div className="relative">
                          <div className="w-32 h-24 rounded-xl bg-gray-200 animate-pulse" />
                          <span className="absolute left-2 bottom-2 inline-block px-2.5 py-1 text-[10px] font-semibold rounded-full text-white bg-gradient-to-r from-[#00B2FF] to-[#0078FF]">
                            Loading
                          </span>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-3/4 bg-gray-200 rounded-full animate-pulse" />
                          <div className="h-3 w-full bg-gray-200 rounded-full animate-pulse" />
                          <div className="h-3 w-5/6 bg-gray-200 rounded-full animate-pulse" />
                        </div>
                      </div>
                    </article>
                  ))
                : secondaryBlogs.length > 0
                  ? secondaryBlogs.map((blog) => (
                      <article
                        key={blog._id}
                        className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex gap-4 p-6">
                          <div className="relative">
                            <img
                              src={blog.coverImage || blog.categoryImage || FALLBACK_SECONDARY_IMAGE}
                              alt={blog.title}
                              className="w-32 h-24 object-cover rounded-xl"
                              onError={(event) => {
                                event.currentTarget.src = FALLBACK_SECONDARY_IMAGE;
                              }}
                            />
                            <span className="absolute left-2 bottom-2 inline-block px-2.5 py-1 text-[10px] font-semibold rounded-full text-white bg-gradient-to-r from-[#00B2FF] to-[#0078FF]">
                              {(blog.category || "News").toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-gray-800 mt-2 hover:text-[#00B2FF] cursor-pointer">
                              {blog.title}
                            </h4>
                            <p className="text-gray-500 text-xs mt-2 leading-relaxed line-clamp-2">
                              {createExcerpt(blog) || "Stay tuned for more updates and detailed stories from our blog."}
                            </p>
                            <Link
                              to={blog.slug ? `/blog/${blog.slug}` : `/blog/${blog._id}`}
                              className="inline-flex items-center gap-2 text-xs font-medium text-[#00B2FF] mt-3 hover:underline"
                            >
                              Read more <ArrowRight />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))
                  : (
                      <article className="bg-white rounded-2xl overflow-hidden shadow transition-all duration-300">
                        <div className="flex gap-4 p-6">
                          <div className="relative">
                            <img
                              src={FALLBACK_SECONDARY_IMAGE}
                              alt="Blog placeholder"
                              className="w-32 h-24 object-cover rounded-xl"
                            />
                            <span className="absolute left-2 bottom-2 inline-block px-2.5 py-1 text-[10px] font-semibold rounded-full text-white bg-gradient-to-r from-[#00B2FF] to-[#0078FF]">
                              NEWS
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-gray-800 mt-2">
                              Publish a blog to showcase it here
                            </h4>
                            <p className="text-gray-500 text-xs mt-2 leading-relaxed line-clamp-2">
                              Once new posts go live, they will appear automatically in this section.
                            </p>
                          </div>
                        </div>
                      </article>
                    )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialAndNewsSection;


