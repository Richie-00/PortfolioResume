import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

function CatFactPage({ onClose }: { onClose: () => void }) {
  const [catFact, setCatFact] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch new cat fact
  const fetchCatFact = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://catfact.ninja/fact");
      setCatFact(response.data.fact);
    } catch {
      setCatFact("Failed to load a cat fact!");
    }
    setLoading(false);
  };

  // Fetch on mount
  useEffect(() => {
    fetchCatFact();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg text-white max-w-md w-full text-center relative"
      >
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 transition"
        >
          <FaTimes size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-pink-400">🐱 Cat Fact</h2>

        {/* Fact Content */}
        {loading ? (
          <p className="text-gray-400 mt-4 text-base sm:text-lg">Fetching cat fact...</p>
        ) : (
          <motion.p
            key={catFact}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-base sm:text-lg text-gray-300 mt-4 text-center"
          >
            {catFact}
          </motion.p>
        )}

        {/* Fetch New Fact Button */}
        <button
          onClick={fetchCatFact}
          className="mt-5 px-6 py-3 text-base font-medium text-white rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          New Fact
        </button>
      </motion.div>
    </motion.div>

  );
}

export default CatFactPage;
