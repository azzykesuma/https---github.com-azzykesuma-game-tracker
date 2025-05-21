"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonCard = ({ id }: { id: number }) => {
  const route = useRouter();

  const handleRedirection = (to: 'stat' | 'achievement', id: number) => {
    if (to === 'stat') {
      route.push(`/game-lists/stat/${id}`);
    } else {
      route.push(`/game-lists/${id}`); // This path seems to be for achievements based on previous context
    }
  };

  return (
    <div className="flex flex-col  gap-3 justify-center mt-4"> 
      <Button
        className="
          px-6 py-3 rounded-md font-semibold text-white
          bg-gradient-to-r from-blue-600 to-cyan-600
          hover:from-blue-700 hover:to-cyan-700
          transition-all duration-300 ease-in-out
          shadow-lg hover:shadow-xl
          transform hover:-translate-y-0.5 hover:scale-105
          w-full sm:w-auto text-base
        "
        onClick={() => handleRedirection('stat', id)}
      >
        Game Stats
      </Button>
      <Button
        className="
          px-6 py-3 rounded-md font-semibold text-white
          bg-gradient-to-r from-purple-600 to-pink-600
          hover:from-purple-700 hover:to-pink-700
          transition-all duration-300 ease-in-out
          shadow-lg hover:shadow-xl
          transform hover:-translate-y-0.5 hover:scale-105
          w-full sm:w-auto text-base
        "
        onClick={() => handleRedirection('achievement', id)}
      >
        Game Achievements
      </Button>
    </div>
  );
};

export default ButtonCard;
