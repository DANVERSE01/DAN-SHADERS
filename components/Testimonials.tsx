import React from 'react';
import { Icon } from '@iconify/react';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="relative z-20 w-full py-40 border-t border-white/5 overflow-hidden">
        
        {/* Ambient Light */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 animate-on-scroll">
                <div>
                    <span className="text-[#ccff00] font-mono text-xs uppercase tracking-widest mb-4 block flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-[#ccff00]"></span>
                        Recognition
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter font-manrope leading-[1]">
                        CHAMPIONS OF<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-700">THE NEW ERA</span>
                    </h2>
                </div>
                <div className="flex flex-col justify-end">
                    <p className="text-xl text-zinc-300 font-geist leading-relaxed border-l border-white/10 pl-6">
                        We partner with ambitious brands to define their future. Our work has been recognized by the industry's most prestigious institutions for pushing the boundaries of what is possible on the web.
                    </p>
                </div>
            </div>

            {/* Awards Grid - Translucent Glass */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32 animate-on-scroll">
                <AwardItem org="Awwwards" title="Site of the Day" count="x12" delay={0} />
                <AwardItem org="FWA" title="FOTD" count="x08" delay={100} />
                <AwardItem org="Cannes Lions" title="Digital Craft" count="x03" delay={200} />
                <AwardItem org="Webby" title="Best Visual Design" count="x05" delay={300} />
            </div>

            {/* Client Roster */}
            <div className="animate-on-scroll">
                <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-12 text-center flex items-center justify-center gap-4">
                    <span className="w-12 h-[1px] bg-white/10"></span>
                    Trusted By
                    <span className="w-12 h-[1px] bg-white/10"></span>
                </h3>
                <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                     <Icon icon="simple-icons:nike" className="text-6xl text-white hover:text-[#ccff00] transition-colors hover:scale-110 duration-300 hover:drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]" />
                     <Icon icon="simple-icons:redbull" className="text-6xl text-white hover:text-[#ccff00] transition-colors hover:scale-110 duration-300 hover:drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]" />
                     <Icon icon="simple-icons:sony" className="text-6xl text-white hover:text-[#ccff00] transition-colors hover:scale-110 duration-300 hover:drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]" />
                     <Icon icon="simple-icons:mercedes" className="text-6xl text-white hover:text-[#ccff00] transition-colors hover:scale-110 duration-300 hover:drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]" />
                     <Icon icon="simple-icons:spacex" className="text-6xl text-white hover:text-[#ccff00] transition-colors hover:scale-110 duration-300 hover:drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]" />
                </div>
            </div>

        </div>
    </section>
  );
};

const AwardItem = ({ org, title, count, delay }: any) => (
    <div 
        className="relative group p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#ccff00]/30 transition-all duration-500 backdrop-blur-sm"
        style={{ transitionDelay: `${delay}ms` }}
    >
        {/* Hover Glow */}
        <div className="absolute inset-0 bg-[#ccff00]/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 blur-xl"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <Star className="text-zinc-600 mb-4 group-hover:text-[#ccff00] transition-colors group-hover:rotate-180 duration-700" size={24} />
            <h4 className="text-white font-bold text-xl mb-1 font-manrope">{org}</h4>
            <p className="text-zinc-500 text-sm font-geist">{title}</p>
            <div className="mt-6 px-3 py-1 border border-white/10 rounded-full text-xs text-zinc-400 group-hover:text-white group-hover:border-[#ccff00] transition-all font-mono">
                {count}
            </div>
        </div>
    </div>
);