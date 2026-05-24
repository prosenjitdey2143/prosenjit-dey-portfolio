'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// UPDATE THIS NUMBER TO YOUR ACTUAL WHATSAPP NUMBER
const WHATSAPP_NUMBER = "9163253013"; 

const services = [
  {
    title: 'Website Design',
    description: 'I design visually stunning, user-centric interfaces that elevate your brand and captivate your audience from the first pixel.',
  },
  {
    title: 'Website Development',
    description: 'I build robust, lightning-fast, and scalable web applications using modern technologies and clean architecture.',
  },
  {
    title: 'App Development',
    description: 'I deliver seamless, high-performance mobile experiences for both iOS and Android platforms.',
  },
  {
    title: 'WordPress Development',
    description: 'I create custom, fully manageable, and highly optimized WordPress websites tailored to your specific business needs.',
  },
  {
    title: 'Graphics Design',
    description: 'I design compelling visual identities, branding materials, and digital assets that tell your unique story.',
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // The section is 500vh tall to allow a long, smooth scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 5 items, each 100vw. Total width = 500vw.
  // Translating by -80% means it moves exactly -400vw, bringing the 5th item perfectly into view.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section 
      id="services" 
      ref={containerRef} 
      // 500vh creates the long scroll track
      className="bg-[#050505] relative z-30 h-[500vh]"
    >
      <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Sticky container that locks to the screen and hides horizontal overflow */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
         
         {/* Massive Cinematic Color Orb that travels and morphs based on scroll */}
         <motion.div 
           className="absolute top-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] rounded-full blur-[140px] md:blur-[180px] pointer-events-none z-0 mix-blend-screen opacity-50"
           style={{ 
             left: useTransform(scrollYProgress, [0, 1], ["10%", "90%"]),
             x: "-50%",
             backgroundColor: useTransform(scrollYProgress, 
               [0, 0.25, 0.5, 0.75, 1], 
               [
                 "rgba(34, 197, 94, 0.6)",  // Emerald Green
                 "rgba(168, 85, 247, 0.6)", // Vibrant Purple
                 "rgba(59, 130, 246, 0.6)", // Deep Blue
                 "rgba(236, 72, 153, 0.6)", // Neon Pink
                 "rgba(234, 179, 8, 0.6)"   // Golden Yellow
               ]
             ) 
           }}
         />

         <div className="absolute top-32 lg:top-24 w-full px-6 md:px-16 flex justify-between items-center z-20 pointer-events-none">
            <h2 className="text-sm md:text-xl lg:text-3xl tracking-[0.4em] uppercase font-bold text-white/30">
              What I Do
            </h2>
            <span className="text-white/20 font-light tracking-[0.2em] text-sm md:text-base">
              Scroll to explore
            </span>
         </div>

         {/* The Horizontal Track */}
         <motion.div style={{ x }} className="flex w-[500vw] h-full items-center relative z-10">
            {services.map((service, index) => {
              const message = encodeURIComponent(`Hi! I'm interested in your ${service.title} service. Could we discuss this further?`);
              const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

              return (
                <div key={index} className="relative w-screen h-full flex flex-col justify-center px-6 md:px-16 lg:px-[10vw]">
                   
                   {/* Massive Background Number for Cinematic Depth */}
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                      <span className="text-[60vw] md:text-[40vw] font-bold text-white/[0.02] leading-none select-none">
                        0{index + 1}
                      </span>
                   </div>

                   {/* Foreground Content */}
                   <div className="relative z-10 max-w-4xl flex flex-col">
                      <div className="mb-6 md:mb-10 flex items-center gap-6">
                        <span className="w-12 md:w-20 h-[1px] bg-white/20 block" />
                        <span className="text-xl md:text-3xl lg:text-4xl font-light text-white/40 tracking-[0.2em]">SERVICE 0{index + 1}</span>
                      </div>
                      
                      <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] font-bold tracking-tighter text-white mb-8 md:mb-12 leading-[1.1] drop-shadow-2xl">
                        {service.title}
                      </h3>
                      
                      <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24 items-start md:items-center">
                        <p className="text-gray-400 text-lg md:text-2xl leading-relaxed max-w-2xl">
                           {service.description}
                        </p>
                        
                        <a 
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-shrink-0 inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white text-black hover:bg-green-500 hover:text-white transition-all duration-300 font-bold text-xs sm:text-sm md:text-lg shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:scale-105 group"
                        >
                           <svg className="w-6 h-6 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                           </svg>
                           Enquire Now
                        </a>
                      </div>
                   </div>

                </div>
              )
            })}
         </motion.div>

         {/* Scroll Progress Bar */}
         <div className="absolute bottom-10 md:bottom-16 left-6 md:left-16 right-6 md:right-16 h-1 bg-white/10 rounded-full overflow-hidden z-20">
            <motion.div 
              className="h-full bg-white rounded-full" 
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }} 
            />
         </div>

      </div>
    </section>
  )
}
