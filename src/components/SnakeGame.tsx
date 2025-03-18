import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 5, y: 5 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };

function SnakeGame({ onClose }: { onClose: () => void }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 10, y: 10 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = { ...newSnake[0] };

        // Move head
        head.x += direction.x;
        head.y += direction.y;

        // Collision check (Wall & Self)
        if (
          head.x < 0 || head.x >= GRID_SIZE ||
          head.y < 0 || head.y >= GRID_SIZE ||
          newSnake.some((seg) => seg.x === head.x && seg.y === head.y)
        ) {
          setGameOver(true);
          return prev;
        }

        newSnake.unshift(head);

        // Check if food is eaten
        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => prev + 10);
          setFood({
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  // Handle Keyboard Input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" && direction.y === 0) setDirection({ x: 0, y: -1 });
      if (event.key === "ArrowDown" && direction.y === 0) setDirection({ x: 0, y: 1 });
      if (event.key === "ArrowLeft" && direction.x === 0) setDirection({ x: -1, y: 0 });
      if (event.key === "ArrowRight" && direction.x === 0) setDirection({ x: 1, y: 0 });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  // Restart Game
  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood({ x: 10, y: 10 });
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 p-6 rounded-xl shadow-lg text-white w-full max-w-md h-full flex flex-col items-center justify-center relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 transition"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-green-400">🐍 Snake Game</h2>
        <p className="text-gray-300 text-lg mt-2">Score: {score}</p>

        {/* Game Board */}
        <div
          className="relative border-4 border-gray-600 mt-4"
          style={{
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            backgroundColor: "#1e1e1e",
          }}
        >
          {/* Render Snake */}
          {snake.map((segment, index) => (
            <motion.div
              key={index}
              className="absolute w-5 h-5 bg-green-500 rounded-md"
              animate={{ x: segment.x * CELL_SIZE, y: segment.y * CELL_SIZE }}
              transition={{ ease: "linear", duration: 0.15 }}
            />
          ))}

          {/* Render Food */}
          <div
            className="absolute w-5 h-5 bg-red-500 rounded-md"
            style={{
              transform: `translate(${food.x * CELL_SIZE}px, ${food.y * CELL_SIZE}px)`,
            }}
          />
        </div>

        {/* Game Over Popup */}
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
          >
            <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
              <h3 className="text-2xl font-bold text-red-400">Game Over!</h3>
              <p className="text-gray-300 my-4">Your final score: {score}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={restartGame}
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
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default SnakeGame;
