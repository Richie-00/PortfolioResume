import { motion } from "framer-motion";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

const DraggableAssistiveButton: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef}>
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 300, top: 0, bottom: 600 }}
        onClick={() => setExpanded(!expanded)}
        className={`fixed bottom-10 right-10 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-blue-400 shadow-lg cursor-pointer transition-all duration-500 ${
          expanded ? "w-40 h-40" : ""
        }`}
      >
        {!expanded && (
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: expanded ? 0 : 1 }}
            className="text-white font-bold text-lg transition-opacity duration-500"
          >
            Richie
          </motion.span>
        )}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full h-full flex flex-col items-center justify-center gap-4"
          >
            <a href="https://github.com/Richie-00" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-white text-3xl hover:scale-110 transition-transform" />
            </a>
            <a href="https://web.facebook.com/rylsher0damzzz" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-white text-3xl hover:scale-110 transition-transform" />
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DraggableAssistiveButton;
