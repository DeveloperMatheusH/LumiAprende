
import { Color, gameColors } from "./gameData";

export type CardType = "color" | "text" | "image";

export interface MemoryCard {
  id: string;
  type: CardType;
  content: string | Color;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface MemoryGameLevel {
  name: string;
  pairsCount: number;
  cardTypes: CardType[];
  description: string;
}

export const memoryGameLevels: MemoryGameLevel[] = [
  {
    name: "Fácil",
    pairsCount: 6,
    cardTypes: ["color", "image"],
    description: "6 pares de cores e frutas"
  },
  {
    name: "Médio",
    pairsCount: 8,
    cardTypes: ["color", "text", "image"],
    description: "8 pares variados"
  },
  {
    name: "Difícil",
    pairsCount: 10,
    cardTypes: ["color", "text", "image"],
    description: "10 pares variados"
  }
];

// Generate cards for memory game
export function generateMemoryCards(level: MemoryGameLevel): MemoryCard[] {
  const pairs: MemoryCard[] = [];
  const colors = [...gameColors].sort(() => Math.random() - 0.5).slice(0, level.pairsCount);
  
  colors.forEach((color, index) => {
    // Determine card type for first card based on difficulty and position
    let firstCardType: CardType = "color";
    let secondCardType: CardType = "color";
    
    // For easy level: alternate between color and image pairs
    if (level.name === "Fácil") {
      if (index % 2 === 0) {
        firstCardType = "color";
        secondCardType = "image";
      } else {
        firstCardType = "image";
        secondCardType = "image";
      }
    } 
    // For medium level: mix of all types
    else if (level.name === "Médio") {
      if (index % 3 === 0) {
        firstCardType = "color";
        secondCardType = "text";
      } else if (index % 3 === 1) {
        firstCardType = "color";
        secondCardType = "image";
      } else {
        firstCardType = "image";
        secondCardType = "text";
      }
    }
    // For difficult level: more complex mix
    else {
      if (index % 5 === 0) {
        firstCardType = "color";
        secondCardType = "text";
      } else if (index % 5 === 1) {
        firstCardType = "color";
        secondCardType = "image";
      } else if (index % 5 === 2) {
        firstCardType = "text";
        secondCardType = "image";
      } else if (index % 5 === 3) {
        firstCardType = "image";
        secondCardType = "image";
      } else {
        firstCardType = "color";
        secondCardType = "color";
      }
    }
    
    // First card
    pairs.push({
      id: `card-${index}-1`,
      type: firstCardType,
      content: firstCardType === "text" ? color.nameInPortuguese : color,
      isFlipped: false,
      isMatched: false
    });
    
    // Second card
    pairs.push({
      id: `card-${index}-2`,
      type: secondCardType,
      content: secondCardType === "text" ? color.nameInPortuguese : color,
      isFlipped: false,
      isMatched: false
    });
  });
  
  // Shuffle all cards
  return pairs.sort(() => Math.random() - 0.5);
}
