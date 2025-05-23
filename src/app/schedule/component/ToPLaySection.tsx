'use client'
import { AllGamesData, IDoc } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { deleteToPlayGame } from "../service/update";
import { LoadingModal } from "./Modal/LoadingModal";
import ToPlayCard from "./ToPlayCard";
import { useAutoRemoveCurrentGame } from "./ToPlayComponent/AuthRemoveToPlayGame";
import { EmptyState } from "./ToPlayComponent/EmptyState";
import { SectionHeader } from "./ToPlayComponent/SectionHeader";
import ToPlayModal from "./ToPlayModal";

interface IToPlaySectionProps {
  allGamesData: AllGamesData | undefined;
  data: IDoc['toPlay'];
  currentlyPlayingId: number | undefined;
}

const ToPlaySection = ({ allGamesData, data, currentlyPlayingId }: IToPlaySectionProps) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const queryClient = useQueryClient();

  const matchedGames = useMemo(() => {
    if (!allGamesData?.games || !data.length) return [];

    const gamesMap = new Map(
      allGamesData.games.map(game => [game.appid, game])
    );

    return data
      .map(toPlayGame => {
        const gameInfo = gamesMap.get(Number(toPlayGame.gameId));
        return gameInfo ? { ...toPlayGame, gameInfo } : null;
      })
      .filter(Boolean);
  }, [allGamesData?.games, data]);

  const deleteMutation = useMutation({
    mutationFn: deleteToPlayGame,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['toPlayGames'] });
      
      const previousData = queryClient.getQueryData(['toPlayGames']);
      return { previousData };
    },
    onError: (err, gameId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['toPlayGames'], context.previousData);
      }
      console.error('Failed to delete game:', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['toPlayGames'] });
    },
  });

  useAutoRemoveCurrentGame(currentlyPlayingId, matchedGames, deleteMutation);

  const hasGames = matchedGames.length > 0;

  return (
    <>
      <section className="bg-gray-800 p-8 rounded-xl shadow-2xl border-b-4 border-r-4 border-gray-700">
        <SectionHeader onAddClick={() => setOpenAddModal(true)} />
        
        {hasGames ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {matchedGames.map((game) => (
                <ToPlayCard 
                  key={game?.gameId} 
                  game={game}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      <ToPlayModal 
        isEdit={false} 
        data={null} 
        open={openAddModal} 
        setOpen={setOpenAddModal} 
      />
      
      <LoadingModal 
        isOpen={deleteMutation.isPending} 
        message="Removing game from list..." 
      />
    </>
  );
};

export default ToPlaySection;