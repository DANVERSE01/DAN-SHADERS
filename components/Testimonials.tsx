import React from 'react';
import { Icon } from '@iconify/react';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="relative z-20 w-full py-40 border-t border-[var(--border-subtle)] overflow-hidden">
        
        {/* Ambient Light */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary-soft)] rounded-full blur-[120px] pointer-events-none opacity-40"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 animate-on-scroll">
                <div>
                    <span className="text-[var(--primary-500)] font-mono text-xs uppercase tracking-widest mb-4 block flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-[var(--primary-500)]"></span>
                        Recognition
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold text-[var(--text-main)] tracking-tighter font-manrope leading-[1]">
                        CHAMPIONS OF<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-dim)] to-[var(--text-muted)]">THE NEW ERA</span>
                    </h2>
                </div>
                <div className="flex flex-col justify-end">
                    <p className="text-xl text-[var(--text-dim)] font-geist leading-relaxed border-l border-[var(--border-subtle)] pl-6">
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
                <h3 className="text-sm font-mono text-[var(--text-dim)] uppercase tracking-widest mb-12 text-center flex items-center justify-center gap-4">
                    <span className="w-12 h-[1px] bg-white/10"></span>
                    Trusted By
                    <span className="w-12 h-[1px] bg-white/10"></span>
                </h3>
                <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                     <Icon icon="simple-icons:nike" className="text-6xl text-[var(--text-main)] hover:text-[var(--primary-500)] transition-colors hover:scale-110 duration-300 hover:drop-shadow-[0_0_15px_var(--primary-soft)]" />
                     <Icon icon="simple-icons:redbull" className="text-6xl text-[var(--text-main)] hover:text-[var(--primary-500)] transition-colors hover:scale-110 duration-300 hover:drop-shadow-[0_0_15px_var(--primary-soft)]" />
                     <Icon icon="simple-icons:sony" className="text-6xl text-[var(--text-main)] hover:text-[var(--primary-500)] transition-colors hover:scale-110 duration-300 hover:drop-shadow-[0_0_15px_var(--primary-soft)]" />
                     <Icon icon="simple-icons:mercedes" className="text-6xl text-[var(--text-main)] hover:text-[var(--primary-500)] transition-colors hover:scale-110 duration-300 hover:drop-shadow-[0_0_15px_var(--primary-soft)]" />
                     <Icon icon="simple-icons:spacex" className="text-6xl text-[var(--text-main)] hover:text-[var(--primary-500)] transition-colors hover:scale-110 duration-300 hover:drop-shadow-[0_0_15px_var(--primary-soft)]" />
                </div>
            </div>

        </div>
    </section>
  );
};

const AwardItem = ({ org, title, count, delay }: any) => (
    <div 
        className="relative group p-8 rounded-2xl glass-panel flex flex-col items-center justify-center text-center animate-on-scroll"
        data-delay={delay}
    >
        {/* Hover Glow */}
        <div className="absolute inset-0 bg-[var(--primary-soft)] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 blur-xl"></div>
        
        <div className="relative z-10 flex flex-col items-center">
            <Star className="text-[var(--text-dim)] mb-4 group-hover:text-[var(--primary-500)] transition-colors group-hover:rotate-180 duration-700" size={24} />
            <h4 className="text-[var(--text-main)] font-bold text-xl mb-1 font-manrope">{org}</h4>
            <p className="text-[var(--text-dim)] text-sm font-geist group-hover:text-[var(--text-main)] transition-colors">{title}</p>
            <div className="mt-6 px-3 py-1 border border-[var(--border-subtle)] rounded-full text-xs text-[var(--text-dim)] group-hover:text-white group-hover:border-[var(--primary-500)] transition-all font-mono">
                {count}
            </div>
        </div>
    </div>
);