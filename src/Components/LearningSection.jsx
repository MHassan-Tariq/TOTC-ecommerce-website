import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCourses, fetchBlogs } from "../utils/api.js";

const shortenText = (text, limit = 140) => {
  if (!text || typeof text !== "string") return "";
  const trimmed = text.trim();
  if (trimmed.length <= limit) return trimmed;
  return `${trimmed.slice(0, limit).trim()}…`;
};

const fallbackChoiceCards = [
  {
    id: "fallback-choice-1",
    link: "/courses",
    image: "/img/book1.jpg",
    fallbackImage: "/img/book1.jpg",
    category: "Design",
    duration: "3 Month",
    title: "AWS Certified Solutions Architect",
    description:
      "Master core AWS services, architecture best practices, and hands-on labs designed for aspiring architects.",
    author: "Lina",
    authorAvatar: "/img/profilephoto.png",
    oldPrice: "$100",
    currentPrice: "$80",
  },
  {
    id: "fallback-choice-2",
    link: "/courses",
    image: "/img/book2.jpg",
    fallbackImage: "/img/book2.jpg",
    category: "Development",
    duration: "6 Month",
    title: "Full-Stack Developer Roadmap",
    description:
      "Build production-ready applications with guidance across frontend, backend, and deployment workflows.",
    author: "Lina",
    authorAvatar: "/img/profilephoto.png",
    oldPrice: "$120",
    currentPrice: "$90",
  },
  {
    id: "fallback-choice-3",
    link: "/courses",
    image: "/img/book3.jpg",
    fallbackImage: "/img/book3.jpg",
    category: "Business",
    duration: "4 Month",
    title: "Business Strategy Bootcamp",
    description:
      "Blend analytics, positioning, and go-to-market planning to launch initiatives with impact.",
    author: "Lina",
    authorAvatar: "/img/profilephoto.png",
    oldPrice: "$150",
    currentPrice: "$110",
  },
  {
    id: "fallback-choice-4",
    link: "/courses",
    image: "/img/book4.jpg",
    fallbackImage: "/img/book4.jpg",
    category: "Marketing",
    duration: "2 Month",
    title: "Marketing Analytics Foundations",
    description:
      "Unlock campaign insights, optimize channels, and automate reporting with proven marketing frameworks.",
    author: "Lina",
    authorAvatar: "/img/profilephoto.png",
    oldPrice: "$80",
    currentPrice: "$60",
  },
];

const fallbackPersonalDevelopmentCards = [
  {
    id: "fallback-personal-1",
    link: "/courses",
    image: "/img/book1.jpg",
    fallbackImage: "/img/book1.jpg",
    category: "Design",
    duration: "Week: 3",
    title: "Creative Thinking Mastery",
    description:
      "Strengthen creative problem solving with guided workshops, micro-challenges, and peer feedback.",
    author: "Lina",
    authorAvatar: "/img/profilephoto.png",
    oldPrice: "$100",
    currentPrice: "$80",
  },
  {
    id: "fallback-personal-2",
    link: "/courses",
    image: "/img/book2.jpg",
    fallbackImage: "/img/book2.jpg",
    category: "Development",
    duration: "Week: 6",
    title: "Productivity Systems for Builders",
    description:
      "Design repeatable workflows that keep projects moving, from ideation through delivery.",
    author: "Lina",
    authorAvatar: "/img/profilephoto.png",
    oldPrice: "$120",
    currentPrice: "$90",
  },
  {
    id: "fallback-personal-3",
    link: "/courses",
    image: "/img/book3.jpg",
    fallbackImage: "/img/book3.jpg",
    category: "Business",
    duration: "Week: 4",
    title: "Leadership Habits Intensive",
    description:
      "Practice communication, coaching, and decision-making habits that elevate your team.",
    author: "Lina",
    authorAvatar: "/img/profilephoto.png",
    oldPrice: "$150",
    currentPrice: "$110",
  },
  {
    id: "fallback-personal-4",
    link: "/courses",
    image: "/img/book4.jpg",
    fallbackImage: "/img/book4.jpg",
    category: "Marketing",
    duration: "Week: 2",
    title: "Storytelling For Personal Brands",
    description:
      "Craft narratives that resonate online with repeatable content systems and brand voice frameworks.",
    author: "Lina",
    authorAvatar: "/img/profilephoto.png",
    oldPrice: "$80",
    currentPrice: "$60",
  },
];

const fallbackStudentViewingCards = [
  {
    id: "fallback-viewing-1",
    link: "/courses",
    image: "/img/book5.png",
    fallbackImage: "/img/book5.png",
    category: "Design",
    duration: "Week: 3",
    title: "UI Systems in Figma",
    description:
      "Speed up your design workflow with reusable components, tokens, and accessibility best practices.",
    author: "Lina",
    authorAvatar: "/img/profilephoto.png",
    oldPrice: "$100",
    currentPrice: "$80",
  },
  {
    id: "fallback-viewing-2",
    link: "/courses",
    image: "/img/book6.jpg",
    fallbackImage: "/img/book6.jpg",
    category: "Development",
    duration: "Week: 6",
    title: "Node.js API Builder",
    description:
      "Launch robust APIs with secure authentication, scalable patterns, and automated testing.",
    author: "Lina",
    authorAvatar: "/img/profilephoto.png",
    oldPrice: "$120",
    currentPrice: "$90",
  },
  {
    id: "fallback-viewing-3",
    link: "/courses",
    image: "/img/book1.jpg",
    fallbackImage: "/img/book1.jpg",
    category: "Business",
    duration: "Week: 4",
    title: "Analytics for Operators",
    description:
      "Translate dashboards into decisions with frameworks for experimentation and KPI tracking.",
    author: "Lina",
    authorAvatar: "/img/profilephoto.png",
    oldPrice: "$150",
    currentPrice: "$110",
  },
  {
    id: "fallback-viewing-4",
    link: "/courses",
    image: "/img/book2.jpg",
    fallbackImage: "/img/book2.jpg",
    category: "Marketing",
    duration: "Week: 2",
    title: "Lifecycle Email Playbook",
    description:
      "Build targeted journeys that onboard, nurture, and re-engage your audience across stages.",
    author: "Lina",
    authorAvatar: "/img/profilephoto.png",
    oldPrice: "$80",
    currentPrice: "$60",
  },
];

const mergeWithFallback = (dynamicCards, fallbackCards) => {
  if (!dynamicCards.length) return fallbackCards;
  if (dynamicCards.length >= fallbackCards.length) {
    return dynamicCards.slice(0, fallbackCards.length);
  }
  const merged = [...dynamicCards];
  let fallbackIndex = 0;
  while (merged.length < fallbackCards.length && fallbackIndex < fallbackCards.length) {
    merged.push(fallbackCards[fallbackIndex]);
    fallbackIndex += 1;
  }
  return merged;
};

const getCourseDescription = (course) => {
  if (Array.isArray(course.whatYoullLearn) && course.whatYoullLearn.length) {
    return shortenText(course.whatYoullLearn.filter(Boolean).join(", "));
  }
  if (course.description) {
    return shortenText(course.description);
  }
  if (course.excerpt) {
    return shortenText(course.excerpt);
  }
  return "Explore immersive lessons tailored for your growth.";
};

const getBlogDescription = (blog) => {
  if (blog.excerpt) return shortenText(blog.excerpt, 160);
  if (blog.content) {
    const stripped = blog.content.replace(/<[^>]*>/g, " ");
    return shortenText(stripped, 160);
  }
  return "Read the latest insights from our content team.";
};

const formatBlogDuration = (publishedAt, index = 0) => {
  if (!publishedAt) {
    return `Week: ${index + 1}`;
  }
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) {
    return `Week: ${index + 1}`;
  }
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};

const LearningSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [blogsError, setBlogsError] = useState("");
  const sliderItemsPerView = 3;

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        const list = Array.isArray(data?.courses) ? data.courses.filter(Boolean) : [];
        setCourses(list);
      } catch (err) {
        setError(err.message || "Unable to load courses");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        const list = Array.isArray(data?.blogs) ? data.blogs.filter(Boolean) : [];
        setBlogs(list);
      } catch (err) {
        setBlogsError(err.message || "Unable to load blogs");
      } finally {
        setBlogsLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const visibleCourses = useMemo(() => {
    if (showAll) return courses;
    return courses.slice(0, 3);
  }, [courses, showAll]);

  const recommendedCourses = useMemo(() => {
    if (!courses.length) return [];

    const leftover = courses.slice(3);
    const base = leftover.length ? leftover : courses;
    const extended = [...base];

    const targetLength = Math.max(sliderItemsPerView * 2, base.length);

    while (extended.length < targetLength) {
      extended.push(base[extended.length % base.length]);
      if (base.length === 0) break;
    }

    return extended;
  }, [courses]);

  const formatDuration = (duration) => {
    if (!duration) return "Self-paced";
    const match = duration.toString().match(/\d+(?:\.\d+)?/);
    if (match) {
      return `Week: ${match[0]}`;
    }
    return duration;
  };

  const progressPresets = useMemo(
    () => [
      { percent: 70, label: "Lessons 5 of 7" },
      { percent: 55, label: "Lessons 3 of 5" },
      { percent: 85, label: "Lessons 6 of 7" },
      { percent: 40, label: "Lessons 2 of 5" },
    ],
    []
  );

  const formatPrice = (priceValue) => {
    const numeric = Number(priceValue);
    if (Number.isNaN(numeric) || numeric <= 0) {
      return { old: null, current: "Free" };
    }

    const oldPrice = numeric * 1.15;
    return {
      old: `$${oldPrice.toFixed(2)}`,
      current: `$${numeric.toFixed(2)}`,
    };
  };

  const getImage = (course, fallback = "/img/book1.jpg") => {
    if (course.imageUrl) return course.imageUrl;
    if (course.coverImage) return course.coverImage;
    if (Array.isArray(course.images) && course.images.length > 0) return course.images[0];
    return fallback;
  };

  const mapCourseToCard = (course, fallbackCard, index = 0) => {
    const fallbackImage = fallbackCard?.image || "/img/book1.jpg";
    const priceInfo = formatPrice(course.price);
    const authorName = course.createdBy?.name || course.createdBy?.email || fallbackCard?.author || "TOTC Team";

    return {
      id: course._id || course.id || course.slug || fallbackCard?.id || `course-${index}`,
      link: course._id || course.id || course.slug ? `/course/${course._id || course.id || course.slug}` : fallbackCard?.link || "/courses",
      image: getImage(course, fallbackImage),
      fallbackImage,
      category: course.category || fallbackCard?.category || "General",
      duration: formatDuration(course.duration) || fallbackCard?.duration || "Self-paced",
      title: course.title || fallbackCard?.title || "Course coming soon",
      description: getCourseDescription(course) || fallbackCard?.description || "New content is on the way.",
      author: authorName,
      authorAvatar: fallbackCard?.authorAvatar || "/img/profilephoto.png",
      oldPrice: priceInfo.old || fallbackCard?.oldPrice || null,
      currentPrice: priceInfo.current || fallbackCard?.currentPrice || "Free",
    };
  };

  const choiceCards = useMemo(() => {
    const slice = courses.slice(0, fallbackChoiceCards.length);
    const dynamicCards = slice.map((course, index) => mapCourseToCard(course, fallbackChoiceCards[index], index));
    return mergeWithFallback(dynamicCards, fallbackChoiceCards);
  }, [courses]);

  const personalOffset = fallbackChoiceCards.length;
  const personalDevelopmentCards = useMemo(() => {
    const slice = courses.slice(personalOffset, personalOffset + fallbackPersonalDevelopmentCards.length);
    const dynamicCards = slice.map((course, index) =>
      mapCourseToCard(course, fallbackPersonalDevelopmentCards[index], personalOffset + index)
    );
    return mergeWithFallback(dynamicCards, fallbackPersonalDevelopmentCards);
  }, [courses, personalOffset]);

  const viewingOffset = personalOffset + fallbackPersonalDevelopmentCards.length;
  const studentViewingCards = useMemo(() => {
    if (blogs.length) {
      const slice = blogs.slice(0, fallbackStudentViewingCards.length);
      const dynamic = slice.map((blog, index) => {
        const fallbackCard = fallbackStudentViewingCards[index];
        return {
          id: blog._id || blog.id || fallbackCard.id,
          link: blog.slug ? `/blog/${blog.slug}` : `/blog/${blog._id || blog.id || ""}`,
          image: blog.coverImage || blog.categoryImage || fallbackCard.image,
          fallbackImage: fallbackCard.fallbackImage,
          category: blog.category || fallbackCard.category,
          duration: formatBlogDuration(blog.publishedAt, index),
          title: blog.title || fallbackCard.title,
          description: getBlogDescription(blog),
          author: blog.createdBy?.name || blog.createdBy?.email || fallbackCard.author || "TOTC Team",
          authorAvatar: fallbackCard.authorAvatar,
          oldPrice: null,
          currentPrice: "Read",
        };
      });
      return mergeWithFallback(dynamic, fallbackStudentViewingCards);
    }

    return mergeWithFallback([], fallbackStudentViewingCards);
  }, [blogs]);

  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    if (!recommendedCourses.length) {
      setSliderIndex(0);
      return;
    }
    if (sliderIndex >= recommendedCourses.length) {
      setSliderIndex(Math.max(0, recommendedCourses.length - sliderItemsPerView));
    }
  }, [recommendedCourses.length, sliderIndex]);

  const handlePrev = () => {
    setSliderIndex((prev) => Math.max(0, prev - sliderItemsPerView));
  };

  const handleNext = () => {
    setSliderIndex((prev) => {
      if (recommendedCourses.length <= sliderItemsPerView) {
        return prev;
      }

      const maxStart = Math.max(0, recommendedCourses.length - sliderItemsPerView);
      const nextIndex = prev + sliderItemsPerView;

      if (nextIndex > maxStart) {
        return maxStart;
      }

      return nextIndex;
    });
  };

  const visibleRecommended = useMemo(() => {
    if (!recommendedCourses.length) return [];
    return recommendedCourses.slice(
      sliderIndex,
      sliderIndex + sliderItemsPerView
    );
  }, [recommendedCourses, sliderIndex]);

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

        {loading ? (
          <div className="rounded-2xl bg-white py-12 text-center text-sm text-gray-500 shadow">
            Loading your courses…
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-white py-12 text-center text-sm text-red-500 shadow">
            {error}
          </div>
        ) : visibleCourses.length === 0 ? (
          <div className="rounded-2xl bg-white py-12 text-center text-sm text-gray-500 shadow">
            Enrolled courses will appear here once available.
          </div>
        ) : (
          <>
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleCourses.map((course, index) => {
                const preset = progressPresets[index % progressPresets.length];
                const instructorName = course.createdBy?.name || course.createdBy?.email || "Team";
                const imageUrl = course.imageUrl || course.coverImage || "/img/book1.jpg";
                return (
            <Link
                    to={`/course/${course._id || course.id}`}
                    key={course._id || course.id || index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden block"
            >
              {/* Top Image */}
              <div className="w-full h-40 md:h-44 lg:h-48 overflow-hidden">
                <img
                        src={imageUrl}
                        alt={course.title || "Course"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/img/book1.jpg";
                        }}
                />
              </div>

              {/* Card Body */}
              <div className="p-4 md:p-5">
                {/* Title */}
                      <h3 className="text-gray-900 font-bold text-base md:text-lg leading-snug line-clamp-2">
                        {course.title}
                </h3>

                      {/* Metadata */}
                      <div className="mt-2 text-xs uppercase tracking-wide text-gray-500 flex items-center gap-3">
                        <span>{course.category || "General"}</span>
                        <span>•</span>
                        <span>{formatDuration(course.duration)}</span>
                      </div>

                 {/* Instructor */}
                 <div className="mt-3 flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-600">
                          {instructorName.charAt(0).toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-700">{instructorName}</span>
                 </div>

                 {/* Progress */}
                 <div className="mt-4">
                   <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-gradient-to-r from-[#29c3c1] to-[#1eb2a6] rounded-full"
                            style={{ width: `${preset.percent}%` }}
                          />
                   </div>
                   <div className="mt-2 flex justify-end">
                          <span className="text-xs text-gray-500">{preset.label}</span>
                   </div>
                 </div>
              </div>
            </Link>
                );
              })}
        </div>

            {courses.length > 3 && (
        <div className="mt-6 flex justify-center md:justify-end">
      <button
        type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-[#29c3c1] to-[#1eb2a6] px-5 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
                  {showAll ? "Show fewer" : `See more (${courses.length - 3})`}
            </button>
          </div>
            )}
          </>
        )}
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
                link: "/courses"
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
                className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center p-6"
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
            <Link
              to="/courses"
              className="text-[#1fb6ff] font-medium text-sm cursor-pointer hover:underline"
            >
              See all
            </Link>
        </div>

          <div className="relative">
            <div className="flex justify-center gap-6 px-1 pb-4 overflow-hidden">
              {loading ? (
                <div className="rounded-2xl bg-white py-12 px-6 text-center text-sm text-gray-500 shadow w-full">
                  Loading recommendations…
                </div>
              ) : error ? (
                <div className="rounded-2xl bg-white py-12 px-6 text-center text-sm text-red-500 shadow w-full">
                  {error}
                </div>
              ) : recommendedCourses.length === 0 ? (
                <div className="rounded-2xl bg-white py-12 px-6 text-center text-sm text-gray-500 shadow w-full">
                  More courses will appear here soon.
                </div>
              ) : (
                visibleRecommended.map((course, i) => {
                  const instructorName = course.createdBy?.name || course.createdBy?.email || "Team";
                  const durationLabel = formatDuration(course.duration);
                  const priceInfo = formatPrice(course.price);
                  const courseImage = getImage(course, `/img/book${(i % 4) + 1}.jpg`);
                  const key = course._id || course.id || `recommended-${sliderIndex + i}`;

                  return (
                <Link
                      to={`/course/${course._id || course.id}`}
                      key={key}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 md:p-5 w-72 md:w-[19rem] flex-shrink-0"
                >
                  <div className="w-full h-44 overflow-hidden rounded-xl mb-4">
                    <img
                          src={courseImage}
                          alt={course.title || 'Course'}
                      className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `/img/book${((sliderIndex + i) % 4) + 1}.jpg`;
                          }}
                    />
      </div>

                  <div className="flex justify-between text-gray-400 text-xs font-medium mb-2">
                    <span className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-gray-400 rounded-sm" />
                          {course.category || 'General'}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                          {durationLabel}
                    </span>
                  </div>

                      <h3 className="text-gray-800 font-semibold text-base mt-2 line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mt-1 line-clamp-2">
                        {course.description || 'Discover a new learning path tailored for you.'}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-600">
                            {instructorName.charAt(0).toUpperCase()}
                          </span>
                          <span className="text-gray-700 text-sm ml-2">{instructorName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                          {priceInfo.old && <span className="text-gray-400 line-through text-sm">{priceInfo.old}</span>}
                          <span className="text-[#00b894] font-semibold text-base">{priceInfo.current}</span>
                    </div>
                  </div>
                </Link>
                  );
                })
              )}
            </div>

            {recommendedCourses.length > sliderItemsPerView && !loading && !error && (
              <div className="flex justify-center mt-6 gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="bg-[#00bcd4] hover:bg-[#0097a7] text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition disabled:opacity-40"
                  aria-label="Previous"
                  disabled={sliderIndex === 0}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#00bcd4] hover:bg-[#0097a7] text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition disabled:opacity-40"
                  aria-label="Next"
                  disabled={recommendedCourses.length <= sliderItemsPerView || sliderIndex >= Math.max(0, recommendedCourses.length - sliderItemsPerView)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                </button>
              </div>
            )}
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
              <Link
                to="/courses"
                className="text-teal-500 font-medium text-sm hover:underline"
              >
                See all
              </Link>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {choiceCards.map((card) => (
                <Link
                  to={card.link}
                  key={card.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden block"
                >
                  {/* Course Image */}
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover rounded-t-xl"
                      onError={(event) => {
                        event.currentTarget.src = card.fallbackImage || card.image || "/img/book1.jpg";
                      }}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4 md:p-5">
                    {/* Category & Duration */}
                    <div className="flex justify-between text-gray-400 text-xs font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                        {card.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {card.duration}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-gray-800 font-semibold text-lg mb-2 line-clamp-2">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {card.description}
                    </p>

                    {/* Author & Price */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src={card.authorAvatar || "/img/profilephoto.png"}
                          alt={card.author}
                          className="w-6 h-6 rounded-full object-cover"
                          onError={(event) => {
                            event.currentTarget.src = "/img/profilephoto.png";
                          }}
                        />
                        <span className="text-gray-700 text-sm ml-2">{card.author}</span>
                  </div>
                      <div className="flex items-center gap-2">
                        {card.oldPrice && <span className="text-gray-400 line-through text-sm">{card.oldPrice}</span>}
                        <span className="text-[#00BFA5] font-semibold text-base">{card.currentPrice}</span>
            </div>
          </div>
        </div>
              </Link>
              ))}
            </div>
          </div>

          {/* Section 2: Coaching Banner */}
          <div className="bg-gray-800 rounded-2xl mt-12 py-10 md:py-16">
            <div className="text-center">
              <h3 className="text-white font-bold text-xl md:text-2xl mb-4">
                Live coaching tailored for remote learners.
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-6 max-w-2xl mx-auto">
                Join interactive sessions led by industry mentors, collaborate with peers in real time, and work through practical briefs that sharpen your skills—no matter where you are.
              </p>
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
                Explore live sessions
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
              <Link
                to="/courses"
                className="text-teal-500 hover:text-teal-600 font-medium text-sm"
              >
                See all
              </Link>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {personalDevelopmentCards.map((card) => (
                <Link
                  to={card.link}
                  key={card.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden block"
                >
                  {/* Course Image */}
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover rounded-t-xl"
                      onError={(event) => {
                        event.currentTarget.src = card.fallbackImage || card.image || "/img/book1.jpg";
                      }}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    {/* Meta Info Row */}
                    <div className="flex justify-between text-gray-400 text-xs font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                        {card.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {card.duration}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-gray-800 font-semibold text-lg mb-2 line-clamp-2">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {card.description}
                    </p>

                    {/* Footer Row */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src={card.authorAvatar || "/img/profilephoto.png"}
                          alt={card.author}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(event) => {
                            event.currentTarget.src = "/img/profilephoto.png";
                          }}
                        />
                        <span className="text-gray-700 text-sm ml-2">{card.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {card.oldPrice && <span className="text-gray-400 line-through text-sm">{card.oldPrice}</span>}
                        <span className="text-[#00BFA5] font-semibold text-base">{card.currentPrice}</span>
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
              <Link
                to="/courses"
                className="text-teal-500 hover:text-teal-600 font-medium text-sm"
              >
                See all
              </Link>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(blogsLoading && !blogs.length) || (blogsError && !blogs.length) ? (
                mergeWithFallback([], fallbackStudentViewingCards).map((card) => (
                  <div
                    key={card.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden block"
                  >
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between text-gray-400 text-xs font-medium mb-3">
                        <span className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                          {card.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {card.duration}
                        </span>
                      </div>
                      <h3 className="text-gray-800 font-semibold text-lg mb-2 line-clamp-2">
                        {card.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                        {card.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <img
                            src={card.authorAvatar || "/img/profilephoto.png"}
                            alt={card.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-gray-700 text-sm ml-2">{card.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {card.oldPrice && <span className="text-gray-400 line-through text-sm">{card.oldPrice}</span>}
                          <span className="text-[#00BFA5] font-semibold text-base">{card.currentPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                studentViewingCards.map((card) => (
                <Link
                  to={card.link}
                  key={card.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden block"
                >
                  {/* Course Image */}
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover rounded-t-xl"
                      onError={(event) => {
                        event.currentTarget.src = card.fallbackImage || card.image || "/img/book1.jpg";
                      }}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    {/* Meta Info Row */}
                    <div className="flex justify-between text-gray-400 text-xs font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                        {card.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {card.duration}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-gray-800 font-semibold text-lg mb-2 line-clamp-2">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {card.description}
                    </p>

                    {/* Footer Row */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src={card.authorAvatar || "/img/profilephoto.png"}
                          alt={card.author}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(event) => {
                            event.currentTarget.src = "/img/profilephoto.png";
                          }}
                        />
                        <span className="text-gray-700 text-sm ml-2">{card.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {card.oldPrice && <span className="text-gray-400 line-through text-sm">{card.oldPrice}</span>}
                        <span className="text-[#00BFA5] font-semibold text-base">{card.currentPrice}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                ))
              )}
          </div>
        </div>
      </div>
      </section>
    </section>
  );
};

export default LearningSection;
