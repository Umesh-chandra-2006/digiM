import React from 'react';
import { motion } from 'framer-motion';

/**
 * Footer Component
 * Premium footer with serif display details
 * Theme: Midnight Slate (#05080C) + Gold (#E49F1B) + Burgundy (#3B0527)
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05080C] border-t border-[#E49F1B]/10 py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif font-medium text-white mb-4 tracking-wide">Chandrakanth & Team</h3>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm font-sans">
              Scaling digital systems and securing performance campaign ROAS through data-driven search optimization, paid advertising, and automation engineering.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xs uppercase tracking-widest text-[#E49F1B] font-semibold mb-4 font-sans">Sitemap</h4>
            <ul className="space-y-3 text-xs font-sans">
              <li>
                <a href="#about" className="text-gray-400 hover:text-[#E49F1B] transition-colors duration-300">
                  Meet the Team
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#E49F1B] transition-colors duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#case-studies" className="text-gray-400 hover:text-[#E49F1B] transition-colors duration-300">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#process" className="text-gray-400 hover:text-[#E49F1B] transition-colors duration-300">
                  Workflow
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xs uppercase tracking-widest text-[#E49F1B] font-semibold mb-4 font-sans">Get In Touch</h4>
            <div className="space-y-3 text-xs font-sans">
              <p className="text-gray-400">
                <span className="text-[#E49F1B]">Email:</span> chandrakanth102001@gmail.com
              </p>
              <p className="text-gray-400">
                <span className="text-[#E49F1B]">Phone:</span> +91 9177002687
              </p>
              <p className="text-gray-400">
                <span className="text-[#E49F1B]">Location:</span> India
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E49F1B]/10 py-8" />

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 font-sans tracking-wide uppercase"
        >
          <p>&copy; {currentYear} Chandrakanth Thirumani & Team. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#E49F1B] transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#E49F1B] transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
