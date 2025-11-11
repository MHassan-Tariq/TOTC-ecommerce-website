import React from 'react'
import { useNavigate } from 'react-router-dom'

const SaveButton = ({ to = '/course/1/calendar', label = 'Save' }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(to)
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center rounded-md bg-teal-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-teal-700 transition-colors"
    >
      {label}
    </button>
  )
}

export default SaveButton

import React from 'react'
import { useNavigate } from 'react-router-dom'

const SaveButton = ({ to = '/course/1/calendar', label = 'Save' }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    // In a real app, run your form submit or API call here, then navigate
    navigate(to)
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center rounded-md bg-teal-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-teal-700 transition-colors"
    >
      {label}
    </button>
  )
}

export default SaveButton


