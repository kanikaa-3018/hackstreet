import { useState } from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[url('/images/image.jpg')] bg-cover bg-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white bg-opacity-90 p-10 rounded-2xl shadow-xl text-center max-w-md"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-semibold text-gray-800 mb-4"
        >
          Stay Updated with Our Newsletter
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-600 mb-6"
        >
          Subscribe to get the latest updates and news directly in your inbox.
        </motion.p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative w-80"
          >
            <input
              type="email"
              id="email"
              placeholder="Enter your email "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
              className="mb-8 w-full px-4 py-3 border border-gray-300 rounded-lg text-lg bg-white focus:border-blue-500 focus:ring focus:ring-blue-300 outline-none transition"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-gray-500 transition-all text-lg"
            >
              
            </label>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 mt-16 bg-[#00016a] text-white rounded-lg text-lg font-semibold shadow-md transition hover:bg-blue-500 w-full"
          >
            Subscribe
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Newsletter;
