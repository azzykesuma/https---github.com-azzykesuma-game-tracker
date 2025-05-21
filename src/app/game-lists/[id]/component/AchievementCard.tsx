import { SteamAchievement } from "@/types";
import { EyeOff } from "lucide-react"; // Using EyeOff for hidden
import Image from "next/image";

interface AchievementCardProps {
  achievement: SteamAchievement;
  globalPercent: number;
}

const AchievementCard = ({
  achievement,
  globalPercent,
}: AchievementCardProps) => {
  // Ensure percent is between 0 and 100
  const clampedPercent = Math.max(0, Math.min(100, globalPercent));

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl flex flex-col">
      <div className="flex items-center p-4">
        {/* Achievement Icon */}
        <div className="flex-shrink-0 w-16 h-16 mr-4 relative">
          {" "}
          {/* Increased size slightly for better visibility */}
          <Image
            src={achievement.icon}
            alt={`${achievement.displayName} icon`}
            width={64}
            height={64}
            className="rounded-full border-2 border-gray-600"
          />
        </div>

        <div className="flex-grow h-[64px] overflow-hidden">
          <h3 className="font-bold text-white text-lg leading-tight">
            {achievement.displayName}
          </h3>
          {achievement.description && (
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">
              {achievement.description}
            </p>
          )}
        </div>
      </div>

      {/* Global Achievement Progress Bar */}
      <div className="px-4 pb-4 pt-2">
        <div className="text-xs text-gray-400 mb-1 flex justify-between">
          <span>Global Unlock Rate</span>
          <span className="font-semibold text-white">
            {clampedPercent.toFixed(2)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${clampedPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Hidden Achievement Indicator */}
      {achievement.hidden === 1 && (
        <div className="bg-gray-700 text-gray-400 text-xs py-1 px-4 flex items-center justify-end border-t border-gray-600">
          <EyeOff className="w-3 h-3 mr-1 text-gray-500" />{" "}
          {/* Using EyeOff for hidden */}
          Hidden Achievement
        </div>
      )}
    </div>
  );
};

export default AchievementCard;
