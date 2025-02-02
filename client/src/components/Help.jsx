import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Help Page Component
const HelpPage = () => {
  const faqData = [
    {
      question: "How can I reset my password?",
      answer: "You can reset your password by going to Settings and clicking on 'Reset Password'.",
    },
    {
      question: "How do I contact support?",
      answer: "You can contact support via the 'Contact Us' section in the Settings page.",
    },
    {
      question: "How do I update my profile?",
      answer: "Go to your Profile page, and click on 'Edit Profile' to update your information.",
    },
    {
      question: "How do I manage notifications?",
      answer: "You can manage notifications under the 'Settings' page in the 'Notifications' section.",
    },
    {
      question: "How do I delete my account?",
      answer: "Account deletion can be requested through the 'Settings' page under 'Account Management'.",
    },
    {
      question: "How do I change my email address?",
      answer: "To change your email, go to 'Profile Settings' and click on 'Edit Email'.",
    },
    {
      question: "How do I link my social media accounts?",
      answer: "You can link your social media accounts in the 'Connections' section of your profile.",
    },
    {
      question: "Can I have multiple accounts?",
      answer: "No, our platform only supports one account per user for security and privacy reasons.",
    },
    {
      question: "How do I report an issue?",
      answer: "You can report issues through the 'Help' section under 'Report an Issue'.",
    },
    {
      question: "How do I change my password?",
      answer: "Go to Settings, click 'Change Password', and follow the instructions.",
    },
    {
      question: "Where can I view my activity history?",
      answer: "You can view your activity history under the 'Activity' tab in your profile settings.",
    },
    {
      question: "How can I delete a post?",
      answer: "To delete a post, go to your feed, click on the three dots next to the post, and select 'Delete'.",
    },
    {
      question: "How do I add a profile picture?",
      answer: "Go to your profile, click on 'Edit Profile', and upload a picture in the 'Profile Picture' section.",
    },
    {
      question: "How do I reset my 2FA settings?",
      answer: "You can reset 2FA settings from the 'Security' section in your account settings.",
    },
    {
      question: "How do I update my privacy settings?",
      answer: "Go to 'Privacy Settings' under 'Account Settings' to adjust who can see your information.",
    },
    {
      question: "Can I block someone on the platform?",
      answer: "Yes, you can block users by going to their profile and clicking 'Block User'.",
    },
    {
      question: "How can I change my notification preferences?",
      answer: "You can customize your notifications in the 'Notification Settings' section under 'Settings'.",
    },
    {
      question: "How can I update my payment information?",
      answer: "Go to 'Billing' under your account settings and click 'Update Payment Information'.",
    },
    {
      question: "What do I do if I encounter a bug?",
      answer: "Please report the bug through the 'Bug Report' section in the Help page.",
    },
    {
      question: "How do I export my data?",
      answer: "To export your data, go to 'Data Settings' and select 'Export Data'.",
    },
    {
      question: "How do I log out of all devices?",
      answer: "You can log out of all devices from the 'Security Settings' page by clicking 'Log Out of All Devices'.",
    },
  ];

  return (
    <motion.div
      className="help-page-container p-6 bg-gray-100 min-h-screen"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        className="text-center text-4xl font-semibold mb-8 text-[#00016a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Help & Support
      </motion.h2>

      <motion.div
        className="faq-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            className="faq-item p-6 bg-white shadow-md rounded-lg transform transition-all hover:scale-105 hover:cursor-pointer hover:shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-medium text-[#00016a] mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          to="/report"
          className="inline-block bg-[#00016a] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Report Page
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HelpPage;
