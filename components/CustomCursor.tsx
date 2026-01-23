import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);

  // Raw Mouse Values (No React State updates on move)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth Physics configurations
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const trailOptions = { damping: 30, stiffness: 200, mass: 1 };
  
  // 1. The Core (Instant)
  const coreX = useSpring(mouseX, smoothOptions);
  const coreY = useSpring(mouseY, smoothOptions);

  // 2. The Aura (Slight Delay)
  const auraX = useSpring(mouseX, trailOptions);
  const auraY = useSpring(mouseY, trailOptions);

  // 3. The Smoke/Ghost Trail (Heavier Delay) - Creates the "smoke" feel without creating DOM nodes
  const trailX = useSpring(mouseX, { damping: 40, stiffness: 150, mass: 2 });
  const trailY = useSpring(mouseY, { damping: 40, stiffness: 150, mass: 2 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Direct update to MotionValues (Bypasses React Render Cycle)
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isClickable = target.closest('a, button, input, textarea, .cursor-pointer');
      
      if (isClickable) {
          setIsHovering(true);
          const hoverLabel = target.getAttribute('data-hover') || target.closest('[data-hover]')?.getAttribute('data-hover');
          setHoverText(hoverLabel || null);
      } else {
          setIsHovering(false);
          setHoverText(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  const MotionDiv = motion.div as any;
  const MotionSpan = motion.span as any;

  return (
    <>
      <style>{`
        body, a, button, input, textarea {
            cursor: none !important;
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        
        {/* 1. SMOKE TRAIL (Performance Optimized: Single Element) */}
        <MotionDiv
            style={{ 
                x: trailX, 
                y: trailY,
                translateX: '-50%',
                translateY: '-50%'
            }}
            className="absolute w-24 h-24 rounded-full bg-[var(--primary-500)]/10 blur-[40px] mix-blend-screen"
        />

        {/* 2. THE AURA (Glass Effect) */}
        <MotionDiv
            style={{ 
                x: auraX, 
                y: auraY,
                translateX: '-50%',
                translateY: '-50%'
            }}
            animate={{
                width: isHovering ? 60 : 32,
                height: isHovering ? 60 : 32,
                scale: isClicking ? 0.9 : 1,
                backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                borderColor: isHovering ? 'var(--primary-500)' : 'rgba(255, 255, 255, 0.1)'
            }}
            transition={{ duration: 0.2 }}
            className="absolute rounded-full border backdrop-blur-[1px] flex items-center justify-center overflow-hidden"
        >   
            {/* Text Label */}
            <AnimatePresence>
                {hoverText && (
                    <MotionSpan 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-[8px] font-mono text-[var(--primary-500)] uppercase tracking-widest font-bold absolute whitespace-nowrap"
                    >
                        {hoverText}
                    </MotionSpan>
                )}
            </AnimatePresence>
        </MotionDiv>

        {/* 3. THE CORE (Precision) */}
        <MotionDiv
            style={{ 
                x: coreX, 
                y: coreY,
                translateX: '-50%',
                translateY: '-50%'
            }}
            animate={{
                scale: isHovering ? 0.2 : 1 
            }}
            className="absolute w-1.5 h-1.5 bg-[var(--primary-500)] rounded-full shadow-[0_0_10px_var(--primary-500)]"
        />

        {/* 4. Crosshair Lines (Subtle) */}
        <MotionDiv 
            style={{ x: coreX, y: coreY, translateX: '-50%', translateY: '-50%' }}
            className="absolute w-full h-full flex items-center justify-center opacity-20"
        >
             <div className="absolute w-[40px] h-[1px] bg-[var(--primary-500)]" />
             <div className="absolute w-[1px] h-[40px] bg-[var(--primary-500)]" />
        </MotionDiv>

      </div>
    </>
  );
};