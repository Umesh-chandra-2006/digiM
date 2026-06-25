import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * CTA Section Component
 * Centered typography CTA block with gold and burgundy styling
 * Theme: Midnight Slate (#05080C) + Imperial Burgundy (#3B0527) + Gold (#E49F1B)
 */

export default function CTASection() {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });

  const handleAuditClick = () => {
    window.location.href = 'mailto:chandrakanth102001@gmail.com?subject=Free Audit Request';
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+919177002687';
  };

  return (
    <section
      ref={ref}
      className="py-32 px-4 bg-gradient-to-b from-[#05080C] via-[#3B0527]/20 to-[#05080C] relative overflow-hidden"
    >
      {/* Background radial gradients */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-br from-[#3B0527]/25 to-transparent rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Main Heading - Serif */}
        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-serif font-medium mb-6 text-white leading-tight"
        >
          Let's Build Something <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E49F1B] via-[#F6C15C] to-[#E49F1B] font-serif italic">
            Extraordinary
          </span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-sm md:text-base text-gray-300 mb-12 leading-relaxed max-w-xl mx-auto font-sans"
        >
          Scale your digital acquisition funnel. Get in touch to schedule a comprehensive free audit of your active campaigns and system workflows.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
        >
          {/* Primary CTA */}
          <button
            onClick={handleAuditClick}
            className="magnetic-button group relative px-8 py-4.5 bg-[#E49F1B] text-[#05080C] font-semibold text-xs uppercase tracking-[0.25em] rounded transition-all duration-300 hover:shadow-xl hover:shadow-[#E49F1B]/35 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start Free Audit
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">➔</span>
            </span>
            <span className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-300 group-hover:translate-y-0" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={handleCallClick}
            className="magnetic-button px-8 py-4.5 border border-[#E49F1B] text-[#E49F1B] font-semibold rounded text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:bg-[#E49F1B]/10 w-full sm:w-auto"
          >
            Call / WhatsApp
          </button>
        </motion.div>

        {/* Contact Info Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.45 }}
          className="pt-12 border-t border-[#E49F1B]/15 max-w-2xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 justify-center items-center text-xs md:text-sm font-sans">
            <a
              href="mailto:chandrakanth102001@gmail.com"
              className="text-gray-300 hover:text-[#E49F1B] transition-colors duration-300 flex items-center gap-2.5 group"
            >
              <span className="text-[#E49F1B] group-hover:scale-110 transition-transform duration-300">📧</span>
              chandrakanth102001@gmail.com
            </a>
            <a
              href="tel:+919177002687"
              className="text-gray-300 hover:text-[#E49F1B] transition-colors duration-300 flex items-center gap-2.5 group"
            >
              <span className="text-[#E49F1B] group-hover:scale-110 transition-transform duration-300">📱</span>
              +91 9177002687
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
