
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
          w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72
          rounded-2xl shadow-lg color-shadow
          flex items-center justify-center transition-all duration-700
          ${isRevealing ? "animate-bounce-in" : ""}
        `}
        style={{ backgroundColor: color.value }}
      />
      <div className="mt-6 mb-10">
        <div className="text-sm uppercase tracking-wider text-gray-500 animate-fade-in">
          Que cor é essa?
        </div>
      </div>
    </div>
  );
};

export default ColorCard;
