import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

/**
 * Services Section Component
 * Showcase of services with mouse-tracking radial spotlights, 3D tilt physics,
 * and an interactive CSS-animated Floating Tech Stack Orbit panel.
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

// Interactive 3D tilt + spotlight card
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

// Interactive SVG Tech Orbit panel
function InteractiveTechOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const rotateY = ((x - xc) / xc) * 15;
    const rotateX = -((y - yc) / yc) * 15;

    gsap.to(containerRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 600,
      ease: 'power3.out',
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        rotateX: 0,
        rotateY: 0,
        ease: 'power3.out',
        duration: 0.6,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-[340px] h-[340px] relative bg-[#0A0F18] border border-[#1E293B] rounded-lg shadow-2xl flex items-center justify-center p-6"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Central glowing core */}
      <div 
        className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-[#E49F1B] to-[#3B0527] flex items-center justify-center shadow-lg border border-[#E49F1B]"
        style={{ transform: 'translateZ(30px)' }}
      >
        <span className="font-serif text-lg font-bold text-[#05080C]">C</span>
      </div>

      {/* Orbit Graphic Layer */}
      <svg viewBox="0 0 300 300" className="w-full h-full animate-[spin_60s_linear_infinite] pointer-events-none">
        {/* Ring 1 */}
        <circle cx="150" cy="150" r="50" fill="none" stroke="#E49F1B" strokeWidth="1" strokeDasharray="3,6" opacity="0.3" />
        {/* Ring 2 */}
        <circle cx="150" cy="150" r="85" fill="none" stroke="#E49F1B" strokeWidth="1" strokeDasharray="4,8" opacity="0.25" />
        {/* Ring 3 */}
        <circle cx="150" cy="150" r="120" fill="none" stroke="#E49F1B" strokeWidth="1" strokeDasharray="5,10" opacity="0.2" />

        {/* Orbit Node Connectors */}
        <line x1="150" y1="150" x2="150" y2="30" stroke="#1E293B" strokeWidth="0.75" />
        <line x1="150" y1="150" x2="250" y2="200" stroke="#1E293B" strokeWidth="0.75" />
        <line x1="150" y1="150" x2="50" y2="200" stroke="#1E293B" strokeWidth="0.75" />

        {/* Node 1: Meta (Ads) */}
        <circle cx="150" cy="100" r="8" fill="#0A0F18" stroke="#E49F1B" strokeWidth="1.5" />
        {/* Node 2: Google */}
        <circle cx="223" cy="192" r="8" fill="#0A0F18" stroke="#E49F1B" strokeWidth="1.5" />
        {/* Node 3: React */}
        <circle cx="76" cy="192" r="8" fill="#0A0F18" stroke="#E49F1B" strokeWidth="1.5" />
        {/* Node 4: Python */}
        <circle cx="150" cy="30" r="8" fill="#0A0F18" stroke="#E49F1B" strokeWidth="1.5" />
        {/* Node 5: Flutter */}
        <circle cx="253" cy="210" r="8" fill="#0A0F18" stroke="#E49F1B" strokeWidth="1.5" />
        {/* Node 6: Analytics */}
        <circle cx="46" cy="210" r="8" fill="#0A0F18" stroke="#E49F1B" strokeWidth="1.5" />
      </svg>

      {/* Static text tags on top of orbit nodes */}
      <div className="absolute top-[20px] left-[150px] transform -translate-x-1/2 -translate-y-1/2 bg-[#05080C] px-2 py-0.5 border border-[#1E293B] text-[8px] tracking-widest text-[#E49F1B] rounded uppercase font-bold" style={{ transform: 'translateZ(15px)' }}>AI</div>
      <div className="absolute bottom-[58px] right-[25px] bg-[#05080C] px-2 py-0.5 border border-[#1E293B] text-[8px] tracking-widest text-[#E49F1B] rounded uppercase font-bold" style={{ transform: 'translateZ(15px)' }}>ADS</div>
      <div className="absolute bottom-[58px] left-[25px] bg-[#05080C] px-2 py-0.5 border border-[#1E293B] text-[8px] tracking-widest text-[#E49F1B] rounded uppercase font-bold" style={{ transform: 'translateZ(15px)' }}>DEV</div>
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
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#3B0527]/8 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header Split: Left describes, Right displays Orbit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Heading Description */}
          <div className="lg:col-span-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-xs uppercase tracking-[0.25em] text-[#E49F1B] font-semibold mb-3">Our Offerings</div>
              <h2 className="text-4xl md:text-6xl font-serif font-medium mb-5 text-white leading-tight">
                What We Deliver
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl font-sans">
                Scale revenue, campaigns, and systems across channels. We combine analytics integration with full-stack automation engineering to maximize conversion rates.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Floating Interactive Orbit */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <InteractiveTechOrbit />
            </motion.div>
          </div>

        </div>

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
