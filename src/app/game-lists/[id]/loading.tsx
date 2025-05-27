import Link from 'next/link';
import React from 'react'

const GameStatsLoadingPage = () => {
  const numberOfStatPlaceholders = 2

  const statPlaceholders = Array.from({ length: numberOfStatPlaceholders }).map((_, index) => (
    <div
      key={index}
      className="bg-gray-800 rounded-lg p-4 animate-pulse shadow-md w-full max-w-[250px] h-[100px]"
    >
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-6 bg-gray-700 rounded w-1/2"></div>
    </div>
  ))

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <Link
        href="/game-lists"
        className="inline-block px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors mb-8"
      >
        Back
      </Link>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-8">
        Game Stat for nerds
      </h1>

      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Game Statistics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {statPlaceholders}
      </div>
    </div>
  )
}

export default GameStatsLoadingPage

