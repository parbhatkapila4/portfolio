"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "motion/react";

// Social media links data
const socialLinks = [
  {
    name: "X",
    url: "https://x.com/Devcodies",
    icon: Twitter,
    label: "X (Twitter)"
  },
  {
    name: "Email",
    url: "mailto:parbhatkapila4@gmail.com",
    icon: Mail,
    label: "Email"
  },
  {
    name: "Github",
    url: "https://github.com/parbhatkapila4",
    icon: Github,
    label: "GitHub"
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/parbhat-kapila/",
    icon: Linkedin,
    label: "LinkedIn"
  },
];

// Animation configuration
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.5 }
};

// Contact button component
const ContactButton = ({ href, icon: Icon, label, children, ...props }: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
  [key: string]: unknown;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="px-4 py-2 border border-gray-600 rounded text-gray-400 hover:text-white hover:border-gray-500 transition-colors flex items-center gap-2"
    aria-label={label}
    {...props}
  >
    <Icon className="w-4 h-4" />
    <span>{children}</span>
  </a>
);

// Hire me section component
const HireMeSection = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-white">Hire Me</h2>
    <p className="text-gray-400">
      I&apos;m available for freelance projects and consulting opportunities. With 5+ years of experience in full-stack development and AI integration, I can help bring your ideas to life.
    </p>
    <button className="px-4 py-2 border border-gray-600 rounded text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
      Hire Me
    </button>
  </div>
);

// Footer section component
const FooterSection = () => (
  <div className="pt-8 border-t border-gray-600">
    <div className="flex flex-col items-center space-y-4 text-center">
      <p className="text-gray-400 italic">
        &ldquo;I might not be the best developer, but I&apos;m the best developer&rdquo;
      </p>
      <p className="text-sm text-gray-500">
        © 2025 Parbhat. All rights reserved.
      </p>
    </div>
  </div>
);

const SocialFooters = () => {
  return (
    <motion.footer
      className="space-y-8"
      {...fadeInUp}
    >
      {/* Contact section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Reach out to me</h2>
        <p className="text-gray-400">
          Have a project in mind or just want to chat? I&apos;m always open to discussing new opportunities and interesting projects.
        </p>
        
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <ContactButton
              key={link.name}
              href={link.url}
              icon={link.icon}
              label={link.label}
            >
              {link.name}
            </ContactButton>
          ))}
        </div>
      </div>

      <HireMeSection />
      <FooterSection />
    </motion.footer>
  );
};

export default SocialFooters;
