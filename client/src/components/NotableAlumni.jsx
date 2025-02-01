import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import al1 from "../../public/al1.jpeg";
import al2 from "../../public/al2.jpeg";
import al3 from "../../public/al3.jpeg";
import al4 from "../../public/al4.jpeg";
import al5 from "../../public/al5.jpeg";
import al6 from "../../public/al6.jpeg";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa"; // Importing icon libraries
import { motion } from "framer-motion";

const alumniData = [
  {
    name: "John Doe",
    year: "Class of 2024",
    job: "Software Engineer at Google",
    bio: "Passionate about AI and cloud computing, John has contributed to various open-source projects.",
    image: al1,
    linkedin: "#",
    github: "#",
    website: "#",
  },
  {
    name: "Jane Smith",
    year: "Class of 2024",
    job: "Product Manager at Microsoft",
    bio: "Jane is a strategic thinker who excels in user experience and product development.",
    image: al2,
    linkedin: "#",
    github: "#",
    website: "#",
  },
  {
    name: "Alex Johnson",
    year: "Class of 2024",
    job: "Data Scientist at Tesla",
    bio: "Alex specializes in machine learning and data analytics, working on cutting-edge AI models.",
    image: al3,
    linkedin: "#",
    github: "#",
    website: "#",
  },
  {
    name: "Emily Davis",
    year: "Class of 2024",
    job: "Cybersecurity Analyst at IBM",
    bio: "Emily focuses on ethical hacking and security analysis to protect digital assets.",
    image: al4,
    linkedin: "#",
    github: "#",
    website: "#",
  },
  {
    name: "Michael Brown",
    year: "Class of 2024",
    job: "Blockchain Developer at CoinS",
    bio: "Michael is a blockchain enthusiast, building secure and decentralized applications.",
    image: al5,
    linkedin: "#",
    github: "#",
    website: "#",
  },
  {
    name: "Sophia Wilson",
    year: "Class of 2024",
    job: "UX Designer at Adobe",
    bio: "Sophia is a creative UX designer crafting intuitive and accessible digital experiences.",
    image: al6,
    linkedin: "#",
    github: "#",
    website: "#",
  },
  {
    name: "David Martinez",
    year: "Class of 2024",
    job: "Cloud Engineer at AWS",
    bio: "David specializes in cloud computing, optimizing infrastructure for high-scale applications.",
    image: al4,
    linkedin: "#",
    github: "#",
    website: "#",
  },
];

const NotableAlumni = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 4; // You can adjust this value based on how many cards you want to show at once

  const goToNext = () => {
    if (currentIndex < alumniData.length - cardsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <motion.h1
        className="font-bold text-2xl text-black mt-8 mb-2 px-28"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
      >
        Our Notable Alumnis
      </motion.h1>
      <div className="overflow-x-auto p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="text-xl p-2 bg-gray-200 rounded-md h-16 hover:bg-gray-300 disabled:opacity-50"
          >
            <MdKeyboardArrowLeft />
          </button>

          <motion.div
            className="flex justify-center items-center overflow-auto gap-6 w-max px-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            {alumniData
              .slice(currentIndex, currentIndex + cardsPerView)
              .map((alumni, index) => (
                <Card key={index} className="w-[300px] shadow-lg">
                  <CardHeader className="flex items-center flex-col">
                    <div
                      className="image-container relative"
                      style={{
                        width: "160px",
                        height: "160px",
                        overflow: "hidden",
                        borderRadius: "50%",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <img
                        src={alumni.image}
                        alt={alumni.name}
                        className="w-full h-full object-cover transform transition-all duration-500"
                        style={{
                          transformStyle: "preserve-3d",
                          backfaceVisibility: "hidden",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "rotateY(180deg)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "rotateY(0deg)";
                        }}
                      />
                    </div>

                    <CardTitle className="mt-4 text-xl font-semibold">
                      {alumni.name}
                    </CardTitle>
                    <p className="text-gray-600 font-medium -mt-2">
                      {alumni.job}
                    </p>
                    <p className="text-gray-500">{alumni.year}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm text-center">
                      {alumni.bio}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button
                      variant="outline"
                      className="w-full bg-blue-900 text-white hover:bg-[#00016a] hover:text-white"
                    >
                      Connect
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </motion.div>

          <button
            onClick={goToNext}
            disabled={currentIndex + cardsPerView >= alumniData.length}
            className="text-xl p-2 bg-gray-200 rounded-md h-16 hover:bg-gray-300 disabled:opacity-50"
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default NotableAlumni;
