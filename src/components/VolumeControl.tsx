
import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface VolumeControlProps {
  initialVolume?: number;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ initialVolume = 0.5 }) => {
  const [volume, setVolume] = useState(initialVolume);
  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    localStorage.setItem("bgMusicVolume", newVolume.toString());
    
    if (window.bgMusic && window.bgMusic instanceof HTMLAudioElement) {
      window.bgMusic.volume = isMuted ? 0 : newVolume;
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    localStorage.setItem("bgMusicMuted", newMutedState.toString());
    
    if (window.bgMusic && window.bgMusic instanceof HTMLAudioElement) {
      window.bgMusic.volume = newMutedState ? 0 : volume;
    }
  };

  useEffect(() => {
    // Carregar configurações salvas
    const savedVolume = localStorage.getItem("bgMusicVolume");
    const savedMuted = localStorage.getItem("bgMusicMuted");
    
    if (savedVolume) setVolume(parseFloat(savedVolume));
    if (savedMuted) setIsMuted(savedMuted === "true");
    
    if (window.bgMusic && window.bgMusic instanceof HTMLAudioElement) {
      window.bgMusic.volume = isMuted ? 0 : (savedVolume ? parseFloat(savedVolume) : volume);
    }
  }, []);

  return (
    <div className="absolute top-4 left-16 glass-card rounded-full px-4 py-2 flex items-center gap-2">
      <button 
        onClick={toggleMute} 
        className="text-gray-600 hover:text-gray-900 transition-colors"
        aria-label={isMuted ? "Ativar som" : "Desativar som"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      <Slider
        value={[volume]}
        min={0}
        max={1}
        step={0.01}
        onValueChange={handleVolumeChange}
        className="w-20 h-2"
      />
    </div>
  );
};

export default VolumeControl;
