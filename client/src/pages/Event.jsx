import React, { useState } from "react";
import PastEvent from "../components/PastEvent";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import convo7 from "../../public/convo7.jpg";
import convo8 from "../../public/convo8.jpg";
import convo9 from "../../public/convo9.jpg";
import convo10 from "../../public/convo10.jpg";
import convo11 from "../../public/convo11.jpg";
import convo12 from "../../public/convo12.jpg";
import convo13 from "../../public/convo13.jpg";
import convo14 from "../../public/convo14.jpg";
import convo15 from "../../public/convo15.jpg";
import { motion } from "framer-motion";

import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";

export default function EventPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);

  const events = [
    {
      title: "Alumni Meet 2025",
      date: "March 20, 2025",
      description: "Join us for an in-person and virtual alumni gathering.",
      location: "University Campus & Online",
      agenda:
        "Keynote by notable alumni, Panel discussions, Networking sessions",
      speakers: [
        {
          name: "John Doe",
          imageUrl:
            "https://i.pinimg.com/236x/07/27/49/0727496d3933ee05605d97adb157fa37.jpg",
        },
        {
          name: "Jane Smith",
          imageUrl:
            "https://i.pinimg.com/236x/ad/6b/a8/ad6ba822be9fb5d4619051837dfda8e0.jpg",
        },
        {
          name: "Alex Greenr",
          imageUrl:
            "https://i.pinimg.com/236x/72/3a/af/723aaf860c79a2599f8c171edde215ec.jpg",
        },
      ],
      image: convo8,
    },
    {
      title: "Tech Networking Session",
      date: "February 15, 2025",
      description: "A virtual networking event for alumni in tech fields.",
      location: "Online",
      agenda: "Introduction, Networking, Tech presentations",
      speakers: [
        {
          name: "David Lee",
          imageUrl:
            "https://i.pinimg.com/236x/ad/6b/a8/ad6ba822be9fb5d4619051837dfda8e0.jpg",
        },
        {
          name: "Sarah Brown",
          imageUrl:
            "https://i.pinimg.com/236x/07/27/49/0727496d3933ee05605d97adb157fa37.jpg",
        },
      ],
      image: convo9,
    },
    {
      title: "Digital Marketing Workshop",
      date: "April 10, 2025",
      description:
        "Learn the latest strategies in digital marketing with industry experts.",
      location: "University Campus & Virtual",
      agenda:
        "Introduction to Digital Marketing, Social Media Strategies, SEO Basics",
      speakers: [
        {
          name: "Mike Johnson ",
          imageUrl:
            "https://i.pinimg.com/236x/9a/dd/c6/9addc6f22a21fc7ccdfc63d8f2e9a97a.jpg",
        },
        {
          name: "Linda Clarke ",
          imageUrl:
            "https://i.pinimg.com/236x/ad/6b/a8/ad6ba822be9fb5d4619051837dfda8e0.jpg",
        },
      ],
      image: convo10,
    },
    {
      title: "AI and Machine Learning Summit",
      date: "May 25, 2025",
      description:
        "Explore the future of AI and ML with top professionals in the field.",
      location: "Online",
      agenda: "Keynote speech, Machine Learning Trends, AI for business",
      speakers: [
        {
          name: "Dr. Emily Roberts",
          imageUrl:
            "https://i.pinimg.com/236x/07/27/49/0727496d3933ee05605d97adb157fa37.jpg",
        },
        {
          name: "Dr. Mark Lee",
          imageUrl:
            "https://i.pinimg.com/236x/72/3a/af/723aaf860c79a2599f8c171edde215ec.jpg",
        },
      ],
      image: convo11,
    },
    {
      title: "Cybersecurity in 2025",
      date: "June 5, 2025",
      description:
        "An interactive event discussing the future of cybersecurity and how to protect your digital assets.",
      location: "University Campus",
      agenda: "Cybersecurity Basics, Data Protection, Future of Cybersecurity",
      speakers: [
        {
          name: "James Clark",
          imageUrl:
            "https://i.pinimg.com/236x/9a/dd/c6/9addc6f22a21fc7ccdfc63d8f2e9a97a.jpg",
        },
        {
          name: "Olivia White ",
          imageUrl:
            "https://i.pinimg.com/236x/ad/6b/a8/ad6ba822be9fb5d4619051837dfda8e0.jpg",
        },
      ],
      image: convo12,
    },
    {
      title: "Startup Pitch Event",
      date: "July 15, 2025",
      description:
        "Pitch your startup to top investors and receive feedback from industry leaders.",
      location: "University Campus & Online",
      agenda: "Pitching Sessions, Networking with Investors, Closing Remarks",
      speakers: [
        {
          name: "Rachel Green",
          imageUrl:
            "https://i.pinimg.com/236x/07/27/49/0727496d3933ee05605d97adb157fa37.jpg",
        },
        {
          name: "Tom Black",
          imageUrl:
            "https://i.pinimg.com/236x/ad/6b/a8/ad6ba822be9fb5d4619051837dfda8e0.jpg",
        },
      ],
      image: convo13,
    },
    {
      title: "Leadership in Tech Webinar",
      date: "August 2, 2025",
      description:
        "Join us for an insightful webinar on leadership in the tech industry.",
      location: "Online",
      agenda:
        "Leadership Styles, Challenges in Tech Leadership, Career Pathways",
      speakers: [
        {
          name: "Alice Brown ",
          imageUrl:
            "https://i.pinimg.com/236x/72/3a/af/723aaf860c79a2599f8c171edde215ec.jpg",
        },
        {
          name: "Chris White ",
          imageUrl:
            "https://i.pinimg.com/236x/9a/dd/c6/9addc6f22a21fc7ccdfc63d8f2e9a97a.jpg",
        },
      ],
      image: convo14,
    },
    {
      title: "Blockchain and Cryptocurrencies",
      date: "September 18, 2025",
      description:
        "An in-depth session on blockchain technology and cryptocurrency trends.",
      location: "Online",
      agenda:
        "Introduction to Blockchain, Cryptocurrency Trends, Blockchain in Business",
      speakers: [
        {
          name: "David Miller ",
          imageUrl:
            "https://i.pinimg.com/236x/9a/dd/c6/9addc6f22a21fc7ccdfc63d8f2e9a97a.jpg",
        },
        {
          name: "Eve Johnson",
          imageUrl:
            "https://i.pinimg.com/236x/07/27/49/0727496d3933ee05605d97adb157fa37.jpg",
        },
      ],
      image: convo15,
    },
    {
      title: "Sustainable Business Practices",
      date: "October 5, 2025",
      description:
        "Learn how to build a sustainable business that aligns with modern environmental practices.",
      location: "University Campus & Virtual",
      agenda:
        "Sustainable Business Models, Green Technologies, Corporate Responsibility",
      speakers: [
        {
          name: "Samantha Green",
          imageUrl:
            "https://i.pinimg.com/236x/ad/6b/a8/ad6ba822be9fb5d4619051837dfda8e0.jpg",
        },
        {
          name: "Paul Black",
          imageUrl:
            "https://i.pinimg.com/236x/72/3a/af/723aaf860c79a2599f8c171edde215ec.jpg",
        },
      ],
      image: convo13,
    },
    {
      title: "Product Management Conference",
      date: "November 10, 2025",
      description:
        "A conference focused on the evolving role of product management in the tech industry.",
      location: "University Campus & Online",
      agenda:
        "Product Lifecycle, Product Strategy, Innovation in Product Management",
      speakers: [
        {
          name: "Alice Clark ",
          imageUrl:
            "https://i.pinimg.com/236x/07/27/49/0727496d3933ee05605d97adb157fa37.jpg",
        },
        {
          name: "Daniel Brown",
          imageUrl:
            "https://i.pinimg.com/236x/72/3a/af/723aaf860c79a2599f8c171edde215ec.jpg",
        },
      ],
      image: convo14,
    },
  ];

  const eventsPerPage = 3;
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const handleEventClick = (event) => {
    setEventDetails(event); 
    setIsModalOpen(true);
  };

  const visibleEvents = events.slice(
    currentIndex * eventsPerPage,
    (currentIndex + 1) * eventsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url(${convo7})` }}
        ></div>

        {/* Overlay Section */}
        <motion.section
          className="relative text-center py-20 bg-blue-600 bg-opacity-70 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-bold">Upcoming Events</h1>
          <p className="mt-2 text-lg">
            Don't miss out on exciting opportunities to connect and grow.
          </p>
        </motion.section>
      </div>

      {/* Events List Section */}
      <motion.section
        className="p-10 flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <div className="relative w-full max-w-7xl">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 z-10">
            <Button
              onClick={handlePrevious}
              className="w-10 h-20 bg-[#00016a] hover:bg-blue-900 text-white flex items-center justify-center rounded-none -ml-14"
            >
              <FaChevronLeft />
            </Button>
          </div>

          <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 z-10">
            <Button
              onClick={handleNext}
              className="w-10 h-20 bg-[#00016a] hover:bg-blue-900 text-white flex items-center justify-center rounded-none -mr-14"
            >
              <FaChevronRight />
            </Button>
          </div>

          {/* Events Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {visibleEvents.map((event, index) => (
              <Card
                key={index}
                className="min-w-[20px] max-w-[350px] h-auto bg-white shadow-lg rounded-lg"
              >
                <CardContent>
                  <div className="flex justify-center mb-4 flex-col -mx-6">
                    <div className="w-full flex">
                      <img
                        src={event.image}
                        alt=""
                        className="w-full h-[200px] object-cover rounded-tr-lg rounded-tl-lg mb-2"
                      />
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                      <h2 className="font-bold text-lg">{event.title}</h2>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                  </div>

                  <p className="text-gray-700">{event.description}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <Button
                    className="mt-4 w-full bg-[#00016a] hover:bg-[#bbbbbb] text-white py-2 rounded-none"
                    onClick={() => handleEventClick(event)} // Passing event details to modal
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Modal for Event Details */}
      {isModalOpen && eventDetails && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] shadow-2xl transform transition-all duration-300 max-w-[500px]">
            {/* Image Section */}
            <div className="mb-4 rounded-lg overflow-hidden">
              <img
                src={
                  eventDetails.image || "https://via.placeholder.com/500x300"
                } 
                alt="Event"
                className="w-full h-56 object-cover"
              />
            </div>

            <div className="space-y-4">
              {/* Title and Close Button */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {eventDetails.title}
                </h2>
                <span
                  className="text-3xl text-gray-600 cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                >
                  &times;
                </span>
              </div>

              {/* Event Info Section */}
              <div className="space-y-2 text-gray-800">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-600" />
                  <p>
                    <strong className="font-semibold">Date:</strong>{" "}
                    {eventDetails.date}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2 text-gray-600" />
                  <p>
                    <strong className="font-semibold">Time:</strong>{" "}
                    {eventDetails.time}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-gray-600" />
                  <p>
                    <strong className="font-semibold">Location:</strong>{" "}
                    {eventDetails.location}
                  </p>
                </div>
              </div>

              {/* Agenda Section */}
              <div className="space-y-2 text-gray-800">
                <h3 className="font-semibold">Agenda:</h3>
                <p>{eventDetails.agenda}</p>
              </div>

              {/* Speakers Section */}
              <div className="space-y-2 text-gray-800">
                <h3 className="font-semibold">Speakers:</h3>
                <div className="flex space-x-4">
                  {eventDetails.speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="flex items-center flex-col gap-1"
                    >
                      <img
                        src={
                          speaker.imageUrl ||
                          "https://i.pinimg.com/236x/5d/0c/50/5d0c50f79be27f5120c5e5f3158ce52f.jpg"
                        }
                        alt={speaker.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                      />
                      <span className="ml-2">{speaker.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <button
                className="bg-gray-800 text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-700 transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <PastEvent />
    </div>
  );
}
