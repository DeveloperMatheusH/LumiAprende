
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Jogo = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E0EAF6] to-blue-50 p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h1 className="font-bubblegum text-3xl text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Página do Jogo
        </h1>
        
        <p className="font-bubblegum text-gray-600 mb-6 text-center">
          Esta é a página do jogo.
        </p>
        
        <Button 
          className="w-full font-bubblegum btn-hover"
          onClick={() => navigate("/")}
          variant="outline"
        >
          <ArrowLeftIcon className="mr-2" size={18} />
          Voltar para Início
        </Button>
      </div>
    </div>
  );
};

export default Jogo;
