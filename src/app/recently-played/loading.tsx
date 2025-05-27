import React from "react";
import Link from "next/link";
import InnerLayout from "@/components/layout/InnerLayout";

const RecentlyPlayedLoadingPage = () => {
  const numberOfGamePlaceholders = 3;

  const gameCardPlaceholders = Array.from({
    length: numberOfGamePlaceholders,
  }).map((_, index) => (
    <div
      key={index}
      className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden
                           transform transition-transform duration-200 hover:scale-[1.02] hover:shadow-2xl
                           flex flex-col items-center text-center p-4 space-y-2"
    >
      <div className="w-24 h-24 bg-gray-700 rounded-md"></div>
      <div className="h-5 w-3/4 bg-gray-700 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
    </div>
  ));

  return (
    <InnerLayout>
      <div className="max-w-6xl mx-auto p-6 sm:p-8 md:p-10 lg:p-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-8 sm:mb-10 md:mb-12">
          Recently Played Games
        </h1>
        <div className="my-5">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-lg flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameCardPlaceholders}
        </div>
      </div>
    </InnerLayout>
  );
};

export default RecentlyPlayedLoadingPage;
