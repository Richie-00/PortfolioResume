import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const GRAVITY = 0.5;
const JUMP_STRENGTH = -8;
const PIPE_WIDTH = 60;
const PIPE_GAP = 150;
const GAME_SPEED = 4;
const GAME_HEIGHT = 500;
const GAME_WIDTH = 400;

function FlappyBird({ onClose }: { onClose: () => void }) {
  const [birdY, setBirdY] = useState(250);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState([
    { x: GAME_WIDTH, height: 200 },
    { x: GAME_WIDTH + 200, height: 150 },
  ]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef<number | null>(null);

  // Handle Bird Jump
  const jump = () => {
    if (!gameOver) {
      setVelocity(JUMP_STRENGTH);
    }
  };

  // Game Loop (Movement & Collision)
  useEffect(() => {
    if (gameOver) return;

    gameLoopRef.current = requestAnimationFrame(() => {
      setVelocity((v) => v + GRAVITY);
      setBirdY((y) => y + velocity);

      setPipes((prevPipes) => {
        return prevPipes.map((pipe) => ({
          ...pipe,
          x: pipe.x - GAME_SPEED,
        }));
      });

      // Remove off-screen pipes & add new ones
      if (pipes.length && pipes[0].x + PIPE_WIDTH < 0) {
        setPipes((prevPipes) => {
          const newPipes = prevPipes.slice(1);
          newPipes.push({
            x: GAME_WIDTH,
            height: Math.floor(Math.random() * 200) + 100,
          });
          return newPipes;
        });
        setScore((s) => s + 1);
      }

      // Check for collisions
      pipes.forEach((pipe) => {
        if (
          pipe.x < 100 &&
          pipe.x + PIPE_WIDTH > 50 &&
          (birdY < pipe.height || birdY > pipe.height + PIPE_GAP)
        ) {
          setGameOver(true);
        }
      });

      if (birdY > GAME_HEIGHT || birdY < 0) {
        setGameOver(true);
      }
    });

    return () => cancelAnimationFrame(gameLoopRef.current!);
  }, [birdY, pipes, gameOver]);

  // Restart Game
  const restartGame = () => {
    setBirdY(250);
    setVelocity(0);
    setPipes([
      { x: GAME_WIDTH, height: 200 },
      { x: GAME_WIDTH + 200, height: 150 },
    ]);
    setScore(0);
    setGameOver(false);
  };

  // Handle Key Press for Jump
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "ArrowUp") {
        jump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 p-6 rounded-lg shadow-lg text-white relative w-[90%] max-w-lg flex flex-col items-center"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 transition"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl mb-4 text-center">🐦 Flappy Bird</h2>
        <p className="text-center mb-4 text-gray-300">Score: {score}</p>

        {/* Game Area */}
        <div className="relative w-[400px] h-[500px] bg-blue-500 overflow-hidden mx-auto rounded-lg">
          {/* Bird */}
          <motion.div
            className="absolute w-8 h-8 bg-yellow-400 rounded-full"
            animate={{ y: birdY }}
            transition={{ ease: "easeOut", duration: 0.1 }}
            style={{ left: "50px" }}
          />

          {/* Pipes */}
          {pipes.map((pipe, index) => (
            <div key={index}>
              <div
                className="absolute bg-green-500 w-[60px]"
                style={{ height: `${pipe.height}px`, left: `${pipe.x}px`, top: 0 }}
              />
              <div
                className="absolute bg-green-500 w-[60px]"
                style={{
                  height: `${GAME_HEIGHT - pipe.height - PIPE_GAP}px`,
                  left: `${pipe.x}px`,
                  bottom: 0,
                }}
              />
            </div>
          ))}
        </div>

        {/* Game Over Overlay */}
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60"
          >
            <h3 className="text-2xl font-bold text-red-400">Game Over!</h3>
            <p className="text-gray-300 my-4">Final Score: {score}</p>
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
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default FlappyBird;
