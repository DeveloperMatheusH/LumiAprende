
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
    cardTypes: ["color"],
    description: "6 pares de cores"
  },
  {
    name: "Médio",
    pairsCount: 8,
    cardTypes: ["color", "text"],
    description: "8 pares de cores e nomes"
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
    // Create pairs based on difficulty level
    if (level.cardTypes.includes("color")) {
      // First card with color
      pairs.push({
        id: `color-${index}-1`,
        type: "color",
        content: color,
        isFlipped: false,
        isMatched: false
      });
      
      // Second card based on level
      if (level.cardTypes.includes("text") && index < level.pairsCount / 2) {
        // Text pair
        pairs.push({
          id: `color-${index}-2`,
          type: "text",
          content: color.nameInPortuguese,
          isFlipped: false,
          isMatched: false
        });
      } else {
        // Same color pair
        pairs.push({
          id: `color-${index}-2`,
          type: "color",
          content: color,
          isFlipped: false,
          isMatched: false
        });
      }
    }
  });
  
  // Shuffle all cards
  return pairs.sort(() => Math.random() - 0.5);
}
