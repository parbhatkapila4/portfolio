"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Download } from "lucide-react";

// Animation configuration
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Social links data
const socialLinks = [
  {
    href: "https://x.com/Parbhat03",
    icon: Twitter,
    label: "Twitter"
  },
  {
    href: "https://www.linkedin.com/in/parbhat-kapila/",
    icon: Linkedin,
    label: "LinkedIn"
  },
  {
    href: "https://github.com/parbhatkapila4",
    icon: Github,
    label: "GitHub"
  }
];

// Available status badge component
const AvailableBadge = () => (
  <div className="relative group">
    {/* Glow layers */}
    <div className="absolute -inset-2 bg-gradient-to-r from-green-200 via-emerald-300 to-green-200 rounded-2xl blur-xl opacity-10 group-hover:opacity-25 transition-all duration-700" />
    <div className="absolute -inset-1 bg-gradient-to-r from-green-300 via-emerald-400 to-green-300 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500" />
    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 rounded-lg blur-sm opacity-50 group-hover:opacity-70 transition-all duration-300 animate-pulse" />
    
    {/* Main badge */}
    <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-green-300/50 shadow-2xl overflow-hidden backdrop-blur-sm">
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      
      {/* Content */}
      <div className="flex items-center gap-1.5 relative z-10">
        <div className="relative">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping shadow-lg shadow-white/60" />
          <div className="absolute inset-0 w-1.5 h-1.5 bg-white rounded-full shadow-xl shadow-white/80" />
          <div className="absolute inset-0 w-1.5 h-1.5 bg-gradient-to-br from-white to-green-100 rounded-full" />
        </div>
        <span className="bg-gradient-to-r from-white via-green-50 to-white bg-clip-text text-transparent font-black tracking-wider drop-shadow-lg text-shadow-sm">
          Available
        </span>
        <div className="w-0.5 h-0.5 bg-white/90 rounded-full animate-pulse shadow-sm" />
      </div>
    </div>
  </div>
);

const Header = () => {
  return (
    <motion.div
      className="space-y-6 mt-6"
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={fadeInUp.transition}
    >
      {/* Profile section */}
      <div className="flex items-start gap-6">
        <Image
          src="/Parbhat1.jpg"
          alt="Parbhat Kapila"
          width={110}
          height={110}
          priority
          unoptimized
          className="object-cover rounded-full"
        />
        
        <div className="flex-1">
          {/* Name and status */}
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold text-white">Parbhat Kapila</h1>
            <AvailableBadge />
          </div>
          
          <p className="text-gray-400 text-lg mb-1">Full-Stack Software Engineer</p>
          <p className="text-gray-500 text-sm mb-4">Open to full-time remote opportunities at early-stage startups</p>
          
          {/* Social links and resume button */}
          <div className="flex gap-3 items-center">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </Link>
            ))}
            
            {/* Resume button */}
            <Link
              href="https://drive.google.com/file/d/1SQcH4uzQXoLJONk6wU76-wuf3FF4vpwc/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-600 rounded text-gray-400 hover:text-white hover:border-gray-500 transition-colors text-sm"
              aria-label="Download Resume"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
