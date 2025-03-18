import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

function Loading() {
  const controls = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        rotate: 360,
        scale: [1, 1.2, 1], // Smooth scale effect
        transition: {
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    };

    sequence();

    // Simulate loading delay (adjust as needed)
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [controls]);

  if (!isLoading) return null; // Hide when loading is done

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <motion.div
        className="p-6 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 shadow-lg"
        animate={controls}
      >
        <FaSpinner size={40} className="text-white" />
      </motion.div>
    </div>
  );
}

export default Loading;
