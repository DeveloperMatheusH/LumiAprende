
export interface Color {
  name: string;
  value: string;
  nameInPortuguese: string;
}

export const gameColors: Color[] = [
  { name: "Red", value: "#FF5252", nameInPortuguese: "Vermelho" },
  { name: "Blue", value: "#4285F4", nameInPortuguese: "Azul" },
  { name: "Green", value: "#0F9D58", nameInPortuguese: "Verde" },
  { name: "Yellow", value: "#FFCB3E", nameInPortuguese: "Amarelo" },
  { name: "Purple", value: "#7E57C2", nameInPortuguese: "Roxo" },
  { name: "Orange", value: "#FF7043", nameInPortuguese: "Laranja" },
  { name: "Pink", value: "#EC407A", nameInPortuguese: "Rosa" },
  { name: "Cyan", value: "#00BCD4", nameInPortuguese: "Ciano" },
  { name: "Brown", value: "#795548", nameInPortuguese: "Marrom" },
  { name: "Gray", value: "#9E9E9E", nameInPortuguese: "Cinza" }
];

// Generates a new question with one correct color and three random options
export function generateQuestion(): {
  correctColor: Color;
  options: Color[];
} {
  // Select a random color as the correct answer
  const correctIndex = Math.floor(Math.random() * gameColors.length);
  const correctColor = gameColors[correctIndex];
  
  // Create a copy of the colors array excluding the correct color
  const remainingColors = gameColors.filter(color => color.name !== correctColor.name);
  
  // Shuffle the remaining colors
  const shuffledColors = remainingColors.sort(() => Math.random() - 0.5);
  
  // Take the first three colors from the shuffled array
  const incorrectOptions = shuffledColors.slice(0, 3);
  
  // Combine correct color with incorrect options
  const allOptions = [...incorrectOptions, correctColor];
  
  // Shuffle the options so the correct answer isn't always in the same position
  const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
  
  return {
    correctColor,
    options: shuffledOptions
  };
}

// Function to play success sound (placeholder - would use actual audio in production)
export function playSuccessSound() {
  // This would be replaced with actual audio implementation
  console.log("Playing success sound");
}

// Function to play error sound (placeholder - would use actual audio in production)
export function playErrorSound() {
  // This would be replaced with actual audio implementation
  console.log("Playing error sound");
}
