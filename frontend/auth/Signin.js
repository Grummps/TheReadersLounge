import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import auth from './../auth/auth-helper'
import { signin } from './api-auth.js'

export default function Signin(props) {
  const [values, setValues] = useState({
    username: '',
    password: '',
    error: '',
    redirectToReferrer: false,
  })

  // Update input fields
  const handleChange = (fieldName) => (event) => {
    setValues({ ...values, [fieldName]: event.target.value })
  }

  // Submit form
  const clickSubmit = () => {
    const user = {
      username: values.username || undefined,
      password: values.password || undefined,
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        // Authenticate and redirect
        auth.authenticate(data, () => {
          setValues({ ...values, error: '', redirectToReferrer: true })
        })
      }
    })
  }

  // Destructure to check if we should redirect
  const { from } = props.location.state || { from: { pathname: '/' } }
  const { redirectToReferrer } = values
  if (redirectToReferrer) {
    return <Redirect to={from} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-black flex justify-center">
      <div className="w-full max-w-md bg-black bg-opacity-0 text-white p-6 rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">SIGN IN</h2>

        {/* username Field */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            id="username"
            type="username"
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

        {/* Submit Button */}
        <button
          onClick={clickSubmit}
          className="bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition-colors w-full"
        >
          Submit
        </button>

        {/* Optional: Link to Sign Up */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-300">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-green-400 hover:text-green-300">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
