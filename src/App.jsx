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
import Courses from './Pages/Courses.jsx'
import CoursesLiterature from './Pages/CoursesLiterature.jsx'
import CourseLanding from './Pages/CourseLanding.jsx'
import CourseCalendar from './Pages/CourseCalendar.jsx'
import Checkout from './Pages/Checkout.jsx'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/search" element={<SiteHeaderAndSearch />} />
        <Route path="/courses/literature" element={<CoursesLiterature />} />
        <Route path="/course/:id" element={<CourseLanding />} />
        <Route path="/course/:id/calendar" element={<CourseCalendar />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginRegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/meeting" element={<Meeting />} />
      </Routes>
    </div>
  )
}

export default App
