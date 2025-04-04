
export interface PuzzlePiece {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  originalX: number;
  originalY: number;
  correctX: number;
  correctY: number;
  correctIndex: number;
  isCorrect: boolean;
  isCorrectlyPositioned: boolean;
  feedbackState: 'none' | 'correct' | 'incorrect';
  imageName: string;
  bgPositionX: number;
  bgPositionY: number;
  fullWidth: number;
  fullHeight: number;
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
 * Generates a puzzle with 4 to 6 pieces based on the selected image
 */
export function generatePuzzle(imageName: string, gridSize: number = 2): PuzzlePiece[] {
  // Determine number of pieces based on grid size (2x2 for 4 pieces or 2x3 for 6 pieces)
  const numPieces = gridSize === 2 ? 4 : 6;
  
  const pieces: PuzzlePiece[] = [];
  
  // Create pieces based on grid
  for (let i = 0; i < numPieces; i++) {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    
    // Calculate correct position (as percentage of container)
    const correctX = (col * (100 / gridSize));
    const correctY = (row * (100 / (gridSize === 2 ? 2 : 3)));
    
    // Calculate piece dimensions
    const width = 100 / gridSize;
    const height = 100 / (gridSize === 2 ? 2 : 3);
    
    // Calculate background position for the sliced image part
    const bgPositionX = (col * (100 / (gridSize - 1))) || 0;
    const bgPositionY = (row * (100 / ((gridSize === 2 ? 2 : 3) - 1))) || 0;
    
    // Generate random initial position around the board
    // Distribute pieces more evenly around the board
    let randomX, randomY;
    
    // For positioning pieces around the board
    if (i % 4 === 0) {
      // Left side
      randomX = -50 + Math.random() * 30;
      randomY = 20 + Math.random() * 60;
    } else if (i % 4 === 1) {
      // Right side
      randomX = 120 + Math.random() * 30;
      randomY = 20 + Math.random() * 60;
    } else if (i % 4 === 2) {
      // Top
      randomX = 20 + Math.random() * 60;
      randomY = -50 + Math.random() * 30;
    } else {
      // Bottom
      randomX = 20 + Math.random() * 60;
      randomY = 120 + Math.random() * 30;
    }
    
    pieces.push({
      id: i,
      x: randomX,
      y: randomY,
      width,
      height,
      originalX: randomX,
      originalY: randomY,
      correctX,
      correctY,
      correctIndex: i,
      isCorrect: false,
      isCorrectlyPositioned: false,
      feedbackState: 'none',
      imageName,
      bgPositionX,
      bgPositionY,
      fullWidth: gridSize * 100,
      fullHeight: (gridSize === 2 ? 2 : 3) * 100
    });
  }
  
  return pieces;
}

/**
 * Checks if a piece is correctly positioned
 */
export function isPieceCorrectlyPositioned(piece: PuzzlePiece, tolerance = 15): boolean {
  // Check if the piece is close enough to its correct position
  const isCloseX = Math.abs(piece.x - piece.correctX) < tolerance;
  const isCloseY = Math.abs(piece.y - piece.correctY) < tolerance;
  
  return isCloseX && isCloseY;
}
