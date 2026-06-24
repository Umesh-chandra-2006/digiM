import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      // Main pointer follows mouse exactly
      gsap.to(dotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'power2.out',
      });
      // Trailing ring has inertia
      gsap.to(ringRef.current, {
        x: e.clientX - 16,
        y: e.clientY - 16,
        duration: 0.25,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Hover effect listeners for elements
    const handleHoverStart = () => {
      gsap.to(ringRef.current, {
        scale: 1.8,
        backgroundColor: 'rgba(59, 5, 39, 0.25)', // Burgundy overlay
        borderColor: '#E49F1B', // Gold border
        borderWidth: '1.5px',
        duration: 0.2,
      });
      gsap.to(dotRef.current, {
        scale: 0.5,
        backgroundColor: '#E49F1B',
        duration: 0.2,
      });
    };

    const handleHoverEnd = () => {
      gsap.to(ringRef.current, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: '#E49F1B',
        borderWidth: '1px',
        duration: 0.2,
      });
      gsap.to(dotRef.current, {
        scale: 1,
        backgroundColor: '#E49F1B',
        duration: 0.2,
      });
    };

    // Magnetic elements pull logic
    const handleMagneticMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Animate the button to slide slightly towards the mouse (35% intensity)
      gsap.to(target, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Pull trailing ring extra close
      gsap.to(ringRef.current, {
        x: e.clientX - 16,
        y: e.clientY - 16,
        scale: 1.4,
        borderColor: '#E49F1B',
        duration: 0.1,
      });
    };

    const handleMagneticLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
      handleHoverEnd();
    };

    // Attach listeners
    const attachListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      interactives.forEach((el) => {
        const target = el as HTMLElement;
        target.removeEventListener('mouseenter', handleHoverStart);
        target.removeEventListener('mouseleave', handleHoverEnd);
        target.addEventListener('mouseenter', handleHoverStart);
        target.addEventListener('mouseleave', handleHoverEnd);
      });

      const magnetics = document.querySelectorAll('.magnetic-button');
      magnetics.forEach((el) => {
        const target = el as HTMLElement;
        target.removeEventListener('mousemove', handleMagneticMove as EventListener);
        target.removeEventListener('mouseleave', handleMagneticLeave as EventListener);
        target.addEventListener('mousemove', handleMagneticMove as EventListener);
        target.addEventListener('mouseleave', handleMagneticLeave as EventListener);
      });
    };

    attachListeners();

    // Re-bind listeners on DOM mutations (when components load/change)
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Inner precise gold pointer */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#E49F1B] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
      />
      {/* Trailing gold inertia ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-[#E49F1B] rounded-full pointer-events-none z-[9999]"
      />
    </>
  );
}
