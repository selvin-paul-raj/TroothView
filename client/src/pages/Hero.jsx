import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importing Framer Motion for animations

const Hero = () => {
  return (
    <section className="bg-gray-900 text-gray-100 mt-20 h-screen">
      <motion.div
        className="mx-auto max-w-screen-xl px-4 py-36 relative"
        initial={{ opacity: 0, y: 50 }} // Framer Motion for initial animation
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8 }}
      >
        <div className="mx-auto max-w-xl text-center">
          <motion.h1
            className="text-4xl font-extrabold sm:text-6xl" // Increased font size moderately
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Detect AI-Generated Images.
            <strong className="font-extrabold text-red-500 sm:block"> Empower Authenticity. </strong>
          </motion.h1>

          <motion.p
            className="mt-4 sm:text-xl/relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Leverage cutting-edge technology to identify AI-generated images with ease. Ensure content authenticity and stay ahead in the digital age.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              to="/upload"
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            >
              Get Started
            </Link>

            <Link
              to="#"
              className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto border"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
