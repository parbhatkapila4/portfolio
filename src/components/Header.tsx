"use client";

import { Linkedin, Github, Mail, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled && !mobileMenuOpen
          ? "border-line bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-5 sm:px-10 lg:px-14"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="font-display text-[15px] font-semibold tracking-[-0.01em] text-[var(--foreground)] transition-opacity hover:opacity-70"
          title="Parbhat Kapila - AI Systems Engineer"
        >
          Parbhat Kapila
        </a>

        <div className="hidden items-baseline gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-[var(--foreground)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="https://www.linkedin.com/in/parbhat-kapila/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-[var(--foreground)]"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/parbhatkapila4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-[var(--foreground)]"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center text-[var(--foreground)] transition-opacity hover:opacity-70 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-current lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 -z-10 flex flex-col bg-background px-6 pb-10 pt-28 sm:px-10 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: EASE }}
                  className="flex items-baseline justify-between border-t border-line py-5 last:border-b"
                >
                  <span className="font-display text-4xl font-bold uppercase leading-none tracking-[-0.03em] text-[var(--foreground)]">
                    {link.label}
                  </span>
                  <span aria-hidden className="font-mono text-[10px] tabular-nums text-faint">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5, ease: EASE }}
              className="mt-auto flex items-center gap-7"
            >
              <a
                href="https://www.linkedin.com/in/parbhat-kapila/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-[var(--foreground)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/parbhatkapila4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-[var(--foreground)]"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:parbhat@parbhat.work"
                className="text-muted transition-colors hover:text-[var(--foreground)]"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
