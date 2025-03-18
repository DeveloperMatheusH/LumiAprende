
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, Clock, Smile, Heart, RotateCw } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import MemoryCard from "@/components/MemoryCard";
import ScoreDisplay from "@/components/ScoreDisplay";
import VolumeControl from "@/components/VolumeControl";
import FeedbackAnimation from "@/components/FeedbackAnimation";
import { generateMemoryCards, memoryGameLevels, MemoryCard as MemoryCardType } from "@/utils/memoryGameData";
import { playSuccessSound, playErrorSound } from "@/utils/gameData";

const MemoryGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(memoryGameLevels[0]);
  const [cards, setCards] = useState<MemoryCardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<MemoryCardType[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedbackState, setFeedbackState] = useState<"none" | "correct" | "incorrect">("none");
  const [showFeedback, setShowFeedback] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [achievementPoints, setAchievementPoints] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  // Initialize the game
  useEffect(() => {
    startNewGame();
  }, [currentLevel]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameActive && !gameComplete) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [gameActive, gameComplete]);

  const startNewGame = () => {
    const newCards = generateMemoryCards(currentLevel);
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameComplete(false);
    setTimer(0);
    setGameActive(true);
  };

  const handleCardClick = (clickedCard: MemoryCardType) => {
    if (flippedCards.length === 2) return;
    
    // Flip the card
    const updatedCards = cards.map(card => 
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);
    
    // Add to flipped cards
    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);
    
    // If this is the second card, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstCard, secondCard] = newFlippedCards;
      
      // Check for a match
      let isMatch = false;
      
      if (typeof firstCard.content === 'object' && typeof secondCard.content === 'object') {
        // Both are color objects
        isMatch = firstCard.content.name === secondCard.content.name;
      } else if (typeof firstCard.content === 'string' && typeof secondCard.content === 'object') {
        // First is text, second is color
        isMatch = secondCard.content.nameInPortuguese === firstCard.content;
      } else if (typeof firstCard.content === 'object' && typeof secondCard.content === 'string') {
        // First is color, second is text
        isMatch = firstCard.content.nameInPortuguese === secondCard.content;
      } else {
        // Both are strings
        isMatch = firstCard.content === secondCard.content;
      }
      
      if (isMatch) {
        // It's a match!
        setTimeout(() => {
          // Mark cards as matched
          const matchedCards = updatedCards.map(card => 
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isMatched: true }
              : card
          );
          setCards(matchedCards);
          setFlippedCards([]);
          setMatchedPairs(prev => {
            const newMatchedPairs = prev + 1;
            
            // If all pairs are matched, game is complete
            if (newMatchedPairs === currentLevel.pairsCount) {
              setGameComplete(true);
              setGameActive(false);
              
              // Award points based on level and moves
              const basePoints = currentLevel.pairsCount * 10;
              const bonusPoints = Math.max(0, 50 - moves);
              const levelPoints = (basePoints + bonusPoints);
              
              const newScore = score + levelPoints;
              setScore(newScore);
              
              // Check if score reached a multiple of 100
              if (Math.floor(newScore / 100) > Math.floor(score / 100)) {
                setAchievementPoints(Math.floor(newScore / 100) * 100);
                setTimeout(() => {
                  setShowCongratulations(true);
                }, 1000);
              }
            }
            
            return newMatchedPairs;
          });
          
          // Show success feedback
          setFeedbackState("correct");
          setShowFeedback(true);
          playSuccessSound();
          
          setTimeout(() => {
            setFeedbackState("none");
            setShowFeedback(false);
          }, 1000);
          
        }, 500);
      } else {
        // Not a match
        setTimeout(() => {
          // Flip cards back
          const resetCards = updatedCards.map(card => 
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(resetCards);
          setFlippedCards([]);
          
          // Show error feedback
          setFeedbackState("incorrect");
          setShowFeedback(true);
          playErrorSound();
          
          setTimeout(() => {
            setFeedbackState("none");
            setShowFeedback(false);
          }, 500);
        }, 1000);
      }
    }
  };

  // Format timer 
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-game-lightgray px-4 py-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-100 opacity-50"></div>
        <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-purple-100 opacity-50"></div>
        <div className="absolute bottom-10 -left-10 w-40 h-40 rounded-full bg-yellow-100 opacity-50"></div>
      </div>
      
      {/* Back button */}
      <Link 
        to="/select-game" 
        className="absolute top-4 left-4 glass-card p-2 rounded-full transition-all hover:bg-white/90"
      >
        <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
      </Link>
      
      {/* Volume Control */}
      <VolumeControl />
      
      {/* Score */}
      <ScoreDisplay score={score} />
      
      {/* Game status bar */}
      <div className="w-full max-w-md flex justify-between items-center mb-4 px-2">
        <div className="flex space-x-4">
          {/* Level selector */}
          <select 
            className="glass-card text-sm px-3 py-1 rounded-full"
            value={currentLevel.name}
            onChange={(e) => {
              const selectedLevel = memoryGameLevels.find(l => l.name === e.target.value);
              if (selectedLevel) {
                setCurrentLevel(selectedLevel);
              }
            }}
            disabled={gameActive}
          >
            {memoryGameLevels.map(level => (
              <option key={level.name} value={level.name}>{level.name}</option>
            ))}
          </select>
          
          {/* Moves counter */}
          <div className="glass-card text-sm px-3 py-1 rounded-full">
            <span className="font-medium">{moves}</span> jogadas
          </div>
        </div>
        
        {/* Timer */}
        <div className="glass-card text-sm px-3 py-1 rounded-full flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>{formatTime(timer)}</span>
        </div>
      </div>
      
      {/* Restart button */}
      <button 
        onClick={startNewGame}
        className="glass-card px-3 py-1 rounded-full flex items-center mb-4 hover:bg-white/90 transition-colors"
      >
        <RotateCw className="h-4 w-4 mr-1" />
        <span className="text-sm">Reiniciar</span>
      </button>
      
      {/* Memory cards grid */}
      <div className={`
        w-full max-w-md grid gap-2 px-2 mb-4
        ${currentLevel.pairsCount <= 6 ? 'grid-cols-3' : 'grid-cols-4'}
      `}>
        {cards.map(card => (
          <MemoryCard
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card)}
            disabled={card.isFlipped || card.isMatched || flippedCards.length === 2}
          />
        ))}
      </div>
      
      {/* Feedback animation */}
      <FeedbackAnimation 
        isCorrect={feedbackState === "correct"} 
        visible={showFeedback}
      />

      {/* Congratulations Dialog */}
      <Dialog open={showCongratulations} onOpenChange={setShowCongratulations}>
        <DialogContent className="bg-white rounded-xl p-6 max-w-md mx-auto text-center border-4 border-purple-300">
          <DialogTitle className="text-2xl font-bold text-purple-700 mb-4">
            Parabéns! <Smile className="inline-block ml-1 text-yellow-500" />
          </DialogTitle>
          <div className="py-4 text-lg text-gray-700">
            <p>Você chegou aos {achievementPoints} pontos, continue assim Pequeno(a) Lumi</p>
            <Heart className="inline-block ml-1 h-6 w-6 text-pink-500 mt-3" fill="#EC407A" />
          </div>
          <button 
            onClick={() => setShowCongratulations(false)}
            className="mt-4 bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition-colors font-medium"
          >
            Continuar Jogando
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemoryGame;
