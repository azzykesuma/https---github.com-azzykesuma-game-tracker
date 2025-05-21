'use client'
import { GlobalAchievement, PersonalAchievement, SteamAchievement } from "@/types";
import React, { useEffect, useState } from "react";
import AchievementCard from "./AchievementCard";
import FilterButtons from "./FilterButtons";
import { AnimatePresence, motion as m } from "motion/react";

interface IAchiementProps {
  allAchievements: SteamAchievement[];
  myAchievement: PersonalAchievement[];
  globalAchievement: GlobalAchievement[];
}

const AchievementsLists = ({
  allAchievements,
  myAchievement,
  globalAchievement
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
      <div className="flex justify-between w-full items-center">
        <FilterButtons onFilter={filterAchievement} />
        <AnimatePresence>
          {currentFilter === 'achieved' && (
            <m.div
            initial={{ opacity: 0, x : -100 }}
            animate={{ opacity: 1, x : 0 }}
            exit={{ opacity: 0, x : -100 }}
            className="text-lg">
              <p className="text-sm md:text-md">Achieved Achiements : {displayedAchievements.length}</p>
            </m.div>
          )}
        </AnimatePresence>
      </div>
      {displayedAchievements.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-3">
          {displayedAchievements.map((achievement) => {
            const matchingGlobalAchievement = globalAchievement.find(
              (globalAchi) => globalAchi.name === achievement.name
            );
            const percent = matchingGlobalAchievement ? matchingGlobalAchievement.percent : 0;

            return (
              <AchievementCard
                key={achievement.name}
                achievement={achievement}
                globalPercent={percent}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full text-center py-10 text-gray-400 text-lg">
          <p>No achievements found for the current filter.</p>
        </div>
      )}
    </>
  );
};

export default AchievementsLists;