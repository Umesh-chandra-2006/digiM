import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Case Studies Section Component
 * Featuring a GSAP ScrollTrigger-pinned Horizontal Gallery scroll with 
 * live category filtering, animated metrics, and 3D hover-tilt card layouts.
 * Theme: Midnight Slate (#05080C) + Burgundy (#3B0527) + Gold (#E49F1B)
 */

const caseStudies = [
  {
    category: 'AI AGENCY',
    client: 'AfuentHub AI',
    highlight: true,
    metrics: [
      { value: '8.4x', label: 'ROAS Achieved' },
      { value: '₹42', label: 'Cost Per Action' },
      { value: '28%', label: 'Conversion Rate' },
      { value: '1,090+', label: 'Qualified Leads' },
    ],
  },
  {
    category: 'REAL ESTATE',
    client: 'Sree Divya RE',
    highlight: false,
    metrics: [
      { value: '210%', label: 'Return on ROI' },
      { value: '3,800+', label: 'Qualified Leads' },
      { value: '₹8.60', label: 'Cost Per Lead' },
      { value: '12.3%', label: 'Conversion Rate' },
    ],
  },
  {
    category: 'TRAVEL AGENCY',
    client: 'Fly Celesta',
    highlight: false,
    metrics: [
      { value: '7.1x', label: 'Average ROAS' },
      { value: '+22%', label: 'Booking Increase' },
      { value: '-35%', label: 'Reduced CPA' },
      { value: '10.8%', label: 'Conversion Rate' },
    ],
  },
  {
    category: 'EDUCATION',
    client: 'Tirumal IAS',
    highlight: false,
    metrics: [
      { value: '4.5x', label: 'Average ROAS' },
      { value: '2,500+', label: 'Qualified Leads' },
      { value: '5.2%', label: 'Conversion Rate' },
      { value: '180%', label: 'Campaign ROI' },
    ],
  },
  {
    category: 'INTERIOR DESIGN',
    client: 'Inara Homes',
    highlight: false,
    metrics: [
      { value: '+150%', label: 'Traffic Growth' },
      { value: '450+', label: 'Leads Captured' },
      { value: '6.5x', label: 'Average ROAS' },
    ],
  },
  {
    category: 'TRAVEL',
    client: 'RT JOY WINGS',
    highlight: false,
    metrics: [
      { value: '6.5x', label: 'Average ROAS' },
      { value: '+18%', label: 'Bookings Added' },
      { value: '-36%', label: 'CPA Reduction' },
    ],
  },
];

const categories = ['ALL', 'AI AGENCY', 'REAL ESTATE', 'TRAVEL AGENCY', 'EDUCATION', 'INTERIOR DESIGN', 'TRAVEL'];

// Self-parsing count-up metric component
function CountUpMetric({ targetValue, inView }: { targetValue: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  const cleanStr = targetValue.replace(/,/g, '');
  const matches = cleanStr.match(/([\d.]+)/);
  const numericPart = matches ? parseFloat(matches[1]) : 0;
  
  const prefix = targetValue.startsWith('₹') 
    ? '₹' 
    : targetValue.startsWith('+') 
      ? '+' 
      : targetValue.startsWith('-') 
        ? '-' 
        : '';
        
  const suffix = targetValue.endsWith('%') 
    ? '%' 
    : targetValue.endsWith('x') 
      ? 'x' 
      : targetValue.endsWith('+') 
        ? '+' 
        : '';

  const hasDecimal = cleanStr.includes('.');
  const decimalPlaces = hasDecimal ? cleanStr.split('.')[1].replace(/[^\d]/g, '').length : 0;

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    let start = 0;
    const end = numericPart;
    if (start === end) return;

    const duration = 1000;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, numericPart]);

  const formattedNum = count.toFixed(decimalPlaces);
  const finalNum = targetValue.includes(',') 
    ? Math.round(count).toLocaleString('en-IN')
    : formattedNum;

  return <span>{prefix}{finalNum}{suffix}</span>;
}

// 3D Tilt Case Study Card Component
function TiltCaseStudyCard({ study, inView }: { study: typeof caseStudies[0]; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateY = ((x - xc) / xc) * 10;
    const rotateX = -((y - yc) / yc) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 500,
      ease: 'power2.out',
      duration: 0.35,
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
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`border rounded-lg p-6 h-full flex flex-col justify-between transition-all duration-300 shadow-xl min-h-[340px] cursor-none ${
        study.highlight
          ? 'bg-[#3B0527] border-[#E49F1B] hover:shadow-[#3B0527]/30'
          : 'bg-[#0A0F18] border-[#1E293B] hover:border-[#E49F1B]/40 hover:shadow-[#E49F1B]/5'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        {/* Category Badge */}
        <div 
          className={`inline-block px-3 py-1 rounded text-[10px] font-sans font-bold tracking-widest uppercase mb-4 ${
            study.highlight
              ? 'bg-[#E49F1B] text-[#05080C]'
              : 'bg-[#E49F1B]/10 border border-[#E49F1B]/20 text-[#E49F1B]'
          }`}
        >
          {study.category}
        </div>

        {/* Client Name */}
        <h3 className="text-2xl font-serif font-medium text-white mb-6 tracking-wide">
          {study.client}
        </h3>
      </div>

      {/* Metrics Grid with Counting Animation */}
      <div 
        className={`grid ${study.metrics.length === 3 ? 'grid-cols-3 gap-2' : 'grid-cols-2 gap-4'}`}
        style={{ transform: 'translateZ(10px)' }}
      >
        {study.metrics.map((metric, idx) => (
          <div
            key={idx}
            className={`text-center p-3 rounded flex flex-col justify-center border transition-all duration-300 ${
              study.highlight
                ? 'bg-[#05080C]/40 border-[#E49F1B]/35'
                : 'bg-[#05080C]/50 border-[#1E293B]'
            }`}
          >
            <div className={`text-xl font-serif font-semibold ${study.highlight ? 'text-white' : 'text-[#E49F1B]'}`}>
              <CountUpMetric targetValue={metric.value} inView={inView} />
            </div>
            <div className="text-[9px] uppercase tracking-wider text-gray-400 mt-1 font-sans leading-tight">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const { ref: inViewRef, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  const filteredStudies = selectedCategory === 'ALL'
    ? caseStudies
    : caseStudies.filter(study => study.category === selectedCategory);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (window.innerWidth >= 1024 && trackRef.current && sectionRef.current) {
        const pinDistance = trackRef.current.scrollWidth - window.innerWidth + 200;

        gsap.to(trackRef.current, {
          x: () => -(trackRef.current!.scrollWidth - window.innerWidth + 80),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1.0,
            start: 'top top',
            end: () => `+=${pinDistance}`,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selectedCategory]);

  return (
    <div ref={inViewRef}>
      <section 
        ref={sectionRef} 
        className="py-20 lg:py-0 lg:h-screen bg-[#05080C] relative overflow-hidden flex flex-col justify-center"
      >
        {/* Background gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#E49F1B]/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#3B0527]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 w-full mb-8 relative z-20">
          <div className="text-xs uppercase tracking-[0.25em] text-[#E49F1B] font-semibold mb-2">Case Studies</div>
          <h2 className="text-4xl md:text-6xl font-serif font-medium text-white tracking-wide">
            Proven Results Across Industries
          </h2>
        </div>

        {/* Filter Toolbar */}
        <div className="max-w-7xl mx-auto px-4 w-full mb-10 relative z-20 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded text-[10px] uppercase font-sans font-bold tracking-widest transition-all duration-300 border ${
                selectedCategory === cat
                  ? 'bg-[#E49F1B] border-[#E49F1B] text-[#05080C]'
                  : 'bg-transparent border-[#1E293B] text-gray-400 hover:border-[#E49F1B]/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal scroll track viewport */}
        <div className="w-full relative overflow-x-auto lg:overflow-x-hidden px-4 lg:px-12 z-20">
          <div 
            ref={trackRef} 
            className="flex flex-col lg:flex-row gap-6 w-full lg:w-max pb-6 lg:pb-0"
          >
            {filteredStudies.map((study) => (
              <div
                key={study.client}
                className="w-full lg:w-[420px] flex-shrink-0"
              >
                <TiltCaseStudyCard study={study} inView={inView} />
              </div>
            ))}

            {/* Static Summary card placed at the very end of the horizontal track */}
            <div className="w-full lg:w-[480px] flex-shrink-0 flex items-center justify-center p-8 bg-[#3B0527]/10 border border-[#E49F1B]/20 rounded-lg min-h-[340px]">
              <div className="text-center">
                <div className="text-4xl font-serif text-[#E49F1B] font-bold mb-2">5-8x</div>
                <div className="text-sm text-gray-300 uppercase tracking-widest mb-6 font-sans">Average ROAS Secured</div>
                <div className="text-2xl font-serif text-white font-medium mb-1">50+ Partnerships</div>
                <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                  Join our active roster scaling digital campaign funnels with advanced analytics integrations.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
