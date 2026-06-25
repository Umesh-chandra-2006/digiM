import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

/**
 * About Section Component
 * Team showcase with interactive SVG Skill Radar Chart that morphs on card hover
 * Theme: Midnight Slate (#05080C) + Imperial Burgundy (#3B0527) + Gold (#E49F1B)
 */

const teamMembers = [
  {
    id: 0,
    initials: 'CT',
    name: 'Chandrakanth T',
    role: 'Digital Marketing & Strategy Lead',
    stat: '8.4x',
    statLabel: 'Best ROAS',
    isLead: true,
    skills: { ads: 0.95, seo: 0.70, ai: 0.65, dev: 0.50, design: 0.85 } // Skill levels (0-1)
  },
  {
    id: 1,
    initials: 'SK',
    name: 'Sharath Chandra K',
    role: 'SEO & Social Media Expert',
    stat: '47%',
    statLabel: 'Organic CTR↑',
    isLead: false,
    skills: { ads: 0.55, seo: 0.98, ai: 0.50, dev: 0.40, design: 0.75 }
  },
  {
    id: 2,
    initials: 'P',
    name: 'Pooja',
    role: 'Design, Web Dev & Video Editing',
    stat: '100+',
    statLabel: 'Projects Done',
    isLead: false,
    skills: { ads: 0.40, seo: 0.50, ai: 0.55, dev: 0.70, design: 0.98 }
  },
  {
    id: 3,
    initials: 'NM',
    name: 'Nagraj M',
    role: 'Meta Ads & Lead Generation Expert',
    stat: '50+',
    statLabel: 'Campaigns',
    isLead: false,
    skills: { ads: 0.96, seo: 0.60, ai: 0.50, dev: 0.40, design: 0.65 }
  },
  {
    id: 4,
    initials: 'UT',
    name: 'Umesh Chandra T',
    role: 'App Dev & Full-Stack AI',
    stat: '150+',
    statLabel: 'Users (Live)',
    isLead: false,
    skills: { ads: 0.45, seo: 0.40, ai: 0.95, dev: 0.98, design: 0.60 }
  },
];

// Average team baseline
const baselineSkills = { ads: 0.80, seo: 0.75, ai: 0.80, dev: 0.75, design: 0.85 };

// Trigonometry coordinates generator for Radar Chart
// center at (150, 150), radius = 100
function getRadarPath(skills: typeof baselineSkills) {
  const cx = 150;
  const cy = 150;
  const r = 90;
  
  // 5 Axes angles in radians
  const angles = [
    -Math.PI / 2,                // Top: Ads
    -Math.PI / 2 + (2 * Math.PI / 5),  // Top-Right: SEO
    -Math.PI / 2 + (4 * Math.PI / 5),  // Bottom-Right: AI
    -Math.PI / 2 + (6 * Math.PI / 5),  // Bottom-Left: Dev
    -Math.PI / 2 + (8 * Math.PI / 5),  // Top-Left: Design
  ];

  const p0_x = cx + r * skills.ads * Math.cos(angles[0]);
  const p0_y = cy + r * skills.ads * Math.sin(angles[0]);

  const p1_x = cx + r * skills.seo * Math.cos(angles[1]);
  const p1_y = cy + r * skills.seo * Math.sin(angles[1]);

  const p2_x = cx + r * skills.ai * Math.cos(angles[2]);
  const p2_y = cy + r * skills.ai * Math.sin(angles[2]);

  const p3_x = cx + r * skills.dev * Math.cos(angles[3]);
  const p3_y = cy + r * skills.dev * Math.sin(angles[3]);

  const p4_x = cx + r * skills.design * Math.cos(angles[4]);
  const p4_y = cy + r * skills.design * Math.sin(angles[4]);

  return `${p0_x},${p0_y} ${p1_x},${p1_y} ${p2_x},${p2_y} ${p3_x},${p3_y} ${p4_x},${p4_y}`;
}

// 3D Tilt Card wrapper
function TeamMemberCard({ member, isHovered, onHoverStart, onHoverEnd }: {
  member: typeof teamMembers[0];
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const rotateY = ((x - xc) / xc) * 10;
    const rotateX = -((y - yc) / yc) * 10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: 'power2.out',
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        ease: 'power2.out',
        duration: 0.4,
      });
    }
    onHoverEnd();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={handleMouseLeave}
      className={`border rounded flex items-center justify-between p-5 transition-all duration-300 shadow-lg cursor-none ${
        isHovered
          ? 'bg-[#3B0527] border-[#E49F1B] shadow-[#3B0527]/30 scale-[1.02]'
          : 'bg-[#0A0F18] border-[#1E293B] hover:border-[#E49F1B]/40 hover:shadow-[#E49F1B]/5'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex items-center gap-4" style={{ transform: 'translateZ(20px)' }}>
        {/* Initials Bubble */}
        <div 
          className={`w-12 h-12 rounded-full flex items-center justify-center font-sans font-bold shadow-inner flex-shrink-0 ${
            isHovered
              ? 'bg-[#E49F1B] text-[#05080C] scale-105'
              : 'bg-gradient-to-br from-[#1E293B] to-[#0A0F18] border border-[#1E293B] text-[#E49F1B]'
          }`}
        >
          <span className="text-sm tracking-wider">{member.initials}</span>
        </div>

        {/* Text Details */}
        <div>
          <h3 className="text-md font-serif font-medium text-white tracking-wide">
            {member.name}
          </h3>
          <p className="text-[11px] text-gray-400 font-sans leading-tight">
            {member.role}
          </p>
        </div>
      </div>

      {/* Metric Block */}
      <div 
        className="text-right border-l border-[#1E293B] pl-4 flex-shrink-0"
        style={{ transform: 'translateZ(10px)' }}
      >
        <div className={`text-xl font-serif font-bold ${isHovered ? 'text-white' : 'text-[#E49F1B]'}`}>
          {member.stat}
        </div>
        <div className="text-[8px] uppercase tracking-widest text-gray-400 font-sans mt-0.5">
          {member.statLabel}
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  
  // Hovered member ID state (-1 represents showing baseline average)
  const [hoveredId, setHoveredId] = useState<number>(-1);

  // Active skills to display on Radar
  const activeSkills = hoveredId === -1 
    ? baselineSkills 
    : teamMembers[hoveredId].skills;

  const currentPathPoints = getRadarPath(activeSkills);

  return (
    <section ref={ref} className="py-32 px-4 bg-[#05080C] relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#3B0527]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#E49F1B]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-3xl"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-[#E49F1B] font-semibold mb-3">Our Experts</div>
          <h2 className="text-4xl md:text-6xl font-serif font-medium mb-5 text-white">
            Meet the Experts Behind the Results
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl font-sans">
            Hover over any team member to analyze their specialized skill matrix on the interactive visual radar chart.
          </p>
        </motion.div>

        {/* Layout Split: Left lists team, Right displays morphing radar chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Team Cards (Stack Layout) */}
          <div className="lg:col-span-7 space-y-4">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: member.id * 0.1 }}
              >
                <TeamMemberCard
                  member={member}
                  isHovered={hoveredId === member.id}
                  onHoverStart={() => setHoveredId(member.id)}
                  onHoverEnd={() => setHoveredId(-1)}
                />
              </motion.div>
            ))}
          </div>

          {/* Right Column: Morphing Skill Radar chart */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#0A0F18] border border-[#1E293B] rounded-lg p-6 w-full max-w-[380px] shadow-2xl relative flex flex-col items-center"
            >
              <h3 className="text-lg font-serif text-white mb-4 tracking-wide text-center">
                {hoveredId === -1 
                  ? 'Collective Stack' 
                  : `${teamMembers[hoveredId].name} Skills`}
              </h3>

              {/* SVG Radar Container */}
              <div className="relative w-[300px] h-[300px]">
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  {/* Grid Lines (Circles indicating 25%, 50%, 75%, 100% capacity) */}
                  {[0.25, 0.5, 0.75, 1.0].map((level, i) => (
                    <circle
                      key={i}
                      cx="150"
                      cy="150"
                      r={90 * level}
                      fill="none"
                      stroke="#1E293B"
                      strokeWidth="1"
                      strokeDasharray={i === 3 ? "none" : "2,3"}
                    />
                  ))}

                  {/* 5 Web Axes lines */}
                  {Array.from({ length: 5 }).map((_, i) => {
                    const angle = -Math.PI / 2 + (i * 2 * Math.PI / 5);
                    return (
                      <line
                        key={i}
                        x1="150"
                        y1="150"
                        x2={150 + 90 * Math.cos(angle)}
                        y2={150 + 90 * Math.sin(angle)}
                        stroke="#1E293B"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Radar Labels */}
                  <text x="150" y="45" textAnchor="middle" fill="#94A3B8" fontSize="10" className="font-sans font-semibold tracking-wider">ADS</text>
                  <text x="255" y="125" textAnchor="start" fill="#94A3B8" fontSize="10" className="font-sans font-semibold tracking-wider">SEO</text>
                  <text x="215" y="255" textAnchor="start" fill="#94A3B8" fontSize="10" className="font-sans font-semibold tracking-wider">AI</text>
                  <text x="85" y="255" textAnchor="end" fill="#94A3B8" fontSize="10" className="font-sans font-semibold tracking-wider">DEV</text>
                  <text x="45" y="125" textAnchor="end" fill="#94A3B8" fontSize="10" className="font-sans font-semibold tracking-wider">DESIGN</text>

                  {/* Morphing Area Polygon */}
                  <motion.polygon
                    animate={{ points: currentPathPoints }}
                    transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                    fill="rgba(228, 159, 27, 0.15)" /* Gold fill transparency */
                    stroke="#E49F1B" /* Gold border neon line */
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Radar Legend detailing stats */}
              <div className="grid grid-cols-5 gap-1 mt-4 w-full border-t border-[#1E293B] pt-4 text-center">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-sans">Ads</div>
                  <div className="text-xs font-mono font-bold text-white">{(activeSkills.ads * 100)}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-sans">SEO</div>
                  <div className="text-xs font-mono font-bold text-white">{(activeSkills.seo * 100)}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-sans">AI</div>
                  <div className="text-xs font-mono font-bold text-white">{(activeSkills.ai * 100)}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-sans">Dev</div>
                  <div className="text-xs font-mono font-bold text-white">{(activeSkills.dev * 100)}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-sans">Design</div>
                  <div className="text-xs font-mono font-bold text-white">{(activeSkills.design * 100)}%</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Global Summary Stats */}
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
