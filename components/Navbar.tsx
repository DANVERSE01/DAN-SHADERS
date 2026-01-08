import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeWidget: string | null;
  onOpenWidget: (widget: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeWidget, onOpenWidget }) => {
  const menuItems = ['Work', 'Expertise', 'Studio', 'Insights'];

  return (
    <div className="fixed flex w-full z-50 pt-8 px-6 top-0 left-0 justify-center">
        <nav className="flex w-full max-w-[1400px] items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 mix-blend-difference z-50">
                <div className="w-8 h-8 bg-[#ccff00] rounded-sm flex items-center justify-center font-bold text-black text-xl font-geist tracking-tighter">
                    D
                </div>
                <span className="text-xl font-bold tracking-tight text-white font-manrope">DANVERSE<span className="font-light text-[#ccff00]">.STUDIO</span></span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1 bg-black/50 backdrop-blur-md rounded-full px-2 py-2 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                {menuItems.map((item) => (
                    <button 
                        key={item} 
                        onClick={() => onOpenWidget(activeWidget === item ? '' : item)}
                        className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 font-geist uppercase tracking-wide
                            ${activeWidget === item 
                                ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.4)]' 
                                : 'text-zinc-400 hover:text-white hover:bg-white/10'
                            }
                        `}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4 mix-blend-difference z-50">
                <button className="group flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest hover:text-[#ccff00] transition-colors">
                    Start Project
                    <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </div>
        </nav>
    </div>
  );
};