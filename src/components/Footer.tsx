'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

const WHATSAPP_NUMBER = "9163253013";

const socialLinks = [
  { name: "Email", url: "mailto:prosenjitdey2143@gmail.com" },
  { name: "WhatsApp", url: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Prosenjit! I have a project idea and would love to talk.")}` },
  { name: "LinkedIn", url: "#" },
  { name: "Instagram", url: "#" },
  { name: "Facebook", url: "#" }
];

export default function Footer() {
  const [localTime, setLocalTime] = useState("");
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth fluid physics for the glowing orb
  const mouseX = useSpring(0, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 20 });

  // Live Time in India
  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setLocalTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Set initial glow position to the center of the footer
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
  }, [mouseX, mouseY]);

  // Reset glow position to center when mouse leaves
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

  return (
    <footer 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsHovered(true)}
      onTouchStart={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
      className="relative min-h-[70vh] bg-[#020202] text-white flex flex-col justify-between overflow-hidden border-t border-white/10 z-20"
    >
      {/* Massive Fluid Color Background that matches the top-of-website vibe */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{ opacity: isHovered ? 0.7 : 0.3, scale: isHovered ? 1.2 : 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] rounded-full pointer-events-none z-0"
      >
         <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-green-500 blur-[100px] md:blur-[140px] opacity-70 animate-pulse" />
      </motion.div>

      {/* Grid Pattern Overlay to make the light look more cinematic */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-0" />

      {/* Top Main Section */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-24 md:pt-32 relative z-10 flex-grow flex flex-col items-center justify-center text-center">
         
         {/* Glassmorphism Profile Badge */}
         <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors duration-300 cursor-pointer group">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium tracking-widest uppercase text-gray-300 group-hover:text-white transition-colors">
              Available for freelance work
            </span>
         </div>

         <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-9xl font-black tracking-tighter mb-16 drop-shadow-2xl selection:bg-fuchsia-500/30">
            LET'S CREATE <br className="hidden md:block" /> SOMETHING <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">EPIC.</span>
         </h2>

         {/* Social Links Layout */}
         <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12 w-full max-w-4xl">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <span className="relative z-10 text-sm md:text-base font-bold tracking-[0.2em] uppercase text-gray-300 group-hover:text-white transition-colors">
                  {link.name}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </a>
            ))}
         </div>
      </div>

      {/* Clean Bottom Bar */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-8 mt-16 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 relative z-10 bg-gradient-to-b from-transparent to-[#020202]">
         <div className="flex items-center gap-4 text-gray-500 text-xs md:text-sm font-medium tracking-wide">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center font-bold text-white bg-white/5">
               PD
            </div>
            © {new Date().getFullYear()} Prosenjit Dey.
         </div>
         
         <div className="flex items-center text-gray-500 text-xs md:text-sm font-medium tracking-wide bg-white/5 px-6 py-3 rounded-full border border-white/5 backdrop-blur-sm">
            <span className="uppercase tracking-[0.1em] mr-2 text-gray-600">Local Time</span>
            <span className="text-white">{localTime || "..."} India</span>
         </div>
      </div>
      
    </footer>
  );
}
