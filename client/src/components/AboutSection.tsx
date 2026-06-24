import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

/**
 * About Section Component
 * Team showcase with animated cards and 3D hover tilt dynamics
 * Theme: Midnight Slate (#05080C) + Imperial Burgundy (#3B0527) + Gold (#E49F1B)
 */

const teamMembers = [
  {
    initials: 'CT',
    name: 'Chandrakanth T',
    role: 'Digital Marketing & Strategy Lead',
    stat: '8.4x',
    statLabel: 'Best ROAS',
    isLead: true,
  },
  {
    initials: 'SK',
    name: 'Sharath Chandra K',
    role: 'SEO & Social Media Expert',
    stat: '47%',
    statLabel: 'Organic CTR↑',
    isLead: false,
  },
  {
    initials: 'P',
    name: 'Pooja',
    role: 'Design, Web Dev & Video Editing',
    stat: '100+',
    statLabel: 'Projects Done',
    isLead: false,
  },
  {
    initials: 'NM',
    name: 'Nagraj M',
    role: 'Meta Ads & Lead Generation Expert',
    stat: '50+',
    statLabel: 'Campaigns',
    isLead: false,
  },
  {
    initials: 'UT',
    name: 'Umesh Chandra T',
    role: 'App Dev & Full-Stack AI',
    stat: '150+',
    statLabel: 'Users (Live)',
    isLead: false,
  },
];

// Interactive 3D tilt card
function TiltTeamCard({ member }: { member: typeof teamMembers[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Calculate rotation limits (up to 12 degrees)
    const rotateY = ((x - xc) / xc) * 12;
    const rotateX = -((y - yc) / yc) * 12;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 600,
      ease: 'power3.out',
      duration: 0.35,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out',
      duration: 0.5,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`border rounded flex flex-col justify-between p-6 h-full transition-all duration-300 shadow-xl cursor-none ${
        member.isLead
          ? 'bg-[#3B0527] border-[#E49F1B] hover:shadow-[#3B0527]/40'
          : 'bg-[#0A0F18] border-[#1E293B] hover:border-[#E49F1B]/60 hover:shadow-[#E49F1B]/5'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div style={{ transform: 'translateZ(25px)' }}>
        {/* Avatar Initials Bubble */}
        <div 
          className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 font-sans font-bold shadow-inner ${
            member.isLead
              ? 'bg-[#E49F1B] text-[#05080C] shadow-lg transition-transform duration-300'
              : 'bg-gradient-to-br from-[#1E293B] to-[#0A0F18] border border-[#1E293B] text-[#E49F1B] transition-colors duration-300'
          }`}
        >
          <span className="text-base tracking-wider">{member.initials}</span>
        </div>

        {/* Name */}
        <h3 className="text-lg font-serif font-medium mb-1.5 text-white tracking-wide">
          {member.name}
        </h3>

        {/* Role */}
        <p className="text-xs text-gray-400 mb-6 font-sans leading-relaxed min-h-[40px]">
          {member.role}
        </p>
      </div>

      {/* Stat Box */}
      <div 
        className={`pt-4 border-t ${member.isLead ? 'border-[#E49F1B]/30' : 'border-[#1E293B]'}`}
        style={{ transform: 'translateZ(15px)' }}
      >
        <div className={`text-2xl font-serif font-bold mb-0.5 ${member.isLead ? 'text-white' : 'text-[#E49F1B]'}`}>
          {member.stat}
        </div>
        <div className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">
          {member.statLabel}
        </div>
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const },
  },
};

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section ref={ref} className="py-32 px-4 bg-[#05080C] relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#3B0527]/10 to-transparent rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#E49F1B]/5 to-transparent rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-3xl"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-[#E49F1B] font-semibold mb-3">Our Team</div>
          <h2 className="text-4xl md:text-6xl font-serif font-medium mb-5 text-white">
            Meet the Experts Behind the Results
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl font-sans">
            A tight-knit team of specialists accountable for real outcomes—driving digital growth and scaling systems.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="h-full"
            >
              <TiltTeamCard member={member} />
            </motion.div>
          ))}
        </motion.div>

        {/* Global Highlight Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 pt-12 border-t border-[#E49F1B]/10 grid grid-cols-3 gap-6 text-center max-w-4xl mx-auto"
        >
          <div>
            <div className="text-3xl md:text-5xl font-serif text-[#E49F1B] font-semibold">50+</div>
            <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1">Clients Served</div>
          </div>
          <div className="border-x border-[#E49F1B]/10 px-2">
            <div className="text-3xl md:text-5xl font-serif text-[#E49F1B] font-semibold">15+</div>
            <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1">Industries</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-serif text-[#E49F1B] font-semibold">3+</div>
            <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1">Years Experience</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
