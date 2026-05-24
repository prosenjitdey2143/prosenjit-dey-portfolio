'use client';
import { m, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (text[index] === ' ') return ' ';
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 2;
    }, 30);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {displayText}
    </span>
  );
};

const SlidingText = ({ text }: { text: string }) => {
  return (
    <div className="relative overflow-hidden leading-[1.1] block">
      <div className="transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {text}
      </div>
      <div className="absolute top-0 left-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0 text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.8)]">
        {text}
      </div>
    </div>
  );
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'WORK', href: '#recent-work' },
    { name: 'SERVICES', href: '#services' },
  ];

  return (
    <>
      <m.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="fixed top-0 left-0 w-full p-8 md:px-12 z-[60] flex justify-between items-center mix-blend-difference pointer-events-none"
      >
        {/* LEFT: Name & Tag (Editorial Style, No Logo) */}
        <div className="pointer-events-auto">
          <a href="#" className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 group w-fit outline-none">
            <span className="text-white text-sm md:text-base font-bold tracking-[0.3em] uppercase">
              <ScrambleText text="PROSENJIT DEY" />
            </span>
            
            <span className="hidden md:block w-8 h-[1px] bg-white/30 group-hover:bg-white group-hover:w-16 transition-all duration-500" />
            
            <span className="text-white/50 text-[9px] md:text-[10px] font-medium tracking-[0.4em] uppercase group-hover:text-white/80 transition-colors duration-500">
              <ScrambleText text="CREATIVE DEVELOPER" />
            </span>
          </a>
        </div>

        {/* RIGHT: Hamburger Button */}
        <button 
          onClick={() => setIsOpen(true)}
          className={`pointer-events-auto flex flex-col justify-center items-end gap-2 w-12 h-10 group outline-none transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <span className="w-12 h-[2px] bg-white group-hover:w-8 transition-all duration-300 ease-out" />
          <span className="w-8 h-[2px] bg-white group-hover:w-12 transition-all duration-300 ease-out" />
        </button>
      </m.header>

      {/* FULL SCREEN MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <m.div 
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col justify-between p-6 md:p-16 lg:p-24"
          >
            {/* Menu Header */}
            <div className="flex justify-between items-start w-full">
               <div className="text-white/40 text-xs font-bold tracking-[0.4em] uppercase mt-4">
                 Navigation
               </div>
               {/* Close Button */}
               <button 
                 onClick={() => setIsOpen(false)}
                 className="w-12 h-12 flex flex-col justify-center items-center group overflow-hidden outline-none"
               >
                 <span className="absolute w-8 h-[2px] bg-white rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                 <span className="absolute w-8 h-[2px] bg-white -rotate-45 group-hover:-rotate-90 transition-transform duration-500" />
               </button>
            </div>

            {/* Main Menu Content (Split Layout on Desktop) */}
            <div className="flex flex-col lg:flex-row flex-1 mt-16 md:mt-12 lg:items-center w-full h-full">
               
               {/* Left Side: Branding / Motto (Hidden on mobile) */}
               <div className="hidden lg:flex flex-col flex-1 h-full justify-center border-r border-white/5 pr-16 relative">
                 <div className="absolute top-1/2 -translate-y-1/2 left-0 text-[10rem] font-black text-white/[0.02] leading-none pointer-events-none select-none -rotate-90 origin-left">
                   MENU
                 </div>
                 <h2 className="text-4xl xl:text-6xl font-bold text-white tracking-tighter leading-tight relative z-10">
                   Crafting <br/>
                   <span className="text-white/40">Digital</span> <br/>
                   Experiences.
                 </h2>
                 <p className="text-white/30 text-sm mt-8 max-w-sm tracking-[0.2em] font-light leading-relaxed uppercase">
                   Based in Kolkata. Specialized in frontend architecture, cinematic UI, and creative coding.
                 </p>
               </div>

               {/* Right Side: Links */}
               <nav className="flex flex-col flex-1 justify-center lg:pl-24 gap-6 md:gap-10">
                 {navLinks.map((item, i) => (
                    <div key={item.name} className="overflow-hidden group">
                      <m.a 
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        initial={{ y: '100%', rotate: 5 }}
                        animate={{ y: '0%', rotate: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 * i }}
                        className="flex items-center gap-6 md:gap-12 cursor-pointer w-fit"
                      >
                        <span className="text-white/20 text-sm md:text-xl font-medium tracking-widest transition-colors duration-500 group-hover:text-emerald-400">
                          0{i + 1}
                        </span>
                        <span className="text-4xl sm:text-5xl md:text-7xl xl:text-[6rem] font-bold text-white tracking-tighter uppercase transition-transform duration-500 group-hover:translate-x-8">
                          <SlidingText text={item.name} />
                        </span>
                      </m.a>
                    </div>
                 ))}
               </nav>

            </div>

            {/* Footer inside Menu */}
            <m.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full border-t border-white/5 pt-8 gap-8 mt-12 md:mt-0"
            >
              <div className="flex gap-8">
                <a 
                  href="https://github.com/prosenjitdey2143" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white flex items-center gap-3 transition-colors duration-300 cursor-pointer group"
                >
                  <ScrambleText text="GITHUB" className="text-xs font-bold tracking-[0.4em] uppercase" />
                  <GithubIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/prosenjitdey" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white flex items-center gap-3 transition-colors duration-300 cursor-pointer group"
                >
                  <ScrambleText text="LINKEDIN" className="text-xs font-bold tracking-[0.4em] uppercase" />
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
              <div className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-bold">
                © 2026 Prosenjit Dey
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
