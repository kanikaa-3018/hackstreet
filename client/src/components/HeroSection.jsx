import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import convo1 from "../../public/convo1.jpg";
import convo2 from "../../public/convo2.jpg";
import convo3 from "../../public/convo3.jpg";
import convo4 from "../../public/convo4.jpg";
import convo5 from "../../public/convo5.jpg";
import convo6 from "../../public/convo6.jpg";

const images = [
  {
    src: convo1,
    quote:
      "ABV-IIITM Gwalior is dedicated to nurturing future leaders through academic excellence, innovation, and a commitment to nation-building.",
  },
  {
    src: convo2,
    quote: "Fostering a legacy of learning, leadership, and innovation.",
  },
  {
    src: convo3,
    quote:
      "Every convocation is a testament to the hard work, dedication, and achievements of our students, fostering a legacy of success.",
  },
  {
    src: convo4,
    quote: "Transforming students into future leaders of tomorrow.",
  },
  {
    src: convo5,
    quote: "Celebrating excellence and innovation at ABV-IIITM Gwalior.",
  },
  {
    src: convo6,
    quote:
      "Graduates of ABV-IIITM Gwalior proudly pose with their certificates, commemorating a day of success and celebration during the convocation.",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel className="w-full">
        <CarouselContent
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 4s dissolve",
          }}
        >
          {images.map((img, index) => (
            <CarouselItem key={index} className="w-full">
              <div className="w-full">
                <img
                  src={img.src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[700px] object-cover"
                />
                <p className="pt-2 text-xl font-semibold text-center text-white h-[50px] w-full bg-gradient-to-t from-black via-[#00016A] to-[#353556] shadow-[0px_-10px_20px_rgba(0,0,0,0.5)]">
                  {img.quote}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          onClick={() =>
            setCurrentIndex(
              (prev) => (prev - 1 + images.length) % images.length
            )
          }
        />
        <CarouselNext
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        />
      </Carousel>
    </div>
  );
};

export default HeroSection;
