import React from "react";

const About = () => {
  return (
    <div className="bg-[#00016a] text-white py-16 px-8 text-center mt-16">
      <h2 className="text-3xl font-bold mb-6">About Us</h2>
      <p className="text-lg leading-relaxed max-w-3xl mx-auto">
        Our Alumni Network serves as a bridge between past and present, fostering lifelong intellectual, professional, and personal connections. 
        We strive to strengthen the bond among alumni and the institution, ensuring continuous growth, mentorship, and collaboration. 
        Through various initiatives, we empower alumni to contribute to the institution and society, creating a global community of changemakers.
      </p>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        <div>
          <h3 className="text-4xl font-bold">10+</h3>
          <p className="text-sm opacity-80">Departments</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">500+</h3>
          <p className="text-sm opacity-80">Faculty Members</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">20,000+</h3>
          <p className="text-sm opacity-80">Students</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">50,000+</h3>
          <p className="text-sm opacity-80">Alumni Worldwide</p>
        </div>
      </div>
    </div>
  );
};

export default About;
