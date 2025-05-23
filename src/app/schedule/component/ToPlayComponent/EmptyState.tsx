import { List } from "lucide-react";

export const EmptyState = () => (
  <div className="text-center py-12">
    <List className="mx-auto mb-4 text-gray-500" size={48} />
    <p className="text-gray-400 text-lg">
      No games in your to-play list yet
    </p>
    <p className="text-gray-500 text-sm mt-2">
      Add some games to get started!
    </p>
  </div>
);