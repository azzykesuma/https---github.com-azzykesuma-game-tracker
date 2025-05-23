import { ControllerRenderProps } from "react-hook-form";
import { Payload } from "../ToPlayModal";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { GameItem } from "@/types";
import Image from "next/image";

export const GameSelector = ({
  field,
  searchQuery,
  onSearchChange,
  filteredGames,
}: {
  field: ControllerRenderProps<Payload, "gameId">;
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filteredGames: GameItem[] | undefined;
}) => (
  <Select onValueChange={field.onChange} value={field.value}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select a game" />
    </SelectTrigger>
    <SelectContent className="relative">
      <div className="flex items-center px-3 pb-2">
        <Input
          placeholder="Search games..."
          value={searchQuery}
          onChange={onSearchChange}
          className="h-8 w-full border-0 p-2 shadow-none outline-none ring-0 focus:ring-0 focus-visible:ring-0"
        />
      </div>
      <SelectGroup>
        {filteredGames?.map((game) => (
          <SelectItem key={game.appid} value={game.appid.toString()}>
            <div className="flex gap-2 items-center justify-center">
              <Image 
                src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                alt={game.name}
                width={32}
                height={32}
              />
              <p>{game.name}</p>
            </div>
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);