
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, Palette, Image, Brain, Puzzle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const GameModeSelect = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-[#E0EAF6] px-4 py-8 relative overflow-hidden">
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
      
      <div className="w-full max-w-md">
        <h1 className="font-bubblegum text-3xl text-center mb-8 text-purple-700">Escolha um Modo de Jogo</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <Link to="/game">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 active:translate-y-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Palette className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-bubblegum text-xl font-bold text-gray-800">Pareamento de Cores</h2>
                    <p className="font-bubblegum text-gray-600">Associe cores aos seus nomes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/image-game">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 active:translate-y-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Image className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h2 className="font-bubblegum text-xl font-bold text-gray-800">Associação de Imagens</h2>
                    <p className="font-bubblegum text-gray-600">Associe cores a objetos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/memory-game">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 active:translate-y-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Brain className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="font-bubblegum text-xl font-bold text-gray-800">Jogo da Memória</h2>
                    <p className="font-bubblegum text-gray-600">Encontre os pares correspondentes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/puzzle-game">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 active:translate-y-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Puzzle className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="font-bubblegum text-xl font-bold text-gray-800">Quebra-Cabeça</h2>
                    <p className="font-bubblegum text-gray-600">Monte imagens com 4 a 6 peças</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameModeSelect;
