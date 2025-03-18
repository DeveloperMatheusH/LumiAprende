
import React from "react";
import { ColorImage } from "@/utils/imageGameData";
import { 
  Apple, Grape, Banana, Cloud, 
  Cherry, LucideProps, Flower, Cookie
} from "lucide-react";

interface ImageOptionCardProps {
  colorImage: ColorImage;
  onClick: () => void;
  disabled: boolean;
  feedbackState: "none" | "correct" | "incorrect";
}

const ImageOptionCard: React.FC<ImageOptionCardProps> = ({
  colorImage,
  onClick,
  disabled,
  feedbackState
}) => {
  let cardClasses = `
    relative overflow-hidden rounded-xl shadow-md transition-all duration-300
    w-full aspect-square mb-2 flex items-center justify-center bg-white
    ${disabled ? "opacity-70" : "opacity-100"}
    ${feedbackState === "correct" ? "ring-4 ring-game-green" : ""}
    ${feedbackState === "incorrect" ? "ring-4 ring-game-red" : ""}
    hover:scale-[1.02] active:scale-[0.98]
  `;

  // Render the appropriate icon based on the description
  const renderIcon = () => {
    const { color, description } = colorImage;
    const iconSize = 48;
    
    switch(color.name.toLowerCase()) {
      case "red":
        return <Apple size={iconSize} color={color.value} />;
      case "blue":
        return <Cloud size={iconSize} color={color.value} />;
      case "green":
        return <Banana size={iconSize} color={color.value} strokeWidth={1.5} />;
      case "yellow":
        return <Banana size={iconSize} color={color.value} />;
      case "purple":
        return <Grape size={iconSize} color={color.value} />;
      case "orange":
        return <Cherry size={iconSize} color={color.value} />;
      case "pink":
        return <Flower size={iconSize} color={color.value} />;
      case "brown":
        return <Cookie size={iconSize} color={color.value} />;
      default:
        return <Apple size={iconSize} color={color.value} />;
    }
  };

  return (
    <button
      className={cardClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {renderIcon()}
      
      {/* Feedback overlay */}
      {feedbackState === "correct" && (
        <div className="absolute inset-0 bg-green-500/30 flex items-center justify-center">
          <div className="bg-white rounded-full p-2">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
      
      {feedbackState === "incorrect" && (
        <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center">
          <div className="bg-white rounded-full p-2">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      )}
    </button>
  );
};

export default ImageOptionCard;
