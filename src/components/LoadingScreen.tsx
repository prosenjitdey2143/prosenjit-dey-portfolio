'use client';
import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

const FRAME_COUNT = 120; // Number of images in the cinematic sequence

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
      
      if (loadedCount === FRAME_COUNT) {
        setTimeout(() => {
          window.scrollTo(0, 0);
          setLoading(false);
          document.body.style.overflow = '';
        }, 1200); // Wait for the window to finish expanding before fading out
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, '0');
      img.src = `./sequence/compressed_frame_${frameNum}_delay-0.066s.png`;
      img.onload = updateProgress;
      img.onerror = updateProgress; 
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <m.div
          key="loading-screen"
          // We fade the entire black background out at the very end
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* 
            THE ANIMATION ELEMENT: "The Expanding Window"
            This starts as a small portrait window showing the very first frame of the sequence.
            When loading finishes, it expands to cover the entire screen seamlessly.
          */}
          <m.div
            initial={{ width: "240px", height: "360px", borderRadius: "24px" }}
            animate={progress === 100 ? { 
              width: "100vw", 
              height: "100vh", 
              borderRadius: "0px" 
            } : { 
              width: "240px", 
              height: "360px", 
              borderRadius: "24px" 
            }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} 
            className="relative overflow-hidden z-10 shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10"
          >
             {/* The actual sequence image inside the window. */}
             <m.img 
               src="./sequence/compressed_frame_000_delay-0.066s.png"
               alt="Loading Sequence"
               className="absolute inset-0 w-full h-full object-cover"
               initial={{ scale: 1.2 }}
               animate={progress === 100 ? { scale: 1 } : { scale: 1.1 }}
               transition={{ duration: 5, ease: "linear" }}
             />
             
             {/* Dark gradient overlay inside the window */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

             {/* Progress text inside the window */}
             <AnimatePresence>
               {progress < 100 && (
                 <m.div 
                   exit={{ opacity: 0, y: 10 }}
                   transition={{ duration: 0.3 }}
                   className="absolute inset-0 flex flex-col items-center justify-end pb-8"
                 >
                   <p className="text-gray-300 text-[0.6rem] tracking-[0.5em] uppercase font-bold mb-2">
                     Loading Sequence
                   </p>
                   <p className="text-white text-5xl font-bold tracking-tighter tabular-nums drop-shadow-lg">
                     {progress}%
                   </p>
                 </m.div>
               )}
             </AnimatePresence>
          </m.div>

          {/* Decorative architectural grid lines outside the window */}
          <AnimatePresence>
            {progress < 100 && (
              <m.div 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 pointer-events-none"
              >
                {/* Horizontal crosshair */}
                <div className="absolute top-1/2 left-0 w-[calc(50%-120px)] h-[1px] bg-white/10 -translate-y-1/2" />
                <div className="absolute top-1/2 right-0 w-[calc(50%-120px)] h-[1px] bg-white/10 -translate-y-1/2" />
                
                {/* Vertical crosshair */}
                <div className="absolute top-0 left-1/2 w-[1px] h-[calc(50%-180px)] bg-white/10 -translate-x-1/2" />
                <div className="absolute bottom-0 left-1/2 w-[1px] h-[calc(50%-180px)] bg-white/10 -translate-x-1/2" />
              </m.div>
            )}
          </AnimatePresence>

        </m.div>
      )}
    </AnimatePresence>
  );
}
