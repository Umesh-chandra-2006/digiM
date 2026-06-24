import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

/**
 * Services Section Component
 * Showcase of services with mouse-tracking radial spotlights and 3D tilt physics
 * Theme: Midnight Slate (#05080C) + Gold (#E49F1B) + Burgundy (#3B0527)
 */

const services = [
  {
    title: 'Paid Advertising',
    description: 'Meta Ads, Google Ads, and multi-channel campaigns optimized for maximum ROI and lead capture.',
    icon: '📊',
  },
  {
    title: 'SEO & Content',
    description: 'Organic search domination via strategic keyword planning, technical audits, and content frameworks.',
    icon: '🔍',
  },
  {
    title: 'Social Media',
    description: 'Establish consistent brand presence, storytelling, and community engagement across major platforms.',
    icon: '📱',
  },
  {
    title: 'Branding',
    description: 'Complete visual identity systems, naming strategy, brand positioning, and message architectures.',
    icon: '✨',
  },
  {
    title: 'App Development',
    description: 'High-performance React Native, Flutter, and full-stack web/mobile application development.',
    icon: '⚙️',
  },
  {
    title: 'App Marketing & ASO',
    description: 'App store search optimization, paid user acquisition, lifecycle funnel design, and retention strategy.',
    icon: '🚀',
  },
  {
    title: 'AI & Automation',
    description: 'AI-driven workflow optimizations, automated lead nurturing, database setups, and custom AI tools.',
    icon: '🤖',
  },
  {
    title: 'Content Creation',
    description: 'High-converting ad copy, landing pages, engaging blog content, and social video scripting.',
    icon: '💻',
  },
];

// Interactive spotlight + 3D tilt card
function SpotlightCard({ service }: { service: typeof services[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCoords({ x, y });

      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const rotateY = ((x - xc) / xc) * 10;
      const rotateX = -((y - yc) / yc) * 10;

      gsap.to(cardRef.current, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 600,
        ease: 'power3.out',
        duration: 0.35,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        ease: 'power3.out',
        duration: 0.5,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded border border-[#1E293B] bg-[#0A0F18] transition-all duration-300 hover:border-[#E49F1B]/60 shadow-xl group h-full flex flex-col justify-between p-6 cursor-none"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Spotlight highlight background */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, #E49F1B 0%, transparent 80%)`,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full justify-between" style={{ transform: 'translateZ(25px)' }}>
        <div>
          {/* Icon */}
          <div className="text-4xl mb-5 group-hover:scale-115 transition-transform duration-300 w-fit">
            {service.icon}
          </div>

          {/* Title */}
          <h3 className="text-lg font-serif font-medium mb-2 text-white tracking-wide">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            {service.description}
          </p>
        </div>

        {/* Small slide trace bar */}
        <div className="mt-6 h-0.5 w-8 bg-[#E49F1B] scale-x-75 origin-left group-hover:scale-x-125 transition-transform duration-300" />
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
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

export default function ServicesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="py-32 px-4 bg-[#05080C] relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#3B0527]/8 to-transparent rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 flex flex-col items-center"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-[#E49F1B] font-semibold mb-3">Our Offerings</div>
          <h2 className="text-4xl md:text-6xl font-serif font-medium mb-4 text-white">What We Deliver</h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl font-sans">
            Scale revenue and performance across channels with bespoke analytics and engineering.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <SpotlightCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-center mt-20 flex flex-col items-center"
        >
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-5 font-sans">
            Looking for something tailored to your business model?
          </p>
          <button
            onClick={handleCTAClick}
            className="magnetic-button group relative px-8 py-4 bg-[#E49F1B] text-[#05080C] font-semibold text-xs uppercase tracking-[0.25em] rounded transition-all duration-300 hover:shadow-lg hover:shadow-[#E49F1B]/30"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Free Consultation
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">➔</span>
            </span>
            <span className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-300 group-hover:translate-y-0" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
