import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Header Component
 * Sticky navigation with serif branding & magnetic CTA button
 * Theme: Midnight Slate (#05080C) + Liquid Gold (#E49F1B)
 */

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05080C]/90 backdrop-blur-lg border-b border-[#E49F1B]/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand Logo - Serif */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded bg-gradient-to-br from-[#E49F1B] to-[#3B0527] flex items-center justify-center shadow-md">
            <span className="text-lg font-serif font-bold text-[#05080C]">C</span>
          </div>
          <span className="text-xl font-serif font-medium tracking-wide text-white hidden sm:inline">
            Chandrakanth
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className="relative text-gray-300 hover:text-[#E49F1B] transition-colors duration-300 text-xs font-semibold uppercase tracking-[0.2em] py-1"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Magnetic CTA Button */}
        <button
          onClick={handleCTAClick}
          className="magnetic-button hidden md:block px-6 py-2.5 bg-transparent border border-[#E49F1B] text-[#E49F1B] font-semibold rounded text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#E49F1B] hover:text-[#05080C] hover:shadow-lg hover:shadow-[#E49F1B]/20"
        >
          Get Started
        </button>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        >
          <motion.span
            animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#E49F1B] rounded"
          />
          <motion.span
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-[#E49F1B] rounded"
          />
          <motion.span
            animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#E49F1B] rounded"
          />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={
          mobileMenuOpen
            ? { opacity: 1, height: 'auto' }
            : { opacity: 0, height: 0 }
        }
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-[#05080C]/95 backdrop-blur-lg border-b border-[#E49F1B]/10"
      >
        <nav className="flex flex-col gap-4 px-6 py-6">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#E49F1B] transition-colors duration-300 text-xs font-semibold uppercase tracking-[0.2em]"
            >
              {item.label}
            </motion.a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleCTAClick();
            }}
            className="mt-2 w-full px-6 py-3 bg-[#E49F1B] text-[#05080C] font-semibold rounded text-xs uppercase tracking-[0.2em] transition-all duration-300"
          >
            Get Started
          </button>
        </nav>
      </motion.div>
    </motion.header>
  );
}
