import React, { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
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
      tag: "creator",
      patterns: [
        "what is the name of your developers",
        "what is the name of your creators",
        "what is the name of the developers",
        "what is the name of the creators",
        "who created you",
        "your developers",
        "your creators",
        "who are your developers",
        "developers",
        "you are made by",
        "you are made by whom",
        "who created you",
        "who create you",
        "creators",
        "who made you",
        "who designed you",
      ],
      responses: ["College students"],
      context_set: "",
    },
    {
      tag: "name",
      patterns: [
        "name",
        "your name",
        "do you have a name",
        "what are you called",
        "what is your name",
        "what should I call you",
        "whats your name?",
        "what are you",
        "who are you",
        "who is this",
        "what am i chatting to",
        "who am i taking to",
        "what are you",
      ],
      responses: [
        "You can call me Mind Reader.",
        "I'm Mind Reader",
        "I am a Chatbot.",
        "I am your helper",
      ],
      context_set: "",
    },
    {
      tag: "hours",
      patterns: [
        "timing of college",
        "what is college timing",
        "working days",
        "when are you guys open",
        "what are your hours",
        "hours of operation",
        "when is the college open",
        "college timing",
        "what about college timing",
        "is college open on saturday",
        "tell something about college timing",
        "what is the college  hours",
        "when should i come to college",
        "when should i attend college",
        "what is my college time",
        "college timing",
        "timing college",
      ],
      responses: ["College is open 8am-5pm Monday-Saturday!"],
      context_set: "",
    },
    {
      tag: "number",
      patterns: [
        "more info",
        "contact info",
        "how to contact college",
        "college telephone number",
        "college number",
        "What is your contact no",
        "Contact number?",
        "how to call you",
        "College phone no?",
        "how can i contact you",
        "Can i get your phone number",
        "how can i call you",
        "phone number",
        "phone no",
        "call",
      ],
      responses: ["You can contact at: NUMBER"],
      context_set: "",
    },
    {
      tag: "course",
      patterns: [
        "list of courses",
        "list of courses offered",
        "list of courses offered in",
        "what are the courses offered in your college?",
        "courses?",
        "courses offered",
        "courses offered in (your univrsity(UNI) name)",
        "courses you offer",
        "branches?",
        "courses available at UNI?",
        "branches available at your college?",
        "what are the courses in UNI?",
        "what are branches in UNI?",
        "what are courses in UNI?",
        "branches available in UNI?",
        "can you tell me the courses available in UNI?",
        "can you tell me the branches available in UNI?",
        "computer engineering?",
        "computer",
        "Computer engineering?",
        "it",
        "IT",
        "Information Technology",
        "AI/Ml",
        "Mechanical engineering",
        "Chemical engineering",
        "Civil engineering",
      ],
      responses: [
        "Our university offers Information Technology, computer Engineering, Mechanical engineering,Chemical engineering, Civil engineering and extc Engineering.",
      ],
      context_set: "",
    },
    {
      tag: "fees",
      patterns: [
        "information about fee",
        "information on fee",
        "tell me the fee",
        "college fee",
        "fee per semester",
        "what is the fee of each semester",
        "what is the fees of each year",
        "what is fee",
        "what is the fees",
        "how much is the fees",
        "fees for first year",
        "fees",
        "about the fees",
        "tell me something about the fees",
        "What is the fees of hostel",
        "how much is the fees",
        "hostel fees",
        "fees for AC room",
        "fees for non-AC room",
        "fees for Ac room for girls",
        "fees for non-Ac room for girls",
        "fees for Ac room for boys",
        "fees for non-Ac room for boys",
      ],
      responses: [
        'For Fee detail visit <a target="_blank" href="LINK"> here</a>',
      ],
      context_set: "",
    },
    {
      tag: "location",
      patterns: [
        "where is the college located",
        "college is located at",
        "where is college",
        "where is college located",
        "address of college",
        "how to reach college",
        "college location",
        "college address",
        "wheres the college",
        "how can I reach college",
        "whats is the college address",
        "what is the address of college",
        "address",
        "location",
      ],
      responses: [
        '<a target="_blank" href="ADD YOU GOOGLE MAP LINK HERE"> here</a>',
      ],
      context_set: "",
    },
    {
      tag: "hostel",
      patterns: [
        "hostel facility",
        "hostel servive",
        "hostel location",
        "hostel address",
        "hostel facilities",
        "hostel fees",
        "Does college provide hostel",
        "Is there any hostel",
        "Where is hostel",
        "do you have hostel",
        "do you guys have hostel",
        "hostel",
        "hostel capacity",
        "what is the hostel fee",
        "how to get in hostel",
        "what is the hostel address",
        "how far is hostel from college",
        "hostel college distance",
        "where is the hostel",
        "how big is the hostel",
        "distance between college and hostel",
        "distance between hostel and college",
      ],
      responses: [
        'For hostel detail visit <a target="_blank" href="ADD YOUR HOSTEL DETAIL PDF LINK OR ANY INFORMATION LINK OR ADD YOU OWN ANSWERS"> here</a>',
      ],
      context_set: "",
    },
    {
      tag: "event",
      patterns: [
        "events organised",
        "list of events",
        "list of events organised in college",
        "list of events conducted in college",
        "What events are conducted in college",
        "Are there any event held at college",
        "Events?",
        "functions",
        "what are the events",
        "tell me about events",
        "what about events",
      ],
      responses: [
        'For event detail visit <a target="_blank" href="ADD YOUR FUNCTIONS LINK OR YOUR OWN RESPONSE"> here</a>',
      ],
      context_set: "",
    },
    {
      tag: "document",
      patterns: [
        "document to bring",
        "documents needed for admision",
        "documents needed at the time of admission",
        "documents needed during admission",
        "documents required for admision",
        "documents required at the time of admission",
        "documents required during admission",
        "What document are required for admission",
        "Which document to bring for admission",
        "documents",
        "what documents do i need",
        "what documents do I need for admission",
        "documents needed",
      ],
      responses: [
        'To know more about document required visit <a target="_blank" href="ADD LINK OF ADMISSION GUIDANCE DOCUMENT FROM YOUR UNIVERSITY WEBSITE"> here</a>',
      ],
      context_set: "",
    },
    {
      tag: "floors",
      patterns: [
        "size of campus",
        "building size",
        "How many floors does college have",
        "floors in college",
        "floors in college",
        "how tall is UNI's College of Engineering college building",
        "floors",
      ],
      responses: ["My College has total 2 floors "],
      context_set: "",
    },
    {
      tag: "syllabus",
      patterns: [
        "Syllabus for IT",
        "what is the Information Technology syllabus",
        "syllabus",
        "timetable",
        "what is IT syllabus",
        "syllabus",
        "What is next lecture",
      ],
      responses: [
        'Timetable provide direct to the students OR To know about syllabus visit <a target="_blank" href="TIMETABLE LINK"> here</a>',
      ],
      context_set: "",
    },
    {
      tag: "library",
      patterns: [
        "is there any library",
        "library facility",
        "library facilities",
        "do you have library",
        "does the college have library facility",
        "college library",
        "where can i get books",
        "book facility",
        "Where is library",
        "Library",
        "Library information",
        "Library books information",
        "Tell me about library",
        "how many libraries",
      ],
      responses: [
        'There is one huge and spacious library.timings are 8am to 6pm and for more visit <a target="blank" href="ADD LIBRARY DETAIL LINK">here</a>',
      ],
      context_set: "",
    },
    {
      tag: "infrastructure",
      patterns: [
        "how is college infrastructure",
        "infrastructure",
        "college infrastructure",
      ],
      responses: [
        "Our University has Excellent Infrastructure. Campus is clean. Good IT Labs With Good Speed of Internet connection",
      ],
      context_set: "",
    },
    {
      tag: "canteen",
      patterns: [
        "food facilities",
        "canteen facilities",
        "canteen facility",
        "is there any canteen",
        "Is there a cafetaria in college",
        "Does college have canteen",
        "Where is canteen",
        "where is cafetaria",
        "canteen",
        "Food",
        "Cafetaria",
      ],
      responses: ["Our university has canteen with variety of food available"],
      context_set: "",
    },
    {
      tag: "menu",
      patterns: [
        "food menu",
        "food in canteen",
        "Whats there on menu",
        "what is available in college canteen",
        "what foods can we get in college canteen",
        "food variety",
        "What is there to eat?",
      ],
      responses: [
        "we serve Franky, Locho, Alu-puri, Kachori, Khavsa, Thaali and many more on menu",
      ],
      context_set: "",
    },
    {
      tag: "placement",
      patterns: [
        "What is college placement",
        "Which companies visit in college",
        "What is average package",
        "companies visit",
        "package",
        "About placement",
        "placement",
        "recruitment",
        "companies",
      ],
      responses: [
        'To know about placement visit <a target="_blank" href="PLACEMENT INFORMATION LINK FROM YOUR UNIVERSITY WEBSITE IF THEY HAVE">here</a>',
      ],
      context_set: "",
    },
    {
      tag: "ithod",
      patterns: ["Who is HOD", "Where is HOD", "it hod", "name of it hod"],
      responses: [
        "All engineering departments have only one hod XYZ who available on (Place name)",
      ],
      context_set: "",
    },
    {
      tag: "computerhod",
      patterns: [
        "Who is computer HOD",
        "Where is computer HOD",
        "computer hod",
        "name of computer hod",
      ],
      responses: [
        "All engineering departments have only one hod XYZ who available on (PLACE NAME)",
      ],
      context_set: "",
    },
    {
      tag: "extchod",
      patterns: [
        "Who is extc HOD",
        "Where is  extc HOD",
        "extc hod",
        "name of extc hod",
      ],
      responses: [
        "Different school wise hod are different.So be more clear with your school or department",
      ],
      context_set: "",
    },
    {
      tag: "principal",
      patterns: [
        "what is the name of principal",
        "whatv is the principal name",
        "principal name",
        "Who is college principal",
        "Where is principal's office",
        "principal",
        "name of principal",
      ],
      responses: [
        "XYZ is college principal and if you need any help then call your branch hod first.That is more appropriate",
      ],
      context_set: "",
    },
    {
      tag: "sem",
      patterns: [
        "exam dates",
        "exam schedule",
        "When is semester exam",
        "Semester exam timetable",
        "sem",
        "semester",
        "exam",
        "when is exam",
        "exam timetable",
        "exam dates",
        "when is semester",
      ],
      responses: [
        'Here is the Academic Calendar  <a target="_blank" href="YOUR ACADEMIC CALENDER">website</a>',
      ],
      context_set: "",
    },
    {
      tag: "admission",
      patterns: [
        "what is the process of admission",
        "what is the admission process",
        "How to take admission in your college",
        "What is the process for admission",
        "admission",
        "admission process",
      ],
      responses: [
        'Application can also be submitted online through the Unversity\'s  <a target="_blank" href="LINK OF ADMISSION DOCUMENT">website</a>',
      ],
      context_set: "",
    },
    {
      tag: "scholarship",
      patterns: [
        "scholarship",
        "Is scholarship available",
        "scholarship engineering",
        "scholarship it",
        "scholarship ce",
        "scholarship mechanical",
        "scholarship civil",
        "scholarship chemical",
        "scholarship for AI/ML",
        "available scholarships",
        "scholarship for computer engineering",
        "scholarship for IT engineering",
        "scholarship for mechanical engineering",
        "scholarship for civil engineering",
        "scholarship for chemical engineering",
        "list of scholarship",
        "comps scholarship",
        "IT scholarship",
        "mechanical scholarship",
        "civil scholarship",
        "chemical scholarship",
        "automobile scholarship",
        "first year scholarship",
        "second year scholarship",
        "third year scholarship",
        "fourth year scholarship",
      ],
      responses: [
        'Many government scholarships are supported by our university. For details and updates visit <a target="_blank" href="(SCHOLARSHIP DETAILS LINK)">here</a>',
      ],
      context_set: "",
    },
    {
      tag: "facilities",
      patterns: [
        "What facilities college provide",
        "College facility",
        "What are college facilities",
        "facilities",
        "facilities provided",
      ],
      responses: [
        "Our university's Engineering department provides fully AC Lab with internet connection, smart classroom, Auditorium, library,canteen",
      ],
      context_set: "",
    },
    {
      tag: "college intake",
      patterns: [
        "max number of students",
        "number of seats per branch",
        "number of seats in each branch",
        "maximum number of seats",
        "maximum students intake",
        "What is college intake",
        "how many stundent are taken in each branch",
        "seat allotment",
        "seats",
      ],
      responses: [
        "For IT, Computer and extc 60 per branch and seat may be differ for different department.",
      ],
      context_set: "",
    },
    {
      tag: "uniform",
      patterns: [
        "college dress code",
        "college dresscode",
        "what is the uniform",
        "can we wear casuals",
        "Does college have an uniform",
        "Is there any uniform",
        "uniform",
        "what about uniform",
        "do we have to wear uniform",
      ],
      responses: ["ENTER YOUR OWN UNIVERSITY UNIFORM CIRCULER"],
      context_set: "",
    },
    {
      tag: "committee",
      patterns: [
        "what are the different committe in college",
        "different committee in college",
        "Are there any committee in college",
        "Give me committee details",
        "committee",
        "how many committee are there in college",
      ],
      responses: [
        "For the various committe in college contact this number: ADD NUMBER",
      ],
      context_set: "",
    },
    {
      tag: "random",
      patterns: ["I love you", "Will you marry me", "Do you love me"],
      responses: ["I am not program for this, please ask appropriate query"],
      context_set: "",
    },
    {
      tag: "swear",
      patterns: [
        "fuck",
        "bitch",
        "shut up",
        "hell",
        "stupid",
        "idiot",
        "dumb ass",
        "asshole",
        "fucker",
      ],
      responses: [
        "please use appropriate language",
        "Maintaining decency would be appreciated",
      ],
      context_set: "",
    },
    {
      tag: "vacation",
      patterns: [
        "holidays",
        "when will semester starts",
        "when will semester end",
        "when is the holidays",
        "list of holidays",
        "Holiday in these year",
        "holiday list",
        "about vacations",
        "about holidays",
        "When is vacation",
        "When is holidays",
        "how long will be the vacation",
      ],
      responses: [
        "Academic calender is given to you by your class-soordinators after you join your respective classes",
      ],
      context_set: "",
    },
    {
      tag: "sports",
      patterns: [
        "sports and games",
        "give sports details",
        "sports infrastructure",
        "sports facilities",
        "information about sports",
        "Sports activities",
        "please provide sports and games information",
      ],
      responses: [
        'Our university encourages all-round development of students and hence provides sports facilities in the campus. For more details visit<a target="_blank" href=/"(LINK IF HAVE)">here</a>',
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
      {
        "tag": "abviiit",
        "patterns": [
          "What is ABV-IIIT?",
          "IIITM",
          "IIIT Gwalior",
          "Where is Atal Bihari Vajpayee IIIT located?",
          "Tell me about ABV-IIIT",
          "ABV-IIIT details"
        ],
        "responses": [
          "Atal Bihari Vajpayee Indian Institute of Information Technology (ABV-IIIT) is located in Gwalior. It is one of the premier institutes in India focusing on Information Technology and related fields."
        ],
        "context_set": ""
      },
      {
        "tag": "admission_process",
        "patterns": [
          "What is the admission process at ABV-IIIT?",
          "How can I apply to ABV-IIIT?",
          "How to get admission in ABV-IIIT?",
          "What is the procedure for admission?"
        ],
        "responses": [
          "The admission process at ABV-IIIT is based on JEE Main scores. Candidates need to apply through the Joint Seat Allocation Authority (JoSAA) counseling process."
        ],
        "context_set": ""
      },
      {
        "tag": "courses_offered",
        "patterns": [
          "What courses are offered at ABV-IIIT?",
          "List of courses offered by ABV-IIIT",
          "What are the programs available at ABV-IIIT?"
        ],
        "responses": [
          "ABV-IIIT offers undergraduate (B.Tech), postgraduate (M.Tech), and Ph.D. programs in various disciplines like Computer Science, Electronics, and IT."
        ],
        "context_set": ""
      },
      {
        "tag": "campus_facilities",
        "patterns": [
          "What are the campus facilities at ABV-IIIT?",
          "Does ABV-IIIT have a gym?",
          "Are there hostels at ABV-IIIT?",
          "What facilities are available on campus?"
        ],
        "responses": [
          "ABV-IIIT has state-of-the-art facilities including a well-equipped gym, hostels, libraries, Wi-Fi enabled campus, computer labs, and sports facilities."
        ],
        "context_set": ""
      },
      {
        "tag": "fees_structure",
        "patterns": [
          "What is the fee structure at ABV-IIIT?",
          "How much are the fees for B.Tech at ABV-IIIT?",
          "What is the cost of study at ABV-IIIT?"
        ],
        "responses": [
          "The fee structure at ABV-IIIT varies based on the program. You can refer to the official website for the latest fee details."
        ],
        "context_set": ""
      },
      {
        "tag": "scholarships",
        "patterns": [
          "Does ABV-IIIT offer scholarships?",
          "Are there any scholarships available at ABV-IIIT?",
          "How can I get a scholarship in ABV-IIIT?"
        ],
        "responses": [
          "ABV-IIIT offers various scholarships based on merit and financial need. Details can be found on the official website or you can contact the administration."
        ],
        "context_set": ""
      },
      {
        "tag": "faculty",
        "patterns": [
          "Who are the faculty members at ABV-IIIT?",
          "How is the faculty at ABV-IIIT?",
          "Can you tell me about the faculty at ABV-IIIT?"
        ],
        "responses": [
          "ABV-IIIT has a highly qualified faculty with expertise in various domains like Computer Science, Electronics, and IT. You can check the faculty details on the official website."
        ],
        "context_set": ""
      },
      {
        "tag": "research",
        "patterns": [
          "What research areas are being worked on at ABV-IIIT?",
          "Is ABV-IIIT involved in any research?",
          "What kind of research is ABV-IIIT known for?"
        ],
        "responses": [
          "ABV-IIIT conducts research in various fields including Artificial Intelligence, Data Science, Internet of Things, Robotics, and Embedded Systems."
        ],
        "context_set": ""
      },
      {
        "tag": "placement",
        "patterns": [
          "How is the placement at ABV-IIIT?",
          "What companies come for placement at ABV-IIIT?",
          "What is the average salary in placements at ABV-IIIT?"
        ],
        "responses": [
          "ABV-IIIT has a strong placement record with top tech companies like Microsoft, Google, Amazon, and many others recruiting its students. The average salary is competitive and varies each year."
        ],
        "context_set": ""
      },
      {
        "tag": "hostel",
        "patterns": [
          "Does ABV-IIIT have a hostel?",
          "What are the hostel facilities at ABV-IIIT?",
          "Is there a hostel for students at ABV-IIIT?"
        ],
        "responses": [
          "Yes, ABV-IIIT provides separate hostels for boys and girls with modern amenities including Wi-Fi, 24/7 security, and mess facilities."
        ],
        "context_set": ""
      },
      {
        "tag": "transportation",
        "patterns": [
          "Does ABV-IIIT provide transportation?",
          "How can I travel to ABV-IIIT?",
          "Is there a bus service for ABV-IIIT students?"
        ],
        "responses": [
          "ABV-IIIT provides transportation facilities for students with buses operating from different parts of the city."
        ],
        "context_set": ""
      },
      {
        "tag": "events",
        "patterns": [
          "What events are held at ABV-IIIT?",
          "Does ABV-IIIT organize any cultural events?",
          "What are the fests at ABV-IIIT?"
        ],
        "responses": [
          "ABV-IIIT organizes annual events like technical fests, cultural festivals, sports competitions, and guest lectures."
        ],
        "context_set": ""
      },
      {
        "tag": "collaborations",
        "patterns": [
          "Who does ABV-IIIT collaborate with?",
          "Does ABV-IIIT have any international collaborations?",
          "Is ABV-IIIT partnered with any companies?"
        ],
        "responses": [
          "ABV-IIIT has several national and international collaborations with top universities, research labs, and industry leaders for research and internships."
        ],
        "context_set": ""
      },
      {
        "tag": "alumni_network",
        "patterns": [
          "Alumni network",
          "alumni network",
          "Does ABV-IIIT have an alumni network?",
          "How can I connect with ABV-IIIT alumni?",
          "What is the ABV-IIIT alumni association?"
        ],
        "responses": [
          "ABV-IIIT has a strong alumni network that helps students with career opportunities, guidance, and mentorship."
        ],
        "context_set": ""
      },
      {
        "tag": "exams",
        "patterns": [
          "What is the exam schedule at ABV-IIIT?",
          "When are the semester exams at ABV-IIIT?",
          "When do the exams start at ABV-IIIT?"
        ],
        "responses": [
          "The exam schedule for ABV-IIIT can be found on the academic calendar or you can check with the examination office."
        ],
        "context_set": ""
      },
      {
        "tag": "student_clubs",
        "patterns": [
          "What student clubs are there at ABV-IIIT?",
          "Can I join student clubs at ABV-IIIT?",
          "What extracurricular activities are available at ABV-IIIT?"
        ],
        "responses": [
          "ABV-IIIT offers various student clubs focusing on academics, sports, cultural activities, and social service. Students can join clubs as per their interests."
        ],
        "context_set": ""
      },
      {
        "tag": "library",
        "patterns": [
          "Is there a library at ABV-IIIT?",
          "What are the facilities in the library at ABV-IIIT?",
          "How can I access the library at ABV-IIIT?"
        ],
        "responses": [
          "Yes, ABV-IIIT has a well-equipped library with a large collection of books, journals, and digital resources available to students."
        ],
        "context_set": ""
      },
      
        {
          "tag": "ecell",
          "patterns": [
            "What is E-Cell at ABV-IIIT?",
            "What activities does E-Cell organize?",
            "How can I join E-Cell?",
            "Is E-Cell active at ABV-IIIT?"
          ],
          "responses": [
            "E-Cell at ABV-IIIT is the Entrepreneurship Cell, which aims to foster entrepreneurial skills among students. It organizes events, workshops, and competitions to promote innovation and entrepreneurship."
          ],
          "context_set": ""
        },
        {
          "tag": "uthaan",
          "patterns": [
            "What is Uthaan at ABV-IIIT?",
            "Tell me about the Uthaan Journalism and Recreational Club",
            "What activities are organized by Uthaan?",
            "How can I participate in Uthaan?"
          ],
          "responses": [
            "Uthaan is the Journalism and Recreational Club at ABV-IIIT. It aims to provide a platform for students to express their creativity through writing, photography, and various recreational activities."
          ],
          "context_set": ""
        },
        {
          "tag": "rotract",
          "patterns": [
            "What is Rotaract at ABV-IIIT?",
            "What does Rotaract do at ABV-IIIT?",
            "How can I join the Rotaract Club?",
            "Tell me about the activities of Rotaract Club"
          ],
          "responses": [
            "Rotaract is a community service club at ABV-IIIT that focuses on social service, leadership, and personal development. They organize charity events, workshops, and community outreach programs."
          ],
          "context_set": ""
        },
        {
          "tag": "student_gyan_moment",
          "patterns": [
            "What is Student Gyan Moment?",
            "Tell me about Student Gyan Moment at ABV-IIIT",
            "What does Student Gyan Moment do?",
            "How can I participate in Student Gyan Moment?"
          ],
          "responses": [
            "Student Gyan Moment is an initiative by students of ABV-IIIT to share knowledge, experiences, and insights. It focuses on learning, growth, and student development through regular sessions and interactive discussions."
          ],
          "context_set": ""
        },
        {
          "tag": "gdg",
          "patterns": [
            "What is GDG at ABV-IIIT?",
            "Tell me about GDG Club",
            "What activities are organized by GDG?",
            "How can I join GDG?"
          ],
          "responses": [
            "GDG (Google Developer Group) at ABV-IIIT is a community of developers who collaborate on technology and Google-related projects. They organize hackathons, coding sessions, and tech talks to enhance students’ technical skills."
          ],
          "context_set": ""
        },
        {
          "tag": "ieee",
          "patterns": [
            "What is IEEE at ABV-IIIT?",
            "What activities does IEEE organize?",
            "How can I join IEEE?",
            "What is the purpose of IEEE at ABV-IIIT?"
          ],
          "responses": [
            "IEEE (Institute of Electrical and Electronics Engineers) at ABV-IIIT is a student-run club that focuses on electronics, electrical, and computer engineering. They organize technical workshops, projects, and competitions for students to enhance their engineering knowledge."
          ],
          "context_set": ""
        },
        {
          "tag": "dance_club",
          "patterns": [
            "Is there a Dance Club at ABV-IIIT?",
            "Tell me about the Dance Club at ABV-IIIT",
            "What activities does the Dance Club organize?",
            "How can I join the Dance Club?"
          ],
          "responses": [
            "Yes, ABV-IIIT has a Dance Club that organizes various dance performances, workshops, and cultural events throughout the year. The club encourages students to explore different dance forms and express themselves creatively."
          ],
          "context_set": ""
        },
        {
          "tag": "music_club",
          "patterns": [
            "Is there a Music Club at ABV-IIIT?",
            "What is the Music Club at ABV-IIIT?",
            "What activities does the Music Club organize?",
            "How can I participate in the Music Club?"
          ],
          "responses": [
            "ABV-IIIT has a Music Club that brings together students passionate about music. The club organizes jam sessions, musical performances, and encourages students to showcase their talent in various genres of music."
          ],
          "context_set": ""
        },
        {
          "tag": "drama_club",
          "patterns": [
            "Is there a Drama Club at ABV-IIIT?",
            "Tell me about the Drama Club at ABV-IIIT",
            "What activities are organized by the Drama Club?",
            "How can I join the Drama Club?"
          ],
          "responses": [
            "Yes, ABV-IIIT has a Drama Club that offers students the chance to explore their acting skills. The club organizes plays, skits, and drama performances during cultural events."
          ],
          "context_set": ""
        },
        {
          "tag": "literary_club",
          "patterns": [
            "What is the Literary Club at ABV-IIIT?",
            "Tell me about the Literary Club",
            "What activities are organized by the Literary Club?",
            "How can I join the Literary Club?"
          ],
          "responses": [
            "The Literary Club at ABV-IIIT focuses on promoting reading, writing, and other forms of literature. They organize book discussions, poetry readings, writing competitions, and other literary activities."
          ],
          "context_set": ""
        },
        {
          "tag": "art_club",
          "patterns": [
            "Is there an Art Club at ABV-IIIT?",
            "What is the Art Club at ABV-IIIT?",
            "What activities are organized by the Art Club?",
            "How can I join the Art Club?"
          ],
          "responses": [
            "Yes, ABV-IIIT has an Art Club that encourages students to express themselves through various art forms such as painting, sketching, and digital art. The club holds workshops, exhibitions, and contests to promote creativity."
          ],
          "context_set": ""
        },
        {
          "tag": "environment_club",
          "patterns": [
            "What is the Environment Club at ABV-IIIT?",
            "Tell me about the Environment Club",
            "What activities does the Environment Club organize?",
            "How can I participate in the Environment Club?"
          ],
          "responses": [
            "The Environment Club at ABV-IIIT is dedicated to raising awareness about environmental issues. The club organizes tree plantation drives, clean-up campaigns, and awareness programs to promote sustainable living."
          ],
          "context_set": ""
        },
        {
          "tag": "photography_club",
          "patterns": [
            "Is there a Photography Club at ABV-IIIT?",
            "Tell me about the Photography Club",
            "What activities does the Photography Club organize?",
            "How can I join the Photography Club?"
          ],
          "responses": [
            "Yes, ABV-IIIT has a Photography Club where students can explore and hone their photography skills. The club organizes photography workshops, exhibitions, and photo walks to foster creative expression."
          ],
          "context_set": ""
        }
        ,
           { "tag": "cse",
            "patterns": [
              "What is the CSE branch at ABV-IIIT?",
              "What courses are offered in CSE?",
              "What are the subjects in the CSE branch?",
              "How can I join the CSE branch?",
              "What are the career opportunities after CSE at ABV-IIIT?"
            ],
            "responses": [
              "The CSE branch at ABV-IIIT focuses on computer science and engineering. It offers courses in programming, algorithms, data structures, artificial intelligence, machine learning, and more. Graduates from this branch have excellent career opportunities in the tech industry."
            ],
            "context_set": ""
          },
          {
            "tag": "msc",
            "patterns": [
              "What is the MSc course at ABV-IIIT?",
              "What subjects are covered in the MSc program?",
              "How can I apply for the MSc program?",
              "What is the duration of the MSc program at ABV-IIIT?"
            ],
            "responses": [
              "ABV-IIIT offers an MSc program focusing on specialized topics in computer science, data science, and technology. The program covers advanced topics such as machine learning, data mining, big data analytics, and more. The duration is typically 2 years."
            ],
            "context_set": ""
          },
          {
            "tag": "eee",
            "patterns": [
              "What is the EEE branch at ABV-IIIT?",
              "What courses are covered in EEE?",
              "What career options are available for EEE students?",
              "How can I join the EEE branch at ABV-IIIT?"
            ],
            "responses": [
              "The EEE (Electrical and Electronics Engineering) branch at ABV-IIIT focuses on the study of electrical systems, circuits, power generation, and electronics. It offers subjects like circuit analysis, electromagnetics, control systems, and power systems. Career options include roles in electrical engineering, power sector, and electronics industry."
            ],
            "context_set": ""
          },
          {
            "tag": "it",
            "patterns": [
              "What is the IT branch at ABV-IIIT?",
              "What subjects are covered in the IT branch?",
              "What is the difference between IT and CSE?",
              "How can I join the IT branch at ABV-IIIT?"
            ],
            "responses": [
              "The IT (Information Technology) branch at ABV-IIIT focuses on software development, networking, databases, and information systems. It includes subjects like computer networks, database management, software engineering, and web development. IT is focused more on practical application and implementation compared to the theoretical focus of CSE."
            ],
            "context_set": ""
          },
          {
            "tag": "it_mba",
            "patterns": [
              "What is the IT+MBA course at ABV-IIIT?",
              "What subjects are covered in IT+MBA?",
              "How can I join the IT+MBA program?",
              "What are the benefits of the IT+MBA program?"
            ],
            "responses": [
              "The IT+MBA program at ABV-IIIT combines technical knowledge of Information Technology with managerial skills. The program is designed to equip students with skills required for leadership roles in the tech industry. It covers subjects like IT management, business strategies, organizational behavior, and project management."
            ],
            "context_set": ""
          },
          {
            "tag": "it_mtech",
            "patterns": [
              "What is the IT+MTech program at ABV-IIIT?",
              "What are the specializations in IT+MTech?",
              "How is the IT+MTech program structured?",
              "What subjects are offered in IT+MTech?"
            ],
            "responses": [
              "The IT+MTech program at ABV-IIIT is a combination of Information Technology and advanced technology studies. It offers specializations like AI, machine learning, data science, and cybersecurity. The program is designed to prepare students for higher-level roles in the tech industry or research and development."
            ],
            "context_set": ""
          },
          {
            "tag": "cse_mtech",
            "patterns": [
              "What is the CSE+MTech program at ABV-IIIT?",
              "What subjects are covered in CSE+MTech?",
              "How can I apply for the CSE+MTech program?",
              "What are the benefits of CSE+MTech at ABV-IIIT?"
            ],
            "responses": [
              "The CSE+MTech program at ABV-IIIT offers an advanced curriculum in computer science and technology, including areas like artificial intelligence, machine learning, data science, and cloud computing. The program is aimed at students interested in pursuing research or higher technical roles in the software industry."
            ],
            "context_set": ""
          },
          {
            "tag": "mtech",
            "patterns": [
              "What is the MTech course at ABV-IIIT?",
              "What specializations are available in MTech?",
              "How long is the MTech program?",
              "What are the eligibility criteria for MTech at ABV-IIIT?"
            ],
            "responses": [
              "ABV-IIIT offers an MTech program in various specializations, including computer science, IT, VLSI design, and more. The duration is typically 2 years. The program is designed for students looking to deepen their technical knowledge and engage in advanced research in their chosen field."
            ],
            "context_set": ""
          },
          {
            "tag": "it_vs_cse",
            "patterns": [
              "What is the difference between IT and CSE?",
              "How is IT different from CSE at ABV-IIIT?",
              "Which is better: IT or CSE?",
              "Should I choose IT or CSE?"
            ],
            "responses": [
              "The primary difference between IT and CSE at ABV-IIIT is that IT focuses more on practical applications in software, networking, and databases, while CSE dives deeper into core computer science topics like algorithms, data structures, and programming. Your choice depends on whether you prefer a more technical and theoretical approach (CSE) or a practical, implementation-based approach (IT)."
            ],
            "context_set": ""
          },
          {
            "tag": "eee_vs_cse",
            "patterns": [
              "What is the difference between EEE and CSE?",
              "How is EEE different from CSE?",
              "Which branch is better, EEE or CSE?",
              "What should I choose: EEE or CSE?"
            ],
            "responses": [
              "EEE (Electrical and Electronics Engineering) focuses on electrical systems, circuits, and power generation, while CSE (Computer Science Engineering) focuses on software, algorithms, and computing. If you're more interested in electronics and hardware, EEE might be a better fit. If you're more inclined towards software and computing, CSE could be the right choice."
            ],
            "context_set": ""
          },
            {
              "tag": "sports_complex",
              "patterns": [
                "What are the sports facilities at ABV-IIIT?",
                "Does ABV-IIIT have a sports complex?",
                "Where is the sports complex located at ABV-IIIT?",
                "What sports are available in the sports complex at ABV-IIIT?",
                "What facilities are provided in the sports complex?"
              ],
              "responses": [
                "ABV-IIIT has a state-of-the-art sports complex that provides facilities for a wide range of sports activities, including badminton, tennis, basketball, volleyball, and more. The complex is designed to promote physical fitness and well-being among students."
              ],
              "context_set": ""
            },
            {
              "tag": "badminton",
              "patterns": [
                "Is badminton available at ABV-IIIT?",
                "Where can I play badminton at ABV-IIIT?",
                "Are there badminton courts at ABV-IIIT?",
                "What are the badminton facilities at ABV-IIIT?"
              ],
              "responses": [
                "Yes, ABV-IIIT has dedicated badminton courts in its sports complex, providing students with excellent facilities to practice and play badminton."
              ],
              "context_set": ""
            },
            {
              "tag": "tennis",
              "patterns": [
                "Are tennis courts available at ABV-IIIT?",
                "Where can I play tennis at ABV-IIIT?",
                "What facilities are available for tennis at ABV-IIIT?"
              ],
              "responses": [
                "ABV-IIIT has tennis courts in its sports complex, offering students the opportunity to play and practice tennis."
              ],
              "context_set": ""
            },
            {
              "tag": "lawn_tennis",
              "patterns": [
                "Is lawn tennis available at ABV-IIIT?",
                "Where can I play lawn tennis at ABV-IIIT?",
                "What are the facilities for lawn tennis at ABV-IIIT?"
              ],
              "responses": [
                "ABV-IIIT provides lawn tennis courts in its sports complex, enabling students to engage in both casual and competitive lawn tennis."
              ],
              "context_set": ""
            },
            {
              "tag": "table_tennis",
              "patterns": [
                "Is there table tennis at ABV-IIIT?",
                "Where can I play table tennis at ABV-IIIT?",
                "Does ABV-IIIT have table tennis tables?",
                "What are the table tennis facilities at ABV-IIIT?"
              ],
              "responses": [
                "Yes, ABV-IIIT offers table tennis tables as part of its sports facilities, and students can enjoy playing table tennis in the sports complex."
              ],
              "context_set": ""
            },
            {
              "tag": "basketball",
              "patterns": [
                "Does ABV-IIIT have basketball courts?",
                "Where can I play basketball at ABV-IIIT?",
                "What are the basketball facilities at ABV-IIIT?"
              ],
              "responses": [
                "ABV-IIIT has basketball courts in its sports complex where students can engage in basketball matches and practice sessions."
              ],
              "context_set": ""
            },
            {
              "tag": "volleyball",
              "patterns": [
                "Is volleyball available at ABV-IIIT?",
                "Where can I play volleyball at ABV-IIIT?",
                "Does ABV-IIIT have volleyball courts?",
                "What are the volleyball facilities at ABV-IIIT?"
              ],
              "responses": [
                "Yes, ABV-IIIT has volleyball courts where students can play and practice volleyball as part of the sports facilities."
              ],
              "context_set": ""
            },
            {
              "tag": "sports_events",
              "patterns": [
                "Are there any sports events at ABV-IIIT?",
                "When are the sports events held at ABV-IIIT?",
                "How can I participate in sports events at ABV-IIIT?",
                "What sports events are organized by ABV-IIIT?"
              ],
              "responses": [
                "ABV-IIIT organizes various sports events throughout the year, including inter-departmental competitions, annual sports fests, and other athletic events. Students can participate by registering through the sports club or respective event organizers."
              ],
              "context_set": ""
            },
            {
              "tag": "sports_club",
              "patterns": [
                "Is there a sports club at ABV-IIIT?",
                "What activities are organized by the sports club at ABV-IIIT?",
                "How can I join the sports club at ABV-IIIT?",
                "What sports clubs are available at ABV-IIIT?"
              ],
              "responses": [
                "ABV-IIIT has a dedicated sports club that organizes various sports activities and events. Students can join the club to participate in different sports and also represent the university in inter-college competitions."
              ],
              "context_set": ""
            },
              {
                "tag": "professors",
                "patterns": [
                  "Who are the professors at ABV-IIIT?",
                  "Can you tell me about the faculty at ABV-IIIT?",
                  "Who are the faculty members at ABV-IIIT?",
                  "What is the qualification of the professors at ABV-IIIT?",
                  "How many professors are there at ABV-IIIT?"
                ],
                "responses": [
                  "ABV-IIIT has a distinguished faculty with experts in various fields of engineering, computer science, and mathematics. Professors at the institute hold advanced degrees from reputed institutions and contribute to research and teaching in their respective departments."
                ],
                "context_set": ""
              },
              {
                "tag": "professor_qualification",
                "patterns": [
                  "What is the qualification of professors in the computer science department?",
                  "Are the professors at ABV-IIIT Ph.D. holders?",
                  "What qualifications do the professors in engineering have?",
                  "What degrees do professors at ABV-IIIT hold?"
                ],
                "responses": [
                  "The professors at ABV-IIIT typically hold Ph.D. degrees or equivalent qualifications from reputed institutions. They are experts in their fields and engage in advanced research and teaching."
                ],
                "context_set": ""
              },
              {
                "tag": "professor_experience",
                "patterns": [
                  "How experienced are the professors at ABV-IIIT?",
                  "Do professors at ABV-IIIT have industry experience?",
                  "What is the experience level of the faculty at ABV-IIIT?"
                ],
                "responses": [
                  "Many professors at ABV-IIIT have years of experience in academia and the industry. Their backgrounds bring a combination of practical and theoretical knowledge to the classroom, enhancing the learning experience."
                ],
                "context_set": ""
              },
              {
                "tag": "professor_contact",
                "patterns": [
                  "How can I contact a professor at ABV-IIIT?",
                  "Where can I find the contact details of professors at ABV-IIIT?",
                  "How do I reach out to a faculty member at ABV-IIIT?"
                ],
                "responses": [
                  "You can contact professors at ABV-IIIT through the official institute website or your respective department's communication platform. Faculty contact details are typically shared with students during the beginning of each semester."
                ],
                "context_set": ""
              },
              {
                "tag": "professor_mentorship",
                "patterns": [
                  "Do professors at ABV-IIIT offer mentorship?",
                  "Can professors guide me with my project at ABV-IIIT?",
                  "How can I get a mentor among professors at ABV-IIIT?"
                ],
                "responses": [
                  "Yes, professors at ABV-IIIT provide mentorship to students, guiding them with their academic projects, research, and career development. You can approach your course instructor or department head to seek guidance."
                ],
                "context_set": ""
              },
              {
                "tag": "professor_research",
                "patterns": [
                  "What research areas do the professors at ABV-IIIT focus on?",
                  "What are the ongoing research projects at ABV-IIIT?",
                  "Can I work with professors on research projects at ABV-IIIT?"
                ],
                "responses": [
                  "Professors at ABV-IIIT engage in a wide range of research fields, including artificial intelligence, machine learning, cryptography, data science, and more. Students can participate in research projects by reaching out to the respective professors."
                ],
                "context_set": ""
              },
              {
                "tag": "professor_awards",
                "patterns": [
                  "Have any professors at ABV-IIIT won awards?",
                  "What are the achievements of ABV-IIIT faculty?",
                  "Has any professor from ABV-IIIT been recognized for their work?"
                ],
                "responses": [
                  "Several professors at ABV-IIIT have won prestigious awards for their research contributions, academic excellence, and innovations. Their achievements are often highlighted in the institute's newsletters and official announcements."
                ],
                "context_set": ""
              },
              {
                "tag": "professor_publications",
                "patterns": [
                  "Do professors at ABV-IIIT publish papers?",
                  "Where can I find the publications of professors at ABV-IIIT?",
                  "What kind of research papers do the professors at ABV-IIIT publish?"
                ],
                "responses": [
                  "Yes, the professors at ABV-IIIT frequently publish research papers in top-tier journals and conferences. You can find their publications listed on research databases like Google Scholar or on the official ABV-IIIT website."
                ],
                "context_set": ""
              },
                {
                  "tag": "butterfly_conservatory",
                  "patterns": [
                    "What is the butterfly conservatory?",
                    "Where is the butterfly conservatory located?",
                    "Can I visit the butterfly conservatory at ABV-IIIT?",
                    "What is special about the butterfly conservatory?"
                  ],
                  "responses": [
                    "The butterfly conservatory at ABV-IIIT is a special space dedicated to preserving and showcasing various butterfly species. It offers students and visitors a peaceful environment to explore biodiversity."
                  ],
                  "context_set": ""
                },
                {
                  "tag": "biodiversity_park",
                  "patterns": [
                    "biodiversity park",
                    "What is the biodiversity park?",
                    "Where is the biodiversity park located?",
                    "Can students visit the biodiversity park?",
                    "What kind of plants and animals are in the biodiversity park?"
                  ],
                  "responses": [
                    "The biodiversity park at ABV-IIIT is a space aimed at promoting ecological balance. It houses a variety of flora and fauna, providing a great learning opportunity for students interested in nature and conservation."
                  ],
                  "context_set": ""
                },
                {
                  "tag": "sports_complex",
                  "patterns": [
                    "sports complex",
                    "Where is the sports complex located?",
                    "What sports are available in the sports complex?",
                    "Can students access the sports complex?",
                    "Does ABV-IIIT have a sports complex?"
                  ],
                  "responses": [
                    "The sports complex at ABV-IIIT offers state-of-the-art facilities for a variety of sports, including badminton, tennis, basketball, and more. Students can use these facilities during their free time or as part of college events."
                  ],
                  "context_set": ""
                },
                {
                  "tag": "canteen",
                  "patterns": [
                    "What food is available at the canteen?",
                    "Where is the canteen in ABV-IIIT?",
                    "How is the food in the canteen?",
                    "Does the canteen offer vegetarian food?"
                  ],
                  "responses": [
                    "ABV-IIIT has a well-maintained canteen offering a variety of meals, including vegetarian and non-vegetarian options. The food is both affordable and healthy, catering to students' needs throughout the day."
                  ],
                  "context_set": ""
                },
                {
                  "tag": "nescafe",
                  "patterns": [
                    "Where is the Nescafe shop located?",
                    "What is the Nescafe shop?",
                    "Can I get coffee at ABV-IIIT?",
                    "Is there a coffee shop in ABV-IIIT?"
                  ],
                  "responses": [
                    "The Nescafe shop at ABV-IIIT offers a range of coffee and snacks. It’s a popular hangout spot for students to grab a quick bite or enjoy a coffee break between classes."
                  ],
                  "context_set": ""
                },
                {
                  "tag": "library",
                  "patterns": [
                    "Where is the library?",
                    "What are the timings of the library?",
                    "Does ABV-IIIT have a large library?",
                    "How many books are available in the library?"
                  ],
                  "responses": [
                    "ABV-IIIT has a large and well-stocked library that offers a vast collection of academic and reference books. The library is open throughout the week, and students can access it for their studies and research."
                  ],
                  "context_set": ""
                },
                {
                  "tag": "reading_room",
                  "patterns": [
                    "Where is the reading room?",
                    "Can I study in the reading room?",
                    "Is there a dedicated space for quiet study at ABV-IIIT?",
                    "What are the facilities in the reading room?"
                  ],
                  "responses": [
                    "ABV-IIIT provides a peaceful reading room for students who prefer quiet study. It is equipped with comfortable seating, proper lighting, and a calm environment for focused learning."
                  ],
                  "context_set": ""
                },
                {
                  "tag": "centralized_ac",
                  "patterns": [
                    "Are the classrooms air-conditioned?",
                    "Do the classrooms have centralized AC?",
                    "What is the temperature regulation in classrooms?",
                    "Are the lecture halls air-conditioned?"
                  ],
                  "responses": [
                    "Yes, all classrooms at ABV-IIIT are centrally air-conditioned to ensure a comfortable learning environment for students throughout the year."
                  ],
                  "context_set": ""
                },
                {
                  "tag": "wifi",
                  "patterns": [
                    "wifi",
                    "Is Wi-Fi available at ABV-IIIT?",
                    "Can I use the internet on campus?",
                    "Is there Wi-Fi in the hostels?",
                    "What is the internet speed on campus?"
                  ],
                  "responses": [
                    "ABV-IIIT offers high-speed Wi-Fi across the campus, including hostels, classrooms, and common areas, allowing students to stay connected for academic and personal use."
                  ],
                  "context_set": ""
                },
                {
                  "tag": "hostel",
                  "patterns": [
                    "hostel",
                    "Where are the hostels located?",
                    "What facilities are available in the hostels?",
                    "Are there separate hostels for boys and girls?",
                    "How can I apply for a hostel?"
                  ],
                  "responses": [
                    "ABV-IIIT offers comfortable hostel facilities with separate accommodations for boys and girls. Hostels are equipped with Wi-Fi, 24/7 security, mess facilities, and other amenities to ensure a safe and comfortable stay."
                  ],
                  "context_set": ""
                },
                {
                  "tag": "security",
                  "patterns": [
                    "security",
                    "What security measures are in place at ABV-IIIT?",
                    "Is there security on campus?",
                    "How safe is ABV-IIIT campus?",
                    "Are there security guards at ABV-IIIT?"
                  ],
                  "responses": [
                    "ABV-IIIT ensures a safe and secure campus with round-the-clock security personnel, CCTV surveillance, and access control measures in place for the safety of students and staff."
                  ],
                  "context_set": ""
                },
                {
                  "tag": "transportation",
                  "patterns": [
                    "transportation",
                    "Is there a transport facility at ABV-IIIT?",
                    "How do students commute to campus?",
                    "Ar
