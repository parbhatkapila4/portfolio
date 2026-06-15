"use client";

import { Linkedin, Github, Mail, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled
          ? "bg-[var(--background)]/85 backdrop-blur-md border-b border-black/10 dark:border-white/10"
          : "border-b border-transparent"
        }`}
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-10 lg:px-16"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="font-heading text-base font-semibold tracking-[-0.01em] transition-opacity hover:opacity-60"
          title="Parbhat Kapila - AI Systems Engineer"
        >
          Parbhat Kapila
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-[var(--foreground)] dark:text-neutral-400 dark:hover:text-[var(--foreground)]"
            >
              <span className="relative">
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-[width] duration-300 group-hover:w-full" />
              </span>
            </a>
          ))}
          <span className="h-3.5 w-px bg-black/15 dark:bg-white/15" />
          <div className="flex items-center gap-3.5">
            <a href="https://www.linkedin.com/in/parbhat-kapila/" target="_blank" rel="noopener noreferrer" className="text-neutral-500 transition-colors hover:text-[var(--foreground)] dark:text-neutral-400" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://github.com/parbhatkapila4" target="_blank" rel="noopener noreferrer" className="text-neutral-500 transition-colors hover:text-[var(--foreground)] dark:text-neutral-400" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="flex h-10 w-10 items-center justify-center text-[var(--foreground)] transition-opacity hover:opacity-60 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-current"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="absolute left-0 right-0 top-full border-b border-black/10 bg-[var(--background)] md:hidden dark:border-white/10"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block border-t border-black/10 py-4 font-mono text-sm uppercase tracking-[0.2em] text-[var(--foreground)] first:border-t-0 dark:border-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-6 flex items-center gap-5 border-t border-black/10 pt-6 dark:border-white/10">
              <a href="https://www.linkedin.com/in/parbhat-kapila/" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[var(--foreground)]" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/parbhatkapila4" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[var(--foreground)]" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="mailto:parbhat@parbhat.work" className="text-neutral-500 hover:text-[var(--foreground)]" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
