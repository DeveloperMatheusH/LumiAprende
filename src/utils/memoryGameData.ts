import { Banana, Grape, Apple, Cherry, Coffee, Egg, Pizza, Fish, Salad, Soup, Sandwich, Cake } from "lucide-react";

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

export interface MemoryGameLevel {
  name: string;
  pairsCount: number;
}

export const memoryGameLevels: MemoryGameLevel[] = [
  { name: "Fácil", pairsCount: 4 },
  { name: "Médio", pairsCount: 5 },
  { name: "Difícil", pairsCount: 6 }
];

// Cria múltiplos conjuntos de ícones de frutas e alimentos para rotacionar
const fruitIconSets = [
  // Conjunto 1 - Frutas originais
  [
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
    }
  ],
  // Conjunto 2 - Bebidas e comidas
  [
    {
      name: "coffee",
      color: "#6F4E37", // brown
      Icon: Coffee
    },
    {
      name: "egg",
      color: "#F4F0CB", // cream
      Icon: Egg
    },
    {
      name: "pizza",
      color: "#FF9933", // orange
      Icon: Pizza
    },
    {
      name: "fish",
      color: "#4169E1", // blue
      Icon: Fish
    }
  ],
  // Conjunto 3 - Mais alimentos
  [
    {
      name: "salad",
      color: "#4CAF50", // green
      Icon: Salad
    },
    {
      name: "soup",
      color: "#E67E22", // orange-brown
      Icon: Soup
    },
    {
      name: "sandwich",
      color: "#D2B48C", // tan
      Icon: Sandwich
    },
    {
      name: "cake",
      color: "#FF69B4", // pink
      Icon: Cake
    }
  ]
];

// Variável para rastrear qual conjunto de ícones está ativo
let currentIconSetIndex = 0;

// Função para avançar para o próximo conjunto de ícones
export function rotateToNextIconSet() {
  currentIconSetIndex = (currentIconSetIndex + 1) % fruitIconSets.length;
  return currentIconSetIndex;
}

// Função para obter o conjunto atual de ícones
export function getCurrentIconSet() {
  return fruitIconSets[currentIconSetIndex];
}

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
export function generateMemoryCards(numPairs = 4): MemoryCard[] {
  // Obter o conjunto atual de ícones de frutas
  const currentFruitIcons = getCurrentIconSet();
  
  // Select random fruits for this game
  const selectedFruits = shuffleArray(currentFruitIcons).slice(0, numPairs);
  
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
