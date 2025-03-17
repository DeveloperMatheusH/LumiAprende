
import React from "react";
import { Check, X, Star, Frown } from "lucide-react";

interface FeedbackAnimationProps {
  isCorrect: boolean;
  visible: boolean;
}

const FeedbackAnimation: React.FC<FeedbackAnimationProps> = ({
  isCorrect,
  visible
}) => {
  if (!visible) return null;

  if (isCorrect) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="
            flex items-center justify-center rounded-full 
            w-24 h-24 bg-game-green
            animate-bounce-in
          "
        >
          <Check className="text-white w-12 h-12" />
        </div>
        
        {/* Fireworks animation */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-firework"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            >
              <Star 
                className="text-yellow-400 animate-pulse-scale" 
                fill="currentColor" 
                size={Math.random() * 16 + 8}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div
          className="
            flex flex-col items-center justify-center rounded-full 
            w-24 h-24 bg-game-red
            animate-bounce-in
            mb-3
          "
        >
          <Frown className="text-white w-12 h-12" />
        </div>
        <div className="text-gray-700 font-medium text-center px-6 py-2 rounded-lg bg-white/80 animate-fade-in">
          Tente novamente, você consegue dessa vez!
        </div>
      </div>
    );
  }
};

export default FeedbackAnimation;
