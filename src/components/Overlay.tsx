'use client';
import { m, MotionValue, useTransform } from 'framer-motion';

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  
  // =========================
  // Section 2: "I build digital / experiences."
  // =========================
  // Line 1
  const s2_l1_y = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [120, 0, 0, -120]);
  const s2_l1_opacity = useTransform(scrollYProgress, [0.2, 0.28, 0.47, 0.55], [0, 1, 1, 0]);
  const s2_l1_rotate = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [4, 0, 0, -4]);
  const s2_l1_blur = useTransform(scrollYProgress, [0.2, 0.28, 0.47, 0.55], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]);
  
  // Line 2 (Delayed slightly on entrance, earlier on exit)
  const s2_l2_y = useTransform(scrollYProgress, [0.23, 0.33, 0.42, 0.52], [120, 0, 0, -120]);
  const s2_l2_opacity = useTransform(scrollYProgress, [0.23, 0.31, 0.44, 0.52], [0, 1, 1, 0]);
  const s2_l2_rotate = useTransform(scrollYProgress, [0.23, 0.33, 0.42, 0.52], [4, 0, 0, -4]);
  const s2_l2_blur = useTransform(scrollYProgress, [0.23, 0.31, 0.44, 0.52], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]);

  // =========================
  // Section 3: "Bridging design / and engineering."
  // =========================
  // Line 1
  const s3_l1_y = useTransform(scrollYProgress, [0.55, 0.65, 0.8, 0.9], [120, 0, 0, -120]);
  const s3_l1_opacity = useTransform(scrollYProgress, [0.55, 0.63, 0.82, 0.9], [0, 1, 1, 0]);
  const s3_l1_rotate = useTransform(scrollYProgress, [0.55, 0.65, 0.8, 0.9], [4, 0, 0, -4]);
  const s3_l1_blur = useTransform(scrollYProgress, [0.55, 0.63, 0.82, 0.9], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]);
  
  // Line 2
  const s3_l2_y = useTransform(scrollYProgress, [0.58, 0.68, 0.77, 0.87], [120, 0, 0, -120]);
  const s3_l2_opacity = useTransform(scrollYProgress, [0.58, 0.66, 0.79, 0.87], [0, 1, 1, 0]);
  const s3_l2_rotate = useTransform(scrollYProgress, [0.58, 0.68, 0.77, 0.87], [4, 0, 0, -4]);
  const s3_l2_blur = useTransform(scrollYProgress, [0.58, 0.66, 0.79, 0.87], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center px-8 md:px-24">
      {/* Section 2 */}
      <div className="absolute inset-0 flex flex-col items-start justify-center text-left max-w-5xl mx-auto md:mx-0 left-8 md:left-24 right-8 md:right-auto">
        <h2 className="text-5xl md:text-[6rem] font-bold tracking-tighter text-white leading-[1.05] drop-shadow-2xl">
          <div className="overflow-hidden py-2 -my-2">
            <m.div 
              style={{ y: s2_l1_y, opacity: s2_l1_opacity, rotate: s2_l1_rotate, filter: s2_l1_blur }} 
              className="origin-top-left"
            >
              I build digital
            </m.div>
          </div>
          <div className="overflow-hidden py-2 -my-2">
            <m.div 
              style={{ y: s2_l2_y, opacity: s2_l2_opacity, rotate: s2_l2_rotate, filter: s2_l2_blur }} 
              className="origin-top-left text-gray-400"
            >
              experiences.
            </m.div>
          </div>
        </h2>
      </div>

      {/* Section 3 */}
      <div className="absolute inset-0 flex flex-col items-end justify-center text-right max-w-5xl mx-auto md:mx-0 right-8 md:right-24 left-8 md:left-auto">
        <h2 className="text-5xl md:text-[6rem] font-bold tracking-tighter text-white leading-[1.05] drop-shadow-2xl">
          <div className="overflow-hidden py-2 -my-2">
            <m.div 
              style={{ y: s3_l1_y, opacity: s3_l1_opacity, rotate: s3_l1_rotate, filter: s3_l1_blur }} 
              className="origin-top-right"
            >
              Bridging design
            </m.div>
          </div>
          <div className="overflow-hidden py-2 -my-2">
            <m.div 
              style={{ y: s3_l2_y, opacity: s3_l2_opacity, rotate: s3_l2_rotate, filter: s3_l2_blur }} 
              className="origin-top-right text-gray-400"
            >
              & engineering.
            </m.div>
          </div>
        </h2>
      </div>
    </div>
  );
}
