import React from 'react'
import './App.css'
import Home from './Pages/Home.jsx'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
