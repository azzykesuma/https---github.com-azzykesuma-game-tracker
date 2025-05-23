import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GameItem } from "@/types";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IGameSelectionProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  gameLists: GameItem[];
  update: (gameId: string) => Promise<void>;
}

const GameSelectionModal = ({
  open,
  setOpen,
  gameLists,
  update,
}: IGameSelectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      gameId: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) {
      return gameLists;
    }

    return gameLists.filter((game) =>
      game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [gameLists, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleUpdate: SubmitHandler<{ gameId: string }> = async (data) => {
    await update(data.gameId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-800/50 backdrop-blur-lg text-gray-100 p-6 rounded-lg shadow-2xl border border-gray-700/50 w-full md:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Game Selection</DialogTitle>
          <DialogDescription>
            Select a game from your own game library
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Controller
            control={control}
            name="gameId"
            rules={{ required: "Game is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a game" />
                </SelectTrigger>
                <SelectContent className="relative">
                  <div className="flex items-center px-3 pb-2">
                    <Input
                      placeholder="Search games..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="h-8 w-full border-0 p-2 shadow-none outline-none ring-0 focus:ring-0 focus-visible:ring-0"
                    />
                  </div>
                  <SelectGroup>
                    {filteredGames?.map((game) => (
                      <SelectItem
                        key={game.appid}
                        value={game.appid.toString()}
                      >
                        <div className="flex gap-2 items-center justify-center">
                          <Image
                            src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                            alt={game.name}
                            width={32}
                            height={32}
                          />
                          <span>{game.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <DialogFooter className="flex justify-center mt-5">
            <Button variant={"destructive"} type="button" onClick={() => setOpen(false)}>Cancel</Button>
            <Button disabled={!isValid || !isDirty}>Play this game</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GameSelectionModal;
