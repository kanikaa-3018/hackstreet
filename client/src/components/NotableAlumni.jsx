import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import al1 from "../../public/al1.jpeg";
import al2 from "../../public/al2.jpeg";
import al3 from "../../public/al3.jpeg";
import al4 from "../../public/al4.jpeg";
import al5 from "../../public/al5.jpeg";
import al6 from "../../public/al6.jpeg";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const alumniData = [
  {
    name: "John Doe",
    year: "Class of 2024",
    job: "Software Engineer at Google",
    bio: "Passionate about AI and cloud computing, John has contributed to various open-source projects.",
    image: al1,
  },
  {
    name: "Jane Smith",
    year: "Class of 2024",
    job: "Product Manager at Microsoft",
    bio: "Jane is a strategic thinker who excels in user experience and product development.",
    image: al2,
  },
  {
    name: "Alex Johnson",
    year: "Class of 2024",
    job: "Data Scientist at Tesla",
    bio: "Alex specializes in machine learning and data analytics, working on cutting-edge AI models.",
    image: al3,
  },
  {
    name: "Emily Davis",
    year: "Class of 2024",
    job: "Cybersecurity Analyst at IBM",
    bio: "Emily focuses on ethical hacking and security analysis to protect digital assets.",
    image: al4,
  },
  {
    name: "Michael Brown",
    year: "Class of 2024",
    job: "Blockchain Developer at CoinS",
    bio: "Michael is a blockchain enthusiast, building secure and decentralized applications.",
    image: al5,
  },
  {
    name: "Sophia Wilson",
    year: "Class of 2024",
    job: "UX Designer at Adobe",
    bio: "Sophia is a creative UX designer crafting intuitive and accessible digital experiences.",
    image: al6,
  },
  {
    name: "David Martinez",
    year: "Class of 2024",
    job: "Cloud Engineer at AWS",
    bio: "David specializes in cloud computing, optimizing infrastructure for high-scale applications.",
    image: al4,
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
      <h1 className="font-bold text-2xl text-black mt-8 mb-2 px-28">Our Notable Alumnis</h1>
      <div className="overflow-x-auto p-6">
        <div className="flex items-center gap-4">
          <button onClick={goToPrevious} disabled={currentIndex === 0} className="text-xl p-2 bg-gray-200 rounded-md h-16 hover:bg-gray-300 disabled:opacity-50">
            <MdKeyboardArrowLeft />
          </button>

          <div className="flex justify-center items-center overflow-auto gap-6 w-max px-6">
            {alumniData.slice(currentIndex, currentIndex + cardsPerView).map((alumni, index) => (
              <Card key={index} className="w-[300px] shadow-lg">
                <CardHeader className="flex items-center flex-col">
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-32 h-32 object-cover rounded-full border-4 border-gray-300"
                  />
                  <CardTitle className="mt-4 text-xl font-semibold">{alumni.name}</CardTitle>
                  <p className="text-gray-600 font-medium -mt-2">{alumni.job}</p>
                  <p className="text-gray-500">{alumni.year}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm text-center">{alumni.bio}</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline" className="w-full bg-blue-900 text-white hover:bg-[#00016a] hover:text-white">Connect</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <button onClick={goToNext} disabled={currentIndex + cardsPerView >= alumniData.length} className="text-xl p-2 bg-gray-200 rounded-md h-16 hover:bg-gray-300 disabled:opacity-50">
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default NotableAlumni;
