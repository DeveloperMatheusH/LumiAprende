
import React from "react";
import { Check, X } from "lucide-react";

interface FeedbackAnimationProps {
  isCorrect: boolean;
  visible: boolean;
}

const FeedbackAnimation: React.FC<FeedbackAnimationProps> = ({
  isCorrect,
  visible
}) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className={`
          flex items-center justify-center rounded-full 
          w-24 h-24 ${isCorrect ? "bg-game-green" : "bg-game-red"}
          animate-bounce-in
        `}
      >
        {isCorrect ? (
          <Check className="text-white w-12 h-12" />
        ) : (
          <X className="text-white w-12 h-12" />
        )}
      </div>
    </div>
  );
};

export default FeedbackAnimation;
