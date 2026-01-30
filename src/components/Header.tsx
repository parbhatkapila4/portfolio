"use client";

import { Linkedin, Github, Mail, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-200/80 dark:bg-black/80 dark:border-white/5"
          : "bg-transparent dark:bg-transparent"
        }`}
      role="banner"
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between" aria-label="Main navigation">
        <a
          href="#home"
          className="font-heading font-semibold text-lg tracking-tight transition-colors text-slate-900 hover:text-teal-600 dark:text-white dark:hover:text-teal-400"
          title="Parbhat Kapila - Full Stack Engineer Portfolio Home"
        >
          Parbhat Kapila
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium transition-colors text-slate-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-white after:absolute after:left-0 after:bottom-[-2px] after:h-0.5 after:w-0 after:bg-teal-500 dark:after:bg-teal-400 after:transition-[width] after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <div className="h-4 w-px bg-slate-300 dark:bg-white/10" />
          <ThemeToggle />
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/parbhat-kapila/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/parbhatkapila4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:parbhat@parbhat.dev"
              className="text-slate-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/30 dark:focus:ring-white/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-black/95 border-b border-slate-200 dark:border-white/5 shadow-lg backdrop-blur-md"
        >
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 px-3 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-teal-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/5 flex items-center gap-4">
              <ThemeToggle />
              <div className="flex gap-2">
                <a href="https://www.linkedin.com/in/parbhat-kapila/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-teal-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com/parbhatkapila4" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-teal-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white">
                  <Github className="w-5 h-5" />
                </a>
                <a href="mailto:parbhat@parbhat.dev" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-teal-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
