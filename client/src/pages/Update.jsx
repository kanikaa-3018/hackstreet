import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import updateImage from "../../public/convo7.jpg";

const updates = [
  { title: "Alumni Meet 2025 Announced!", date: "March 10, 2025", description: "Join us for a grand reunion with networking opportunities and guest speakers." },
  { title: "Career Fair 2025", date: "April 5, 2025", description: "Explore job opportunities with top recruiters attending our alumni career fair." },
  { title: "New Mentorship Program Launched", date: "May 20, 2025", description: "Connect with experienced alumni mentors to guide you in your career path." },
  { title: "Fundraising Drive for Scholarships", date: "June 15, 2025", description: "Support future students by contributing to our alumni scholarship fund." },
  { title: "Upcoming Webinar: Tech Trends 2025", date: "July 10, 2025", description: "Join industry leaders to explore the latest trends in technology and innovation." },
  { title: "Alumni Sports Meet 2025", date: "August 25, 2025", description: "Reconnect with fellow alumni through a fun and competitive sports event." },
  { title: "Annual Research Symposium", date: "September 30, 2025", description: "Showcase and discuss groundbreaking research conducted by alumni and faculty." },
  { title: "Entrepreneurship Bootcamp", date: "October 20, 2025", description: "Learn from successful entrepreneurs and take your startup idea to the next level." },
  { title: "Tech Startup Pitch Competition", date: "November 15, 2025", description: "Pitch your startup ideas to investors and industry experts." },
  { title: "Alumni Leadership Awards", date: "December 1, 2025", description: "Honoring alumni who have made significant contributions in their respective fields." },
  { title: "Global Alumni Networking Event", date: "January 25, 2026", description: "Join alumni from around the world for a virtual networking event." },
  { title: "Social Impact Hackathon 2026", date: "February 15, 2026", description: "Collaborate on innovative solutions for social challenges." },
  { title: "Health & Wellness Retreat", date: "March 10, 2026", description: "Join alumni for a relaxing retreat focusing on mental and physical health." },
  { title: "Alumni Art Exhibition", date: "April 20, 2026", description: "Explore the creative works of our talented alumni artists." },
  { title: "Alumni Talent Show", date: "May 5, 2026", description: "Showcase your talents in music, dance, or other performances." },
  { title: "Alumni Book Club Launch", date: "June 10, 2026", description: "Join our alumni book club to discuss and review thought-provoking books." },
  { title: "Networking Dinner for Entrepreneurs", date: "July 18, 2026", description: "A networking dinner for alumni entrepreneurs to collaborate and share insights." },
  { title: "Sustainability Conference 2026", date: "August 22, 2026", description: "Discuss sustainability practices and how to integrate them into business strategies." },
  { title: "Tech Talk Series: Future of AI", date: "September 5, 2026", description: "Attend a series of talks from experts on the future of Artificial Intelligence." },
  { title: "Global Mentorship Summit", date: "October 14, 2026", description: "Alumni mentors and mentees come together for a global summit on mentorship success." }
];

export default function UpdatesPage() {
  const [visibleUpdates, setVisibleUpdates] = useState(3);

  const loadMore = () => {
    setVisibleUpdates((prev) => prev + 2);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <div className="relative">
        <section className="relative text-center py-20 bg-[#00016a] bg-opacity-80 text-white">
          <h1 className="text-5xl font-bold">Latest Updates</h1>
          <p className="mt-3 text-lg">Stay informed about alumni news, events, and initiatives.</p>
        </section>
      </div>

      {/* Updates List */}
      <section className="py-12 px-6 min-w-4xl max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.slice(0, visibleUpdates).map((update, index) => (
            <Card key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div className="flex items-center gap-2 mb-2">
                  <FaCalendarAlt className="text-gray-500 text-lg" />
                  <p className="text-sm text-gray-500">{update.date}</p>
                </div>
                <div className="flex flex-col mb-4">
                  <h2 className="font-bold text-xl mb-2">{update.title}</h2>
                  <p className="text-gray-700 text-ellipsis overflow-hidden">{update.description}</p>
                </div>
                <Button className="mt-4 w-full bg-[#00016a] hover:bg-gray-500 text-white py-2 flex items-center justify-center">
                  Learn More <FaArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {visibleUpdates < updates.length && (
          <div className="flex justify-center mt-6">
            <Button onClick={loadMore} className="bg-[#00016a] hover:bg-gray-500 text-white py-2 px-6 rounded-lg">
              Load More
            </Button>
          </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-10">
        <p className="text-sm">&copy; 2025 Alumni Association | Stay Connected, Stay Updated!</p>
      </footer>
    </div>
  );
}
