import React from 'react'
import { Link } from 'react-router-dom'

export default function ComingSoon() {
  return (
    <main className="relative flex flex-col items-center justify-center h-[70vh] text-center text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      <div className="relative z-10 px-4">
        <h1 className="text-5xl font-bold mb-4">Coming Soon</h1>
        <p className="text-gray-300 max-w-md mx-auto mb-8">
          We're preparing this project showcase — check back shortly to see the full installation.
        </p>
        <Link
          to="/from-the-field"
          className="px-5 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          ← Back to From the Field
        </Link>
      </div>
    </main>
  )
}
