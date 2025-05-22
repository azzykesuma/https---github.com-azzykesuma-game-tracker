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
import React, { useMemo, useState } from "react";

interface IGameSelectionProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  gameLists: GameItem[];
  update: (gameId: string) => Promise<void>
}

const GameSelectionModal = ({
  open,
  setOpen,
  gameLists,
  update
}: IGameSelectionProps) => {
    // todo : display selected game, make error handling for when no game is selected
  const [selectedGameId, setSelectedGameId] = useState(""); 
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSelectionChange = (value: string) => {
    setSearchQuery("");
    setSelectedGameId(value);
  };

  const handleUpdate = async () => {
    if (!selectedGameId) {
      return
    };
    await update(selectedGameId);
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
        <Select onValueChange={handleSelectionChange} value={selectedGameId}>
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
              {filteredGames.map((game) => (
                <SelectItem key={game.appid} value={game.appid.toString()}>
                  {game.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogFooter className="flex justify-center">
          <Button onClick={handleUpdate}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameSelectionModal;
