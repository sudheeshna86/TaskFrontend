import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-white">
      <header className="flex justify-between items-center px-8 py-5 bg-white/70 backdrop-blur-md shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">TaskApp</h1>
        <div className="flex items-center gap-4">
          <Link to="/login" className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-800">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Register</Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl font-bold text-gray-800 leading-tight max-w-3xl">
          Organize Your Work, Boost Your Productivity
        </h2>

        <p className="mt-4 text-lg text-gray-600 max-w-xl">
          A simple and powerful Task Management Application to help you stay focused,
          stay organized, and get things done—faster and better.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 shadow-md"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-xl hover:bg-indigo-50"
          >
            Login
          </Link>
        </div>
      </main>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div className="p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800">Create & Manage Tasks</h3>
            <p className="mt-2 text-gray-600">
              Add, edit, update, and delete tasks with ease. Always stay organized.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800">Track Your Progress</h3>
            <p className="mt-2 text-gray-600">
              View your pending and completed tasks anytime on your dashboard.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800">Secure Authentication</h3>
            <p className="mt-2 text-gray-600">
              Login with JWT-based authentication to protect your data.
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center py-6 text-gray-600 bg-gray-50">
        © {new Date().getFullYear()} TaskApp — All Rights Reserved.
      </footer>
    </div>
  )
}
