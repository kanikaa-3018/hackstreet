import { useState } from "react";
import { motion } from "framer-motion";

export default function MemoriesPage() {
  const [memories, setMemories] = useState([
    { image: "https://i.pinimg.com/736x/af/ec/68/afec68488773416b123b91e35f973c60.jpg" },
    { image: "https://i.pinimg.com/736x/3c/3a/c9/3c3ac9aa0a6863ba3b8b2568308c85b6.jpg" },
    { image: "https://i.pinimg.com/736x/8a/b5/a5/8ab5a54444aec89fff4003cd234279e0.jpg" },
    { image: "https://i.pinimg.com/736x/58/5c/e5/585ce5b32ed24dd07f8ae6c2b900aefa.jpg" },
    { image: "https://i.pinimg.com/736x/8f/3f/4e/8f3f4ebbc5b85326c73df2f47bc3fb1d.jpg" },
    { image: "https://i.pinimg.com/736x/8c/4b/fe/8c4bfecda2a031a71e12a03eb2f6a530.jpg" },
    { image: "https://i.pinimg.com/736x/17/59/24/1759245bb6f3c3b336e623ad7b73e07f.jpg" },
    { image: "https://i.pinimg.com/736x/19/15/9c/19159cd4d278a19af64ce71794e5e70f.jpg" },
    { image: "https://i.pinimg.com/736x/0a/12/f8/0a12f8a1fbb50c24416fa8bffee15d15.jpg" },
    { image: "https://i.pinimg.com/736x/c9/9e/dc/c99edcc9fa35736779c96ac0dda02465.jpg" },
    { image: "https://i.pinimg.com/736x/84/54/cb/8454cbc60fa61422ba2dd7a8981ea56b.jpg" },
    { image: "https://i.pinimg.com/736x/4f/9e/f7/4f9ef757556ccba179f8922b8ece7599.jpg" },
    { image: "https://i.pinimg.com/736x/86/09/e4/8609e47c137e5586ddb2517bae0305b9.jpg" },
    { image: "https://i.pinimg.com/736x/3a/d1/f5/3ad1f5dc7573b5d046d83f88d4bd12c7.jpg" },
    { image: "https://i.pinimg.com/736x/ea/c8/10/eac81045ac5ca9826173c4fdfb216bb0.jpg" },
    { image: "https://i.pinimg.com/736x/94/f1/95/94f1951b051a067527da0103f2e680bc.jpg" },
    { image: "https://i.pinimg.com/736x/d3/56/63/d3566319fd06a0cf9e7b90e71e78e214.jpg" },
    { image: "https://i.pinimg.com/736x/e9/9c/e8/e99ce8d60a13a7c56bc961e3de75893e.jpg" },
    { image: "https://images.indianexpress.com/2021/02/DU-1200-1.jpg" },
    { image: "https://www.iiad.edu.in/wp-content/uploads/2022/05/image2-6-1024x725.webp"},
    { image: "https://www.sjchs.edu.in/wp-content/uploads/2023/01/DIWALI-CELEBRATION.jpg" },
    { image: "https://files.prokerala.com/news/photos/imgs/1024/college-students-celebrate-diwali-in-chennai-on-469599.jpg" },
    { image: "https://images.memphistours.com/large/918111627_20110820-134628.Full_1.jpg" },
    { image: "https://th.bing.com/th/id/R.c7e559b5b1a8943996287354c9884c8c?rik=6mUtQffU%2fBSzIg&riu=http%3a%2f%2fs1.travix.com%2fas%2fasia-japan-kamakura-fireworks-medium.jpg&ehk=9fUbNOmhyGiEF8Wkk3WcT%2bp0EwmsZaTpQZR56NCbs6Y%3d&risl=&pid=ImgRaw&r=0" }
  ]);

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Alumni Memories
      </motion.h1>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        {memories.map((mem, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
            className="relative"
          >
            <img
              src={mem.image}
              alt="Memory"
              className="w-full h-72 object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
