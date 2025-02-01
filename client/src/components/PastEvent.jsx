import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const distinctColors = [
  "bg-pink-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-yellow-500",
  "bg-teal-500",
  "bg-red-500",
  "bg-indigo-500",
];

const pastEvents = [
  {
    title: "Annual Alumni Meet 2023",
    date: "18",
    month: "Mar",
    description: "A grand reunion with over 500 alumni attending.",
  },
  {
    title: "Tech Summit 2022",
    date: "22",
    month: "Nov",
    description: "Exploring advancements in AI and ML with industry leaders.",
  },
  {
    title: "Career Guidance Webinar",
    date: "5",
    month: "Aug",
    description: "Helping young graduates navigate their career paths.",
  },
  {
    title: "Alumni Networking Gala",
    date: "10",
    month: "Dec",
    description:
      "An evening to reconnect and collaborate with fellow alumni.",
  },
  {
    title: "Startup Pitch Contest",
    date: "15",
    month: "Sep",
    description: "Alumni entrepreneurs pitch their innovative startup ideas.",
  },
  {
    title: "Code for Good Hackathon",
    date: "8",
    month: "Jan",
    description:
      "Collaborative coding event to develop solutions for social good.",
  },
  {
    title: "Tech Talk with Industry Leaders",
    date: "25",
    month: "Feb",
    description:
      "Leading experts share their insights on emerging tech trends.",
  },
  {
    title: "Alumni Talent Showcase",
    date: "30",
    month: "Jul",
    description:
      "Showcasing the diverse talents of alumni across various fields.",
  },
];

export default function AlumniHomepage() {
  const [showPopup, setShowPopup] = useState(false);

  const handleJoinNowClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <motion.section
        className="text-center py-16 bg-[#00016a] text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
      >
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
        >
          Stay Connected. Build Stronger Bonds.
        </motion.h1>
        <motion.p
          className="mt-2 text-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.8 }}
        >
          Join a thriving community of professionals, mentors, and lifelong
          friends.
        </motion.p>
        <motion.div
          className="mt-4 space-x-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 2 }}
        >
          <Button
            className="bg-white text-[#00016a] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-500"
            onClick={handleJoinNowClick}
          >
            Join Now
          </Button>
          <Link to="/community">
            <Button
              className="bg-gray-300 text-[#00016a] px-6 py-3 rounded-lg shadow-md hover:bg-gray-500"
            >
              Explore Community
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <div className="text-4xl text-green-700">&#10004;</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Congratulations, You've Joined!
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Past Events Section */}
      <section className="p-10 bg-white">
        <h2 className="text-4xl font-bold text-center">Past Events</h2>
        <div className="flex flex-col gap-6 mt-6">
          {pastEvents.map((event, index) => {
            const randomColor =
              distinctColors[Math.floor(Math.random() * distinctColors.length)];
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="flex items-center gap-6">
                  <div
                    className={`flex flex-col gap-1 w-20 h-20 rounded-md ${randomColor} p-2 justify-center items-center`}
                  >
                    <h1 className="text-white text-4xl font-extrabold">
                      {event.date}
                    </h1>
                    <p className="text-white text-sm font-medium">
                      {event.month}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-xl">{event.title}</p>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
