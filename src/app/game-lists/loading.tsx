import React from 'react';

const LoadingPage = () => {
  const numberOfPlaceholders = 6;

  const placeholders = Array.from({ length: numberOfPlaceholders }).map((_, index) => (
    <div
      key={index}
      className="w-full h-60 bg-gray-800 rounded-lg animate-pulse flex items-center justify-center shadow-md"
    />
  ));

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1
        className="text-4xl font-bold mb-8"
        style={{ color: 'oklch(0.7759 0.1593 312.04)' }}
      >
        Loading Your Game Library...
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl w-full">
        {placeholders}
      </div>
    </div>
  );
};

export default LoadingPage;

