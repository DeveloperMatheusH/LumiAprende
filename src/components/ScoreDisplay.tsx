
import React from "react";

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="absolute top-4 right-4 glass-card rounded-full px-3 py-1 text-xs font-medium">
      <span className="text-gray-600">Pontuação:</span>{" "}
      <span className="text-gray-900 font-bold">{score}</span>
    </div>
  );
};

export default ScoreDisplay;
