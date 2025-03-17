
import React from "react";
import { Color } from "@/utils/gameData";

interface OptionButtonProps {
  color: Color;
  isCorrect: boolean;
  onClick: () => void;
  disabled: boolean;
  feedbackState: "none" | "correct" | "incorrect";
}

const OptionButton: React.FC<OptionButtonProps> = ({
  color,
  isCorrect,
  onClick,
  disabled,
  feedbackState
}) => {
  let buttonClasses = `
    option-button w-full p-2 rounded-xl text-center font-medium text-md 
    mb-2 transition-all duration-300 btn-hover
    ${disabled ? "opacity-70" : "opacity-100"}
    border-2
  `;

  // Add border color based on the color name
  buttonClasses += ` border-[${color.value}]`;

  if (feedbackState === "correct") {
    buttonClasses += " bg-game-green text-white correct-answer";
  } else if (feedbackState === "incorrect" && !isCorrect) {
    buttonClasses += " bg-game-red text-white incorrect-answer";
  } else {
    buttonClasses += " glass-card text-gray-800";
  }

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      style={{ borderColor: color.value }}
    >
      {color.nameInPortuguese}
    </button>
  );
};

export default OptionButton;
