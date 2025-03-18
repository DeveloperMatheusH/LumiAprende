
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
    color: { name: "Orange", value: "#FF7043", nameInPortuguese: "Laranja" },
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

// Generate a question with one correct color and options
export function generateImageQuestion(): {
  correctColor: Color;
  options: ColorImage[];
} {
  // Select a random color as the correct answer
  const correctIndex = Math.floor(Math.random() * colorImages.length);
  const correctColorImage = colorImages[correctIndex];
  
  // Create a copy of the images array excluding the correct color
  const remainingImages = colorImages.filter(img => img.color.name !== correctColorImage.color.name);
  
  // Shuffle the remaining colors
  const shuffledImages = remainingImages.sort(() => Math.random() - 0.5);
  
  // Take the first three images from the shuffled array
  const incorrectOptions = shuffledImages.slice(0, 3);
  
  // Combine correct color image with incorrect options
  const allOptions = [...incorrectOptions, correctColorImage];
  
  // Shuffle the options so the correct answer isn't always in the same position
  const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
  
  return {
    correctColor: correctColorImage.color,
    options: shuffledOptions
  };
}
