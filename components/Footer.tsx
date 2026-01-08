import React from 'react';
import { Icon } from '@iconify/react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#050505] pt-32 pb-12 border-t border-white/5 z-20">
        <div className="w-full max-w-[1400px] mx-auto px-6">
            
            <div className="flex flex-col md:flex-row justify-between items-start mb-24">
                <div className="mb-12 md:mb-0">
                    <h3 className="text-4xl font-bold text-white tracking-tighter font-manrope mb-4">DANVERSE<span className="text-[#ccff00]">.STUDIO</span></h3>
                    <p className="text-zinc-500 text-sm font-mono max-w-xs">
                        Tokyo — New York — London<br/>
                        Creating digital monuments since 2030.
                    </p>
                </div>

                <div className="flex gap-20">
                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest">Sitemap</h4>
                        <a href="#" className="text-zinc-400 hover:text-[#ccff00] transition-colors">Work</a>
                        <a href="#" className="text-zinc-400 hover:text-[#ccff00] transition-colors">Studio</a>
                        <a href="#" className="text-zinc-400 hover:text-[#ccff00] transition-colors">News</a>
                        <a href="#" className="text-zinc-400 hover:text-[#ccff00] transition-colors">Contact</a>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest">Social</h4>
                        <a href="#" className="text-zinc-400 hover:text-[#ccff00] transition-colors">Instagram</a>
                        <a href="#" className="text-zinc-400 hover:text-[#ccff00] transition-colors">Twitter / X</a>
                        <a href="#" className="text-zinc-400 hover:text-[#ccff00] transition-colors">LinkedIn</a>
                        <a href="#" className="text-zinc-400 hover:text-[#ccff00] transition-colors">Behance</a>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">© 2030 DANVERSE STUDIO. All Rights Reserved.</p>
                <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Designed in the Void.</p>
            </div>
        </div>
    </footer>
  );
};