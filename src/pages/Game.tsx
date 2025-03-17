
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ColorCard from "@/components/ColorCard";
import OptionButton from "@/components/OptionButton";
import ScoreDisplay from "@/components/ScoreDisplay";
import VolumeControl from "@/components/VolumeControl";
import FeedbackAnimation from "@/components/FeedbackAnimation";
import { generateQuestion, playSuccessSound, playErrorSound, type Color } from "@/utils/gameData";
import { ArrowLeftIcon } from "lucide-react";

declare global {
  interface Window {
    bgMusic?: HTMLAudioElement;
  }
}

const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(generateQuestion());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<"none" | "correct" | "incorrect">("none");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isRevealing, setIsRevealing] = useState(true);

  const handleOptionSelect = (selectedColor: Color) => {
    if (feedbackState !== "none") return;
    
    setSelectedOption(selectedColor.name);
    
    if (selectedColor.name === question.correctColor.name) {
      // Correct answer
      setFeedbackState("correct");
      setShowFeedback(true);
      playSuccessSound();
      setScore(prevScore => prevScore + 10);
      
      // Reset and generate new question after a delay
      setTimeout(() => {
        setSelectedOption(null);
        setFeedbackState("none");
        setShowFeedback(false);
        setIsRevealing(false);
        
        setTimeout(() => {
          setQuestion(generateQuestion());
          setIsRevealing(true);
        }, 100);
      }, 1500);
    } else {
      // Incorrect answer
      setFeedbackState("incorrect");
      setShowFeedback(true);
      playErrorSound();
      
      // Allow trying again after a delay
      setTimeout(() => {
        setSelectedOption(null);
        setFeedbackState("none");
        setShowFeedback(false);
      }, 1000);
    }
  };

  // Iniciar a música de fundo
  useEffect(() => {
    if (!window.bgMusic) {
      window.bgMusic = new Audio('/bg-music.mp3');
      window.bgMusic.loop = true;
      
      // Carregar volume salvo
      const savedVolume = localStorage.getItem("bgMusicVolume");
      const savedMuted = localStorage.getItem("bgMusicMuted");
      
      window.bgMusic.volume = (savedMuted === "true") ? 0 : (savedVolume ? parseFloat(savedVolume) : 0.5);
    }
    
    window.bgMusic.play().catch(err => {
      console.log("Autoplay blocked. User interaction required to play audio.");
    });
    
    return () => {
      if (window.bgMusic) {
        window.bgMusic.pause();
      }
    };
  }, []);

  // Initial effect to set up the first question
  useEffect(() => {
    setQuestion(generateQuestion());
  }, []);

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
        to="/" 
        className="absolute top-4 left-4 glass-card p-2 rounded-full transition-all hover:bg-white/90"
      >
        <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
      </Link>
      
      {/* Volume Control */}
      <VolumeControl />
      
      {/* Score */}
      <ScoreDisplay score={score} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        {/* Color card */}
        <div className="mb-4 w-full flex justify-center">
          <ColorCard 
            color={question.correctColor} 
            isRevealing={isRevealing}
          />
        </div>
        
        {/* Options */}
        <div className="w-full grid grid-cols-2 gap-2 px-4">
          {question.options.map((color) => (
            <OptionButton
              key={color.name}
              color={color}
              isCorrect={color.name === question.correctColor.name}
              onClick={() => handleOptionSelect(color)}
              disabled={feedbackState !== "none"}
              feedbackState={
                feedbackState === "none"
                  ? "none"
                  : color.name === selectedOption
                    ? feedbackState
                    : "none"
              }
            />
          ))}
        </div>
      </div>
      
      {/* Feedback animation */}
      <FeedbackAnimation 
        isCorrect={feedbackState === "correct"} 
        visible={showFeedback}
      />
    </div>
  );
};

export default Game;
