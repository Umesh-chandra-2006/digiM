import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Process Section Component
 * 4-step workflow with connecting neon gold traces
 * Theme: Midnight Slate (#05080C) + Gold (#E49F1B) + Burgundy (#3B0527)
 */

const steps = [
  {
    number: '1',
    title: 'Discovery & Research',
    description: 'In-depth audit of your digital marketing systems, competitor analysis, and target positioning research.',
  },
  {
    number: '2',
    title: 'Strategy Development',
    description: 'Drafting custom performance campaign structures, keyword mappings, and AI workflow recommendations.',
  },
  {
    number: '3',
    title: 'Execution & Optimization',
    description: 'Deploying high-ROAS ads, technical schema/SEO content, and continuous A/B split-testing.',
  },
  {
    number: '4',
    title: 'Analysis & Reporting',
    description: 'Real-time dashboard updates, analytics auditing, and roadmap reviews for ongoing growth.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const },
  },
};

export default function ProcessSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="py-32 px-4 bg-[#05080C] relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-[#3B0527]/5 to-transparent rounded-full blur-[100px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 flex flex-col items-center"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-[#E49F1B] font-semibold mb-3">Workflow</div>
          <h2 className="text-4xl md:text-6xl font-serif font-medium mb-4 text-white">Our 4-Step Process</h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl font-sans">
            How we translate your strategic objectives into high-converting digital results.
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              {/* Step Container */}
              <div className="flex gap-6 md:gap-10">
                {/* Number Badge */}
                <div className="flex-shrink-0 relative">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded bg-gradient-to-br from-[#E49F1B] to-[#3B0527] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <span className="text-lg md:text-xl font-serif font-bold text-[#05080C]">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow pt-1">
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-white mb-2 tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans max-w-3xl">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ delay: 0.35 + index * 0.1, duration: 0.6 }}
                    className="absolute left-7 md:left-8 top-16 md:top-18 w-[1.5px] h-[100px] bg-gradient-to-b from-[#E49F1B]/60 to-transparent origin-top"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 pt-12 border-t border-[#E49F1B]/10 text-center flex flex-col items-center"
        >
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-5 font-sans">
            Ready to secure your free comprehensive account audit?
          </p>
          <button
            onClick={handleCTAClick}
            className="magnetic-button group relative px-8 py-4 bg-[#E49F1B] text-[#05080C] font-semibold text-xs uppercase tracking-[0.25em] rounded transition-all duration-300 hover:shadow-lg hover:shadow-[#E49F1B]/35"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Free Audit
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">➔</span>
            </span>
            <span className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-300 group-hover:translate-y-0" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
