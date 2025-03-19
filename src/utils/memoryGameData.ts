
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
    pairsCount: 5,  // Changed to 5 pairs (10 cards total)
    cardTypes: ["color", "image"],
    description: "5 pares de cores e frutas"
  },
  {
    name: "Médio",
    pairsCount: 5,  // Changed to 5 pairs (10 cards total)
    cardTypes: ["color", "text", "image"],
    description: "5 pares variados"
  },
  {
    name: "Difícil",
    pairsCount: 5,  // Changed to 5 pairs (10 cards total)
    cardTypes: ["color", "text", "image"],
    description: "5 pares variados"
  }
];

// Generate cards for memory game
export function generateMemoryCards(level: MemoryGameLevel): MemoryCard[] {
  const pairs: MemoryCard[] = [];
  const colors = [...gameColors].sort(() => Math.random() - 0.5).slice(0, level.pairsCount);
  
  colors.forEach((color, index) => {
    // For all difficulty levels, always use images for one of the cards
    let firstCardType: CardType = "image";
    let secondCardType: CardType = "image";
    
    // For easy level: always image pairs
    if (level.name === "Fácil") {
      firstCardType = "image";
      secondCardType = "image";
    } 
    // For medium level: image pairs with some variety
    else if (level.name === "Médio") {
      if (index % 2 === 0) {
        firstCardType = "image";
        secondCardType = "image";
      } else {
        firstCardType = "image";
        secondCardType = "color";
      }
    }
    // For difficult level: more complex mix
    else {
      if (index % 3 === 0) {
        firstCardType = "image";
        secondCardType = "color";
      } else if (index % 3 === 1) {
        firstCardType = "image";
        secondCardType = "text";
      } else {
        firstCardType = "image";
        secondCardType = "image";
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
