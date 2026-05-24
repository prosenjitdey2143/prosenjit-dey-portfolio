'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useMotionValue, useTransform } from 'framer-motion';

const projects = [
  { 
    id: 1, 
    title: 'Vinci Tattoo Studio', 
    category: 'HTML5 / Vanilla CSS / UI Design', 
    github: 'https://github.com/prosenjitdey2143/the-vinci-tattoo-studio',
    live: 'https://prosenjitdey2143.github.io/the-vinci-tattoo-studio/', 
    img: './vinci-preview.jpg',
    color: 'rgba(239, 68, 68, 0.15)' // Red
  },
  { 
    id: 2, 
    title: 'Nestra Real Estate', 
    category: 'HTML5 / CSS / Real Estate UI', 
    github: 'https://github.com/prosenjitdey2143/nestra--final-project',
    live: 'https://prosenjitdey2143.github.io/nestra--final-project/', 
    img: './nestra-preview.png',
    color: 'rgba(59, 130, 246, 0.15)' // Blue
  },
  { 
    id: 3, 
    title: 'Devilz Tattooz', 
    category: 'React / Cinematic UI', 
    github: 'https://github.com/prosenjitdey2143/devilz-tattoo',
    live: 'https://prosenjitdey2143.github.io/devilz-tattoo/', 
    img: './preview-devilz.jpg',
    color: 'rgba(249, 115, 22, 0.15)' // Orange
  },
  { 
    id: 4, 
    title: 'IPDC Financial', 
    category: 'React / FinTech Landing Page', 
    github: 'https://github.com/prosenjitdey2143/IPDC-Financial-Landing-Page-Conversion',
    live: 'https://prosenjitdey2143.github.io/IPDC-Financial-Landing-Page-Conversion/', 
    img: './ipdc-preview.jpg',
    color: 'rgba(16, 185, 129, 0.15)' // Emerald
  },
  { 
    id: 5, 
    title: 'Sanu Tattoo Studio', 
    category: 'HTML5 / CSS / Vanilla JS', 
    github: 'https://github.com/prosenjitdey2143/sanuX-tattoo-studio-website2-demo',
    live: 'https://prosenjitdey2143.github.io/sanuX-tattoo-studio-website2-demo/', 
    img: './sanu-preview.jpg',
    color: 'rgba(168, 85, 247, 0.15)' // Purple
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Track scroll for the entire massive 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Derive which project is currently active based on scroll depth
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.round(latest * (projects.length - 1));
    if (index >= projects.length) index = projects.length - 1;
    if (index < 0) index = 0;
    setActiveIndex(index);
  });

  // 3D Tilt Effect logic for Desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      id="recent-work" 
      ref={containerRef} 
      className="bg-[#050505] relative z-20 transition-colors duration-1000 overflow-clip" 
    >
      {/* Dynamic Background Glow based on active project */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out z-0"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${projects[activeIndex].color}, transparent 60%)`
        }}
      />

      {/* 
        ===========================================
        DESKTOP LAYOUT: SPLIT SCREEN PARALLAX
        ===========================================
      */}
      <div className="hidden xl:flex relative w-full" style={{ height: `${projects.length * 100}vh` }}>
        
        {/* LEFT SIDE: Sticky Image Frame with 3D Interaction */}
        <div className="w-[45%] lg:w-1/2 h-screen sticky top-0 p-8 lg:p-16 flex flex-col justify-center z-10" style={{ perspective: "1000px" }}>
           <h2 className="text-xl tracking-[0.4em] uppercase font-bold text-white/30 mb-8 ml-4">
             My Work
           </h2>
           
           <motion.div 
             onMouseMove={handleMouseMove}
             onMouseLeave={handleMouseLeave}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleMouseLeave}
             style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
             className="w-full h-[70vh] rounded-[3rem] overflow-hidden relative shadow-[0_20px_100px_rgba(0,0,0,0.8)] border border-white/10 bg-[#020202] cursor-crosshair"
           >
              {projects.map((project, idx) => (
                 <motion.img 
                   key={`img-${project.id}`}
                   src={project.img}
                   loading="lazy"
                   decoding="async"
                   alt={project.title}
                   className="absolute inset-0 w-full h-full object-cover"
                   initial={false}
                   animate={{ 
                     opacity: activeIndex === idx ? 1 : 0,
                     scale: activeIndex === idx ? 1 : 1.1,
                     filter: activeIndex === idx ? "blur(0px)" : "blur(10px)"
                   }}
                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 />
              ))}
              {/* Subtle overlay so the image isn't completely raw */}
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
           </motion.div>
        </div>

        {/* RIGHT SIDE: Scrolling Typography */}
        <div className="w-[55%] lg:w-1/2 flex flex-col relative z-10">
           {projects.map((project, idx) => (
             <div 
               key={`text-${project.id}`} 
               className="h-screen w-full flex flex-col justify-center pr-12 lg:pr-24 pl-8 lg:pl-16"
             >
                <motion.div 
                  className="max-w-3xl"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-20%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                   {/* Eyebrow */}
                   <p className="text-gray-500 tracking-[0.4em] uppercase text-xs lg:text-sm font-bold mb-8 flex items-center gap-6">
                      <span className="text-white/20 text-4xl font-light">0{idx + 1}</span> 
                      <span className="w-16 h-[1px] bg-white/10"></span>
                      {project.category}
                   </p>
                   
                   {/* Title */}
                   <h3 className="text-5xl lg:text-[6rem] xl:text-[7rem] font-bold text-white tracking-tighter leading-[0.9] mb-12 drop-shadow-2xl">
                      {project.title}
                   </h3>
                   
                   {/* Actions */}
                   <div className="flex flex-col xl:flex-row gap-5">
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="px-8 py-5 rounded-full bg-white text-black font-bold tracking-wide flex justify-center items-center gap-3 hover:scale-105 hover:bg-gray-200 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                      >
                         Live Preview <span className="text-xl leading-none">↗</span>
                      </a>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="px-8 py-5 rounded-full border border-white/20 text-white font-bold tracking-wide backdrop-blur-md flex justify-center items-center gap-3 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                      >
                         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
                         Source Code
                      </a>
                   </div>
                </motion.div>
             </div>
           ))}
        </div>
      </div>

      {/* 
        ===========================================
        MOBILE LAYOUT: STACKED STICKY CARDS
        ===========================================
      */}
      <div className="xl:hidden flex flex-col px-4 md:px-12 pt-32 md:pt-40 pb-32">
         <div className="relative z-50 text-center w-full mb-16 lg:mb-24">
           <p className="text-gray-500 tracking-[0.4em] uppercase text-xs md:text-sm font-bold mb-4 drop-shadow-md">
             Recent Projects
           </p>
           <h2 className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[8rem] font-black text-white tracking-tighter drop-shadow-2xl leading-[0.9]">
             My Work.
           </h2>
         </div>
         
         <div className="flex flex-col gap-[10vh]">
           {projects.map((project, idx) => (
             <div 
               key={`mobile-${project.id}`} 
               className="sticky top-24 w-full h-[70vh] rounded-[2rem] overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.8)] border border-white/10 bg-[#020202]"
             >
                {/* Image */}
                <img src={project.img} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
                   <p className="text-gray-400 tracking-[0.2em] uppercase text-xs font-bold mb-3 flex items-center gap-3">
                      <span className="text-white/50">0{idx + 1}</span> 
                      {project.category}
                   </p>
                   
                   <h3 className="text-4xl lg:text-6xl font-bold text-white tracking-tighter leading-[0.9] mb-6 lg:mb-8 drop-shadow-xl">
                     {project.title}
                   </h3>
                   
                   <div className="flex flex-col gap-3 pointer-events-auto">
                      <a href={project.live} target="_blank" className="px-6 py-4 rounded-full bg-white text-black font-bold flex justify-center items-center gap-2">
                         Live Preview ↗
                      </a>
                      <a href={project.github} target="_blank" className="px-6 py-4 rounded-full border border-white/20 text-white font-bold backdrop-blur-md flex justify-center items-center gap-2 bg-black/40">
                         Source Code
                      </a>
                   </div>
                </div>
             </div>
           ))}
         </div>
      </div>

    </section>
  )
}
