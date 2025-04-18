
import React from "react";
import { LightbulbIcon, PlayCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  // Array de cores para os círculos
  const colors = [
    "#FF5252", // vermelho
    "#4285F4", // azul
    "#0F9D58", // verde
    "#FFCB3E", // amarelo
    "#7E57C2", // roxo
    "#FF7043", // laranja
  ];
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E0EAF6] to-blue-50 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg float-animation">
            <LightbulbIcon className="h-10 w-10 text-white" />
          </div>
        </div>

        <h1 className="font-bubblegum text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          LumiAprende
        </h1>
        
        {/* Círculos coloridos */}
        <div className="flex justify-center gap-3 mb-8">
          {colors.map((color, index) => (
            <div 
              key={index}
              className="w-8 h-8 rounded-full shadow-md color-shadow"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl">
          <p className="font-bubblegum text-gray-600 mb-6">
            Bem-vindo ao LumiAprende!
          </p>
          
          <p className="font-bubblegum text-sm text-gray-500 mb-6">
            Um lugar especial para aprender e crescer.
          </p>
          
          {/* Botão de iniciar jogo */}
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 font-bubblegum text-lg py-6 btn-hover"
            onClick={() => navigate("/jogo")}
          >
            <PlayCircleIcon className="mr-2" />
            Iniciar Jogo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
