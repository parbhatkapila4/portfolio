"use client";

import { Github, Linkedin, Mail, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const socialMedia = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/parbhat-kapila/",
    icon: Linkedin,
  },
  {
    name: "X",
    url: "https://x.com/Devcodies",
    icon: X,
  },
  {
    name: "Github",
    url: "https://github.com/parbhatkapila4",
    icon: Github,
  },
  {
    name: "Email",
    url: "mailto:parbhatkapila4@gmail.com",
    icon: Mail,
  },
];

const SocialFooters = () => {
  return (
    <motion.nav 
      className="fixed bottom-10 left-0 right-0 z-50 flex justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 8.0, ease: "easeOut" }}
    >
      <motion.div 
        className="flex items-center backdrop-blur-sm border border-white/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 8.2, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4 sm:gap-6">
          {socialMedia.map((social, index) => (
            <motion.a
              href={social.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 cursor-pointer hover:text-white transition-all duration-300 hover:scale-110"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 8.4 + index * 0.1 }}
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
          ))}
          <motion.div 
            className="bg-white/20 w-px h-6 mx-1"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.3, delay: 8.8 }}
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 9.0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="cursor-pointer">
              <Image
                src="/parbhat.png"
                alt="Profile Picture"
                width={28}
                height={28}
                className="rounded-2xl border-2 border-black hover:border-yellow-400/50 transition-colors duration-500 object-cover sm:w-8 sm:h-8"
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default SocialFooters;
