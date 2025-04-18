import React from "react";
import { MemoryCard as MemoryCardType } from "@/utils/memoryGameData";
import { cn } from "@/lib/utils";
import { Apple } from "lucide-react";

interface MemoryCardProps {
  card: MemoryCardType;
  onClick: () => void;
  disabled: boolean;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  card,
  onClick,
  disabled
}) => {
  const frontClasses = cn(
    "absolute inset-0 flex items-center justify-center rounded-xl shadow-md",
    "backface-hidden transform transition-all duration-500",
    card.flipped ? "rotate-y-0" : "rotate-y-180",
    card.matched ? "opacity-50" : "opacity-100"
  );
  
  const backClasses = cn(
    "absolute inset-0 flex items-center justify-center rounded-xl bg-purple-600 shadow-md",
    "backface-hidden transform transition-all duration-500",
    card.flipped ? "rotate-y-180" : "rotate-y-0",
    "text-white text-2xl font-bold"
  );

  // Function to render fruit icon
  const renderFruitIcon = (size = 48) => {
    const { Icon, color } = card.content;
    return <Icon size={size} color={color} />;
  };

  return (
    <div 
      className={`
        relative w-full aspect-square perspective-500 cursor-pointer
        transition-transform duration-300
        ${disabled ? "" : "hover:scale-[1.02] active:scale-[0.98]"}
        ${card.matched ? "opacity-60" : "opacity-100"}
      `}
      onClick={() => !disabled && !card.flipped && onClick()}
    >
      {/* Front of card - content */}
      <div 
        className={frontClasses}
        style={{ 
          zIndex: card.flipped ? 1 : 0,
          backgroundColor: "white" // Ensure white background for all cards
        }}
      >
        <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
          {renderFruitIcon()}
        </div>
      </div>
      
      {/* Back of card */}
      <div 
        className={backClasses}
        style={{ 
          zIndex: card.flipped ? 0 : 1
        }}
      >
        <span>?</span>
      </div>
    </div>
  );
};

export default MemoryCard;
