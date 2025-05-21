import {
  CheckCircle,
  Clock,
  Flame,
  Gamepad2,
  Hash,
  Info,
  Star,
  Target,
  Users
} from "lucide-react";

// Helper function to get icon based on stat name
const getStatIcon = (statName: string) => {
  if (statName.includes("GamesPlayed"))
    return <Gamepad2 className="w-5 h-5 text-blue-400" />;
  if (statName.includes("PlayTime"))
    return <Clock className="w-5 h-5 text-green-400" />;
  if (statName.includes("Total") && !statName.includes("PlayTime"))
    return <Hash className="w-5 h-5 text-purple-400" />; // Specific for generic 'Total'
  if (statName.includes("Finished") || statName.includes("Completed"))
    return <CheckCircle className="w-5 h-5 text-emerald-400" />;
  if (statName.includes("Kills") || statName.includes("Damage"))
    return <Flame className="w-5 h-5 text-red-400" />;
  if (statName.includes("Accuracy"))
    return <Target className="w-5 h-5 text-yellow-400" />;
  if (statName.includes("Friends") || statName.includes("Players"))
    return <Users className="w-5 h-5 text-indigo-400" />;
  if (statName.includes("Score"))
    return <Star className="w-5 h-5 text-orange-400" />;
  if (statName.includes("Time"))
    return <Clock className="w-5 h-5 text-green-400" />; // Catch all for time related
  // Add more mappings as needed
  return <Info className="w-5 h-5 text-gray-400" />; // Default icon
};

// Function to clean up stat name for better readability
const cleanStatName = (name: string) => {
  return name
    .replace(/Stat\./g, "")
    .replace(/\.Total/g, "")
    .replace(/\./g, " ")
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .trim();
};

const GameStatComponent = ({
  stat,
}: {
  stat: {
    name: string;
    value: number;
  }[];
}) => {
  if (!stat || stat.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400 text-lg">
        <p>No detailed statistics available for this game.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Game Statistics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stat.map((s, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-4 shadow-md
                       flex flex-col justify-between transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500"
          >
            <div className="flex items-center mb-2">
              {getStatIcon(s.name)}
              <p className="text-gray-400 text-sm ml-2 uppercase tracking-wide line-clamp-2">
                {" "}
                {/* Added line-clamp-2 for text overflow */}
                {cleanStatName(s.name)}
              </p>
            </div>
            <p className="text-white text-3xl font-extrabold mt-auto">
              {" "}
              {s.value.toLocaleString()} {/* Format numbers for readability */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameStatComponent;
