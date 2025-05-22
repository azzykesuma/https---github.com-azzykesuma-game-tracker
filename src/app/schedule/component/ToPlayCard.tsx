import { GameItem } from "@/types";
import Image from "next/image";
import React from "react";

const ToPlayCard = ({
  game,
}: {
  game: {
    gameInfo: GameItem;
    gameId: number;
    duration: number;
  } | null;
}) => {

  if (!game) {
    return null;
  }

  return (
    <div
      key={game.gameId}
      className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl
                 border-2 border-yellow-500 transform transition-all duration-300
                 hover:scale-105 hover:shadow-yellow-700/50 cursor-pointer
                 overflow-hidden h-[200px] group"
    >

      <div className="absolute -top-7 -right-7 w-20 h-20 rounded-full p-1 bg-gradient-to-br from-yellow-400 to-orange-500
                      shadow-lg flex items-center justify-center overflow-hidden z-10
                      transform transition-transform duration-300 group-hover:scale-110">
        {game.gameInfo && (
          <Image
            src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.gameInfo.appid}/${game.gameInfo.img_icon_url}.jpg`}
            alt={game.gameInfo.name}
            className="w-full h-full rounded-full object-cover border border-gray-900"
            width={64}
            height={64}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-0">
        <h3 className="text-3xl font-extrabold text-white mb-2 leading-tight drop-shadow-lg pr-12">
          {game.gameInfo.name}
        </h3>
        <p className="text-gray-300 text-lg font-semibold mb-4 border-t border-gray-600 pt-2">
          <span className="text-yellow-400">{game.duration}</span> Months to Play
        </p>
      </div>
    </div>
  );
};

export default ToPlayCard;