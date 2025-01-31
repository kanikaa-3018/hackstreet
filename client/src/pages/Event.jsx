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

export default function EventPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const events = [
    {
      title: "Alumni Meet 2025",
      date: "March 20, 2025",
      description: "Join us for an in-person and virtual alumni gathering.",
      location: "University Campus & Online",
      image: convo8,
    },
    {
      title: "Tech Networking Session",
      date: "February 15, 2025",
      description: "A virtual networking event for alumni in tech fields.",
      location: "Online",
      image: convo9, // Add image for this event
    },
    {
      title: "Leadership Summit",
      date: "April 10, 2025",
      description: "A one-day summit with inspiring leaders from various industries.",
      location: "Convention Center, City Hall",
      image: convo10, // Add image for this event
    },
    {
      title: "Career Fair 2025",
      date: "May 5, 2025",
      description: "Connect with top employers and explore career opportunities.",
      location: "University Career Center",
      image: convo11, // Add image for this event
    },
    {
      title: "Entrepreneur Workshop",
      date: "June 15, 2025",
      description: "Learn from successful entrepreneurs and start your journey.",
      location: "Business School Auditorium",
      image: convo12, // Add image for this event
    },
    {
      title: "Research Symposium",
      date: "July 8, 2025",
      description: "Showcase of groundbreaking research by alumni and faculty.",
      location: "Science Complex",
      image: convo13, // Add image for this event
    },
    {
      title: "Global Alumni Day",
      date: "August 20, 2025",
      description: "Worldwide celebration connecting alumni across continents.",
      location: "Multiple Locations & Online",
      image: convo14, // Add image for this event
    },
    {
      title: "Innovation Conference",
      date: "September 12, 2025",
      description: "Explore latest trends in technology and innovation.",
      location: "Tech Hub Center",
      image: convo15, // Add image for this event
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

  const visibleEvents = events.slice(
    currentIndex * eventsPerPage,
    (currentIndex + 1) * eventsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header Section */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <h1 className="text-4xl font-bold">Upcoming Events</h1>
        <p className="mt-2 text-lg">
          Don't miss out on exciting opportunities to connect and grow.
        </p>
      </section>

      {/* Events List Section */}
      <section className="p-10 flex justify-center">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {visibleEvents.map((event, index) => (
              <Card
                key={index}
                className="min-w-[20px] max-w-[350px] h-auto bg-white shadow-lg rounded-lg"
              >
                <CardContent >
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
                  <Button className="mt-4 w-full bg-[#00016a] hover:bg-[#bbbbbb] text-white py-2 rounded-none">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

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
      </section>

      <PastEvent />
    </div>
  );
}
