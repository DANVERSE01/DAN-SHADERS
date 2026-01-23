import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Features: React.FC = () => {
  return (
    <section className="relative z-20 w-full bg-[var(--bg-main)] py-40 overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--secondary-soft)] rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--primary-soft)] rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-[var(--border-subtle)] pb-12 animate-on-scroll">
                <h2 className="text-6xl md:text-8xl font-medium text-[var(--text-main)] tracking-tighter font-manrope leading-[0.9]">
                    OUR<br />
                    <span className="text-[var(--text-dim)]">CAPABILITIES</span>
                </h2>
                <p className="text-[var(--text-dim)] max-w-md text-lg mt-8 md:mt-0 font-geist">
                    A multidisciplinary fusion of design, motion, and code. We operate at the intersection of art and utility.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TiltCard 
                    num="01"
                    title="Creative Direction"
                    desc="Brand identity, art direction, and visual language systems that cut through the noise."
                    tags={['Branding', 'Motion', 'Typography']}
                    color="#FF6B3D" 
                    delay="100"
                />
                <TiltCard 
                    num="02"
                    title="Immersive Web"
                    desc="WebGL experiences, 3D product configurators, and award-winning creative frontend development."
                    tags={['Three.js', 'React', 'WebGL']}
                    color="#1F9AC8"
                    delay="200"
                />
                <TiltCard 
                    num="03"
                    title="CGI & VFX"
                    desc="Hyper-realistic 3D rendering, simulation, and post-production for campaigns that demand the impossible."
                    tags={['Houdini', 'Cinema4D', 'Redshift']}
                    color="#A5B4FC"
                    delay="300"
                />
            </div>
        </div>
    </section>
  );
};

const TiltCard = ({ num, title, desc, tags, color, delay }: any) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            } as any}
            className="group relative h-[650px] rounded-2xl glass-panel p-8 flex flex-col justify-between animate-on-scroll"
            data-delay={delay}
        >
            {/* Gloss Reflection Gradient */}
            <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%)`,
                    transform: "translateZ(1px)" 
                }}
            />

            <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
                <span className="text-xs font-mono text-[var(--text-dim)] block mb-4 border border-[var(--border-subtle)] w-fit px-2 py-1 rounded-md">({num})</span>
                <h3 className="text-4xl font-manrope font-semibold text-[var(--text-main)] mb-6 group-hover:text-[var(--primary-500)] transition-colors drop-shadow-lg">{title}</h3>
                <p className="text-[var(--text-dim)] text-lg leading-relaxed">{desc}</p>
            </div>

            <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
                 {/* Abstract 3D Visual Placeholder inside the card */}
                <div className="w-full h-48 mb-8 rounded-xl overflow-hidden relative border border-[var(--border-subtle)] bg-[var(--bg-card)] group-hover:border-[var(--primary-500)]/30 transition-colors duration-500">
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                     <div className="absolute -inset-4 opacity-30 blur-2xl transition-all duration-700 group-hover:opacity-60" 
                          style={{ background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)` }}>
                     </div>
                     {/* Floating Graphic Element */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                     </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs text-[var(--text-dim)] uppercase tracking-wider backdrop-blur-sm group-hover:bg-[var(--glass-bg)] transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>
                
                <button className="flex items-center gap-2 text-[var(--text-main)] text-sm uppercase font-bold tracking-widest group-hover:gap-4 transition-all duration-300 focus-visible:outline-none focus-visible:underline">
                    Explore <ArrowUpRight size={16} style={{ color: color }} />
                </button>
            </div>
        </motion.div>
    );
};