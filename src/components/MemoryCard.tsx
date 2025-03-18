
import React from "react";
import { MemoryCard as MemoryCardType } from "@/utils/memoryGameData";
import { Color } from "@/utils/gameData";
import { cn } from "@/lib/utils";

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
  const isColor = card.type === "color" && typeof card.content !== "string";
  const colorValue = isColor ? (card.content as Color).value : "#FFFFFF";
  const colorName = isColor ? (card.content as Color).nameInPortuguese : (card.content as string);
  
  const frontClasses = cn(
    "absolute inset-0 flex items-center justify-center rounded-xl shadow-md",
    "backface-hidden transform transition-all duration-500",
    card.isFlipped ? "rotate-y-0" : "rotate-y-180",
    card.isMatched ? "opacity-50" : "opacity-100"
  );
  
  const backClasses = cn(
    "absolute inset-0 flex items-center justify-center rounded-xl bg-purple-600 shadow-md",
    "backface-hidden transform transition-all duration-500",
    card.isFlipped ? "rotate-y-180" : "rotate-y-0",
    "text-white text-2xl font-bold"
  );

  return (
    <div 
      className={`
        relative w-full aspect-square perspective-500 cursor-pointer
        transition-transform duration-300
        ${disabled ? "" : "hover:scale-[1.02] active:scale-[0.98]"}
        ${card.isMatched ? "opacity-60" : "opacity-100"}
      `}
      onClick={() => !disabled && !card.isFlipped && onClick()}
    >
      {/* Front of card - content */}
      <div className={frontClasses}>
        {card.type === "color" && (
          <div 
            className="w-full h-full rounded-xl flex items-center justify-center"
            style={{ backgroundColor: colorValue }}
          />
        )}
        
        {card.type === "text" && (
          <div className="w-full h-full rounded-xl bg-white flex items-center justify-center p-2">
            <p className="text-center font-bold text-lg">{colorName}</p>
          </div>
        )}
        
        {card.type === "image" && (
          <div className="w-full h-full rounded-xl bg-white">
            <img 
              src={`/images/${colorName.toLowerCase()}.jpg`} 
              alt={colorName}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        )}
      </div>
      
      {/* Back of card */}
      <div className={backClasses}>
        <span>?</span>
      </div>
    </div>
  );
};

export default MemoryCard;
