import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const GRID_SIZE = 4;

function generateEmptyGrid() {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
}

// Adds a random tile (2 or 4)
function addNewTile(grid: number[][]) {
  const newGrid = grid.map((row) => [...row]);
  const emptyTiles: { x: number; y: number }[] = [];

  newGrid.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (cell === 0) emptyTiles.push({ x, y });
    })
  );

  if (emptyTiles.length > 0) {
    const { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    newGrid[y][x] = Math.random() > 0.9 ? 4 : 2;
  }
  return newGrid;
}

// Moves tiles in the given direction
function move(grid: number[][], direction: "left" | "right" | "up" | "down") {
  let rotated = grid;
  if (direction === "up") rotated = rotateLeft(grid);
  if (direction === "down") rotated = rotateRight(grid);
  if (direction === "right") rotated = rotateRight(rotateRight(grid));

  const movedGrid = rotated.map((row) => slideTiles(row));
  let newGrid = movedGrid;
  if (direction === "up") newGrid = rotateRight(movedGrid);
  if (direction === "down") newGrid = rotateLeft(movedGrid);
  if (direction === "right") newGrid = rotateRight(rotateRight(movedGrid));

  return JSON.stringify(grid) === JSON.stringify(newGrid) ? grid : addNewTile(newGrid);
}

// Slides and merges tiles in one row
function slideTiles(row: number[]) {
  let newRow = row.filter((num) => num);
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      newRow.splice(i + 1, 1);
    }
  }
  return [...newRow, ...Array(GRID_SIZE - newRow.length).fill(0)];
}

// Rotates grid (Used for Up & Down movements)
function rotateRight(matrix: number[][]) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]).reverse());
}

function rotateLeft(matrix: number[][]) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[row.length - 1 - colIndex]));
}

function Game2048({ onClose }: { onClose: () => void }) {
  const [grid, setGrid] = useState(addNewTile(generateEmptyGrid()));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleMove = (direction: "left" | "right" | "up" | "down") => {
    if (gameOver) return;
    const newGrid = move(grid, direction);
    if (JSON.stringify(grid) !== JSON.stringify(newGrid)) {
      setGrid(newGrid);
      setScore(score + 10);
      checkGameOver(newGrid);
    }
  };

  const checkGameOver = (grid: number[][]) => {
    if (grid.some((row) => row.includes(0))) return;
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE - 1; x++) {
        if (grid[y][x] === grid[y][x + 1] || grid[x][y] === grid[x + 1][y]) return;
      }
    }
    setGameOver(true);
  };

  const handleRestart = () => {
    setGrid(addNewTile(generateEmptyGrid()));
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") handleMove("left");
      if (event.key === "ArrowRight") handleMove("right");
      if (event.key === "ArrowUp") handleMove("up");
      if (event.key === "ArrowDown") handleMove("down");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [grid]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 p-6 rounded-lg shadow-lg text-white relative w-[90%] max-w-lg"
      >
        {/* Close Button (X) */}
        <button
          className="absolute top-4 right-4 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 transition"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl mb-4 text-center">🔢 2048 Game</h2>
        <p className="text-center mb-4 text-gray-300">Score: {score}</p>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-1 bg-gray-800 p-4 rounded-lg">
          {grid.flat().map((tile, i) => (
            <motion.div
              key={i}
              className={`w-16 h-16 flex items-center justify-center rounded-lg text-2xl font-bold ${
                tile ? "bg-yellow-400 text-black" : "bg-gray-700"
              }`}
              animate={{ scale: tile ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {tile !== 0 && tile}
            </motion.div>
          ))}
        </div>

        {/* Game Over Popup */}
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 rounded-lg p-6"
          >
            <h3 className="text-2xl font-bold text-red-400">Game Over!</h3>
            <p className="text-gray-300 my-4">Final Score: {score}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRestart}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Game2048;
