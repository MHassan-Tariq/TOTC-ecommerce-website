import React from 'react'
import './App.css'
import Home from './Pages/Home.jsx'
import SiteHeaderAndSearch from './Pages/Search.jsx'
import LoginPage from './Components/LoginPage.jsx'
import LoginRegisterPage from './Components/LoginRegisterPage.jsx'
import ForgotPassword from './Components/ForgotPassword.jsx'
import OTPVerification from './Components/OTPVerification.jsx'
import ResetPassword from './Components/ResetPassword.jsx'
import Careers from './Pages/Careers.jsx'
import Blog from './Pages/Blog.jsx'
import BlogDetails from './Pages/BlogDetails.jsx'
import Meeting from './Pages/Meeting.jsx'
import CoursesLiterature from './Pages/CoursesLiterature.jsx'
import CourseLanding from './Pages/CourseLanding.jsx'
import CourseCalendar from './Pages/CourseCalendar.jsx'
import Checkout from './Pages/Checkout.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import AdminCourses from './Pages/AdminCourses.jsx'
import AdminBlog from './Pages/AdminBlog.jsx'
import UserCourses from './Pages/UserCourses.jsx'
import Cart from './Pages/Cart.jsx'
import About from './Pages/About.jsx'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'

const App = () => {
  const { user, loading } = useAuth()

  const RequireAdmin = ({ children }) => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white text-gray-500 text-sm">
          Loading...
        </div>
      )
    }

    if (!user || user.role !== 'admin') {
      return <Navigate to="/login" replace />
    }

    return children
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<UserCourses />} />
        <Route path="/search" element={<SiteHeaderAndSearch />} />
        <Route path="/courses/literature" element={<CoursesLiterature />} />
        <Route path="/course/:id" element={<CourseLanding />} />
        <Route path="/course/:id/calendar" element={<CourseCalendar />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginRegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <RequireAdmin>
              <AdminCourses />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <RequireAdmin>
              <AdminBlog />
            </RequireAdmin>
          }
        />
      </Routes>
    </div>
  )
}

export default App
