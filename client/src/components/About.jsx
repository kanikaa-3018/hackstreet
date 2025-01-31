import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-[#00016a] text-white py-16 px-8 text-center mt-16">
      <motion.h2
        className="text-3xl font-bold mb-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        About Us
      </motion.h2>
      <motion.p
        className="text-lg leading-relaxed max-w-3xl mx-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.9, duration: 0.5 }}
      >
        Our Alumni Network serves as a bridge between past and present,
        fostering lifelong intellectual, professional, and personal connections.
        We strive to strengthen the bond among alumni and the institution,
        ensuring continuous growth, mentorship, and collaboration. Through
        various initiatives, we empower alumni to contribute to the institution
        and society, creating a global community of changemakers.
      </motion.p>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 4.2, duration: 0.5 }}
        >
          <h3 className="text-4xl font-bold">10+</h3>
          <p className="text-sm opacity-80">Departments</p>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 4.4, duration: 0.5 }}
        >
          <h3 className="text-4xl font-bold">500+</h3>
          <p className="text-sm opacity-80">Faculty Members</p>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 4.9, duration: 0.5 }}
        >
          <h3 className="text-4xl font-bold">20,000+</h3>
          <p className="text-sm opacity-80">Students</p>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 5.3, duration: 0.5 }}
        >
          <h3 className="text-4xl font-bold">50,000+</h3>
          <p className="text-sm opacity-80">Alumni Worldwide</p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
