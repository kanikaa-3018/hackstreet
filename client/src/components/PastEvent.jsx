import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
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

export default function AlumniHomepage() {
  const scrollRef = useRef(null);

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
      description: "An evening to reconnect and collaborate with fellow alumni.",
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
      description: "Collaborative coding event to develop solutions for social good.",
    },
    {
      title: "Tech Talk with Industry Leaders",
      date: "25",
      month: "Feb",
      description: "Leading experts share their insights on emerging tech trends.",
    },
    {
      title: "Alumni Talent Showcase",
      date: "30",
      month: "Jul",
      description: "Showcasing the diverse talents of alumni across various fields.",
    },
  ];

  const alumniData = [
    {
      name: "Apeksha Jain",
      company: "Google",
      description: "Building AI-driven solutions at Google.",
    },
    {
      name: "Rahul Mehta",
      company: "Microsoft",
      description: "Working on Azure cloud innovations.",
    },
    {
      name: "Ananya Verma",
      company: "Amazon",
      description: "Scaling AWS infrastructure worldwide.",
    },
    {
      name: "Vishal Kumar",
      company: "Facebook",
      description: "Driving innovation at Meta.",
    },
    {
      name: "Neha Gupta",
      company: "Apple",
      description: "Leading design for iOS apps.",
    },
    {
      name: "Sanjay Singh",
      company: "Tesla",
      description: "Revolutionizing electric vehicles.",
    },
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 1; 

    const scroll = () => {
      scrollPosition += scrollSpeed;

      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = scrollPosition;
      }

      requestAnimationFrame(scroll);
    };

    const animation = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animation);
  }, []);

  const doubledAlumniData = [...alumniData, ...alumniData];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-16 bg-[#00016a] text-white" style={{}}>
        <h1 className="text-4xl font-bold">Stay Connected. Build Stronger Bonds.</h1>
        <p className="mt-2 text-lg">
          Join a thriving community of professionals, mentors, and lifelong friends.
        </p>
        <div className="mt-4 space-x-4">
          <Button className="bg-white text-[#00016a] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-500">
            Join Now
          </Button>
          <Button className="bg-gray-300 text-[#00016a] px-6 py-3 rounded-lg shadow-md hover:bg-gray-500">
            Explore Community
          </Button>
        </div>
      </section>

      {/* Featured Alumni Stories */}
      <section className="p-10 bg-white overflow-hidden">
        <h2 className="text-2xl font-bold text-center">Alumni in Spotlight</h2>
        <p className="text-center text-gray-600 mb-6">Meet alumni making an impact</p>
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden space-x-6"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {doubledAlumniData.map((alumni, index) => (
            <div key={index} className="w-96 flex-shrink-0">
              <Card className="p-4">
                <CardContent>
                  <p className="font-semibold">{alumni.name}, {alumni.company}</p>
                  <p className="text-gray-600">{alumni.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Past Events Section */}
      <section className="p-10 bg-white">
        <h2 className="text-2xl font-bold text-center">Past Events</h2>
        <div className="flex flex-col gap-6 mt-6">
          {pastEvents.map((event, index) => {
            const randomColor = distinctColors[Math.floor(Math.random() * distinctColors.length)];
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="flex items-center gap-6">
                  <div
                    className={`flex flex-col gap-1 w-20 h-20 rounded-md ${randomColor} p-2 justify-center items-center`}
                  >
                    <h1 className="text-white text-4xl font-extrabold">{event.date}</h1>
                    <p className="text-white text-sm font-medium">{event.month}</p>
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
