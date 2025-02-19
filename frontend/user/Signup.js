import React, { useState } from 'react'
import { create } from './api-user.js'
import { Link } from 'react-router-dom'

export default function Signup() {
  const [values, setValues] = useState({
    username: '',
    password: '',
    open: false,
    error: ''
  })

  const handleChange = (fieldName) => (event) => {
    setValues({ ...values, [fieldName]: event.target.value })
  }

  const clickSubmit = () => {
    const user = {
      username: values.username || undefined,
      password: values.password || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, error: '', open: true })
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-black flex justify-center">
      <div className="relative w-full max-w-md bg-black bg-opacity-0 text-white p-6 rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">SIGN UP</h2>

        {/* Username Field */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="block w-full bg-transparent border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500 placeholder-gray-200"
            placeholder="Enter your username..."
            value={values.username}
            onChange={handleChange('username')}
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="block w-full bg-transparent border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500 placeholder-gray-200"
            placeholder="Enter your password..."
            value={values.password}
            onChange={handleChange('password')}
          />
        </div>

        {/* Error Message */}
        {values.error && (
          <p className="text-red-400 text-sm mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-1 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M18 10c0 4.418-3.582 8-8 8S2 14.418 2 10s3.582-8 8-8 8 3.582 8 8zm-8-5a5 5 0 100 10 5 5 0 000-10zm-.89 3.265l.516 3.25a.375.375 0 00.74 0l.516-3.25a.625.625 0 00-1.272-.157l-.5 3.155a.125.125 0 01-.247 0l-.5-3.155a.625.625 0 00-1.272.157l.516 3.25a.375.375 0 00.74 0l.516-3.25z" />
            </svg>
            {values.error}
          </p>
        )}

        {/* Green Submit Button */}
        <button
          onClick={clickSubmit}
          className="bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition-colors w-full"
        >
          Submit
        </button>
      </div>

      {/* Success Dialog */}
      {values.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded p-6 w-96 text-center text-gray-800">
            <h3 className="text-xl font-bold mb-4">New Account</h3>
            <p className="mb-4">New account successfully created.</p>
            <Link
              to="/signin"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 inline-block"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
