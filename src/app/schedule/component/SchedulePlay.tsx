"use client";

import { fetchGameLists } from "@/app/game-lists/actions";
import { QUERY_KEYS_MAP } from "@/app/lib/constant";
import { Button } from "@/components/ui/button";
import { AllGamesData, IDoc } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import CurrentlyPlayingSection from "./CurrentlyPlayingSection";
import GameSelectionModal from "./Modal/GameSelectionModal";
import ToPLaySection from "./ToPLaySection";

interface ISchedulePlayProps {
  currentlyPLaying: string;
  update: (gameId: string) => Promise<void>
  data : IDoc['toPlay']
}

const SchedulePlay = ({ currentlyPLaying, update, data }: ISchedulePlayProps) => {
  const [open, setOpen] = useState(false);
  const {
    data: allGamesData,
    isLoading,
    isError,
  } = useQuery<AllGamesData>({
    queryKey: [QUERY_KEYS_MAP.ALL_GAMES],
    queryFn: fetchGameLists,
  });

  const currentlyPlayingGame = useMemo(() => {
    return allGamesData?.games.filter(
      (item) => item.appid === +currentlyPLaying
    )[0];
  }, [allGamesData, currentlyPLaying]);


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-blue-300 text-xl font-semibold">
        <div className="w-10 h-10 animate-spin border-4 border-blue-500 border-t-transparent rounded-full mr-3"></div>
        Loading game data...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-red-400 text-xl font-semibold">
        <X className="mr-3 text-2xl" />
        Error loading game lists. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-6 font-sans">
      <h1 className="text-3xl md:text-6xl font-extrabold text-center mb-12 text-teal-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.6)] uppercase tracking-wide">
        My Gaming Hub
      </h1>
      <div className="mx-auto my-4 w-full flex justify-center">
        <Button
          onClick={() => setOpen(true)}
          className="rounded-lg font-bold text-xl uppercase tracking-wider
                      bg-gradient-to-r from-green-500 to-blue-600 text-white
                      border-b-4 border-r-2 border-green-700 hover:border-blue-800
                      shadow-lg transform transition-all duration-200
                      hover:scale-105 hover:shadow-xl active:translate-y-1 active:shadow-none
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
                      "
        >
          Play Now
        </Button>
      </div>
      <CurrentlyPlayingSection currentlyPlayingGame={currentlyPlayingGame} />
      <ToPLaySection data={data} allGamesData={allGamesData} currentlyPlayingId={currentlyPlayingGame?.appid} />
      {allGamesData && (
        <GameSelectionModal
          gameLists={allGamesData?.games}
          open={open}
          setOpen={setOpen}
          update={update}
        />
      )}
    </div>
  );
};

export default SchedulePlay;
