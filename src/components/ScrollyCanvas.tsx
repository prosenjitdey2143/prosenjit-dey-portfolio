'use client';
import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Overlay from './Overlay';

const FRAME_COUNT = 120; // We have 120 frames (000 to 119)

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const renderFrame = (index: number) => {
    const images = imagesRef.current;
    if (images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const image = images[index];
    if (image && image.complete && image.naturalWidth > 0) {
      // Draw image with object-fit: cover logic
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = image.width / image.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    }
  };

  // Preload images optimally
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
    
    const loadFrame = (i: number) => {
      if (isCancelled) return;
      const img = new Image();
      const frameNum = i.toString().padStart(3, '0');
      img.src = `./sequence/compressed_frame_${frameNum}_delay-0.066s.png`;
      
      img.onload = () => {
        if (isCancelled) return;
        loadedImages[i] = img;
        if (i === Math.floor(frameIndex.get())) {
          renderFrame(i);
        }
      };
    };

    // 1. Load first 10 frames instantly
    for (let i = 0; i < Math.min(10, FRAME_COUNT); i++) {
      loadFrame(i);
    }

    // 2. Stagger the remaining frames to unchoke the network
    const loadRemaining = async () => {
      for (let i = 10; i < FRAME_COUNT; i++) {
        if (isCancelled) break;
        loadFrame(i);
        await new Promise(res => setTimeout(res, 10));
      }
    };
    
    // Start background loading after initial paint
    setTimeout(loadRemaining, 500);
    imagesRef.current = loadedImages;

    return () => {
      isCancelled = true;
    };
  }, [frameIndex]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    renderFrame(Math.floor(latest));
  });

  // Handle canvas resize & initial draw (debounced for performance)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    let resizeTimer: NodeJS.Timeout;

    const performResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(Math.floor(frameIndex.get()));
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(performResize, 150);
    };
    
    performResize(); // Initial setup
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* The canvas rendering the image sequence */}
        <canvas ref={canvasRef} className="block h-full w-full object-cover" />
        
        {/* The parallax overlay text */}
        <Overlay scrollYProgress={scrollYProgress} />
        
        {/* Subtle gradient overlay to blend canvas into background at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent pointer-events-none opacity-50" />
      </div>
    </div>
  );
}
