import React, { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

// Custom theme
const theme = {
  background: "#f5f5f5",
  headerBgColor: "#444",
  headerFontColor: "#fff",
  headerFontSize: "18px",
  botBubbleColor: "#666",
  botFontColor: "#fff",
  userBubbleColor: "#888",
  userFontColor: "#fff",
  fontFamily: "Poppins, sans-serif",
};

// Data set of intents
const intents = {
  intents: [
    {
      tag: "greeting",
      patterns: ["hi", "hello", "hey", "good day", "what's up", "how are you"],
      responses: [
        "Hello! How can I assist you today?",
        "Hi there! What can I do for you?",
      ],
    },
    {
      tag: "admissions",
      patterns: ["admission", "apply", "enroll"],
      responses: [
        "For admissions, please visit our online portal and check the requirements.",
      ],
    },
    {
      tag: "courses",
      patterns: ["course", "subject", "class"],
      responses: [
        "We offer a variety of courses across multiple disciplines. Check our website for detailed information.",
      ],
    },
    {
      tag: "placements",
      patterns: ["placement", "job", "career"],
      responses: [
        "Our placement cell provides excellent support and has tie-ups with top companies.",
      ],
    },

    {
      tag: "greeting",
      patterns: [
        "Hi",
        "How are you?",
        "Is anyone there?",
        "Hello",
        "Good day",
        "What's up",
        "how are ya",
        "heyy",
        "whatsup",
        "??? ??? ??",
      ],
      responses: [
        "Hello!",
        "Good to see you again!",
        "Hi there, how can I help?",
      ],
      context_set: "",
    },
    {
      tag: "goodbye",
      patterns: [
        "cya",
        "see you",
        "bye bye",
        "See you later",
        "Goodbye",
        "I am Leaving",
        "Bye",
        "Have a Good day",
        "talk to you later",
        "ttyl",
        "i got to go",
        "gtg",
      ],
      responses: [
        "Sad to see you go :(",
        "Talk to you later",
        "Goodbye!",
        "Come back soon",
      ],
      context_set: "",
    },
    
    {
      tag: "salutaion",
      patterns: [
        "okk",
        "okie",
        "nice work",
        "well done",
        "good job",
        "thanks for the help",
        "Thank You",
        "its ok",
        "Thanks",
        "Good work",
        "k",
        "ok",
        "okay",
      ],
      responses: [
        "I am glad I helped you",
        "welcome, anything else i can assist you with?",
      ],
      context_set: "",
    },
    {
      tag: "task",
      patterns: [
        "what can you do",
        "what are the thing you can do",
        "things you can do",
        "what can u do for me",
        "how u can help me",
        "why i should use you",
      ],
      responses: [
        "I can answer to low-intermediate questions regarding college",
        "You can ask me questions regarding college, and i will try to answer them",
      ],
      context_set: "",
    },
    {
      tag: "ragging",
      patterns: [
        "ragging",
        "is ragging practice active in college",
        "does college have any antiragging facility",
        "is there any ragging cases",
        "is ragging done here",
        "ragging against",
        "antiragging facility",
        "ragging juniors",
        "ragging history",
        "ragging incidents",
      ],
      responses: [
        "We are Proud to tell you that our college provides ragging free environment, and we have strict rules against ragging",
      ],
      context_set: "",
    },
    {
      tag: "hod",
      patterns: ["hod", "hod name", "who is the hod"],
      responses: [
        "HODs differ for each branch, please be more specific like: (HOD it)",
      ],
      context_set: "",
    },
  ],
};

// Function to find a response based on the user's free-form query
const findResponse = (message) => {
  const userMessage = message.toLowerCase().trim();
  for (const intent of intents.intents) {
    if (intent.patterns.some((pattern) => userMessage.includes(pattern))) {
      const randomIndex = Math.floor(Math.random() * intent.responses.length);
      return intent.responses[randomIndex];
    }
  }
  return "I'm sorry, executing code is not possible. I can assist with questions about admissions, courses, facilities, or placements.";
};

const ChatbotCombined = () => {
  const [femaleVoice, setFemaleVoice] = useState(null);
  const [isChatting, setIsChatting] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const selectedVoice =
          voices.find((voice) =>
            voice.name.toLowerCase().includes("samantha")
          ) ||
          voices.find((voice) => voice.name.toLowerCase().includes("female")) ||
          voices[0];
        setFemaleVoice(selectedVoice);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleChatbotStart = () => {
    setIsChatting(true); // Enable speech synthesis only when user starts chatting
  };

  const steps = [
    {
      id: "welcome",
      message:
        "Hello! Welcome to the College Assistant. Would you like to introduce yourself or ask a question?",
      trigger: "choice",
    },
    {
      id: "choice",
      options: [
        { value: "introduce", label: "Introduce Myself", trigger: "askName" },
        { value: "ask", label: "Ask a Question", trigger: "userQuery" },
      ],
    },
    {
      id: "askName",
      message: "What is your name?",
      trigger: "getName",
    },
    {
      id: "getName",
      user: true,
      trigger: "greetUser",
    },
    {
      id: "greetUser",
      message:
        "Hi {previousValue}, nice to meet you! How can I help you today?",
      trigger: "serviceChoice",
    },
    {
      id: "serviceChoice",
      options: [
        {
          value: "services",
          label: "Inquire About Services",
          trigger: "intentOptions",
        },
        { value: "ask", label: "Type a Query", trigger: "userQuery" },
      ],
    },
    {
      id: "intentOptions",
      message: "Please select an option:",
      trigger: "intentSelection",
    },
    {
      id: "intentSelection",
      options: [
        { value: "admissions", label: "Admissions", trigger: "admissions" },
        { value: "courses", label: "Courses", trigger: "courses" },
        { value: "placements", label: "Placements", trigger: "placements" },
      ],
    },
    {
      id: "admissions",
      message:
        "For admissions, please visit our online portal and check the admission requirements. Do you need anything else?",
      trigger: "anythingElse",
    },
    {
      id: "courses",
      message:
        "We offer a variety of courses across multiple disciplines. Check our website for a detailed course catalog. Do you need anything else?",
      trigger: "anythingElse",
    },
    {
      id: "placements",
      message:
        "Our placement cell provides excellent support, and we have tie-ups with top companies. Do you need any further assistance?",
      trigger: "anythingElse",
    },
    {
      id: "userQuery",
      message: "Please type your query:",
      trigger: "getUserQuery",
    },
    {
      id: "getUserQuery",
      user: true,
      trigger: "showResponse",
    },
    {
      id: "showResponse",
      message: (props) => findResponse(props.steps.getUserQuery.value),
      trigger: "anythingElse",
    },
    {
      id: "anythingElse",
      options: [
        { value: "yes", label: "Yes", trigger: "serviceChoice" },
        { value: "no", label: "No, thanks!", trigger: "endMessage" },
      ],
    },
    {
      id: "endMessage",
      message: "Alright! Have a great day!",
      end: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        steps={steps}
        floating={true}
        headerTitle="College Assistant"
        recognitionEnable={true}
        speechSynthesis={{
          enable: isChatting, // Enable only when the user starts chatting
          lang: "en",
          voice: femaleVoice,
        }}
        botDelay={1000}
        userDelay={1000}
        customStyle={{
          botMessageBox: { backgroundColor: theme.botBubbleColor },
          chatButton: { backgroundColor: theme.headerBgColor },
        }}
        trigger={handleChatbotStart} // Activate voice on user interaction
      />
    </ThemeProvider>
  );
};

export default ChatbotCombined;
