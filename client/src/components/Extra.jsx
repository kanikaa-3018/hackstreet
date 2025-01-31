import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

import { FaBookReader } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";

const Extra = () => {
  const cardData = [
    {
      title: "Alumni in your city",
      description: "Find alumni living in your city & connect with them",
      buttonText: "Members In My City",
      icon: <FaMapLocationDot />,
    },
    {
      title: "Career Opportunities",
      description: "Find and share career opportunities within the community",
      buttonText: "View Opportunities",
      icon: <BsBuildingsFill />,
    },
    {
      title: "Scholarships",
      description: "Explore scholarships available through alumni connections.",
      buttonText: "Find Scholarships",
      icon: <FaBookReader />,
    },
    {
      title: "Your Profile",
      description:
        "Manage your profile and connect with alumni of similar interests.",
      buttonText: "View Profile",
      icon: <FaUserTie />,
    },
  ];

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-6 mt-16 mb-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay:6 }}
    >
      {cardData.map((card, index) => (
        <Card
          key={index}
          className="w-[300px] text-center border-gray-300 shadow-md p-4"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {card.title}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {card.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="text-black text-4xl">{card.icon}</div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="bg-[#bbbbbb] text-[#000161] hover:text-white mt-4">
              {card.buttonText}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </motion.div>
  );
};

export default Extra;
