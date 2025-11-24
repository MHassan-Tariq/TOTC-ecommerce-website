import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCourses } from "../utils/api.js";

const EducationOffersSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        const list = (data.courses || []).slice(0, 3);
        setCourses(list);
      } catch (err) {
        setError(err.message || "Unable to load courses");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[18px] md:text-[20px] font-semibold text-[#1C1C1C]">
            Top education offers and deals are listed here
          </h2>
          <a href="/courses" className="text-teal-600 text-sm hover:underline">See all</a>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-gray-500">Loading courses…</div>
        ) : error ? (
          <div className="py-12 text-center text-sm text-red-500">{error}</div>
        ) : courses.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-500">No courses available yet.</div>
        ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {courses.map((course) => (
              <Link
                key={course._id}
                to={`/course/${course._id}`}
                className="relative block overflow-hidden rounded-2xl shadow-md shadow-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/60"
              >
              <div className="relative h-64 w-full">
                <img
                    src={course.imageUrl || "/img/h4.jpg"}
                    alt={course.title}
                    onError={(e) => { e.currentTarget.src = '/img/h4.jpg'; }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              <div className="absolute left-4 top-4 rounded-lg bg-teal-400 px-3 py-2">
                  <span className="text-white text-lg font-bold leading-none">
                    ${Number(course.price ?? 0).toFixed(2)}
                  </span>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="text-sm md:text-base font-semibold line-clamp-2">{course.title}</h3>
                  <p className="mt-2 text-[11px] leading-5 opacity-95 line-clamp-3">
                    {course.description || "Discover this new course and accelerate your learning journey."}
                  </p>
                  <div className="mt-3 text-[11px] text-teal-200 flex items-center gap-2">
                    <span>{course.category || 'General'}</span>
                    <span>•</span>
                    <span>{course.level || 'Beginner'}</span>
                  </div>
              </div>
              </Link>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default EducationOffersSection;

