import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"; // For the quote icons
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // For the star icons

// Testimonial data array with ratings
const testimonials = [
  {
    name: "John Doe",
    year: "Class of 2022",
    job: "Software Engineer at Google",
    testimonial:
      "This institution provided me with the foundational knowledge and skills that helped me grow in my career. I'm forever grateful for the mentorship and opportunities it gave me.",
    image: "https://i.pinimg.com/736x/6b/6f/7d/6b6f7d173d5e1ead9d4fa2c9b8dd7d88.jpg", // Image URL should be correct here
    rating: 4.5, // Rating out of 5
  },
  {
    name: "Jane Smith",
    year: "Class of 2021",
    job: "Product Manager at Microsoft",
    testimonial:
      "The alumni network has been a great resource throughout my professional journey. Connecting with others in the field has opened up so many doors for me.",
    image: "https://i.pinimg.com/736x/19/b6/fe/19b6fec02d7b32c92e475ad08dbc871f.jpg", // Image URL should be correct here
    rating: 5, // Rating out of 5
  },
  {
    name: "Alex Johnson",
    year: "Class of 2020",
    job: "Data Scientist at Tesla",
    testimonial:
      "The practical experience I gained through projects and internships at this institution has been invaluable. It's helped me excel in my career as a data scientist.",
    image: "https://i.pinimg.com/736x/6a/80/c0/6a80c01d06ff53c0d0de80ab865e0d23.jpg", // Image URL should be correct here
    rating: 3.5, // Rating out of 5
  },
  // Add more testimonials as needed
];

const StarRating = ({ rating }) => {
  // Calculate full stars, half stars, and empty stars
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex justify-center gap-1">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className="text-yellow-500" />
      ))}
      {[...Array(halfStars)].map((_, index) => (
        <FaStarHalfAlt key={index} className="text-yellow-500" />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} className="text-yellow-500" />
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="py-10 px-6">
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        What Our Alumni Say
      </motion.h2>
      <div className="flex justify-center gap-6 overflow-hidden">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="w-80"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.3, duration: 0.5 }}
          >
            <Card className="shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="flex items-center flex-col">
                <div
                  className="rounded-full w-24 h-24 mb-4"
                  style={{
                    backgroundImage: `url(${testimonial.image})`, // Correct way to add the image URL
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <CardTitle className="text-xl font-semibold text-center">
                  {testimonial.name}
                </CardTitle>
                <p className="text-gray-600">{testimonial.job}</p>
                <p className="text-gray-500">{testimonial.year}</p>
              </CardHeader>
              <CardContent className="text-center">
                {/* Stars above the testimonial description */}
                <div className="mt-4">
                  <StarRating rating={testimonial.rating} />
                </div>
                {/* Testimonial text with quotes */}
                <div className="text-gray-700 mt-4">
                  <FaQuoteLeft className="inline text-xl text-gray-400" />
                  <p className="italic my-2">{testimonial.testimonial}</p>
                  <FaQuoteRight className="inline text-xl text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
