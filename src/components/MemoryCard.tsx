
import React from "react";
import { MemoryCard as MemoryCardType } from "@/utils/memoryGameData";
import { Color } from "@/utils/gameData";
import { cn } from "@/lib/utils";
import { 
  Banana, Apple, Grape, Cherry, Cloud, Cookie, Flower
} from "lucide-react";

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
  const colorName = isColor 
    ? (card.content as Color).nameInPortuguese 
    : typeof card.content === "string" 
      ? card.content 
      : (card.content as Color).nameInPortuguese;
  
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

  // Function to render fruit icon based on color name
  const renderFruitIcon = (color: Color | string, size = 48) => {
    // Get the color name for comparison
    const colorNameForIcon = typeof color === 'string' 
      ? color 
      : color.nameInPortuguese;
    
    // Safety check to ensure we have a string before calling toLowerCase
    const safeColorName = typeof colorNameForIcon === 'string' 
      ? colorNameForIcon.toLowerCase() 
      : '';
    
    switch(safeColorName) {
      case "amarelo":
        return <Banana size={size} color="#FFCB3E" />;
      case "vermelho":
        return <Apple size={size} color="#FF5252" />;
      case "roxo":
        return <Grape size={size} color="#7E57C2" />;
      case "laranja":
        return <Cherry size={size} color="#FF7043" />;
      case "verde":
        return <Banana size={size} color="#0F9D58" />;
      case "rosa":
        return <Cherry size={size} color="#EC407A" />;
      case "azul":
        return <Cloud size={size} color="#4285F4" />;
      case "marrom":
        return <Cookie size={size} color="#795548" />;
      case "ciano":
        return <Cloud size={size} color="#00BCD4" />;
      case "cinza":
        return <Cookie size={size} color="#9E9E9E" />;
      default:
        return <Flower size={size} color={colorValue} />;
    }
  };

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
      <div 
        className={frontClasses}
        style={{ 
          zIndex: card.isFlipped ? 1 : 0,
          backgroundColor: "white" // Ensure white background for all cards
        }}
      >
        {card.type === "color" && typeof card.content !== "string" && (
          <div 
            className="w-full h-full rounded-xl flex items-center justify-center"
            style={{ backgroundColor: (card.content as Color).value }}
          />
        )}
        
        {card.type === "text" && (
          <div className="w-full h-full rounded-xl bg-white flex items-center justify-center p-2">
            <p className="text-center font-bold text-lg">{colorName}</p>
          </div>
        )}
        
        {card.type === "image" && (
          <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
            {renderFruitIcon(card.content)}
          </div>
        )}
      </div>
      
      {/* Back of card */}
      <div 
        className={backClasses}
        style={{ 
          zIndex: card.isFlipped ? 0 : 1
        }}
      >
        <span>?</span>
      </div>
    </div>
  );
};

export default MemoryCard;
