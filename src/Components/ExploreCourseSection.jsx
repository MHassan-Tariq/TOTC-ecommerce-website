import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCourses } from "../utils/api.js";

const Stars = () => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, index) => (
      <img key={`explore-star-${index}`} src="/img/rating.png" alt="rating star" className="h-4 w-4" />
    ))}
  </div>
);

const formatPrice = (value) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "—";
  }
  return Number(value).toFixed(2);
};

const truncateText = (text, limit = 110) => {
  if (!text || typeof text !== "string") return "";
  return text.length > limit ? `${text.slice(0, limit).trim()}…` : text;
};

const SkeletonCard = ({ index }) => (
  <div
    key={`explore-skeleton-${index}`}
    className="bg-white rounded-2xl shadow-lg ring-1 ring-[#00B2FF]/20 p-5 animate-pulse"
  >
    <div className="space-y-3">
      <div className="h-4 w-1/3 bg-gray-200 rounded-full" />
      <div className="h-3 w-3/4 bg-gray-200 rounded-full" />
      <div className="h-3 w-2/3 bg-gray-200 rounded-full" />
      <div className="flex items-center justify-between pt-2">
        <div className="h-4 w-20 bg-gray-200 rounded-full" />
        <div className="h-8 w-24 rounded-full bg-gray-200" />
      </div>
    </div>
  </div>
);

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-2xl shadow-lg ring-1 ring-[#00B2FF]/30 p-5 mt-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-3 sm:max-w-xl">
        <h4 className="text-lg font-semibold text-gray-800">{course.title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{course.description}</p>
      </div>
      <div className="flex flex-col items-start sm:items-end gap-3 min-w-[140px]">
        <div className="text-gray-700 font-semibold text-base">$ {course.price}</div>
        <Stars />
        <Link
          to={course.link}
          className="border border-[#00B2FF] text-[#00B2FF] font-semibold rounded-full px-4 py-1 text-xs hover:bg-[#00B2FF] hover:text-white transition-all duration-300"
        >
          EXPLORE
        </Link>
      </div>
    </div>
  </div>
);

const ExploreCourseSection = () => {
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
        console.error("Failed to load courses for Explore Course section", error);
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

  const groups = useMemo(() => {
    const buildCards = (list) =>
      list.map((course) => ({
        id: course._id,
        title: course.title || "Untitled Course",
        description:
          truncateText(
            Array.isArray(course.whatYoullLearn)
              ? course.whatYoullLearn.filter(Boolean).join(", ")
              : course.description || ""
          ) || "Explore immersive lessons tailored for your growth.",
        price: formatPrice(course.price),
        link: course._id ? `/course/${course._id}` : "/courses",
      }));

    if (!courses.length) {
      return [
        { key: "group-1", cards: [] },
        { key: "group-2", cards: [] },
      ];
    }

    const sorted = [...courses].sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    const remainder = sorted.slice(0, 6);
    const firstGroup = remainder.slice(0, 3);
    const secondGroup = remainder.slice(3, 6);

    return [
      { key: "group-1", cards: buildCards(firstGroup) },
      { key: "group-2", cards: buildCards(secondGroup) },
    ];
  }, [courses]);

  return (
    <section className="w-full bg-[#F4F9FF] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Explore Course</h2>
          <p className="text-gray-500 text-sm mt-2">
            Discover fresh pathways across development, marketing, and creative skills—curated from our latest course releases.
          </p>
        </div>

        {groups.map((group, index) => (
          <div key={group.key} className={index === 0 ? "" : "mt-12"}>
            <div className="space-y-6">
              {loading
                ? Array.from({ length: 3 }).map((_, skeletonIndex) => (
                    <SkeletonCard key={`${group.key}-skeleton-${skeletonIndex}`} />
                  ))
                : group.cards.length
                  ? group.cards.map((card) => <CourseCard key={card.id} course={card} />)
                  : (
                      <div className="bg-white rounded-2xl shadow-inner border border-dashed border-[#00B2FF]/30 p-6 text-center text-sm text-gray-500">
                        Add more courses to populate this section automatically.
                      </div>
                    )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCourseSection;



