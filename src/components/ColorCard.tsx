
import React from "react";
import { Color } from "@/utils/gameData";

interface ColorCardProps {
  color: Color;
  isRevealing: boolean;
}

const ColorCard: React.FC<ColorCardProps> = ({ color, isRevealing }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`
          w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56
          rounded-2xl shadow-lg color-shadow
          flex items-center justify-center transition-all duration-700
          ${isRevealing ? "animate-bounce-in" : ""}
        `}
        style={{ backgroundColor: color.value }}
      />
      <div className="mt-4 mb-6">
        <div className="text-sm uppercase tracking-wider text-gray-500 animate-fade-in">
          Que cor é essa?
        </div>
      </div>
    </div>
  );
};

export default ColorCard;
