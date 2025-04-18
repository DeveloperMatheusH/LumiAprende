
import React from "react";
import { Link } from "react-router-dom";
import { LightbulbIcon } from "lucide-react";

const Index = () => {
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
