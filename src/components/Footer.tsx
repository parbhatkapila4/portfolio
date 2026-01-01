"use client";

import { Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "motion/react";

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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.5 },
};

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
    className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-800 rounded-lg text-gray-400 hover:text-white hover:border-gray-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
    aria-label={label}
    {...props}
  >
    <Icon className="w-4 h-4" />
    <span>{children}</span>
  </a>
);

const HireMeSection = () => (
  <div className="space-y-3 sm:space-y-4">
    <h2 className="text-xl sm:text-2xl font-bold text-white">Hire Me</h2>
    <p className="text-gray-400 text-sm sm:text-base">
      I&apos;ve spent the last three years maintaining and extending production
      systems while usage, complexity, and expectations increased. If
      you&apos;re looking for an engineer who can handle change, ambiguity, and
      ongoing responsibility without constant oversight, feel free to reach out.
    </p>
    <a
      href="mailto:parbhat@parbhat.dev"
      className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-800 rounded-lg text-gray-400 hover:text-white hover:border-gray-700 transition-colors inline-flex items-center gap-2 text-sm sm:text-base"
    >
      <Mail className="w-4 h-4" />
      Hire Me
    </a>
  </div>
);

const SocialFooters = () => {
  return (
    <motion.footer
      id="contact"
      className="py-16 md:py-24 space-y-6 sm:space-y-8"
      {...fadeInUp}
    >
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Reach out to me
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          If you&apos;re working on an AI product that already users and real
          constraints and need someone comfortable with operating systems once
          they&apos;re live, I&apos;m open to a conversation. I tend to work
          closely with founders and small teams where engineering decisions
          directly affect users.
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
    </motion.footer>
  );
};

export default SocialFooters;
