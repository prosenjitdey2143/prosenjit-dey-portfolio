'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const SKILLS = [
  { name: 'AI Engineering', desc: 'Antigravity, ChatGPT & Agentic Workflows', glow: 'from-fuchsia-600/40 to-purple-600/40' },
  { name: 'React & Next.js', desc: 'High-performance interactive web apps', glow: 'from-cyan-500/40 to-blue-600/40' },
  { name: 'Vibe Coding', desc: 'AI-assisted creative development', glow: 'from-orange-500/40 to-rose-600/40' },
  { name: 'JavaScript ES6', desc: 'Complex core logic and architecture', glow: 'from-yellow-500/40 to-amber-600/40' },
  { name: 'UI/UX & Graphics', desc: 'Cinematic visual design and layouts', glow: 'from-pink-500/40 to-rose-600/40' },
  { name: 'HTML5 & CSS3', desc: 'The fundamental building blocks', glow: 'from-indigo-500/40 to-blue-600/40' },
  { name: 'CMS Platforms', desc: 'WordPress, Bootstrap, legacy support', glow: 'from-teal-500/40 to-emerald-600/40' },
];

function SkillCard({ 
  skill, 
  index, 
  progress, 
  totalCards 
}: { 
  skill: typeof SKILLS[0], 
  index: number, 
  progress: MotionValue<number>, 
  totalCards: number 
}) {
  // Add a "pause factor" (e.g. 1) to the total range so the animations finish 
  // BEFORE the scroll progress reaches 1.0. This gives the user time to read the last card.
  const scrollRange = totalCards + 1; 

  const slideStart = Math.max(0, (index - 1) / scrollRange);
  const slideEnd = index / scrollRange;

  const scaleStart = index / scrollRange;
  const scaleEnd = Math.min(1, (index + 1) / scrollRange);

  const y = useTransform(
    progress, 
    [slideStart, slideEnd], 
    [index === 0 ? "0vh" : "150vh", "0vh"]
  );

  const scale = useTransform(
    progress, 
    [scaleStart, scaleEnd], 
    [1, 0.92]
  );

  // Instead of fading the entire card out (which caused the messy text bleed),
  // we fade IN a black overlay to simulate 3D shadow depth as it gets covered.
  const shadowOpacity = useTransform(
    progress,
    [scaleStart, scaleEnd],
    [0, 0.8]
  );

  return (
    <motion.div 
      className="absolute top-0 left-0 w-full h-full rounded-[2.5rem] p-6 md:p-12 overflow-hidden border border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] bg-[#050505]"
      style={{ 
        y, 
        scale,
        zIndex: index,
        top: `calc(5vh + ${index * 16}px)`, // Spacing for the top folders
        transformOrigin: "top center" // Ensures it shrinks from the top, keeping the top edge visible
      }}
    >
      {/* Dynamic Depth Shadow that darkens the card as it goes to the background */}
      <motion.div 
        className="absolute inset-0 bg-black z-50 pointer-events-none"
        style={{ opacity: index === totalCards - 1 ? 0 : shadowOpacity }}
      />

      {/* Vibrant Ambient Glow Orb inside the card */}
      <div className={`absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-gradient-to-br ${skill.glow} blur-[100px] rounded-full pointer-events-none`} />
      <div className={`absolute -bottom-32 -left-32 w-[20rem] h-[20rem] bg-gradient-to-tr ${skill.glow} blur-[100px] rounded-full pointer-events-none opacity-50`} />
      
      {/* Cinematic Film Grain */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Massive Typographic Watermark */}
      <div className="absolute -bottom-16 right-4 text-[10rem] sm:text-[15rem] md:text-[22rem] font-bold text-white/[0.02] leading-none pointer-events-none select-none tracking-tighter">
        0{index + 1}
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top Header Row */}
        <div className="flex justify-between items-start">
           <div className="bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
             <p className="text-white tracking-[0.3em] uppercase text-xs md:text-sm font-semibold">
               Phase {index + 1}
             </p>
           </div>
           
           {/* Tech Icon */}
           <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
           </div>
        </div>

        {/* Bottom Content Row */}
        <div>
          <h3 className="text-4xl sm:text-5xl md:text-[6.5rem] font-bold tracking-tighter mb-6 md:mb-8 leading-[0.9] text-white drop-shadow-xl">
            {skill.name}
          </h3>
          
          <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent mb-6" />
          
          <div className="flex items-center justify-between">
            <p className="text-gray-300 text-lg md:text-2xl font-light">
              {skill.desc}
            </p>
            
            {/* Tech Dots */}
            <div className="hidden md:flex gap-3">
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="skills" ref={containerRef} className="relative bg-[#050505] pb-[80px]">
       {/* Height is equal to total cards * 100vh to allow smooth scrolling through the entire deck */}
       <div className="h-[800vh] relative w-full">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-12 py-24">
             
             {/* Section Header */}
             <div className="absolute top-32 lg:top-24 text-center w-full z-50 pointer-events-none">
               <motion.p 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 className="text-gray-500 tracking-[0.4em] uppercase text-xs md:text-sm font-bold mb-2 drop-shadow-md"
               >
                 The Arsenal
               </motion.p>
               <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter drop-shadow-xl">
                 Core Competencies.
               </h2>
             </div>

             {/* Stacking Cards Deck Container */}
             <div className="relative w-full max-w-6xl h-[65vh] md:h-[75vh] mt-12 md:mt-24">
               {SKILLS.map((skill, index) => (
                 <SkillCard 
                   key={skill.name} 
                   skill={skill} 
                   index={index} 
                   progress={scrollYProgress} 
                   totalCards={SKILLS.length} 
                 />
               ))}
             </div>

          </div>
       </div>
    </section>
  )
}
