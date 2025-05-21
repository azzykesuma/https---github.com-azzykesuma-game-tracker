import InnerLayout from "@/components/layout/InnerLayout";
import React from "react";
import { fetchMyCurrentlyPlayedGame } from "./action";
import { convertMinutesTohour } from "../lib/dateFormatter";
import Image from "next/image";
import Link from "next/link";

const RecentlyPlayed = async () => {
  const recentlyPlayedGames = await fetchMyCurrentlyPlayedGame();
  const myGames = recentlyPlayedGames?.games;

  return (
    <InnerLayout>
      <div className="max-w-6xl mx-auto p-6 sm:p-8 md:p-10 lg:p-12">
        {/* Page Title */}
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

        {/* Conditional Rendering for Games */}
        {myGames && myGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
            {myGames.map((game) => (
              <div
                key={game.appid}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden
                           transform transition-transform duration-200 hover:scale-[1.02] hover:shadow-2xl
                           flex flex-col items-center text-center p-4"
              >
                {/* Game Icon */}
                <div className="w-20 h-20 relative rounded-md overflow-hidden mb-4 flex-shrink-0 border border-gray-600">
                  <Image
                    src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                    alt={`Icon for game - ${game.name}`}
                    width={80}
                    height={80}
                    className="bg-gray-700" // Fallback background for image area
                  />
                </div>

                {/* Game Details */}
                <h3 className="text-white text-xl font-bold leading-tight mb-2 line-clamp-2">
                  {game.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  Playtime:{" "}
                  <span className="font-semibold text-gray-300">
                    {convertMinutesTohour(game.playtime_forever)}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 text-xl">
            <p>No recently played games found.</p>
            <p className="mt-2 text-lg">Time to start gaming!</p>
          </div>
        )}
      </div>
    </InnerLayout>
  );
};

export default RecentlyPlayed;
