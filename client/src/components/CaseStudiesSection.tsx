import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Case Studies Section Component
 * Featuring a GSAP ScrollTrigger-pinned Horizontal Gallery scroll on desktop,
 * and standard responsive grids on mobile.
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

export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const { ref: inViewRef, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  useEffect(() => {
    // GSAP Horizontal Scroll trigger for viewport width >= 1024px (desktop)
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

    return () => ctx.revert();
  }, []);

  return (
    <div ref={inViewRef}>
      <section 
        ref={sectionRef} 
        className="py-20 lg:py-0 lg:h-screen bg-[#05080C] relative overflow-hidden flex flex-col justify-center"
      >
        {/* Background gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#E49F1B]/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#3B0527]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

        {/* Section Header (Stops horizontal shift) */}
        <div className="max-w-7xl mx-auto px-4 w-full mb-12 lg:mb-16 relative z-20">
          <div className="text-xs uppercase tracking-[0.25em] text-[#E49F1B] font-semibold mb-3">Case Studies</div>
          <h2 className="text-4xl md:text-6xl font-serif font-medium text-white tracking-wide">
            Proven Results Across Industries
          </h2>
        </div>

        {/* Horizontal scroll viewport container */}
        <div ref={containerRef} className="w-full relative overflow-x-auto lg:overflow-x-hidden px-4 lg:px-12 z-20">
          <div 
            ref={trackRef} 
            className="flex flex-col lg:flex-row gap-6 w-full lg:w-max pb-6 lg:pb-0"
          >
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="w-full lg:w-[420px] flex-shrink-0 group"
              >
                {/* Case Study Card */}
                <div 
                  className={`border rounded-lg p-6 h-full flex flex-col justify-between transition-all duration-300 shadow-xl min-h-[340px] ${
                    study.highlight
                      ? 'bg-[#3B0527] border-[#E49F1B] hover:shadow-[#3B0527]/30'
                      : 'bg-[#0A0F18] border-[#1E293B] hover:border-[#E49F1B]/40 hover:shadow-[#E49F1B]/5'
                  }`}
                >
                  <div>
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

                  {/* Metrics Grid */}
                  <div className={`grid ${study.metrics.length === 3 ? 'grid-cols-3 gap-2' : 'grid-cols-2 gap-4'}`}>
                    {study.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className={`text-center p-3 rounded flex flex-col justify-center border transition-all duration-300 ${
                          study.highlight
                            ? 'bg-[#05080C]/40 border-[#E49F1B]/35 group-hover:border-[#E49F1B]/70'
                            : 'bg-[#05080C]/50 border-[#1E293B] group-hover:border-[#E49F1B]/25'
                        }`}
                      >
                        <div className={`text-xl font-serif font-semibold ${study.highlight ? 'text-white' : 'text-[#E49F1B]'}`}>
                          {metric.value}
                        </div>
                        <div className="text-[9px] uppercase tracking-wider text-gray-400 mt-1 font-sans leading-tight">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
