import React from 'react';
import { Icon } from '@iconify/react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[var(--bg-main)] pt-32 pb-12 border-t border-[var(--border-subtle)] z-20">
        <div className="w-full max-w-[1400px] mx-auto px-6">
            
            <div className="flex flex-col md:flex-row justify-between items-start mb-24">
                <div className="mb-12 md:mb-0">
                    <h3 className="text-4xl font-bold text-[var(--text-main)] tracking-tighter font-manrope mb-4">DANVERSE<span className="text-[var(--primary-500)]">.STUDIO</span></h3>
                    <p className="text-[var(--text-dim)] text-sm font-mono max-w-xs leading-relaxed">
                        Global Digital Design House.<br/>
                        Creating digital monuments since 2030.
                    </p>
                </div>

                <div className="flex flex-wrap gap-20">
                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold text-[var(--text-main)] uppercase tracking-widest">Sitemap</h4>
                        <a href="#" className="text-[var(--text-dim)] hover:text-[var(--primary-500)] hover:translate-x-1 transition-all">Work</a>
                        <a href="#" className="text-[var(--text-dim)] hover:text-[var(--primary-500)] hover:translate-x-1 transition-all">Studio</a>
                        <a href="#" className="text-[var(--text-dim)] hover:text-[var(--primary-500)] hover:translate-x-1 transition-all">Insights</a>
                        <a href="#contact" className="text-[var(--text-dim)] hover:text-[var(--primary-500)] hover:translate-x-1 transition-all">Contact</a>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold text-[var(--text-main)] uppercase tracking-widest">Social</h4>
                        <a href="#" className="text-[var(--text-dim)] hover:text-[var(--primary-500)] hover:translate-x-1 transition-all">Instagram</a>
                        <a href="#" className="text-[var(--text-dim)] hover:text-[var(--primary-500)] hover:translate-x-1 transition-all">Twitter / X</a>
                        <a href="#" className="text-[var(--text-dim)] hover:text-[var(--primary-500)] hover:translate-x-1 transition-all">LinkedIn</a>
                        <a href="#" className="text-[var(--text-dim)] hover:text-[var(--primary-500)] hover:translate-x-1 transition-all">Behance</a>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-[10px] text-[var(--text-dim)] font-mono uppercase tracking-widest">© 2030 DANVERSE STUDIO. All Rights Reserved.</p>
                <p className="text-[10px] text-[var(--text-dim)] font-mono uppercase tracking-widest">Designed in the Void.</p>
            </div>
        </div>
    </footer>
  );
};