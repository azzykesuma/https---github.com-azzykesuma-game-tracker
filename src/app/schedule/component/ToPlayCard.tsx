'use client'
import { Button } from "@/components/ui/button";
import { GameItem } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ToPlayModal from "./ToPlayModal";

const ToPlayCard = ({
  game,
}: {
  game: {
    gameInfo: GameItem;
    gameId: number;
    duration: number;
  } | null;
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = () => {
    setOpenModal(true);
  }
  if (!game) {
    return null;
  }

  return (
    <>
      <div
        key={game.gameId}
        className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl
                  border-2 border-yellow-500 transform transition-all duration-300
                  hover:scale-105 hover:shadow-yellow-700/50 cursor-pointer
                  overflow-hidden h-[200px] group"
      >
        <div
          className="absolute -top-4 -right-4 w-20 h-20 rounded-full p-1 bg-gradient-to-br from-yellow-400 to-orange-500
                        shadow-lg flex items-center justify-center overflow-hidden z-10
                        transform transition-transform duration-300 group-hover:scale-110"
        >
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
            <span className="text-yellow-400">{game.duration}</span> Months to
            Play
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-70 h-[40px] w-[40px] text-white rounded-full shadow-md
                      transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            aria-label="Edit game"
          >
            <Pencil size={18} />
          </Button>
          <Button
            className=" h-[40px] w-[40px] bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md
                      transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
            aria-label="Delete game"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
      <ToPlayModal data={game} isEdit={true} open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default ToPlayCard;
