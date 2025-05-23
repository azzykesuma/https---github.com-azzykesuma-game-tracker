import { GameItem } from "@/types";
import { UseMutationResult } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export const useAutoRemoveCurrentGame = (
  currentlyPlayingId: number | undefined,
  matchedGames: (
    | {
        gameInfo: GameItem;
        gameId: number;
        duration: number;
      }
    | null
  )[],
  deleteMutation:  UseMutationResult<boolean, Error, number, {
    previousData: unknown;
}>
) => {
  const processedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!currentlyPlayingId || processedRef.current.has(currentlyPlayingId)) {
      return;
    }

    const gameToRemove = matchedGames.find(
      (game) => game?.gameId === currentlyPlayingId
    );

    if (gameToRemove) {
      processedRef.current.add(currentlyPlayingId);
      deleteMutation.mutate(currentlyPlayingId, {
        onSuccess: () => {
          console.log('Auto-removed currently playing game from to-play list');
        },
        onError: () => {
          processedRef.current.delete(currentlyPlayingId);
        }
      });
    }
  }, [currentlyPlayingId, matchedGames, deleteMutation]);
};
