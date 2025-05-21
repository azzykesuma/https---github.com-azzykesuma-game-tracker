import { convertMinutesTohour } from "@/app/lib/dateFormatter";
import { IGames } from "@/types";
import Image from "next/image";
import ButtonCard from "./ButtonCard";

const GameCard = ({ game }: { game: IGames }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-200 hover:scale-[1.02] hover:shadow-2xl flex flex-col items-center text-center p-4">
      <div className="w-16 h-16 relative rounded-md overflow-hidden mb-4 flex-shrink-0">
        <Image
          src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
          alt={`Icon for game - ${game.name}`}
          width={64} // Slightly larger for this layout, adjust as needed
          height={64}
          className="bg-gray-700"
        />
      </div>

      <div className="flex-grow flex flex-col justify-between w-full">
        <div className="mb-3">
          <h3 className="text-white text-xl font-bold leading-tight mb-1 line-clamp-2">
            {game.name}
          </h3>
          <p className="text-gray-400 text-sm">
            Total Playtime:{" "}
            <span className="font-semibold text-gray-300">
              {convertMinutesTohour(game.playtime_forever)}
            </span>
          </p>
        </div>

        <div className="mt-auto w-full">
          <ButtonCard id={game.appid} />
        </div>
      </div>
    </div>
  );
};

export default GameCard;