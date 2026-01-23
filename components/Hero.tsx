import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const MotionDiv = motion.div as any;

  return (
    <section className="h-screen w-full relative overflow-hidden flex flex-col items-center justify-center pointer-events-none">
        
        {/* Main Content Container */}
        {/* Text removed as requested to showcase the 3D background cleanly */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto w-full">
            
        </div>

        {/* Scroll Indicator */}
        <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 z-20 animate-bounce pointer-events-auto cursor-pointer"
        >
            <ArrowDown className="text-white/50" size={24} />
        </MotionDiv>
    </section>
  );
};