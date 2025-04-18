
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Shuffle } from "lucide-react";
import { toast } from "sonner";
import OptionButton from '../OptionButton';
import ScoreDisplay from '../ScoreDisplay';
import FeedbackAnimation from '../FeedbackAnimation';
import { Color } from "@/utils/gameData";

interface ColorMatchingGameProps {
  onBack: () => void;
}

const ColorMatchingGame: React.FC<ColorMatchingGameProps> = ({ onBack }) => {
  const colors: Color[] = [
    { value: "#FF5252", nameInPortuguese: "Vermelho" },
    { value: "#4285F4", nameInPortuguese: "Azul" },
    { value: "#0F9D58", nameInPortuguese: "Verde" },
    { value: "#FFCB3E", nameInPortuguese: "Amarelo" },
    { value: "#7E57C2", nameInPortuguese: "Roxo" },
    { value: "#FF7043", nameInPortuguese: "Laranja" },
  ];
  
  const [currentColor, setCurrentColor] = useState<Color>({ value: "", nameInPortuguese: "" });
  const [options, setOptions] = useState<Color[]>([]);
  const [score, setScore] = useState<number>(0);
  const [round, setRound] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  
  const maxRounds = 10;
  
  useEffect(() => {
    startNewRound();
    setStartTime(Date.now());
  }, []);
  
  const shuffleColors = () => {
    return [...colors].sort(() => Math.random() - 0.5);
  };
  
  const startNewRound = () => {
    if (round >= maxRounds) {
      setGameOver(true);
      setElapsedTime((Date.now() - startTime) / 1000);
      return;
    }
    
    const shuffled = shuffleColors();
    const target = shuffled[0];
    
    // Get 3 random colors for options, including the target
    const optionsArray = [target];
    
    // Add 3 more unique colors
    let i = 1;
    while (optionsArray.length < 4 && i < shuffled.length) {
      if (shuffled[i].value !== target.value) {
        optionsArray.push(shuffled[i]);
      }
      i++;
    }
    
    // Shuffle the options
    const shuffledOptions = [...optionsArray].sort(() => Math.random() - 0.5);
    
    setCurrentColor(target);
    setOptions(shuffledOptions);
    setSelectedOption(null);
  };
  
  const handleOptionSelect = (color: Color) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(color.value);
    const correct = color.value === currentColor.value;
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
    setStartTime(Date.now());
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
        <h2 className="font-bubblegum text-xl text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
          Pareamento de Cores
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
      
      <div className="mb-6">
        <p className="text-center text-sm font-bubblegum mb-4">
          Selecione a cor que corresponde a:
        </p>
        <div 
          className="w-full h-20 rounded-xl mb-4 shadow-inner"
          style={{ backgroundColor: currentColor.value }}
        />
      </div>
      
      <div className="space-y-2 mb-4">
        {options.map((color, index) => (
          <OptionButton
            key={index}
            color={color}
            isCorrect={color.value === currentColor.value}
            onClick={() => handleOptionSelect(color)}
            disabled={selectedOption !== null}
            feedbackState={
              selectedOption === null
                ? "none"
                : selectedOption === color.value && isCorrect
                ? "correct"
                : selectedOption === color.value && !isCorrect
                ? "incorrect"
                : "none"
            }
          />
        ))}
      </div>
      
      <div className="text-center text-sm font-bubblegum">
        Rodada: {round}/{maxRounds}
      </div>
      
      <ScoreDisplay score={score} />
      
      {showFeedback && (
        <FeedbackAnimation isCorrect={isCorrect} visible={showFeedback} />
      )}
      
      {gameOver && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="bg-white p-6 rounded-lg text-center">
            <h3 className="font-bubblegum text-2xl mb-2">Jogo Completo!</h3>
            <p className="mb-2">Tempo: {elapsedTime.toFixed(1)} segundos</p>
            <p className="font-bold mb-4">Pontuação final: {score}</p>
            <Button onClick={resetGame} className="font-bubblegum">Jogar Novamente</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorMatchingGame;
