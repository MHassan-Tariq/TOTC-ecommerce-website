import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2, ArrowLeft, ShoppingCart } from "lucide-react";
import Navbar from "../Components/Navbar.jsx";
import FooterSection from "../Components/FooterSection.jsx";
import { useCart } from "../context/CartContext.jsx";
import { fetchCourse } from "../utils/api.js";

const CourseLanding = () => {
  const { id } = useParams();
  const { addToCart, isInCart } = useCart();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await fetchCourse(id);
        setCourse(data.course);
      } catch (err) {
        setError(err.message || "Unable to load course");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  const handleAddToCart = () => {
    if (course) {
      addToCart(course);
    }
  };

  const title = course?.title || "Course details";
  const description = course?.description || "Detailed course information will appear here once the course content loads.";
  const instructor = course?.level ? `${course.level} level` : "";
  const duration = course?.duration || "";
  const formatDuration = (value) => {
    if (!value) return "";
    const match = value.toString().match(/(\d+(?:\.\d+)?)/);
    if (!match) return value;
    return `Weeks ${match[1]}`;
  };
  const learningList = Array.isArray(course?.whatYoullLearn) ? course.whatYoullLearn : [];
  const requirementsList = Array.isArray(course?.requirements) ? course.requirements : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back to courses
          </Link>

          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
          ) : error ? (
            <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-600">
              {error}
            </div>
          ) : (
            <div className="mt-8 bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="relative h-56 bg-gray-100">
                {course?.imageUrl ? (
                  <img src={course.imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                    Course preview
                  </div>
                )}
              </div>

              <div className="px-8 py-10 space-y-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="space-y-4 max-w-3xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
                    <p className="text-gray-600 leading-relaxed">{description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      {instructor && <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 font-medium">{instructor}</span>}
                      {course?.category && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-blue-700 font-medium">
                          {course.category}
                        </span>
                      )}
                      {duration && <span>Duration: {formatDuration(duration)}</span>}
                      {course?.price !== undefined && course?.price !== null && (
                        <span className="text-emerald-600 font-semibold">
                          ${Number(course.price).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={isInCart(course._id)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {isInCart(course._id) ? 'In cart' : 'Add to cart'}
                    </button>
                  </div>
                </div>

                {course?.videoUrl && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Intro video</h2>
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-black">
                      <video src={course.videoUrl} className="w-full aspect-video object-cover" controls />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">What you'll learn</h3>
                    {learningList.length > 0 ? (
                      <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed space-y-1">
                        {learningList.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        This course equips you with practical skills and real-world assignments tailored to build confidence and deliver measurable results.
                      </p>
                    )}
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h3>
                    {requirementsList.length > 0 ? (
                      <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed space-y-1">
                        {requirementsList.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Basic familiarity with the subject matter helps, but the lessons are designed to guide you from foundational concepts to applied techniques without assuming prior expertise.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default CourseLanding;


