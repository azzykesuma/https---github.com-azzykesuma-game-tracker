import React from "react";
import { getStatForGames } from "./action";
import InnerLayout from "@/components/layout/InnerLayout";
import BackButton from "@/components/layout/BackButton";
import GameStatComponent from "./component/GameStat";
import ErrorComponent from "../../[id]/component/ErrorComponent";

const GameStat = async ({ params }: { params: Promise<{ stat: string }> }) => {
  const stat = (await params).stat;
  const stats = await getStatForGames(stat);
  if(!stat) {
    return <ErrorComponent message="Could not load player achievement data." />
  }
  return (
    <InnerLayout>
      <div className="max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
          Game Stat for nerds
        </h1>
        <div className="my-5">
          <BackButton />
        </div>
      </div>
      {!stats ? (
        <div className="text-center py-20 text-gray-400 text-xl">
          <p>No statistics found for this game.</p>
          <p className="mt-2 text-lg">
            It seems this game doesn&apos;t track detailed stats.
          </p>
        </div>
      ) : (
        <GameStatComponent stat={stats} />
      )}
    </InnerLayout>
  );
};

export default GameStat;
