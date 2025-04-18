
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MemoryGame from "@/components/games/MemoryGame";
import ColorMatchingGame from "@/components/games/ColorMatchingGame";
import ImageAssociationGame from "@/components/games/ImageAssociationGame";

type GameType = "memory" | "colorMatching" | "imageAssociation" | null;

const Jogo = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<GameType>(null);
  
  const renderSelectedGame = () => {
    switch(selectedGame) {
      case "memory":
        return <MemoryGame onBack={() => setSelectedGame(null)} />;
      case "colorMatching":
        return <ColorMatchingGame onBack={() => setSelectedGame(null)} />;
      case "imageAssociation":
        return <ImageAssociationGame onBack={() => setSelectedGame(null)} />;
      default:
        return (
          <div className="space-y-4">
            <h1 className="font-bubblegum text-3xl text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Escolha seu Jogo
            </h1>
            
            <p className="font-bubblegum text-gray-600 mb-6 text-center">
              Selecione um dos jogos educativos abaixo para começar a brincar e aprender!
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <Button 
                className="w-full font-bubblegum py-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                onClick={() => setSelectedGame("memory")}
              >
                Jogo da Memória
              </Button>
              
              <Button 
                className="w-full font-bubblegum py-6 bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90"
                onClick={() => setSelectedGame("colorMatching")}
              >
                Pareamento de Cores
              </Button>
              
              <Button 
                className="w-full font-bubblegum py-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90"
                onClick={() => setSelectedGame("imageAssociation")}
              >
                Associação de Imagens
              </Button>
              
              <Button 
                className="w-full font-bubblegum btn-hover mt-4"
                onClick={() => navigate("/")}
                variant="outline"
              >
                <ArrowLeftIcon className="mr-2" size={18} />
                Voltar para Início
              </Button>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E0EAF6] to-blue-50 p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 w-full max-w-md shadow-xl">
        {renderSelectedGame()}
      </div>
    </div>
  );
};

export default Jogo;
