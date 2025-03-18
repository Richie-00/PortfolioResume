import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center">
      {/* Animated Error */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        className="text-lg text-gray-400 mt-4"
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      {/* Go Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      >
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-lg font-medium text-white rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 hover:scale-105 transition-transform"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;
