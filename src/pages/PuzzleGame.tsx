
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, Award } from "lucide-react";
import { generatePuzzle, PuzzlePiece } from "@/utils/puzzleGameData";
import { Button } from "@/components/ui/button";
import PuzzleBoard from "@/components/PuzzleBoard";
import PuzzlePieceComponent from "@/components/PuzzlePiece";

const PuzzleGame = () => {
  const [puzzle, setPuzzle] = useState<PuzzlePiece[]>([]);
  const [showCompleteImage, setShowCompleteImage] = useState(true);
  const [gameComplete, setGameComplete] = useState(false);
  const [currentPieceIndex, setCurrentPieceIndex] = useState<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState("lion");
  const [gridSize, setGridSize] = useState(2); // Default to 2x2 grid (4 pieces)
  
  // Available images
  const availableImages = ["lion", "tiger", "giraffe", "dinosaur"];
  
  // Generate a new puzzle
  useEffect(() => {
    console.log("Generating new puzzle with image:", currentImage);
    // Show the complete image for 3 seconds before starting the game
    const timer = setTimeout(() => {
      setShowCompleteImage(false);
      // Generate puzzle with specified grid size
      setPuzzle(generatePuzzle(currentImage, gridSize));
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [currentImage, gridSize]);
  
  // Check if the game is complete
  useEffect(() => {
    if (puzzle.length > 0 && puzzle.every(piece => piece.isCorrect)) {
      setGameComplete(true);
    }
  }, [puzzle]);
  
  const handleDragStart = (index: number) => {
    setCurrentPieceIndex(index);
  };
  
  const handleDragEnd = () => {
    if (currentPieceIndex === null) return;
    
    // If the piece is already placed correctly, don't do anything
    if (puzzle[currentPieceIndex].isCorrect) {
      setCurrentPieceIndex(null);
      return;
    }
    
    // Check if the piece is dropped in the correct position
    const updatedPuzzle = [...puzzle];
    const piece = updatedPuzzle[currentPieceIndex];
    
    // Now we need to determine if the piece is placed correctly
    const isCorrect = piece.isCorrectlyPositioned;
    
    // Update the piece
    updatedPuzzle[currentPieceIndex] = {
      ...piece,
      isCorrect,
      feedbackState: isCorrect ? "correct" : "incorrect"
    };
    
    setPuzzle(updatedPuzzle);
    
    // Reset feedback after 3 seconds
    setTimeout(() => {
      const resetFeedback = [...updatedPuzzle];
      resetFeedback[currentPieceIndex] = {
        ...resetFeedback[currentPieceIndex],
        feedbackState: "none",
        // If piece was incorrect, return it to the original position
        ...(isCorrect ? {} : { x: piece.originalX, y: piece.originalY })
      };
      setPuzzle(resetFeedback);
    }, 3000);
    
    setCurrentPieceIndex(null);
  };
  
  const handleDrag = (dx: number, dy: number) => {
    if (currentPieceIndex === null || !boardRef.current) return;
    
    const updatedPuzzle = [...puzzle];
    const piece = updatedPuzzle[currentPieceIndex];
    
    // Convert pixel movement to percentage of board width/height
    const boardRect = boardRef.current.getBoundingClientRect();
    const dxPercent = (dx / boardRect.width) * 100;
    const dyPercent = (dy / boardRect.height) * 100;
    
    updatedPuzzle[currentPieceIndex] = {
      ...piece,
      x: piece.x + dxPercent,
      y: piece.y + dyPercent
    };
    
    setPuzzle(updatedPuzzle);
  };
  
  const handlePieceOver = (targetIndex: number) => {
    if (currentPieceIndex === null) return;
    
    const updatedPuzzle = [...puzzle];
    const currentPiece = updatedPuzzle[currentPieceIndex];
    
    // Check if the piece is being dragged over its correct position
    if (currentPiece.correctIndex === targetIndex) {
      updatedPuzzle[currentPieceIndex] = {
        ...currentPiece,
        isCorrectlyPositioned: true
      };
    } else {
      updatedPuzzle[currentPieceIndex] = {
        ...currentPiece,
        isCorrectlyPositioned: false
      };
    }
    
    setPuzzle(updatedPuzzle);
  };
  
  const resetGame = () => {
    setGameComplete(false);
    setShowCompleteImage(true);
    setPuzzle([]);
    
    // Change grid size randomly between 2x2 and 2x3
    setGridSize(Math.random() > 0.5 ? 2 : 3);
    
    // Change the image for the next game - randomly select from available images
    const nextImageIndex = Math.floor(Math.random() * availableImages.length);
    setCurrentImage(availableImages[nextImageIndex]);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[#E0EAF6] px-4 py-8 relative">
      {/* Back button */}
      <Link 
        to="/select-game" 
        className="absolute top-4 left-4 glass-card p-2 rounded-full transition-all hover:bg-white/90"
      >
        <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
      </Link>
      
      <h1 className="font-bubblegum text-3xl text-center mb-4 text-purple-700">
        Quebra-Cabeça
      </h1>
      
      {showCompleteImage ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-8 shadow-xl">
            <p className="font-bubblegum text-gray-600 mb-4 text-center">
              Observe a imagem com atenção!
            </p>
            <div className="w-full max-w-md aspect-square mb-4 rounded-xl overflow-hidden">
              <img 
                src={`/images/${currentImage}.jpg`} 
                alt="Imagem completa do quebra-cabeça" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ) : gameComplete ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
                <Award className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="font-bubblegum text-2xl text-center mb-4">Parabéns!</h2>
            <p className="font-bubblegum text-gray-600 mb-6 text-center">
              Você completou o quebra-cabeça!
            </p>
            <div className="w-full max-w-md aspect-square mb-6 rounded-xl overflow-hidden">
              <img 
                src={`/images/${currentImage}.jpg`} 
                alt="Imagem completa do quebra-cabeça" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-center">
              <Button 
                onClick={resetGame}
                className="font-bubblegum bg-gradient-to-r from-blue-500 to-purple-600 
                        text-white font-medium rounded-xl px-10 py-3
                        transition-all duration-300 shadow-md
                        hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
              >
                Jogar Novamente
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-md relative">
            <PuzzleBoard
              ref={boardRef}
              onPieceOver={handlePieceOver}
              image={currentImage}
              gridSize={gridSize}
            >
              {puzzle.map((piece, index) => (
                <PuzzlePieceComponent
                  key={index}
                  piece={piece}
                  onDragStart={() => handleDragStart(index)}
                  onDragEnd={handleDragEnd}
                  onDrag={handleDrag}
                />
              ))}
            </PuzzleBoard>
          </div>
        </div>
      )}
    </div>
  );
};

export default PuzzleGame;
