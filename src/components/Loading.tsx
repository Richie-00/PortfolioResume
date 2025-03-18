import { useEffect, useState} from "react"
import { motion, useAnimation } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

function Loading() {
  const controls = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        rotate: 360,
        transition: {
          duration: 1.5,
          ease: [0.68, -0.55, 0.265, 1.55],
          repeat: Infinity,
          repeatType: 'loop',
        },
      });
    };

    sequence();

    // Simulate DOM loading completion. In a real scenario, replace this with your actual logic.
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Adjust delay as needed

    return () => clearTimeout(timeoutId);

  }, [controls]);

  if (!isLoading) {
    return null; // Don't render anything if not loading.
  }

  return (
    <nav className="p-4 m-2 rounded-2xl h-18 flex justify-center items-center bg-black text-white text-lg">
      <motion.div animate={controls}>
        <FaSpinner size={30} />
      </motion.div>
    </nav>  
  );
}

export default Loading;