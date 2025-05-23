/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchGameLists } from "@/app/game-lists/actions";
import { QUERY_KEYS_MAP } from "@/app/lib/constant";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AllGamesData, GameItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion as m } from "motion/react";
import React, { useMemo, useState } from "react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldErrors,
} from "react-hook-form";
import GameCardModal from "../GameCardModal";
import { Payload } from "../ToPlayModal";
import { GameSelector } from "./GameSelector";

interface IFormInputProps {
  control: Control<Payload, any, Payload>;
  errors: FieldErrors<Payload>;
}



const ErrorMessage = ({ error }: { error: any }) => {
  if (!error) return null;

  return (
    <AnimatePresence>
      <m.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-red-400 text-sm col-span-4 text-center font-semibold mt-1
                  drop-shadow-[0_0_3px_rgba(255,0,0,0.5)]"
      >
        {error.message}
      </m.p>
    </AnimatePresence>
  );
};

const renderGameInput = ({
  isEdit,
  isLoading,
  data,
  field,
  searchQuery,
  onSearchChange,
  filteredGames,
}: {
  isEdit: boolean;
  isLoading: boolean;
  data: GameItem | undefined;
  field: ControllerRenderProps<Payload, "gameId">;
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filteredGames: GameItem[] | undefined;
}) => {
  if (isEdit && data) {
    return (
      <div className="col-span-3">
        <GameCardModal data={data} />
      </div>
    );
  }

  if (isLoading) {
    return <Skeleton className="h-8 w-full" />;
  }

  return (
    <GameSelector
      field={field}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      filteredGames={filteredGames}
    />
  );
};

export const InputGame = ({
  control,
  errors,
  data,
  isEdit,
}: IFormInputProps & {
  isEdit: boolean;
  data: GameItem | undefined;
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allGamesData, isLoading } = useQuery<AllGamesData>({
    queryKey: [QUERY_KEYS_MAP.ALL_GAMES],
    queryFn: fetchGameLists,
  });

  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) {
      return allGamesData?.games;
    }

    return allGamesData?.games.filter((game) =>
      game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allGamesData, searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Controller
      control={control}
      name="gameId"
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          <label
            className="
              text-lg text-cyan-300 font-bold
              [text-shadow:0_0_5px_rgba(0,255,255,0.5)]
            "
            htmlFor="gameId"
          >
            Game Title
          </label>

          {renderGameInput({
            isEdit,
            isLoading,
            data,
            field,
            searchQuery,
            onSearchChange: handleSearchChange,
            filteredGames: filteredGames as GameItem[],
          })}

          <ErrorMessage error={errors.gameId} />
        </div>
      )}
    />
  );
};

export const InputDuration = ({ control, errors }: IFormInputProps) => {
  return (
    <Controller
      control={control}
      name="duration"
      rules={{
        required: "Duration is required for your quest!",
        min: { value: 1, message: "Minimum quest duration is 1 month." },
        pattern: {
          value: /^\d*$/,
          message: "Duration must be a valid number of months.",
        },
      }}
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          <label
            className="
                  text-lg text-cyan-300 font-bold
                  [text-shadow:0_0_5px_rgba(0,255,255,0.5)]
                "
            htmlFor="duration"
          >
            Quest Duration
          </label>
          <Input
            id="duration"
            type="number"
            placeholder="e.g., 6 months"
            {...field}
            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
            className="
                    col-span-3 bg-gray-700/70 border border-purple-500 text-white text-base rounded-md px-4 py-2
                    focus:ring-pink-500 focus:border-pink-500 transition-all duration-200
                    placeholder-gray-400 font-mono tracking-wide
                  "
          />
          {errors.duration && (
            <AnimatePresence>
              <m.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm col-span-4 text-center font-semibold mt-1
                      drop-shadow-[0_0_3px_rgba(255,0,0,0.5)]"
              >
                {errors.duration.message}
              </m.p>
            </AnimatePresence>
          )}
        </div>
      )}
    />
  );
};
