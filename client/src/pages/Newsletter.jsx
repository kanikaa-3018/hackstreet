import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Sample newsletter articles
  const newsletters = [
    {
      title: "Alumni Newsletter - January 2025",
      date: "January 20, 2025",
      excerpt: "The latest updates and success stories from alumni worldwide.",
    },
    {
      title: "Tech Innovations in 2025",
      date: "February 10, 2025",
      excerpt: "Exploring the future of tech and the role of alumni in shaping it.",
    },
    {
      title: "Career Opportunities for Alumni",
      date: "March 1, 2025",
      excerpt: "Find out the latest job openings and career tips for our alumni.",
    },
  ];

  const handleSubscription = (e) => {
    e.preventDefault();
    // You can add form submission logic here (e.g., sending the email to a backend)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header Section */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <h1 className="text-4xl font-bold">Stay Updated with Our Newsletter</h1>
        <p className="mt-2 text-lg">Subscribe to receive the latest news and updates from the alumni community.</p>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="p-10 flex justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Subscribe Now</h2>

          <form onSubmit={handleSubscription} className="flex flex-col items-center">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 p-3 w-full border rounded-md"
              required
            />
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 p-3 w-full rounded-md">
              {submitted ? "Subscribed!" : "Subscribe"}
            </Button>
          </form>
          {submitted && (
            <p className="mt-4 text-green-500 text-center">Thank you for subscribing! You will receive updates soon.</p>
          )}
        </div>
      </section>

      {/* Newsletter Archive Section */}
      <section className="p-10 bg-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6">Previous Newsletters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsletters.map((newsletter, index) => (
            <Card key={index} className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">{newsletter.title}</h3>
              <p className="text-sm text-gray-600">{newsletter.date}</p>
              <p className="mt-2 text-gray-700">{newsletter.excerpt}</p>
              <Button className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700">Read More</Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
