import { useState, useEffect } from "react";
import { FaFacebook, FaGithub, FaDownload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Richie from "../assets/483689782_1163347585582557_8290557932692370628_n.jpg";

function Header() {
  const skills = [
    "Richie",
    "A Frontend Developer",
    "A Backend Developer",
    "A Fullstack Web Developer",
  ];
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkillIndex((prevIndex) => (prevIndex + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animation Variants
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <header className="bg-gray-900 py-16 shadow-md">
      <div className="container mx-auto px-4">
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center lg:items-start gap-6">
          
          {/* ✅ Blob + Image (Centered on Mobile, Right on Large Screens) */}
          <div className="w-full lg:w-[30%] flex justify-center lg:justify-end items-center relative order-1 lg:order-2">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute w-full h-full"
              >
                <defs>
                  <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#4A90E2", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#8E44AD", stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#blobGradient)"
                  d="M42.3,-50.7C54.9,-41.5,65.8,-27.9,67.7,-13.8C69.6,0.2,62.5,15,54.1,28.5C45.7,42,36,54.1,22.5,61C9.1,68,-8.1,69.9,-22.4,63.5C-36.6,57.1,-48,42.3,-54.4,26.5C-60.7,10.7,-62.1,-6,-57.3,-21.5C-52.6,-37,-41.7,-51.3,-27.6,-59.3C-13.5,-67.3,3.7,-69,18.2,-62.3C32.8,-55.5,44.6,-40,42.3,-50.7Z"
                  transform="translate(100 100)"
                />
              </svg>
              <img 
                src={Richie}
                alt="Richie"
                className="absolute w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 object-cover rounded-full border-4 border-gray-700 shadow-lg"
              />
            </div>
          </div>

          {/* ✅ Text Section (70% Width on Large Screens) */}
          <div className="w-full lg:w-[70%] text-center lg:text-left order-2 lg:order-1 lg:p-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <span className="text-white">Hi, I'm&nbsp;</span>
              <div className="relative inline-block text-blue-400 overflow-hidden min-w-0 flex-shrink">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={skills[currentSkillIndex]}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-block whitespace-nowrap"
                  >
                    {skills[currentSkillIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-300 px-4 sm:px-0">
              I build web experiences that don’t just work—they captivate. From sleek front-end interfaces to powerful back-end systems, I craft seamless, high-performance applications that push boundaries.
            </p>

            {/* 🔗 Buttons & Socials */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
              <a href="https://web.facebook.com/rylsher0damzzz" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                <FaFacebook size={28} />
              </a>
              <a href="https://github.com/Richie-00" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
                <FaGithub size={28} />
              </a>
              <a href="/Pink-Simple-Modern-Photo-Nursing-Resume_20250317_165853_0000(3).pdf" download className=" -mt-3 relative inline-flex items-center justify-center px-5 py-2 text-base sm:text-lg font-medium text-white rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 hover:scale-105 transition-transform duration-300">
                <FaDownload className="mr-2" />
                Resume
              </a>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
