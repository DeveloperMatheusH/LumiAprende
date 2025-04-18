
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Shuffle } from "lucide-react";
import { toast } from "sonner";
import ScoreDisplay from '../ScoreDisplay';
import FeedbackAnimation from '../FeedbackAnimation';

interface ImagePair {
  id: number;
  image: string;
  word: string;
}

interface ImageAssociationGameProps {
  onBack: () => void;
}

const ImageAssociationGame: React.FC<ImageAssociationGameProps> = ({ onBack }) => {
  const imagePairs: ImagePair[] = [
    { id: 1, image: "🍎", word: "Maçã" },
    { id: 2, image: "🍌", word: "Banana" },
    { id: 3, image: "🐱", word: "Gato" },
    { id: 4, image: "🐶", word: "Cachorro" },
    { id: 5, image: "🚗", word: "Carro" },
    { id: 6, image: "🏠", word: "Casa" },
    { id: 7, image: "🌞", word: "Sol" },
    { id: 8, image: "🌙", word: "Lua" },
  ];
  
  const [targetImage, setTargetImage] = useState<ImagePair | null>(null);
  const [wordOptions, setWordOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [round, setRound] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  
  const maxRounds = 8;
  
  useEffect(() => {
    startNewRound();
  }, []);
  
  const shuffle = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };
  
  const startNewRound = () => {
    if (round >= maxRounds) {
      setGameOver(true);
      return;
    }
    
    const shuffledPairs = shuffle(imagePairs);
    const target = shuffledPairs[round];
    
    // Get 3 random words for options, including the target
    const options = [target.word];
    
    // Add 3 more unique words
    const wordPool = shuffledPairs.filter(pair => pair.id !== target.id).map(pair => pair.word);
    const randomWords = shuffle(wordPool).slice(0, 3);
    options.push(...randomWords);
    
    // Shuffle the options
    const shuffledOptions = shuffle(options);
    
    setTargetImage(target);
    setWordOptions(shuffledOptions);
    setSelectedOption(null);
  };
  
  const handleOptionSelect = (word: string) => {
    if (selectedOption !== null || !targetImage) return;
    
    setSelectedOption(word);
    const correct = word === targetImage.word;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 10);
      toast.success("Correto!");
    } else {
      toast.error("Incorreto. Tente novamente!");
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      setRound(prev => prev + 1);
      startNewRound();
    }, 1500);
  };
  
  const resetGame = () => {
    setScore(0);
    setRound(0);
    setGameOver(false);
    startNewRound();
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
        <h2 className="font-bubblegum text-xl text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">
          Associação de Imagens
        </h2>
        <Button 
          variant="outline"
          size="sm"
          className="font-bubblegum"
          onClick={resetGame}
        >
          <Shuffle className="mr-1" size={16} />
          Reiniciar
        </Button>
      </div>
      
      {targetImage && (
        <>
          <div className="mb-6">
            <p className="text-center text-sm font-bubblegum mb-4">
              Qual é o nome correto para esta imagem?
            </p>
            <div className="w-full h-32 rounded-xl mb-4 flex items-center justify-center bg-white/50 text-6xl">
              {targetImage.image}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {wordOptions.map((word, index) => (
              <Button
                key={index}
                className={`font-bubblegum transition-all h-16 ${
                  selectedOption === word
                    ? word === targetImage.word
                      ? "bg-game-green text-white"
                      : "bg-game-red text-white"
                    : "bg-white/60 hover:bg-white/80 text-gray-800 border border-gray-200"
                }`}
                onClick={() => handleOptionSelect(word)}
                disabled={selectedOption !== null}
              >
                {word}
              </Button>
            ))}
          </div>
        </>
      )}
      
      <div className="text-center text-sm font-bubblegum">
        Rodada: {round + 1}/{maxRounds}
      </div>
      
      <ScoreDisplay score={score} />
      
      {showFeedback && (
        <FeedbackAnimation isCorrect={isCorrect} visible={showFeedback} />
      )}
      
      {gameOver && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="bg-white p-6 rounded-lg text-center">
            <h3 className="font-bubblegum text-2xl mb-2">Jogo Completo!</h3>
            <p className="font-bold mb-4">Pontuação final: {score}</p>
            <Button onClick={resetGame} className="font-bubblegum">Jogar Novamente</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageAssociationGame;
