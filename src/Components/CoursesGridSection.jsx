import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCourses } from "../utils/api.js";

const matchesSearch = (course, query) => {
  if (!query) return true;
  const searchableChunks = [
    course.title,
    course.description,
    course.category,
    course.level,
    course.duration,
    typeof course.price !== "undefined" ? String(course.price) : "",
    Array.isArray(course.whatYoullLearn) ? course.whatYoullLearn.join(" ") : "",
    Array.isArray(course.requirements) ? course.requirements.join(" ") : "",
    course.createdBy?.name,
    course.createdBy?.email,
  ];

  return searchableChunks.some((chunk) => {
    if (typeof chunk !== "string") return false;
    return chunk.toLowerCase().includes(query);
  });
};

const CoursesGridSection = ({ searchTerm = "", onClearSearch }) => {
  const [courses, setCourses] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const shuffleCourses = (items) => {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        const incoming = Array.isArray(data?.courses) ? data.courses.filter(Boolean) : [];
        const unique = Array.from(new Map(incoming.map((course) => [course._id || course.id, course])).values());
        const shuffled = shuffleCourses(unique);
        setCourses(unique);
        setRecommended(shuffled.slice(0, Math.min(8, shuffled.length)));
      } catch (err) {
        setError(err.message || "Unable to load courses");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const isSearching = normalizedSearch.length > 0;

  const coursesToDisplay = useMemo(() => {
    if (isSearching) {
      const filtered = courses.filter((course) => matchesSearch(course, normalizedSearch));
      return filtered.sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return dateB - dateA;
      });
    }

    return recommended;
  }, [courses, isSearching, normalizedSearch, recommended]);

  const headingLabel = isSearching ? "Search results" : "Recommended for you";
  const headingDescription = isSearching
    ? `${coursesToDisplay.length} ${coursesToDisplay.length === 1 ? "course" : "courses"} found for “${searchTerm}”`
    : null;

  const renderPrice = (priceValue) => {
    const current = Number(priceValue);
    if (Number.isNaN(current) || current <= 0) {
      return {
        old: null,
        current: "Free",
      };
    }

    const oldPrice = current * 1.2;
    return {
      old: `$${oldPrice.toFixed(2)}`,
      current: `$${current.toFixed(2)}`,
    };
  };

  const formatDuration = (duration) => {
    if (!duration) return "Self-paced";
    const match = duration.toString().match(/\d+(?:\.\d+)?/);
    if (match) {
      return `Week: ${match[0]}`;
    }
    return duration;
  };

  return (
    <section
      className="w-full bg-[#F1F7FD]"
      aria-label="Courses"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-14 lg:py-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:mb-12">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-bold leading-tight text-[#1E2B4A]">
              {headingLabel}
            </h2>
            {headingDescription && (
              <p className="text-sm text-gray-500">{headingDescription}</p>
            )}
          </div>
          {isSearching ? (
            onClearSearch && (
              <button
                type="button"
                onClick={onClearSearch}
                className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
              >
                Clear search
              </button>
            )
          ) : (
            <Link to="/courses" className="text-sky-500 text-sm hover:underline">
              See all
            </Link>
          )}
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white py-10 text-center text-sm text-gray-500 shadow">
            Loading courses…
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-white py-10 text-center text-sm text-red-500 shadow">
            {error}
          </div>
        ) : courses.length === 0 ? (
          <div className="rounded-2xl bg-white py-10 text-center text-sm text-gray-500 shadow">
            Courses will appear here soon.
          </div>
        ) : isSearching && coursesToDisplay.length === 0 ? (
          <div className="rounded-2xl bg-white py-10 text-center text-sm text-gray-500 shadow">
            No courses match “{searchTerm}”. Try a different keyword or check back later.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-4">
            {coursesToDisplay.map((course) => {
              const priceInfo = renderPrice(course.price);
              const instructorName = course.createdBy?.name || course.createdBy?.email || "Team";
              const durationLabel = formatDuration(course.duration);
              const courseImage = course.imageUrl || "/img/h4.jpg";

              return (
                <article
                  key={course._id || course.id}
                  className="group h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col"
                >
                  <Link to={`/course/${course._id || course.id}`} className="relative block">
                    <img
                      src={courseImage}
                      alt={course.title}
                      className="h-44 w-full object-cover md:h-40 lg:h-44"
                      onError={(e) => {
                        e.currentTarget.src = "/img/h4.jpg";
                      }}
                    />
                  </Link>

                  <div className="flex grow flex-col px-5 pb-5 pt-4">
                    <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        {course.category || "General"}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-sky-400" />
                        {durationLabel}
                      </span>
                    </div>

                    <Link
                      to={`/course/${course._id || course.id}`}
                      className="text-[15px] font-semibold leading-snug text-[#1E2B4A] md:text-base hover:text-emerald-600"
                    >
                      {course.title}
                    </Link>

                    <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                      {course.description || "Explore this course to elevate your skills."}
                    </p>

                    <div className="grow" />

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
                          {instructorName.charAt(0).toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-700">{instructorName}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        {priceInfo.old && <span className="text-gray-400 line-through">{priceInfo.old}</span>}
                        <span className="font-semibold text-emerald-500">{priceInfo.current}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesGridSection;


