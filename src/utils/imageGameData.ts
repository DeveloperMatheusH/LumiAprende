
import { Color } from "./gameData";

export interface ColorImage {
  color: Color;
  imageUrl: string; // Keeping this for backwards compatibility
  description: string;
}

export const colorImages: ColorImage[] = [
  {
    color: { name: "Red", value: "#FF5252", nameInPortuguese: "Vermelho" },
    imageUrl: "icon-apple",
    description: "Maçã vermelha"
  },
  {
    color: { name: "Blue", value: "#4285F4", nameInPortuguese: "Azul" },
    imageUrl: "icon-cloud",
    description: "Céu azul"
  },
  {
    color: { name: "Green", value: "#0F9D58", nameInPortuguese: "Verde" },
    imageUrl: "icon-banana",
    description: "Banana verde"
  },
  {
    color: { name: "Yellow", value: "#FFCB3E", nameInPortuguese: "Amarelo" },
    imageUrl: "icon-banana",
    description: "Banana amarela"
  },
  {
    color: { name: "Purple", value: "#7E57C2", nameInPortuguese: "Roxo" },
    imageUrl: "icon-grape",
    description: "Uvas roxas"
  },
  {
    color: { name: "Orange", value: "#FF6600", nameInPortuguese: "Laranja" },
    imageUrl: "icon-cherry",
    description: "Cereja laranja"
  },
  {
    color: { name: "Pink", value: "#EC407A", nameInPortuguese: "Rosa" },
    imageUrl: "icon-flower",
    description: "Flor rosa"
  },
  {
    color: { name: "Brown", value: "#795548", nameInPortuguese: "Marrom" },
    imageUrl: "icon-cookie",
    description: "Cookie marrom"
  }
];

// Generate a question with one correct fruit image and color options
export function generateImageQuestion(): {
  correctImage: ColorImage;
  options: Color[];
} {
  // Select a random fruit as the correct answer
  const correctIndex = Math.floor(Math.random() * colorImages.length);
  const correctImage = colorImages[correctIndex];
  
  // Create a copy of the colors array
  const allColors = colorImages.map(img => img.color);
  
  // Remove the correct color
  const remainingColors = allColors.filter(color => color.name !== correctImage.color.name);
  
  // Shuffle the remaining colors
  const shuffledColors = remainingColors.sort(() => Math.random() - 0.5);
  
  // Take the first three colors from the shuffled array
  const incorrectOptions = shuffledColors.slice(0, 3);
  
  // Combine correct color with incorrect options
  const allOptions = [...incorrectOptions, correctImage.color];
  
  // Shuffle the options so the correct answer isn't always in the same position
  const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
  
  return {
    correctImage: correctImage,
    options: shuffledOptions
  };
}
