"use client";

import { Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "motion/react";

// Social media links data
const socialLinks = [
  {
    name: "X",
    url: "https://x.com/Parbhat03",
    icon: Twitter,
    label: "X (Twitter)",
  },
  {
    name: "Email",
    url: "mailto:parbhat@parbhat.dev",
    icon: Mail,
    label: "Email",
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/parbhat-kapila/",
    icon: Linkedin,
    label: "LinkedIn",
  },
];

// Animation configuration
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.5 },
};

// Contact button component
const ContactButton = ({
  href,
  icon: Icon,
  label,
  children,
  ...props
}: {
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
    className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-600 rounded text-gray-400 hover:text-white hover:border-gray-500 transition-colors flex items-center gap-2 text-sm sm:text-base"
    aria-label={label}
    {...props}
  >
    <Icon className="w-4 h-4" />
    <span>{children}</span>
  </a>
);

// Hire me section component
const HireMeSection = () => (
  <div className="space-y-3 sm:space-y-4">
    <h2 className="text-xl sm:text-2xl font-bold text-white">Hire Me</h2>
    <p className="text-gray-400 text-sm sm:text-base">
    I&apos;ve spent 3+ years building production systems that scale - from payment infrastructure to AI integrations. Ready to join a team that moves fast and ships daily.
    </p>
    <a
      href="mailto:parbhat@parbhat.dev"
      className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-600 rounded text-gray-400 hover:text-white hover:border-gray-500 transition-colors inline-flex items-center gap-2 text-sm sm:text-base"
    >
      <Mail className="w-4 h-4" />
      Hire Me
    </a>
  </div>
);

// Footer section component
const FooterSection = () => (
  <div className="pt-8 border-t border-gray-600">
    <div className="flex flex-col items-center space-y-4 text-center">
      <p className="text-gray-400 italic">
        &quot;Building AI products that work. Let&apos;s ship together.&quot;
      </p>
      <p className="text-sm text-gray-500">
        © 2025 Parbhat. All rights reserved.
      </p>
    </div>
  </div>
);

const SocialFooters = () => {
  return (
    <motion.footer className="space-y-6 sm:space-y-8" {...fadeInUp}>
      {/* Contact section */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Reach out to me</h2>
        <p className="text-gray-400 text-sm sm:text-base">
          I work with Next.js, TypeScript, Python, and PostgreSQL to build
          production AI applications. Experienced with RAG architectures,
          LangChain, vector databases, and real-time systems. If you&apos;re a
          startup that needs someone who ships daily, let&apos;s talk about your next
          build.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3">
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
