"use client";

import { Linkedin, Github, Mail, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a
          href="#home"
          className="text-sm font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-white/20 rounded px-1"
        >
          Parbhat Kapila
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="#projects"
            className="text-xs text-gray-400 hover:text-white transition-colors tracking-wide uppercase"
          >
            Work
          </a>
          <a
            href="#skills"
            className="text-xs text-gray-400 hover:text-white transition-colors tracking-wide uppercase"
          >
            Skills
          </a>
          <a
            href="#about"
            className="text-xs text-gray-400 hover:text-white transition-colors tracking-wide uppercase"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-xs text-gray-400 hover:text-white transition-colors tracking-wide uppercase"
          >
            Contact
          </a>
          <div className="h-4 w-px bg-white/10"></div>
          <a
            href="https://www.linkedin.com/in/parbhat-kapila/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/parbhatkapila4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="mailto:parbhat@parbhat.dev"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 rounded p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-md"
        >
          <div className="px-4 py-4 space-y-4">
            <a
              href="#projects"
              className="block text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              Work
            </a>
            <a
              href="#skills"
              className="block text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              Skills
            </a>
            <a
              href="#about"
              className="block text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="block text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="h-px bg-white/10 my-4"></div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/parbhat-kapila/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/parbhatkapila4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:parbhat@parbhat.dev"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
