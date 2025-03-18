import Navigation from "../components/Navigation";
import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";


function About() {

  return (
    <div className="bg-gray-900 min-h-screen">
      loading
      <Navigation />
      
      <motion.section 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }} 
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-10 relative overflow-hidden"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-pink-700 opacity-10 blur-3xl" />

            {/* About Me Heading */}
            <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
              About Me
            </h2>

            {/* About Me Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
              >
                <h3 className="text-2xl font-semibold text-gray-400 mb-3">Objective</h3>
                <p className="text-gray-300 mb-5 text-lg leading-relaxed">
                  I’m a full-stack web developer passionate about building high-performance applications that provide exceptional user experiences.
                </p>
                <p className="text-gray-300 mb-5 text-lg leading-relaxed">
                  My expertise spans both frontend & backend development, crafting scalable, intuitive, and visually stunning applications.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Whether it’s designing smooth UI animations, optimizing backend performance, or deploying cloud-based solutions, I take pride in writing clean, efficient, and maintainable code.
                </p>
              </motion.div>

              {/* Skills & Education Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-400 mb-3">Skills</h3>
                  <ul className="grid grid-cols-2 gap-y-2 text-gray-300 text-lg">
                    <li>JavaScript (ES6+)</li>
                    <li>React.js & Next.js</li>
                    <li>Node.js & Express</li>
                    <li>TypeScript</li>
                    <li>MongoDB & PostgreSQL</li>
                    <li>Tailwind CSS</li>
                    <li>Authentication (JWT, OAuth)</li>
                    <li>REST & GraphQL APIs</li>
                    <li>Git & GitHub</li>
                    <li>Deployment (Vercel, Netlify)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-400 mb-3">Education</h3>
                  <p className="text-gray-300 text-lg">
                    
                    Sta. Cruz Elementary School (2013 - 2019)
                  </p>
                  <br />
                  <p className="text-gray-300 text-lg">
                    
                    Antipolo National High School (2019 - 2024)
                  </p>
                  <p className="text-gray-300 mt-3 text-lg">
                    Infotech College of Arts and Technology <br />
                    Computer Literature and CSS (Passed - October 2024)
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Work Experience */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
              className="mt-10"
            >
              <h3 className="text-2xl font-semibold text-gray-400 mb-3">Work Experience</h3>
              <p className="text-gray-300 text-lg">
                Freelance Web Developer & Tutor (2024 - Present)
              </p>
            </motion.div>

            {/* Download Resume Button */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 1, duration: 0.7, ease: "easeOut" }}
              className="mt-10 text-center"
            >
              <a
                href="/Pink-Simple-Modern-Photo-Nursing-Resume_20250317_165853_0000.pdf?url."
                download
                className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
              >
                <FaDownload className="mr-2" />
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default About;
