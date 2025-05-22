import { AllGamesData, IDoc } from "@/types";
import { List } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useMemo } from "react";
import ToPlayCard from "./ToPlayCard";

interface IToPlaySectionProps {
  allGamesData: AllGamesData | undefined;
  data : IDoc['toPlay']
}

const ToPLaySection = ({ allGamesData, data }: IToPlaySectionProps) => {
  const matchedGames = useMemo(() => {
    if (!allGamesData?.games) return [];

    const gamesMap = new Map(
      allGamesData.games.map((game) => [game.appid, game])
    );

    const foundGames = data.map((toPlayGame) => {
        const gameInfo = gamesMap.get(+toPlayGame.gameId);
        if (gameInfo) {
          return {
            ...toPlayGame,
            gameInfo,
          };
        }
        return null;
      })
      .filter(Boolean);


    return foundGames;
  }, [allGamesData?.games, data]);


  return (
    <section className="bg-gray-800 p-8 rounded-xl shadow-2xl border-b-4 border-r-4 border-gray-700">
      <h2 className="text-4xl font-bold text-blue-400 mb-8 flex items-center drop-shadow-[0_0_8px_rgba(0,191,255,0.5)]">
        <List className="mr-4 text-5xl" /> To Play
      </h2>

      {matchedGames.length === 0 ? (
        <p className="text-gray-400 text-center py-6 text-lg">
          No games found in your scheduled &apos;to-play&apos; list.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {matchedGames.map((game) => {
              return (
                <ToPlayCard key={game?.gameId} game={game} />
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default ToPLaySection;
