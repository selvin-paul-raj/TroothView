// Price.js
import { motion } from 'framer-motion';

const Price = () => {
  const plans = [
    { name: 'Basic', price: '$10/month', features: ['Feature 1', 'Feature 2'] },
    { name: 'Standard', price: '$20/month', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
    { name: 'Premium', price: '$30/month', features: ['All features', 'Priority support'] },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <motion.h1
        className="text-4xl font-bold mb-5"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Pricing Plans
      </motion.h1>
      <div className="flex flex-wrap justify-center">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 m-4 p-5 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-xl mb-4">{plan.price}</p>
            <ul className="list-disc pl-5 mb-4">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <motion.button
              className="mt-4 p-2 bg-blue-600 rounded hover:bg-blue-500 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Choose Plan
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Price;
