import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CatFactPage from "../pages/CatFactPage";
import SnakeGame from "../components/SnakeGame";
import Game2048 from "../components/Game2048";
import FlappyBird from "../components/FlappyBird";
import { FaCat, FaGamepad } from "react-icons/fa";
import { isMobile, isTablet } from "react-device-detect";


interface Project {
  name: string;
  component: (onClose: () => void) => React.ReactElement;
  icon: React.ReactElement;
  isGame: boolean;
}

const projects: Project[] = [
  {
    name: "Cat Fact App",
    component: (onClose) => <CatFactPage onClose={onClose} />,
    icon: <FaCat size={40} className="text-blue-400" />,
    isGame: false,
  },
  {
    name: "Snake Game",
    component: (onClose) => <SnakeGame onClose={onClose} />,
    icon: <FaGamepad size={40} className="text-green-400" />,
    isGame: true,
  },
  {
    name: "2048 Game",
    component: (onClose) => <Game2048 onClose={onClose} />,
    icon: <FaGamepad size={40} className="text-yellow-400" />,
    isGame: true,
  },
  {
    name: "Flappy Bird",
    component: (onClose) => <FlappyBird onClose={onClose} />,
    icon: <FaGamepad size={40} className="text-red-400" />,
    isGame: true,
  },
];

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Determine if the device is mobile or tablet
  const isMobileOrTablet = isMobile || isTablet;

  return (
    <div className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
            My Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((project) => {
              // If the project is a game and the device is mobile or tablet, disable it
              const isDisabled = project.isGame && isMobileOrTablet;

              return (
                <motion.div
                  key={project.name}
                  onClick={() => !isDisabled && setActiveProject(project)}
                  whileHover={{ scale: isDisabled ? 1 : 1.05 }}
                  whileTap={{ scale: isDisabled ? 1 : 0.95 }}
                  className={`cursor-pointer bg-gray-700 p-4 rounded-lg flex items-center gap-4 shadow-md transition-all ${
                    isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-lg"
                  }`}
                >
                  {project.icon}
                  <span className="text-white text-lg font-semibold">
                    {project.name}
                  </span>
                  {isDisabled && (
                    <span className="text-red-500 text-sm">
                      (Disabled on mobile/tablet)
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pop-up for Active Project */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl h-[500px] flex flex-col justify-center items-center relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-3 right-3 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 transition"
              >
                ✕
              </button>

              {/* Render project dynamically */}
              <div className="w-full h-full flex items-center justify-center">
                {activeProject.component(() => setActiveProject(null))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
