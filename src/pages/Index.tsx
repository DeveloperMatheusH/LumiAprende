
import React from "react";
import { Link } from "react-router-dom";
import { LightbulbIcon, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E6F3FF] to-[#CCE7FF] px-4 relative overflow-hidden">
      {/* Scattered Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <Star
            key={i}
            className="absolute text-yellow-400 opacity-40"
            size={Math.random() * 16 + 12}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>
      <div className="text-center max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg float-animation">
            <LightbulbIcon className="h-10 w-10 text-white" />
          </div>
        </div>

        <h1 className="font-bubblegum text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Lumi Aprende
        </h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl">
          <p className="font-bubblegum text-gray-600 mb-6">
            Aprender com diversão é muito melhor!
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {["#FF5252", "#4285F4", "#0F9D58", "#FFCB3E", "#7E57C2", "#FF7043"].map((color) => (
              <div 
                key={color}
                className="w-8 h-8 rounded-full transition-transform duration-300 hover:scale-110"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          <Link 
            to="/select-game" 
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 
                       text-white font-medium rounded-xl px-10 py-3
                       transition-all duration-300 shadow-md
                       hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
          >
            Iniciar
          </Link>
        </div>
        
        <p className="font-bubblegum text-sm text-gray-500">
          Aprenda de forma interativa com jogos divertidos!
        </p>
      </div>
    </div>
  );
};

export default Index;
