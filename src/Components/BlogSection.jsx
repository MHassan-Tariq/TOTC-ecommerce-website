import React from "react";
import { Link } from "react-router-dom";

const fallbackFeatured = {
  title: "Why Swift UI Should Be on the Radar of Every Mobile Developer",
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
  author: "Themadbrains",
  category: "inspiration",
  categoryImage: "/img/h4.jpg",
  slug: "",
};

const fallbackReading = [
  { _id: "1", slug: "ux-ui", categoryImage: "/img/b4.jpg", category: "UX/UI" },
  { _id: "2", slug: "react", categoryImage: "/img/b6.png", category: "React" },
  { _id: "3", slug: "php", categoryImage: "/img/b7.png", category: "PHP" },
  { _id: "4", slug: "javascript", categoryImage: "/img/b9.png", category: "JavaScript" },
];

const BlogSection = ({ featured, readingList = [], allBlogs = [] }) => {
  const hero = featured || fallbackFeatured;
  const reading = readingList.length > 0 ? readingList : fallbackReading;

  return (
    <section className="w-full bg-[#F9FBFF] py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Featured blog */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-14">
          {/* Left: Text */}
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-sm mb-2">
              By <span className="font-medium text-gray-700">{hero.author || 'Team TOTC'}</span>
              {hero.category && (
                <>
                  {' '}in <span className="text-[#20BFA9] font-medium">{hero.category}</span>
                </>
              )}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E2B4A] leading-snug mb-4">
              {hero.title}
            </h2>
            <p className="text-gray-500 text-base mb-6 line-clamp-3" dangerouslySetInnerHTML={{ __html: hero.excerpt || '' }} />
            {hero._id ? (
              <Link
                to={hero.slug ? `/blog/${hero.slug}` : '#'}
                className="inline-block bg-[#20BFA9] text-white px-6 py-3 rounded-md font-medium hover:bg-[#17A796] transition-all"
                state={{ blogs: allBlogs }}
              >
                Start learning now
              </Link>
            ) : (
              <span className="inline-block bg-[#20BFA9] text-white px-6 py-3 rounded-md font-medium">
                Start learning now
              </span>
            )}
          </div>

          {/* Right: Image */}
          <div className="rounded-xl overflow-hidden bg-[#EAF3FF] p-4">
            <img
              src={hero.categoryImage || "/img/h4.jpg"}
              alt={hero.title}
              className="rounded-lg w-full object-cover h-56 md:h-auto"
              onError={(e) => {
                e.currentTarget.src = "/img/h4.jpg";
              }}
            />
          </div>
        </div>

        {/* Reading blog list */}
        <h3 className="text-xl font-semibold text-[#1E2B4A] mb-8 text-center md:text-left">Reading blog list</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reading.map((item, index) => {
            const key = `${item.slug || item._id || 'reading'}-${index}`;
            return (
              <Link key={key} to={item.slug ? `/blog/${item.slug}` : '#'} className="block">
                <article className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white">
                  <img
                    src={item.categoryImage || item.coverImage || "/img/b4.jpg"}
                    alt={item.category || item.title || 'Blog'}
                    className="w-full h-56 sm:h-44 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/img/b4.jpg";
                    }}
                  />
                  <div className="p-4 text-center">
                    <h4 className="font-semibold text-gray-800 text-base">
                      {item.category || item.title || 'Blog'}
                    </h4>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;


