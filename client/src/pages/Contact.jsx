// Contact.js
import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false); // New state for submission status

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Handle form submission (you can implement API call here)
    console.log({ name, email, message });
    alert(`Thank You, ${name}! Your message has been sent.`);

    // Reset the form fields
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(true);
    
    // Optionally, reset the submitted state after a timeout
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <motion.h1
        className="text-4xl font-bold mb-5"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Us
      </motion.h1>
      <motion.form
        className="flex flex-col max-w-lg w-full"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 mb-3 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 mb-3 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          className="p-3 mb-3 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          className="p-3 bg-red-600 rounded transition duration-300 hover:bg-red-500"
        >
          Send Message
        </button>
        {submitted && (
          <p className="mt-4 text-green-400 text-center">Your message has been sent!</p>
        )}
      </motion.form>
    </div>
  );
};

export default Contact;
