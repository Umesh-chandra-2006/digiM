import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion } from 'framer-motion';

/**
 * Advanced Hero 3D Scene Component - HIGH PERFORMANCE OPTIMIZED
 * Interactive WebGL particle field with scroll depth zoom & bloom shaders.
 * Optimized: Animates parent transforms instead of vertex buffer loops to ensure 60fps smooth scrolling.
 * Theme: Midnight Slate (#05080C) + Liquid Gold (#E49F1B) + Burgundy (#3B0527)
 */

function InteractiveParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1500; // Optimized particle count

  // Generate static spherical coordinate field once
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.5 + Math.random() * 2.0; // Radius range

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollY = window.scrollY;
    
    if (pointsRef.current) {
      // Dynamic camera travel depth on scroll (flies past camera) - runs purely on GPU
      pointsRef.current.position.z = scrollY * 0.0055;
      
      // Auto-rotation of entire particle system
      pointsRef.current.rotation.y = time * 0.05 + scrollY * 0.001;
      pointsRef.current.rotation.x = time * 0.02 + scrollY * 0.0003;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#E49F1B" // Liquid Gold
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
      
      {/* Dynamic Lighting */}
      <ambientLight intensity={0.15} color="#F7F5F0" />
      <pointLight position={[10, 5, 5]} intensity={2.0} color="#E49F1B" />
      <pointLight position={[-10, -5, 5]} intensity={1.2} color="#3B0527" />
      
      {/* Gold Particles */}
      <InteractiveParticles />
      
      {/* Postprocessing Shaders for Glow Effect */}
      <EffectComposer>
        <Bloom 
          intensity={1.3} 
          luminanceThreshold={0.15} 
          luminanceSmoothing={0.9} 
          mipmapBlur 
        />
        <ChromaticAberration 
          offset={new THREE.Vector2(0.0012, 0.0012)} 
        />
      </EffectComposer>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.2}
      />
    </>
  );
}

export default function Hero3DScene() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToExplore = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#05080C] overflow-hidden">
      {/* 3D Canvas Background */}
      <Canvas
        className="absolute inset-0 z-0"
        dpr={[1, 1.5]} // Performance optimized dpr cap
        gl={{ antialias: false, alpha: false }} // Performance optimized gl flags
      >
        <Scene />
      </Canvas>

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #E49F1B 1px, transparent 1px), linear-gradient(to bottom, #E49F1B 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Radial shade */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, #05080C 80%)'
        }}
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="text-center max-w-4xl px-4 flex flex-col items-center">
          
          {/* Tagline / Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 0.85, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.35em] text-[#E49F1B] font-semibold mb-6 font-sans"
          >
            Digital Marketing Experts | Result-Driven
          </motion.div>

          {/* Main Serif Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-medium mb-6 text-white leading-tight font-serif max-w-3xl"
          >
            Result-Driven <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E49F1B] via-[#F6C15C] to-[#E49F1B] font-serif italic">
              Strategies
            </span> That Convert.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 0.75, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm md:text-base text-gray-300 mb-12 max-w-lg font-sans leading-relaxed tracking-wide"
          >
            A high-growth team scaling digital presence through search optimization, performance ads, and automation engineering.
          </motion.p>

          {/* Interactive CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="pointer-events-auto"
          >
            <button
              onClick={scrollToExplore}
              className="magnetic-button group relative px-12 py-5 bg-[#E49F1B] text-[#05080C] font-semibold text-xs uppercase tracking-[0.25em] rounded overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-[#E49F1B]/40"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Audit
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">➔</span>
              </span>
              <span className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="grid grid-cols-3 gap-6 md:gap-16 mt-20 pt-8 border-t border-[#E49F1B]/15 w-full max-w-2xl"
          >
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-serif text-[#E49F1B] font-medium">5-8x</div>
              <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1 font-sans">Avg ROAS</div>
            </div>
            <div className="text-center border-x border-[#E49F1B]/10 px-2">
              <div className="text-2xl md:text-4xl font-serif text-[#E49F1B] font-medium">50+</div>
              <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1 font-sans">Clients Served</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-serif text-[#E49F1B] font-medium">3+</div>
              <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1 font-sans">Years Exp</div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Hint */}
      <motion.div
        onClick={scrollToExplore}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#E49F1B] font-semibold">Scroll to explore</span>
        <span className="w-1.5 h-6 border border-[#E49F1B]/40 rounded-full flex justify-center p-0.5">
          <span className="w-0.5 h-1 bg-[#E49F1B] rounded-full animate-bounce" />
        </span>
      </motion.div>
    </div>
  );
}
