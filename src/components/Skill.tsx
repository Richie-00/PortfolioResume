import { useState } from "react";
import { FaReact, FaNodeJs, FaDatabase, FaJava, FaCuttlefish } from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiFirebase } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

const skills = {
  Programming: [
    { name: "JavaScript", icon: <FaReact size={28} color="#F7DF1E" /> },
    { name: "TypeScript", icon: <FaReact size={28} color="#3178C6" /> },
    { name: "Java", icon: <FaJava size={28} color="#E76F00" /> },
    { name: "C++", icon: <FaCuttlefish size={28} color="#00599C" /> },
  ],
  Frameworks: [
    { name: "React.js", icon: <FaReact size={28} color="#61DAFB" /> },
    { name: "Node.js", icon: <FaNodeJs size={28} color="#68A063" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={28} color="#38BDF8" /> },
    { name: "Express.js", icon: <FaNodeJs size={28} color="#000000" /> },
  ],
  Database: [
    { name: "MongoDB", icon: <SiMongodb size={28} color="#4DB33D" /> },
    { name: "Firebase", icon: <SiFirebase size={28} color="#FFCA28" /> },
    { name: "REST & GraphQL APIs", icon: <FaDatabase size={28} color="#FF6D00" /> },
  ],
};

function SkillCard() {
  const [activeTab, setActiveTab] = useState<keyof typeof skills>("Programming");

  return (
    <div className="bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
          My Skills
        </h2>

        {/* Tabs (Single Line, No Wrapping, Scrollable if needed) */}
        <div className="flex flex-nowrap overflow-auto hide-scrollbar justify-center gap-3 sm:gap-6 mb-6">
          {Object.keys(skills).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category as keyof typeof skills)}
              className={`relative text-sm sm:text-lg font-semibold px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap
                ${activeTab === category ? "text-white bg-gradient-to-r from-blue-500 to-pink-500 shadow-lg" : "text-gray-400 hover:text-white"}
              `}
            >
              {category}
              {activeTab === category && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-pink-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* Skills List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence mode="wait">
            {skills[activeTab].map((skill) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center bg-gray-700 p-3 sm:p-4 rounded-lg shadow-lg hover:scale-105 transition-all"
              >
                {skill.icon}
                <p className="text-white mt-2 text-sm sm:text-lg">{skill.name}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default SkillCard;
