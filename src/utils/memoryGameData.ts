
import { Banana, Grape, Apple, Cherry, Lemon, Orange } from "lucide-react";

export interface MemoryCard {
  id: number;
  type: "fruit";
  matched: boolean;
  flipped: boolean;
  content: {
    name: string;
    color: string;
    Icon: typeof Apple;
  };
}

const fruitIcons = [
  {
    name: "apple",
    color: "#FF6B6B", // red
    Icon: Apple
  },
  {
    name: "banana",
    color: "#FFD93D", // yellow
    Icon: Banana
  },
  {
    name: "grape",
    color: "#6A5ACD", // purple
    Icon: Grape
  },
  {
    name: "cherry",
    color: "#FF5777", // pink
    Icon: Cherry
  },
  {
    name: "lemon",
    color: "#FDFD96", // light yellow
    Icon: Lemon
  },
  {
    name: "orange",
    color: "#FFB347", // orange
    Icon: Orange
  }
];

/**
 * Shuffles an array using the Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Generates a set of cards for the memory game
 */
export function generateMemoryCards(numPairs = 5): MemoryCard[] {
  // Select random fruits for this game
  const selectedFruits = shuffleArray(fruitIcons).slice(0, numPairs);
  
  // Create pairs of cards
  const cardPairs = selectedFruits.flatMap((fruit, index) => {
    // Create two cards with the same fruit (a pair)
    return [
      {
        id: index * 2,
        type: "fruit" as const,
        matched: false,
        flipped: false,
        content: fruit
      },
      {
        id: index * 2 + 1,
        type: "fruit" as const,
        matched: false,
        flipped: false,
        content: fruit
      }
    ];
  });
  
  // Shuffle the cards
  return shuffleArray(cardPairs);
}

/**
 * Checks if two cards match
 */
export function checkForMatch(card1: MemoryCard, card2: MemoryCard): boolean {
  if (card1.type !== card2.type) {
    return false;
  }
  
  if (card1.type === "fruit" && card2.type === "fruit") {
    return card1.content.name === card2.content.name;
  }
  
  return false;
}
