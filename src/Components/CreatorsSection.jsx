import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCourses } from "../utils/api.js";

const FALLBACK_IMAGE = "/img/h19.png";

const truncateText = (text, limit = 110) => {
  if (!text || typeof text !== "string") return "";
  return text.length > limit ? `${text.slice(0, limit).trim()}…` : text;
};

const CreatorsSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadCourses = async () => {
      try {
        const response = await fetchCourses();
        const courseList = Array.isArray(response?.courses)
          ? response.courses
          : Array.isArray(response)
            ? response
            : [];

        if (isMounted) {
          setCourses(courseList);
        }
      } catch (error) {
        console.error("Failed to load courses for category section", error);
        if (isMounted) {
          setCourses([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  const categoryCards = useMemo(() => {
    if (!courses.length) return [];

    const categoryMap = new Map();

    courses.forEach((course) => {
      if (!course) return;
      const categoryName = course.category?.trim() || "General";
      const currentEntry = categoryMap.get(categoryName);

      const normalizedWhatYoullLearn = Array.isArray(course.whatYoullLearn)
        ? course.whatYoullLearn.filter(Boolean).join(", ")
        : course.whatYoullLearn;

      const descriptionCandidate =
        truncateText(
          normalizedWhatYoullLearn?.trim() ||
          course.description?.trim() ||
          ""
        ) || "Discover tailored learning experiences from our catalog.";

      if (!currentEntry) {
        categoryMap.set(categoryName, {
          id: course._id || categoryName,
          category: categoryName,
          description: descriptionCandidate,
          imageUrl: course.imageUrl || null,
        });
        return;
      }

      if (!currentEntry.imageUrl && course.imageUrl) {
        currentEntry.imageUrl = course.imageUrl;
      }

      if (
        currentEntry.description === "Discover tailored learning experiences from our catalog." &&
        descriptionCandidate
      ) {
        currentEntry.description = descriptionCandidate;
      }
    });

    return Array.from(categoryMap.values())
      .map((entry) => ({
        ...entry,
        imageUrl: entry.imageUrl || FALLBACK_IMAGE,
      }))
      .slice(0, 6);
  }, [courses]);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[18px] md:text-[20px] font-semibold text-[#1C1C1C]">
            Courses category
          </h2>
          <Link to="/courses" className="text-teal-600 text-sm hover:underline">
            See all
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <article
                key={`category-skeleton-${index}`}
                className="rounded-2xl bg-white shadow-md shadow-gray-100"
              >
                <div className="px-6 pt-6">
                  <div className="mx-auto h-40 w-40 rounded-xl bg-gray-200 animate-pulse" />
                </div>
                <div className="px-6 pb-6 pt-4 text-center">
                  <div className="mx-auto h-4 w-24 rounded-full bg-gray-200 animate-pulse" />
                  <div className="mt-3 space-y-2">
                    <div className="mx-auto h-3 w-32 rounded-full bg-gray-200 animate-pulse" />
                    <div className="mx-auto h-3 w-28 rounded-full bg-gray-200 animate-pulse" />
                  </div>
                </div>
              </article>
            ))
          ) : categoryCards.length ? (
            categoryCards.map((category) => (
              <article
                key={category.id}
                className="rounded-2xl bg-white shadow-md shadow-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="px-6 pt-6">
                  <div className="mx-auto h-40 w-40 overflow-hidden rounded-xl">
                    <img
                      src={category.imageUrl}
                      alt={category.category}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                  </div>
                </div>
                <div className="px-6 pb-6 pt-4 text-center">
                  <h3 className="text-sm font-semibold text-[#1C1C1C]">
                    {category.category}
                  </h3>
                  <p className="mt-2 text-xs text-[#6B7280]">
                    {category.description}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-gray-200 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
              Course categories will appear here soon.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreatorsSection;


