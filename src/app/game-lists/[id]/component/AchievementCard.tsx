import Image from "next/image";
import { EyeOff } from "lucide-react"; // Using EyeOff for hidden
import { SteamAchievement } from "@/types";

const AchievementCard = ({ achievement }: { achievement: SteamAchievement }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-md p-3 flex items-start gap-3 transition-colors duration-200 hover:bg-gray-700">
      {/* Icon */}
      <div className="flex-shrink-0 w-14 h-14 relative mt-1">
        <Image
          src={achievement.icon}
          alt={`${achievement.displayName} icon`}
          layout="fill"
          className="rounded-sm"
        />
      </div>

      {/* Content */}
      <div className="flex-grow min-w-0">
        <h3 className="font-semibold text-white text-base truncate">
          {achievement.displayName}
        </h3>
        {achievement.description && (
          <p className="text-gray-400 text-xs mt-1 truncate">
            {achievement.description}
          </p>
        )}
        {achievement.hidden === 1 && (
          <p className="text-orange-400 text-xs mt-2 flex items-center gap-1">
            <EyeOff className="w-3 h-3" />
            Hidden
          </p>
        )}
      </div>
    </div>
  );
};

export default AchievementCard;