import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Differentiators Section Component
 * Displays what sets the agency apart using the Gold/Burgundy system
 * Theme: Midnight Slate (#05080C) + Burgundy (#3B0527) + Gold (#E49F1B)
 */

const differentiators = [
  {
    title: 'Proven ROI',
    description: 'Measurable advertising results that directly scale your revenue and bottom line.',
    icon: '📈',
    highlights: ['5-8x Average ROAS', '50+ Scale Partners', 'Custom Performance Modeling'],
  },
  {
    title: 'Client-First Strategy',
    description: 'Every solution is fully custom-crafted around your specific industry, margin levels, and objectives.',
    icon: '🎯',
    highlights: ['Tailored to your margins', 'Clear growth KPI mappings', 'Flexible & adaptive execution'],
  },
  {
    title: 'Data-Driven Execution',
    description: 'Campaign optimization backed strictly by analytics dashboards, server-side tracking, and split-testing.',
    icon: '📊',
    highlights: ['Real-time reporting panels', 'Conversion API integrations', 'Scientific A/B split-testing'],
  },
  {
    title: 'App Development Edge',
    description: 'Custom React Native, Flutter, and AI automation workflows built to scale your business systems.',
    icon: '⚙️',
    highlights: ['Custom product features', 'Full-stack AI workflows', 'End-to-end engineering support'],
  },
];

function SpotlightDiffCard({ diff }: { diff: typeof differentiators[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded p-8 border border-[#1E293B] bg-[#0A0F18] transition-all duration-300 hover:border-[#E49F1B]/60 shadow-xl group h-full flex flex-col justify-between"
    >
      {/* Spotlight glow overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(240px circle at ${coords.x}px ${coords.y}px, #E49F1B 0%, transparent 80%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300 w-fit">
          {diff.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif font-medium text-white mb-3 tracking-wide">{diff.title}</h3>

        {/* Description */}
        <p className="text-xs text-gray-400 mb-6 leading-relaxed font-sans">{diff.description}</p>

        {/* Highlights */}
        <div className="space-y-3">
          {diff.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-xs text-gray-300 font-sans"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E49F1B]" />
              {highlight}
            </div>
          ))}
        </div>
      </div>

      {/* Slide bar */}
      <div className="relative z-10 mt-8 h-[2px] w-full bg-gradient-to-r from-[#E49F1B]/40 to-transparent scale-x-75 origin-left group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function DifferentiatorsSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section ref={ref} className="py-32 px-4 bg-[#05080C] relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#3B0527]/8 to-transparent rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 flex flex-col items-center"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-[#E49F1B] font-semibold mb-3">Our Edge</div>
          <h2 className="text-4xl md:text-6xl font-serif font-medium mb-4 text-white">Why Partner With Us?</h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl font-sans">
            What sets our performance strategies apart from standard digital marketing agencies.
          </p>
        </motion.div>

        {/* Differentiators Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {differentiators.map((diff, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <SpotlightDiffCard diff={diff} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
