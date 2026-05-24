'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const SKILLS = [
  { name: 'AI Tools', desc: 'Using multiple AI tools for website development, image, and video processing', glow: 'from-fuchsia-600/40 to-purple-600/40' },
  { name: 'React & Next.js', desc: 'Creating fast and interactive websites', glow: 'from-cyan-500/40 to-blue-600/40' },
  { name: 'Vibe Coding', desc: 'Making beautiful designs using AI helpers', glow: 'from-orange-500/40 to-rose-600/40' },
  { name: 'JavaScript', desc: 'Writing the main logic to make websites work', glow: 'from-yellow-500/40 to-amber-600/40' },
  { name: 'Web Design', desc: 'Designing cool, modern, and easy-to-use layouts', glow: 'from-pink-500/40 to-rose-600/40' },
  { name: 'HTML & CSS', desc: 'Building the basic structure and style of web pages', glow: 'from-indigo-500/40 to-blue-600/40' },
  { name: 'WordPress', desc: 'Making websites that are easy for clients to manage', glow: 'from-teal-500/40 to-emerald-600/40' },
];

function SkillNode({ skill, index }: { skill: typeof SKILLS[0], index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }} // Triggers when 40% of the node is visible on screen
      className="relative w-full max-w-7xl mx-auto py-16 md:py-32 group"
    >
      {/* Node placed absolutely on the trunk */}
      <div className="absolute left-8 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
         <motion.div 
           variants={{
             hidden: { scale: 0, opacity: 0 },
             visible: { scale: 1, opacity: 1 }
           }}
           className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,1)]"
         />
         <motion.div 
           variants={{
             hidden: { scale: 0.8, opacity: 0 },
             visible: { scale: 2.5, opacity: 0 }
           }}
           transition={{ duration: 2, repeat: Infinity }}
           className="absolute w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white/50"
         />
      </div>

      {/* Content wrapper */}
      <div className={`relative z-10 w-full flex ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
         
         {/* Text block takes up 45% width on desktop, padded left on mobile to avoid trunk */}
         <div className={`w-full md:w-[45%] pl-24 md:pl-0 flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
            
            {/* Phase Badge */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="inline-block bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,255,255,0.05)] self-start md:self-auto"
            >
              <span className="text-white/60 tracking-[0.2em] uppercase text-xs md:text-sm font-bold">
                Phase 0{index + 1}
              </span>
            </motion.div>

            {/* Glowing Ambient Background activated on view */}
            <motion.div 
               variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 0.5, scale: 1 } }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className={`absolute top-1/2 ${isEven ? 'md:left-[25%]' : 'md:right-[25%]'} left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25rem] h-[25rem] bg-gradient-to-br ${skill.glow} blur-[120px] rounded-full pointer-events-none z-[-1]`}
            />

            <motion.h3 
              variants={{ 
                hidden: { opacity: 0, x: isEven ? -50 : 50, filter: "blur(10px)" }, 
                visible: { opacity: 1, x: 0, filter: "blur(0px)" } 
              }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-tighter mb-4 text-white drop-shadow-2xl leading-[0.9]"
            >
              {skill.name}
            </motion.h3>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-base md:text-xl font-light leading-relaxed max-w-sm"
            >
              {skill.desc}
            </motion.p>
         </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Smooth fluid physics for the glowing orb
  const mouseX = useSpring(0, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 20 });

  // Set initial glow position to center
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
  }, [mouseX, mouseY]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(touch.clientX - rect.left);
    mouseY.set(touch.clientY - rect.top);
  };
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end bottom"]
  });

  return (
    <section 
      id="skills" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsHovered(true)}
      onTouchStart={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
      className="relative bg-[#050505] py-32 overflow-hidden z-20"
    >
       {/* Interactive Hover Glow */}
       <motion.div
         style={{ x: mouseX, y: mouseY }}
         animate={{ opacity: isHovered ? 0.4 : 0.1, scale: isHovered ? 1.5 : 1 }}
         transition={{ duration: 0.8 }}
         className="absolute top-0 left-0 w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] rounded-full pointer-events-none z-0"
       >
          <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-emerald-600/40 via-cyan-500/30 to-transparent blur-[120px] md:blur-[160px] pointer-events-none" />
       </motion.div>

       {/* Cinematic Grid Background */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-0" />

       {/* Section Header */}
       <div className="relative z-50 text-center w-full mb-32 px-4">
         <motion.p 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="text-gray-500 tracking-[0.4em] uppercase text-xs md:text-sm font-bold mb-4 drop-shadow-md"
         >
           What I Know
         </motion.p>
         <h2 className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[8rem] font-black text-white tracking-tighter drop-shadow-2xl leading-[0.9]">
           My Skills.
         </h2>
       </div>

       {/* Tree Container */}
       <div className="relative w-full max-w-7xl mx-auto px-4 md:px-12 pb-32">
          
          {/* Base Trunk Line (Dim) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 rounded-full" />
          
          {/* Glowing Energy Beam (Scroll Progress) */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-white via-emerald-400 to-transparent -translate-x-1/2 rounded-full z-10 origin-top shadow-[0_0_30px_rgba(52,211,153,0.8)]"
            style={{ scaleY: scrollYProgress }}
          />

          {/* Nodes */}
          {SKILLS.map((skill, index) => (
             <SkillNode key={skill.name} skill={skill} index={index} />
          ))}

       </div>
    </section>
  )
}
