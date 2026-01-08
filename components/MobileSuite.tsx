import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const MobileSuite: React.FC = () => {
  return (
    <section className="relative z-20 w-full py-20 overflow-hidden">
        {/* Marquee Background */}
        <div className="absolute top-0 left-0 w-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
             <div className="whitespace-nowrap text-[20vw] font-bold text-white font-manrope animate-[infinite-scroll_60s_linear_infinite]">
                 SELECTED WORKS — SELECTED WORKS — SELECTED WORKS — 
             </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="flex items-center justify-between mb-20 animate-on-scroll">
                <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight font-manrope">
                    SELECTED <span className="text-[#ccff00]">WORKS</span>
                </h2>
                <a href="#" className="hidden md:flex items-center gap-2 text-sm uppercase font-bold tracking-widest text-zinc-400 hover:text-white transition-colors">
                    View Full Archive <ArrowUpRight size={16} />
                </a>
            </div>

            <div className="space-y-32">
                <ProjectItem 
                    year="2024"
                    client="Neural Link"
                    title="Interface for the Human Mind"
                    category="Product Design / 3D"
                    align="right"
                    color="from-purple-500"
                />
                 <ProjectItem 
                    year="2023"
                    client="Cyberpunk 2099"
                    title="Neon City Experience"
                    category="Immersive Web / WebGL"
                    align="left"
                    color="from-[#ccff00]"
                />
                 <ProjectItem 
                    year="2023"
                    client="Vogue Italia"
                    title="Digital Fashion Week"
                    category="Art Direction / CGI"
                    align="right"
                    color="from-pink-500"
                />
            </div>
        </div>
    </section>
  );
};

const ProjectItem = ({ year, client, title, category, align, color }: any) => {
    return (
        <div className={`group relative flex flex-col md:flex-row ${align === 'right' ? 'md:justify-end' : ''} items-center animate-on-scroll`}>
            
            {/* Text Side */}
            <div className={`w-full md:w-1/3 mb-10 md:mb-0 ${align === 'right' ? 'md:order-1 md:pr-12 md:text-right' : 'md:order-2 md:pl-12'}`}>
                <div className={`flex flex-col ${align === 'right' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[#ccff00] font-mono text-xs mb-4">/ {year}</span>
                    <h3 className="text-4xl md:text-6xl font-manrope font-semibold text-white mb-2 leading-[0.9] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-500">
                        {client}
                    </h3>
                    <p className="text-xl text-zinc-400 italic mb-6 font-serif">{title}</p>
                    <div className="px-3 py-1 border border-white/20 rounded-full text-xs text-zinc-300 uppercase tracking-widest">
                        {category}
                    </div>
                </div>
            </div>

            {/* Image Side - 3D Tilted Card */}
            <div className={`w-full md:w-1/2 h-[500px] md:h-[600px] relative perspective-midrange group-hover:z-20 ${align === 'right' ? 'md:order-2' : 'md:order-1'}`}>
                <div className="w-full h-full relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:rotate-y-0 group-hover:scale-[1.02]"
                     style={{ 
                         transform: align === 'right' ? 'rotateY(-15deg) rotateX(5deg)' : 'rotateY(15deg) rotateX(5deg)',
                         transformStyle: 'preserve-3d'
                     }}>
                    
                    {/* The Image Container */}
                    <div className="absolute inset-0 bg-zinc-900 overflow-hidden border border-white/10 shadow-2xl">
                        {/* Placeholder Abstract Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${color} to-black opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
                        
                        {/* Fake UI Elements inside project */}
                        <div className="absolute top-8 left-8 right-8 h-px bg-white/20"></div>
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between">
                             <div className="w-12 h-1 bg-white/50"></div>
                             <div className="w-4 h-4 rounded-full border border-white/50"></div>
                        </div>
                    </div>

                    {/* Gloss Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
}