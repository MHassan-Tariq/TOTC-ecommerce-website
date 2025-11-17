import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../utils/api.js";

const fallbackCards = [
  {
    id: "apply-card-1",
    imageSrc: "/img/h4.jpg",
    title: "Become a Teacher",
    description:
      "Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively…",
    cta: "Apply a Teacher",
    link: "/blog",
  },
  {
    id: "apply-card-2",
    imageSrc: "/img/h5.jpg",
    title: "Become a Coursector",
    description:
      "Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively…",
    cta: "Apply a Coursector",
    link: "/blog",
  },
];

const formatBlogDescription = (blog) => {
  const excerpt = blog?.excerpt || "";
  const stripped = blog?.content
    ? blog.content.replace(/<[^>]*>/g, " ")
    : "";
  const source = excerpt || stripped;
  if (!source) {
    return "Explore the latest guidance from our instructor community and discover how we empower learning online.";
  }
  const trimmed = source.trim();
  if (trimmed.length <= 180) return trimmed;
  return `${trimmed.slice(0, 180).trim()}…`;
};

const mapBlogsToCards = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    return fallbackCards;
  }

  const selected = blogs.slice(0, fallbackCards.length);
  return selected.map((blog, index) => {
    const fallback = fallbackCards[index];
    return {
      id: blog._id || blog.id || fallback.id,
      imageSrc: blog.coverImage || blog.categoryImage || fallback.imageSrc,
      title: fallback.title,
      description: `${blog.title || "Latest insight"} — ${formatBlogDescription(blog)}`,
      cta: fallback.cta,
      link: blog.slug ? `/blog/${blog.slug}` : `/blog/${blog._id || blog.id || ""}`,
    };
  });
};

const ApplyCard = ({ card }) => (
  <article className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
    <Link to={card.link || "/blog"} className="block">
      <img
        src={card.imageSrc}
        alt={card.title}
        className="w-full h-44 object-cover rounded-t-2xl"
        onError={(event) => {
          event.currentTarget.src = "/img/h4.jpg";
        }}
      />
    </Link>
    <div className="p-5">
      <h3 className="text-gray-800 font-semibold text-lg mb-2">{card.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">
        {card.description}
      </p>
      <div className="flex justify-end">
        <Link
          to={card.link || "/blog"}
          className="rounded-full bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-4 py-2 transition-colors"
        >
          {card.cta}
        </Link>
      </div>
    </div>
  </article>
);

const ApplySection = () => {
  const [cards, setCards] = useState(fallbackCards);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        const blogList = Array.isArray(data?.blogs) ? data.blogs.filter(Boolean) : [];

        if (blogList.length) {
          setCards(mapBlogsToCards(blogList));
        }
      } catch (error) {
        // Keep fallback content on error
      }
    };

    loadBlogs();
  }, []);

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <ApplyCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplySection;


