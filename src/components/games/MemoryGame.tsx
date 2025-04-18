
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "sonner";
import ScoreDisplay from '../ScoreDisplay';
import FeedbackAnimation from '../FeedbackAnimation';

interface MemoryCard {
  id: number;
  content: string;
  flipped: boolean;
  matched: boolean;
}

interface MemoryGameProps {
  onBack: () => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onBack }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  
  // Emoji pairs to use for cards
  const emojis = ['🍎', '🍌', '🍓', '🍉', '🍇', '🍒', '🥑', '🥕'];
  
  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);
  
  const initializeGame = () => {
    // Create pairs of cards with emojis
    const cardPairs = emojis.flatMap((emoji, index) => [
      { id: index * 2, content: emoji, flipped: false, matched: false },
      { id: index * 2 + 1, content: emoji, flipped: false, matched: false }
    ]);
    
    // Shuffle cards
    const shuffledCards = [...cardPairs].sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setScore(0);
    setMoves(0);
    setGameOver(false);
  };
  
  const handleCardClick = (id: number) => {
    // Don't allow flipping if already flipped, matched, or two cards are already flipped
    if (isDisabled || cards[id].flipped || cards[id].matched || flippedCards.length === 2) {
      return;
    }
    
    // Flip the card
    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);
    
    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // If this is the second card flipped, check for a match
    if (newFlippedCards.length === 2) {
      setIsDisabled(true);
      setMoves(prev => prev + 1);
      
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards[firstCardId];
      const secondCard = cards[secondCardId];
      
      // Check if the cards match
      if (firstCard.content === secondCard.content) {
        // Match found
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstCardId].matched = true;
          updatedCards[secondCardId].matched = true;
          setCards(updatedCards);
          setFlippedCards([]);
          setMatchedPairs(prev => prev + 1);
          setScore(prev => prev + 10);
          setIsCorrect(true);
          setShowFeedback(true);
          setTimeout(() => setShowFeedback(false), 1000);
          setIsDisabled(false);
          
          // Check if game is over
          if (matchedPairs + 1 === emojis.length) {
            setGameOver(true);
            toast.success("Parabéns! Você encontrou todos os pares!");
          }
        }, 800);
      } else {
        // No match
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[firstCardId].flipped = false;
          updatedCards[secondCardId].flipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
          setIsCorrect(false);
          setShowFeedback(true);
          setTimeout(() => setShowFeedback(false), 1000);
          setIsDisabled(false);
        }, 800);
      }
    }
  };
  
  const resetGame = () => {
    initializeGame();
  };
  
  return (
    <div className="relative">
      <div className="mb-4 flex justify-between items-center">
        <Button 
          variant="outline"
          size="sm"
          className="font-bubblegum"
          onClick={onBack}
        >
          <ArrowLeftIcon className="mr-1" size={16} />
          Voltar
        </Button>
        <h2 className="font-bubblegum text-xl text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
          Jogo da Memória
        </h2>
        <Button 
          variant="outline"
          size="sm"
          className="font-bubblegum"
          onClick={resetGame}
        >
          Reiniciar
        </Button>
      </div>
      
      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 transform ${
              card.flipped ? 'bg-white scale-100' : 'bg-gradient-to-r from-pink-500 to-purple-600 scale-95'
            } ${card.matched ? 'bg-green-200' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.flipped && (
              <span className="text-2xl">{card.content}</span>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between text-sm font-medium">
        <div>Movimentos: {moves}</div>
        <div>Pares: {matchedPairs}/{emojis.length}</div>
      </div>
      
      <ScoreDisplay score={score} />
      
      {showFeedback && (
        <FeedbackAnimation isCorrect={isCorrect} visible={showFeedback} />
      )}
      
      {gameOver && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="bg-white p-6 rounded-lg text-center">
            <h3 className="font-bubblegum text-2xl mb-2">Parabéns!</h3>
            <p className="mb-4">Você completou o jogo com {moves} movimentos!</p>
            <p className="font-bold mb-4">Pontuação final: {score}</p>
            <Button onClick={resetGame} className="font-bubblegum">Jogar Novamente</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
