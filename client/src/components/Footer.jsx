import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3">About Us</h2>
            <p className="text-gray-400">
              Connecting alumni with opportunities, mentorship, and networking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/event" className="text-gray-400 hover:text-white">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Scholarships
                </a>
              </li>
              <li>
                <a href="https://iiitm.ac.in/index.php/en/component/content/category/97-admissions?Itemid=437" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.facebook.com/iiitm/" className="text-gray-400 hover:text-white text-xl">
                <FaFacebookF />
              </a>
              <a href="https://x.com/i/flow/login?redirect_after_login=%2FAbvIiitm" className="text-gray-400 hover:text-white text-xl">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/iiitmgwaliorofficial/reels/" className="text-gray-400 hover:text-white text-xl">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/school/abv-indian-institute-of-information-technology-and-management/posts/?feedView=all" className="text-gray-400 hover:text-white text-xl">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Alumni Network. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
