// About.js
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.h1
        className="text-4xl font-bold mb-5"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Us
      </motion.h1>
      <motion.p
        className="max-w-xl text-center mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        We are a team dedicated to delivering the best technology solutions using 
        cutting-edge advancements in AR, VR, and AI. Our mission is to enhance 
        everyday experiences through innovative applications.
      </motion.p>
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <img src="https://img.edvido.com/ai_tools_blog_post_scaled_jpg-39ac9.jpg" alt="Team" className="w-64 h-64  mb-4" />
        <p className="text-gray-400">Our dedicated team of experts</p>
      </motion.div>
    </div>
  );
};

export default About;
