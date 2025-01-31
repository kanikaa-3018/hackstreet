import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UpdatesPage() {
  // Sample data for updates
  const updates = [
    {
      title: "Alumni Meet 2025 Announced!",
      date: "January 28, 2025",
      description: "Join us for the biggest alumni gathering of the year! Connect with old friends and network with professionals.",
    },
    {
      title: "New Internship Program Launched",
      date: "February 5, 2025",
      description: "A new internship initiative for students, exclusively for alumni referrals. Apply now!",
    },
    {
      title: "Alumni Spotlight: Success Stories",
      date: "February 15, 2025",
      description: "Read inspiring success stories of alumni who have made a significant impact in their industries.",
    },
  ];

  const announcements = [
    {
      title: "Fundraising Campaign for Student Scholarships",
      date: "March 1, 2025",
      description: "Help support future students by contributing to our scholarship fund for deserving candidates.",
    },
    {
      title: "University Ranked in Top 10!",
      date: "March 10, 2025",
      description: "Our institution has been ranked among the top 10 universities in the country, thanks to our alumni contributions!",
    },
  ];

  const successStories = [
    {
      name: "Amit Sharma",
      achievement: "Started a successful AI startup, now valued at $10M.",
      year: "Batch of 2015",
    },
    {
      name: "Neha Verma",
      achievement: "Recognized among Forbes 30 Under 30 for innovation in healthcare.",
      year: "Batch of 2012",
    },
    {
      name: "Rahul Gupta",
      achievement: "Now VP at Google, leading AI research.",
      year: "Batch of 2010",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <h1 className="text-5xl font-bold">Latest Updates & Announcements</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto">
          Stay informed about alumni news, university updates, success stories, and upcoming events.
        </p>
      </section>

      {/* Recent Updates Section */}
      <section className="p-12">
        <h2 className="text-3xl font-bold text-center mb-6">Recent Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.map((update, index) => (
            <Card key={index} className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">{update.title}</h3>
              <p className="text-sm text-gray-600">{update.date}</p>
              <p className="mt-2 text-gray-700">{update.description}</p>
              <Button className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700">
                Read More
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Announcements & Notices */}
      <section className="p-12 bg-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6">Announcements & Notices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map((announcement, index) => (
            <Card key={index} className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">{announcement.title}</h3>
              <p className="text-sm text-gray-600">{announcement.date}</p>
              <p className="mt-2 text-gray-700">{announcement.description}</p>
              <Button className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700">
                Learn More
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="p-12 bg-gray-200 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-lg text-gray-700 mb-6">
          Get the latest updates, news, and events directly in your inbox.
        </p>
        <div className="flex justify-center">
          <Input type="email" placeholder="Enter your email" className="w-80 p-3 rounded-l-lg border border-gray-300" />
          <Button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700">
            Subscribe
          </Button>
        </div>
      </section>
    </div>
  );
}
