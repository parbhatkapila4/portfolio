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
        className="relative flex items-center backdrop-blur-md rounded-full px-4 sm:px-6 py-2.5 sm:py-3.5 overflow-hidden"
        style={{
          background: "linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)) padding-box, linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(34, 211, 238, 0.3), rgba(103, 232, 249, 0.3)) border-box",
          border: "1px solid transparent",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(6, 182, 212, 0.1)",
        }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 8.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-cyan-400/5 to-cyan-300/5" />
        <div className="relative z-10 flex items-center gap-4 sm:gap-6">
          {socialMedia.map((social, index) => (
            <motion.a
              href={social.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-gray-300 cursor-pointer transition-all duration-300 group/social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 8.4 + index * 0.1 }}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-cyan-300/20 rounded-full opacity-0 group-hover/social:opacity-100 blur-md transition-opacity duration-300" />
              <social.icon className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover/social:text-cyan-400 transition-colors duration-300" />
            </motion.a>
          ))}
          <motion.div 
            className="bg-gradient-to-b from-cyan-500/30 to-cyan-300/30 w-px h-6 mx-1"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.3, delay: 8.8 }}
          ></motion.div>
          <motion.div
            className="relative group/profile"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 9.0 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/40 to-cyan-300/40 rounded-full opacity-0 group-hover/profile:opacity-100 blur-md transition-opacity duration-300" />
            <Link href="/" className="relative z-10 cursor-pointer block">
              <Image
                src="/parbhat2.png"
                alt="Profile Picture"
                width={28}
                height={28}
                className="rounded-full border-2 border-white/20 group-hover/profile:border-cyan-400/60 transition-colors duration-300 object-cover sm:w-8 sm:h-8"
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default SocialFooters;
