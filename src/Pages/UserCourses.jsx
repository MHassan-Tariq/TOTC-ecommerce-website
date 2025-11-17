import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, GraduationCap, ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import FooterSection from "../Components/FooterSection.jsx";
import { useCart } from "../context/CartContext.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const extractWeeks = (duration) => {
  if (!duration) return null;
  const match = duration.toString().match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  return match[1];
};

const UserCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart, isInCart } = useCart();
  const [feedbackCourseId, setFeedbackCourseId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/courses`);
        setCourses(data.courses || []);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load courses at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
            <GraduationCap className="h-4 w-4" />
            Explore our latest programs
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-gray-900">
            Courses curated to accelerate your growth
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-gray-600">
            Discover learning experiences guided by industry experts. Each course is designed to be practical, collaborative, and career-focused.
          </p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-600">
            {error}
          </div>
        ) : courses.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-gray-50 px-6 py-12 text-center text-sm text-gray-500">
            Courses will appear here soon. Stay tuned!
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {courses.map((course) => {
              const weeksValue = extractWeeks(course.duration);
              const formattedDuration = weeksValue ? `Week: ${weeksValue}` : course.duration || 'Duration TBD';

              return (
              <article
                key={course._id}
                className="rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 flex flex-col overflow-hidden"
              >
                {course.imageUrl ? (
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="h-48 w-full object-cover"
                  />
                ) : course.videoUrl ? (
                  <div className="relative bg-black">
                    <video
                      src={course.videoUrl}
                      controls
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-sm text-gray-400">
                    No media available
                  </div>
                )}
                <div className="px-6 py-6 flex flex-col gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{course.title}</h2>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{course.description}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700">
                      {course.level || "Beginner"}
                    </div>
                    {course.category && (
                      <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">
                        {course.category}
                      </div>
                    )}
                    <span>{formattedDuration}</span>
                    {course.price !== undefined && course.price !== null && (
                      <span className="font-semibold text-emerald-600">
                        ${Number(course.price).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Link
                      to={`/course/${course._id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      View details <ArrowRight className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => {
                        addToCart(course);
                        setFeedbackCourseId(course._id);
                        setFeedbackMessage('Added to cart');
                        setTimeout(() => {
                          setFeedbackCourseId(null);
                          setFeedbackMessage('');
                        }, 2000);
                      }}
                      disabled={isInCart(course._id)}
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {isInCart(course._id) ? 'In cart' : 'Add to cart'}
                    </button>
                  </div>
                  {feedbackCourseId === course._id && feedbackMessage && (
                    <p className="text-xs text-emerald-600">{feedbackMessage}</p>
                  )}
                </div>
              </article>
            );})}
          </div>
        )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default UserCourses;
