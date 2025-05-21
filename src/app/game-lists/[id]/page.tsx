import BackButton from "@/components/layout/BackButton";
import { fetchAchievementLists, fetchGlobalAchievementStat, fetchMyAchievement } from "./action";
import AchievementsLists from "./component/AchievementsLists";
import ErrorComponent from "./component/ErrorComponent";

const GameDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const { availableGameStats } = await fetchAchievementLists(Number(id));
  const playerstats = await fetchMyAchievement(id);
  const globalAchievement = await fetchGlobalAchievementStat(id)
  if (!globalAchievement) {
    return <ErrorComponent message="Could not load player achievement data." />;
  }
  if (!playerstats?.playerstats?.achievements) {
    return <ErrorComponent message="Could not load player achievement data." />;
  }

  if (!availableGameStats?.achievements) {
    return <ErrorComponent message="No achievements found for this game." />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 sm:p-8 md:p-10 lg:p-12">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
          Achievements
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-2">
          Total Achievements:{" "}
          <span className="font-semibold text-white">
            {availableGameStats.achievements.length}
          </span>
        </p>
        {/* Back Button */}
        <div className="my-5">
          <BackButton />
        </div>
      </div>

      {/* Achievements List Section */}
      <div className="max-w-6xl mx-auto">
        <AchievementsLists
          allAchievements={availableGameStats.achievements}
          myAchievement={playerstats.playerstats.achievements}
          globalAchievement={globalAchievement.achievements.achievement}
        />
      </div>
    </div>
  );
};

export default GameDetail;
