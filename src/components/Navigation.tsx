import { Link } from "react-router-dom";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import Hire from "../pages/Hire";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navigation() {
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sidebar animation variants
  const sidebarVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "spring", stiffness: 120, damping: 20 } },
    exit: { x: "100%", transition: { ease: "easeInOut", duration: 0.3 } },
  };

  return (
    <>
      <nav className="p-4 mx-2 mt-2 rounded-2xl bg-gray-700 shadow-lg">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <span className="text-3xl ml-5 bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
            <Link to="/">Richie</Link>
          </span>

          {/* Hamburger Menu (Mobile) */}
          <button
            className="md:hidden z-50 focus:outline-none"
            onClick={() => setMenuOpen(true)}
          >
            <RiMenu3Fill size={30} color="pink" />
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-10 mx-2 mr-5 items-center">
            {[  "About"].map((item, index) => (
              <li key={index} className="relative inline-block group">
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="text-lg text-white relative inline-block pb-1 transition-all duration-500 ease-out"
                >
                  {item}
                  <span
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-500 to-pink-500 transform scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left"
                  ></span>
                </Link>
              </li>
            ))}
            
            {/* Hire Me Button (Desktop) */}
            <li>
              <button
                onClick={() => setIsHireModalOpen(true)}
                className="relative px-6 py-2 text-lg font-semibold text-white border-2 border-gray-500 rounded-full transition-all duration-300 ease-in-out bg-transparent hover:border-blue-500 hover:text-blue-400 hover:shadow-lg"
              >
                Hire Me
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu (Slide In from Right) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Side Menu */}
            <motion.div
              className="fixed inset-y-0 right-0 w-3/4 max-w-xs bg-gray-900 shadow-xl z-50 flex flex-col items-center p-10"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close Button */}
              <button className="self-end mb-5" onClick={() => setMenuOpen(false)}>
                <RiCloseFill size={30} color="pink" />
              </button>

              {/* Menu Items */}
              <ul className="w-full flex flex-col items-center gap-8 overflow-y-auto">
                {[ "About"].map((item, index) => (
                  <motion.li
                    key={index}
                    className="relative group w-full text-center"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.1 * index } }}
                    exit={{ opacity: 0, x: 30 }}
                  >
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="text-lg text-white block w-full py-2 transition-all duration-300 ease-in-out group-hover:text-blue-400 group-hover:bg-gray-800"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item}
                      <span
                        className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-500 to-pink-500 transform scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left"
                      ></span>
                    </Link>
                  </motion.li>
                ))}

                {/* Hire Me Button (Mobile) */}
                <motion.li
                  className="w-full text-center"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
                  exit={{ opacity: 0, x: 30 }}
                >
                  <button
                    onClick={() => {
                      setIsHireModalOpen(true);
                      setMenuOpen(false);
                    }}
                    className="px-6 py-3 text-lg font-semibold text-white rounded-full border-2 border-gray-500 bg-transparent hover:border-blue-500 hover:text-blue-400 hover:shadow-lg transition-all duration-300 ease-in-out"
                  >
                    Hire Me
                  </button>
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hire Me Modal */}
      {isHireModalOpen && <Hire isOpen={isHireModalOpen} onClose={() => setIsHireModalOpen(false)} />}
    </>
  );
}

export default Navigation;
