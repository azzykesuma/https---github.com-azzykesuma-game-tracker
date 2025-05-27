import React from 'react';

const ProfileLoadingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-8 shadow-lg w-full max-w-md flex flex-col items-center space-y-6">
        <div className="w-32 h-32 rounded-full bg-gray-700 animate-pulse mb-4"></div>

        <div className="h-6 w-3/4 bg-gray-700 rounded animate-pulse"></div>

        <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse mb-4"></div>

        <div className="h-10 w-2/3 bg-gray-700 rounded-lg animate-pulse"></div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="h-12 bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="h-12 bg-gray-700 rounded-lg animate-pulse"></div>
        </div>

        <div className="h-12 w-full bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProfileLoadingPage;

