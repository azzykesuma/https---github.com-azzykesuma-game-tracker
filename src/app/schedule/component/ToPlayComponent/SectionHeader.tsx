import { Button } from "@/components/ui/button";
import { List, Plus } from "lucide-react";

export const SectionHeader = ({ onAddClick }: { onAddClick: () => void }) => (
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-4xl font-bold text-blue-400 flex items-center drop-shadow-[0_0_8px_rgba(0,191,255,0.5)]">
      <List className="mr-4" size={40} />
      To Play
    </h2>
    <Button 
      onClick={onAddClick} 
      variant="ghost" 
      className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
    >
      <Plus size={20} />
      Add Game
    </Button>
  </div>
);