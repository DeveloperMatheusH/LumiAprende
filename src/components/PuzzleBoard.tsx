
import React, { forwardRef } from "react";

interface PuzzleBoardProps {
  children: React.ReactNode;
  onPieceOver: (index: number) => void;
  image: string;
}

const PuzzleBoard = forwardRef<HTMLDivElement, PuzzleBoardProps>(
  ({ children, onPieceOver, image }, ref) => {
    // We create placeholders based on a 2x2 or 2x3 grid depending on difficulty
    const gridSize = Math.random() > 0.5 ? 2 : 3;
    const placeholders = [];

    for (let i = 0; i < (gridSize === 2 ? 4 : 6); i++) {
      placeholders.push(
        <div
          key={`placeholder-${i}`}
          className="placeholder border-2 border-dashed border-gray-300 rounded-md"
          data-index={i}
          onMouseOver={() => onPieceOver(i)}
          style={{
            width: `${100 / gridSize}%`,
            height: `${100 / (gridSize === 2 ? 2 : 3)}%`,
            position: "absolute",
            top: `${Math.floor(i / gridSize) * (100 / (gridSize === 2 ? 2 : 3))}%`,
            left: `${(i % gridSize) * (100 / gridSize)}%`,
          }}
        />
      );
    }

    return (
      <div className="relative w-full" ref={ref}>
        <div className="w-full aspect-square bg-white/80 rounded-xl shadow-lg overflow-hidden relative mb-4">
          {/* Background image with reduced opacity */}
          <div className="absolute inset-0 opacity-10">
            <img
              src={`/images/${image}.jpg`}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Placeholders */}
          {placeholders}
          
          {/* Puzzle pieces */}
          {children}
        </div>
      </div>
    );
  }
);

PuzzleBoard.displayName = "PuzzleBoard";

export default PuzzleBoard;
