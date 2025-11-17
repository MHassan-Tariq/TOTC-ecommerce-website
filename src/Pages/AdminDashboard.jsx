import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../Components/Navbar.jsx";
import FooterSection from "../Components/FooterSection.jsx";
import {
  UsersRound,
  BookOpenCheck,
  BarChart3,
  Settings,
  CalendarClock,
  MailCheck,
  ShieldCheck,
  Loader2,
  PenSquare
} from "lucide-react";
import { fetchCourses, fetchBlogs } from "../utils/api.js";

const statCards = [
  {
    label: "Active Students",
    value: "12,480",
    change: "+12.5%",
    icon: UsersRound,
    tone: "bg-emerald-500/15 text-emerald-300"
  },
  {
    label: "Published Courses",
    value: "128",
    change: "+4 new",
    icon: BookOpenCheck,
    tone: "bg-cyan-500/15 text-cyan-300"
  },
  {
    label: "Monthly Revenue",
    value: "$86.4k",
    change: "+8.1%",
    icon: BarChart3,
    tone: "bg-sky-500/15 text-sky-300"
  },
  {
    label: "System Health",
    value: "Operational",
    change: "99.9% uptime",
    icon: ShieldCheck,
    tone: "bg-purple-500/15 text-purple-300"
  }
];

const quickLinks = [
  {
    title: "Course Management",
    description: "Create, update, or archive learning tracks and cohorts.",
    action: "Manage Courses",
    icon: Settings
  },
  {
    title: "Schedule & Events",
    description: "Plan upcoming live sessions, workshops, and assessments.",
    action: "View Calendar",
    icon: CalendarClock
  },
  {
    title: "Communication",
    description: "Send announcements and automate onboarding emails.",
    action: "Open Messaging",
    icon: MailCheck
  }
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(true);
  const [courseError, setCourseError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogError, setBlogError] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data.courses || []);
      } catch (err) {
        setCourseError(err.message || "Unable to load courses");
      } finally {
        setCourseLoading(false);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data.blogs || []);
      } catch (err) {
        setBlogError(err.message || "Unable to load blogs");
      } finally {
        setBlogLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 sm:px-8 lg:px-12 py-10 lg:py-14">
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-2">Admin Control Center</p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">Welcome back{user ? `, ${user.name}` : ""}</h1>
            <p className="mt-3 text-gray-600 max-w-2xl text-sm sm:text-base">
              Monitor platform performance, review learner progress, and take action quickly with your personalized control panel.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/" )}
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium shadow-sm hover:bg-gray-50 transition"
            >
              Go to site
            </button>
            <button
              onClick={() => navigate("/admin/courses")}
              className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200/40 hover:bg-emerald-600 transition"
            >
              Add courses
            </button>
            <button
              onClick={() => navigate("/admin/blogs")}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50 transition"
            >
              <PenSquare className="h-4 w-4 text-emerald-500" />
              Manage blog
            </button>
          </div>
        </header>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-lg shadow-gray-200/70">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Course catalog overview</h2>
              <p className="text-sm text-gray-500">A quick look at all published courses.</p>
            </div>
            <button
              onClick={() => navigate('/admin/courses')}
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Manage courses
            </button>
          </div>

          {courseLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
            </div>
          ) : courseError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-600">
              {courseError}
            </div>
          ) : courses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 px-4 py-10 text-center text-sm text-gray-500">
              No courses found. Click "Manage courses" to add one.
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-gray-100">
              <table className="min-w-full divide-y divide-gray-100 text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase tracking-wide text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left">Course</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Level</th>
                    <th className="px-4 py-3 text-left">Duration</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {courses.map((course) => (
                    <tr key={course._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="font-semibold text-gray-900 line-clamp-1">{course.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-2">{course.description}</div>
                      </td>
                      <td className="px-4 py-4 text-gray-600">{course.category || 'General'}</td>
                      <td className="px-4 py-4 text-gray-600">{course.level || 'Beginner'}</td>
                      <td className="px-4 py-4 text-gray-600">{course.duration}</td>
                      <td className="px-4 py-4 text-emerald-600 font-semibold">
                        ${Number(course.price ?? 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => navigate(`/course/${course._id}`)}
                          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-lg shadow-gray-200/70">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Published blog posts</h2>
              <p className="text-sm text-gray-500">Preview what s live on your blog.</p>
            </div>
            <button
              onClick={() => navigate('/admin/blogs')}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
            >
              Manage blog
            </button>
          </div>

          {blogLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
            </div>
          ) : blogError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-600">
              {blogError}
            </div>
          ) : blogs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 px-4 py-12 text-center text-sm text-gray-500">
              No blog posts yet. Click "Manage blog" to add one.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {blogs.slice(0, 4).map((blog) => (
                <article key={blog._id} className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 shadow-sm hover:shadow-md transition">
                  <div className="flex flex-col gap-3">
                    {blog.categoryImage && (
                      <div className="h-32 w-full overflow-hidden rounded-xl">
                        <img
                          src={blog.categoryImage}
                          alt={blog.category || 'Blog category'}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/img/book1.jpg';
                          }}
                        />
                      </div>
                    )}
                    <div>
                      {blog.category && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          {blog.category}
                        </span>
                      )}
                      <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-2">{blog.title}</h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'Draft'}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/admin/blogs`, { state: { editId: blog._id } })}
                          className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => window.open(`/blog/${blog._id}`, '_blank', 'noopener,noreferrer')}
                          className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default AdminDashboard;
