import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeWidget: string | null;
  onOpenWidget: (widget: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeWidget, onOpenWidget }) => {
  const menuItems = ['Work', 'Expertise', 'Studio', 'Insights'];

  return (
    <div className="fixed flex w-full z-50 pt-8 px-6 top-0 left-0 justify-center pointer-events-none">
        <nav className="flex w-full max-w-[1400px] items-center justify-between pointer-events-auto">
            {/* Logo */}
            <div className="flex items-center gap-2 z-50 cursor-pointer group">
                <div className="w-8 h-8 bg-[var(--primary-500)] rounded-sm flex items-center justify-center font-bold text-white text-xl font-geist tracking-tighter shadow-[0_0_15px_var(--primary-soft)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    D
                </div>
                <span className="text-xl font-bold tracking-tight text-[var(--text-main)] font-manrope group-hover:text-white transition-colors">DANVERSE<span className="font-light text-[var(--primary-500)] group-hover:text-white transition-colors">.STUDIO</span></span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1 bg-[var(--bg-elevated)]/60 backdrop-blur-md rounded-full px-2 py-2 border border-[var(--border-subtle)] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                {menuItems.map((item) => (
                    <button 
                        key={item} 
                        onClick={() => onOpenWidget(activeWidget === item ? '' : item)}
                        className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 font-geist uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-500)]
                            ${activeWidget === item 
                                ? 'bg-[var(--primary-500)] text-white shadow-[0_0_15px_var(--primary-soft)] scale-105' 
                                : 'text-[var(--text-dim)] hover:text-white hover:bg-[var(--bg-card)] hover:shadow-lg'
                            }
                        `}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4 z-50">
                <button className="group flex items-center gap-2 text-sm font-bold text-[var(--text-main)] uppercase tracking-widest hover:text-[var(--primary-500)] transition-colors focus-visible:outline-none focus-visible:underline">
                    Start Project
                    <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </div>
        </nav>
    </div>
  );
};