'use client';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useRef, MouseEvent } from 'react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Native Horizontal Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Maps the vertical scroll to horizontal movement. 
  // We have 3 panels, so we need to move the track by -66.66% to see the last one.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  // Interactive Mouse Lighting
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 250, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 250, mass: 0.5 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    // We use clientX/clientY so the light follows the mouse relative to the fixed viewport
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const glowLight = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,0.05), transparent 80%)`;

  return (
    <section 
      id="about"
      ref={containerRef} 
      // The section is 300vh tall to give the user plenty of vertical scrolling room
      className="h-[300vh] relative bg-[#020202] z-20"
    >
      {/* Sticky container stays pinned to the screen while we scroll the inner track horizontally */}
      <div 
        className="sticky top-0 h-screen flex items-center overflow-hidden cursor-crosshair"
        onMouseMove={handleMouseMove}
      >
        
        {/* Interactive Mouse Glow */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
          style={{ background: glowLight }}
        />

        {/* The Horizontal Track */}
        <motion.div style={{ x }} className="flex w-[300vw] h-full relative z-10">
          
          {/* Panel 1: The Foundation */}
          <div className="w-[100vw] h-full flex flex-col justify-center px-8 md:px-32 lg:px-48 relative border-r border-white/5">
             <div className="overflow-hidden">
               <motion.p className="text-gray-600 tracking-[0.4em] uppercase mb-8 font-bold text-sm md:text-base">
                 01 — The Foundation
               </motion.p>
             </div>
             <h2 className="text-[3.5rem] sm:text-6xl md:text-[7rem] lg:text-[9rem] font-bold text-white tracking-tighter leading-[1.05]">
               I am a B.Tech <br />
               graduate from <br />
               Kolkata.
             </h2>
          </div>

          {/* Panel 2: The Logic */}
          <div className="w-[100vw] h-full flex flex-col justify-center px-8 md:px-32 lg:px-48 relative border-r border-white/5">
             <div className="overflow-hidden">
               <motion.p className="text-indigo-500 tracking-[0.4em] uppercase mb-8 font-bold text-sm md:text-base drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                 02 — The Logic
               </motion.p>
             </div>
             <h2 className="text-[3.5rem] sm:text-6xl md:text-[7rem] lg:text-[9rem] font-bold text-white tracking-tighter leading-[1.05]">
               Aspiring <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 filter drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                 Frontend Dev
               </span> <br />
               writing elegant code.
             </h2>
          </div>

          {/* Panel 3: The Aesthetics */}
          <div className="w-[100vw] h-full flex flex-col justify-center px-8 md:px-32 lg:px-48 relative">
             <div className="overflow-hidden">
               <motion.p className="text-orange-500 tracking-[0.4em] uppercase mb-8 font-bold text-sm md:text-base drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                 03 — The Aesthetics
               </motion.p>
             </div>
             <h2 className="text-[3.5rem] sm:text-6xl md:text-[7rem] lg:text-[9rem] font-bold text-white tracking-tighter leading-[1.05]">
               Passionate <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 filter drop-shadow-[0_0_30px_rgba(251,146,60,0.3)]">
                 Tattoo Artist
               </span> <br />
               leaving a mark.
             </h2>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
