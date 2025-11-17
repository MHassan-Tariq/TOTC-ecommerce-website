import React from "react";
import { Link } from "react-router-dom";

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
  </svg>
);

const ArticleCard = ({ post }) => (
  <article className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
    <img
      src={post.categoryImage || post.coverImage || "/img/h5.jpg"}
      alt={post.title}
      className="w-full h-48 object-cover"
      onError={(e) => {
        e.currentTarget.src = "/img/h5.jpg";
      }}
    />
    <div className="p-5">
      <div className="flex justify-between items-center text-gray-400 text-xs font-medium mb-3">
        <div className="flex items-center gap-1">
          <TagIcon />
          <span>{post.category || 'Marketing'}</span>
        </div>
        <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</span>
      </div>
      <h3 className="text-[#1E2B4A] font-semibold text-[16px] leading-snug mb-2 line-clamp-2">
        {post.title}
      </h3>
      <p className="text-gray-500 text-sm mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt || '' }} />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/img/profilephoto.png" alt={post.author || 'Author'} className="w-8 h-8 rounded-full" />
          <p className="text-sm text-[#1E2B4A] font-medium">{post.author || 'Team TOTC'}</p>
        </div>
        <Link
          to={post.slug ? `/blog/${post.slug}` : '#'}
          className="text-[#20BFA9] text-sm font-semibold hover:underline"
          state={post._id ? { blogId: post._id } : undefined}
        >
          Read
        </Link>
      </div>
    </div>
  </article>
);

const MarketingArticles = ({ posts = [] }) => {
  const content = posts.length > 0 ? posts.slice(0, 4) : Array(4).fill(null).map((_, idx) => ({
    slug: `sample-${idx}`,
    title: 'AWS Certified solutions Architect',
    categoryImage: ['/img/h5.jpg', '/img/h3.png', '/img/h4.jpg', '/img/h9.png'][idx % 4],
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    category: 'Design',
  }));

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-10">
          <h2 className="text-[20px] md:text-[22px] font-semibold text-[#1E2B4A]">Marketing Articles</h2>
          <button className="text-[#20BFA9] font-medium text-sm hover:underline">See all</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {content.map((post, index) => (
            <ArticleCard key={post._id || index} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketingArticles;


