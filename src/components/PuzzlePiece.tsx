
import React, { useState, useEffect, useRef } from "react";
import { PuzzlePiece } from "@/utils/puzzleGameData";

interface PuzzlePieceProps {
  piece: PuzzlePiece;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDrag: (dx: number, dy: number) => void;
}

const PuzzlePieceComponent: React.FC<PuzzlePieceProps> = ({
  piece,
  onDragStart,
  onDragEnd,
  onDrag
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  
  // Handle mouse interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    if (piece.isCorrect) return; // Don't allow dragging if already correctly placed
    
    setIsDragging(true);
    lastPosition.current = { x: e.clientX, y: e.clientY };
    onDragStart();
    
    // Prevent default to avoid text selection during drag
    e.preventDefault();
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - lastPosition.current.x;
    const dy = e.clientY - lastPosition.current.y;
    
    onDrag(dx, dy);
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };
  
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd();
    }
  };
  
  // Handle touch interactions for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (piece.isCorrect) return; // Don't allow dragging if already correctly placed
    
    setIsDragging(true);
    const touch = e.touches[0];
    lastPosition.current = { x: touch.clientX, y: touch.clientY };
    onDragStart();
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const dx = touch.clientX - lastPosition.current.x;
    const dy = touch.clientY - lastPosition.current.y;
    
    onDrag(dx, dy);
    lastPosition.current = { x: touch.clientX, y: touch.clientY };
  };
  
  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd();
    }
  };
  
  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);
  
  // Determine border color based on feedback state
  let borderColor = 'transparent';
  if (piece.feedbackState === 'correct') {
    borderColor = '#22c55e'; // green-500
  } else if (piece.feedbackState === 'incorrect') {
    borderColor = '#ef4444'; // red-500
  }
  
  return (
    <div
      className={`absolute cursor-grab ${isDragging ? 'z-50 cursor-grabbing' : 'z-10'} 
                 transition-all duration-300 ${piece.isCorrect ? 'z-20' : ''}`}
      style={{
        width: `${piece.width}%`,
        height: `${piece.height}%`,
        left: `${piece.x}%`,
        top: `${piece.y}%`,
        transform: `${isDragging ? 'scale(1.05)' : 'scale(1)'}`,
        border: `3px solid ${borderColor}`,
        borderRadius: '4px',
        overflow: 'hidden',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div 
        className="w-full h-full overflow-hidden"
        style={{
          backgroundImage: `url('/images/${piece.imageName}.jpg')`,
          backgroundSize: `${piece.fullWidth}% ${piece.fullHeight}%`,
          backgroundPosition: `${piece.bgPositionX}% ${piece.bgPositionY}%`,
        }}
      />
    </div>
  );
};

export default PuzzlePieceComponent;
