import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, Smile, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ImageOptionCard from "@/components/ImageOptionCard";
import ScoreDisplay from "@/components/ScoreDisplay";
import VolumeControl from "@/components/VolumeControl";
import FeedbackAnimation from "@/components/FeedbackAnimation";
import { generateImageQuestion } from "@/utils/imageGameData";
import { playSuccessSound, playErrorSound } from "@/utils/gameData";
import { 
  Apple, Grape, Banana, Cloud, 
  Cherry, Flower, Cookie, Citrus
} from "lucide-react";

const ImageGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(generateImageQuestion());
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [feedbackState, setFeedbackState] = useState<"none" | "correct" | "incorrect">("none");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isRevealing, setIsRevealing] = useState(true);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [achievementPoints, setAchievementPoints] = useState(0);

  const handleOptionSelect = (index: number) => {
    if (feedbackState !== "none") return;
    
    setSelectedOptionIndex(index);
    const selectedOption = question.options[index];
    
    if (selectedOption.name === question.correctImage.color.name) {
      // Correct answer
      setFeedbackState("correct");
      setShowFeedback(true);
      playSuccessSound();
      
      // Update score
      const newScore = score + 10;
      setScore(newScore);
      
      // Check if score reached a multiple of 100
      if (newScore % 100 === 0) {
        setAchievementPoints(newScore);
        setShowCongratulations(true);
      }
      
      // Reset and generate new question after a delay
      setTimeout(() => {
        setSelectedOptionIndex(null);
        setFeedbackState("none");
        setShowFeedback(false);
        setIsRevealing(false);
        
        setTimeout(() => {
          setQuestion(generateImageQuestion());
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
        setSelectedOptionIndex(null);
        setFeedbackState("none");
        setShowFeedback(false);
      }, 1000);
    }
  };

  // Function to render fruit icon based on color name
  const renderFruitIcon = () => {
    const { correctImage } = question;
    const iconSize = 72;
    
    switch(correctImage.color.name.toLowerCase()) {
      case "red":
        return <Apple size={iconSize} color={correctImage.color.value} strokeWidth={1.5} />;
      case "blue":
        return <Cloud size={iconSize} color={correctImage.color.value} strokeWidth={1.5} />;
      case "green":
        return <Banana size={iconSize} color={correctImage.color.value} strokeWidth={1.5} />;
      case "yellow":
        return <Banana size={iconSize} color={correctImage.color.value} strokeWidth={1.5} />;
      case "purple":
        return <Grape size={iconSize} color={correctImage.color.value} strokeWidth={1.5} />;
      case "orange":
        return <Cherry size={iconSize} color={correctImage.color.value} strokeWidth={1.5} />;
      case "pink":
        return <Flower size={iconSize} color={correctImage.color.value} strokeWidth={1.5} />;
      case "brown":
        return <Cookie size={iconSize} color={correctImage.color.value} strokeWidth={1.5} />;
      default:
        return <Citrus size={iconSize} color={correctImage.color.value} strokeWidth={1.5} />;
    }
  };

  // Initialize background music from the Game component
  useEffect(() => {
    if (window.bgMusic) {
      window.bgMusic.play().catch(err => {
        console.log("Autoplay blocked. User interaction required to play audio.");
      });
    }
    
    return () => {
      if (window.bgMusic) {
        window.bgMusic.pause();
      }
    };
  }, []);

  // Initial effect to set up the first question
  useEffect(() => {
    setQuestion(generateImageQuestion());
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
        to="/select-game" 
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
        {/* Fruit Icon */}
        <div className="mb-4 w-full flex justify-center">
          <div 
            className={`w-32 h-32 rounded-xl flex items-center justify-center bg-white shadow-lg ${isRevealing ? 'animate-scale-in' : ''}`}
          >
            {renderFruitIcon()}
          </div>
        </div>
        
        {/* Instructions */}
        <div className="text-center mb-6">
          <p className="text-gray-700 font-medium">Selecione a cor que corresponde ao ícone acima:</p>
        </div>
        
        {/* Color options */}
        <div className="w-full grid grid-cols-2 gap-3 px-4">
          {question.options.map((color, index) => (
            <ImageOptionCard
              key={color.name}
              color={color}
              onClick={() => handleOptionSelect(index)}
              disabled={feedbackState !== "none"}
              feedbackState={
                feedbackState === "none"
                  ? "none"
                  : index === selectedOptionIndex
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

export default ImageGame;
