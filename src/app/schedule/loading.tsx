import React from 'react';
import Link from 'next/link';

const GamingScheduleLoadingPage = () => {
  const numberOfToPlayPlaceholders = 3;

  const toPlayCardPlaceholders = Array.from({ length: numberOfToPlayPlaceholders }).map((_, index) => (
    <div
      key={index}
      className="bg-gray-800 rounded-lg p-4 animate-pulse shadow-md flex flex-col items-center space-y-3"
    >
      <div className="w-24 h-24 bg-gray-700 rounded-md"></div>
      <div className="h-5 w-3/4 bg-gray-700 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
      <div className="flex justify-around w-full mt-2">
        <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
        <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-2">Schedule</h1>
        <p className="text-lg sm:text-xl text-gray-400">Personal Gaming Schedule</p>
      </div>

      <Link
        href="/"
        className="inline-block px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors mb-8"
      >
        Back
      </Link>

      <div className="relative bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-8 mb-8 shadow-lg overflow-hidden animate-pulse">
        <div className="h-10 w-2/3 bg-gray-700 rounded-md mx-auto mb-4"></div>
        <div className="h-10 w-1/4 bg-green-600 rounded-md mx-auto"></div>
      </div>

      <div className="bg-gradient-to-r from-purple-700 to-blue-700 rounded-xl p-6 mb-8 shadow-md animate-pulse">
        <div className="h-6 w-1/3 bg-gray-700 rounded mb-4"></div>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-700 rounded-md"></div>
          <div className="flex-grow">
            <div className="h-5 w-3/4 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-1/4 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-700 rounded-lg animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {toPlayCardPlaceholders}
        </div>
      </div>
    </div>
  );
};

export default GamingScheduleLoadingPage;

