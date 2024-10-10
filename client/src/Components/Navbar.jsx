import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full py-4 bg-gray-900 text-white shadow-md fixed top-0 z-50 border-b">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link className="text-2xl font-bold" to="/" aria-label="Logo">
            TroothView
          </Link>

          {/* Hamburger Menu Icon for Mobile */}
          <div className="sm:hidden">
            <button
              type="button"
              className="text-white focus:outline-none"
              onClick={toggleNavbar}
              aria-expanded={isOpen}
              aria-controls="navbar-collapse"
            >
              {/* Menu Icon */}
              {!isOpen ? (
                <MenuIcon className="w-8 h-8" />
              ):
              
                <XIcon className="w-8 h-8" />
              }
            </button>
          </div>
        </div>

        {/* Menu for large screens */}
        <div className="hidden sm:block">
          <div className="flex gap-8">
            <Link className="hover:text-blue-400 transition duration-300" to="/about">About</Link>
            <Link className="hover:text-blue-400 transition duration-300" to="/contact">Contact</Link>
            <Link className="hover:text-blue-400 transition duration-300" to="/price">Price</Link>
          </div>
        </div>

        {/* Animated Side Menu for Mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-y-0 left-0 w-[80%] bg-gray-800 text-white p-6 sm:hidden z-50"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between mb-10 align-middle  ">
                <Link to="/" className="text-2xl font-bold px-16 text-center">TroothView</Link>
                <hr />
                
              </div>

              {/* Menu Links */}
              <div className="flex flex-col space-y-6  ">
                <Link
                  className="text-lg font-medium text-center hover:text-blue-400 transition duration-300"
                  to="/about"
                  onClick={toggleNavbar}
                >
                  About
                </Link>
                <Link
                  className="text-lg font-medium text-center hover:text-blue-400 transition duration-300"
                  to="/contact"
                  onClick={toggleNavbar}
                >
                  Contact
                </Link>
                <Link
                  className="text-lg font-medium text-center hover:text-blue-400 transition duration-300"
                  to="/price"
                  onClick={toggleNavbar}
                >
                  Price
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
