'use client'
import { PersonalAchievement, SteamAchievement } from "@/types";
import React, { useEffect, useState } from "react";
import AchievementCard from "./AchievementCard";
import FilterButtons from "./FilterButtons";

interface IAchiementProps {
  allAchievements: SteamAchievement[];
  myAchievement: PersonalAchievement[];
}

const AchievementsLists = ({
  allAchievements,
  myAchievement,
}: IAchiementProps) => {
  const [currentFilter, setCurrentFilter] = useState<'all' | 'achieved'>("all");
  const [displayedAchievements, setDisplayedAchievements] = useState<SteamAchievement[]>(allAchievements);

  useEffect(() => {
    const newAchievedAchievements = allAchievements.filter(steamAchi =>
      myAchievement.some(personalAchi =>
        personalAchi.apiname === steamAchi.name && personalAchi.achieved === 1
      )
    );

    if (currentFilter === "achieved") {
      setDisplayedAchievements(newAchievedAchievements);
    } else {
      setDisplayedAchievements(allAchievements);
    }
  }, [allAchievements, myAchievement, currentFilter]); 

  const filterAchievement = (view: "all" | "achieved") => {
    setCurrentFilter(view);
  };

  return (
    <>
      <FilterButtons onFilter={filterAchievement} />
      {displayedAchievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-3">
          {displayedAchievements.map((achievement) => (
            <AchievementCard key={achievement.name} achievement={achievement} />
          ))}
        </div>
      ) : (
        <div className="w-full">
          <p>No achievements found</p>
        </div>
      )}
    </>
  );
};

export default AchievementsLists;