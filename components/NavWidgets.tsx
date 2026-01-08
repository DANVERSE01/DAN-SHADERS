import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Globe, Cpu, Layers, Zap } from 'lucide-react';
import { Icon } from '@iconify/react';

interface NavWidgetsProps {
  activeWidget: string | null;
  onClose: () => void;
}

export const NavWidgets: React.FC<NavWidgetsProps> = ({ activeWidget, onClose }) => {
  return (
    <AnimatePresence>
      {activeWidget && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[40] bg-black/60 backdrop-blur-sm"
          />

          {/* Widget Container */}
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed top-24 left-0 right-0 z-[45] mx-auto w-full max-w-[1400px] px-6 pointer-events-none"
          >
            <div className="pointer-events-auto relative w-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              
              {/* Decorative header line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ccff00] to-transparent opacity-50" />

              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors z-50"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12 min-h-[400px] max-h-[70vh] overflow-y-auto custom-scrollbar">
                {activeWidget === 'Work' && <WorkWidget />}
                {activeWidget === 'Expertise' && <ExpertiseWidget />}
                {activeWidget === 'Studio' && <StudioWidget />}
                {activeWidget === 'Insights' && <InsightsWidget />}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- WIDGET CONTENT COMPONENTS ---

const WorkWidget = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="col-span-1">
      <h3 className="text-[#ccff00] font-mono text-xs uppercase tracking-widest mb-4">Latest Case Studies</h3>
      <h2 className="text-4xl font-manrope font-bold text-white mb-6">Defining the<br />Digital Frontier.</h2>
      <p className="text-zinc-400 font-geist text-sm leading-relaxed mb-8">
        Explore our curated selection of award-winning projects that merge art, technology, and utility.
      </p>
      <button className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest hover:text-[#ccff00] transition-colors group">
        View Full Archive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
    
    <div className="col-span-2 grid grid-cols-2 gap-4">
       {['Neon Genesis', 'Cyber Vogue', 'Orbital Finance', 'Tesla Neuro'].map((item, i) => (
         <div key={i} className="group relative h-40 bg-zinc-900/50 border border-white/5 rounded-lg overflow-hidden cursor-pointer hover:border-[#ccff00]/50 transition-colors">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
               <span className="text-[#ccff00] text-xs font-mono mb-1 block">202{4-i}</span>
               <h4 className="text-white font-bold group-hover:translate-x-1 transition-transform">{item}</h4>
            </div>
         </div>
       ))}
    </div>
  </div>
);

const ExpertiseWidget = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    <div className="col-span-1 md:border-r border-white/10 pr-8">
       <h3 className="text-2xl font-manrope font-bold text-white mb-2">Capabilities</h3>
       <p className="text-zinc-500 text-sm font-geist">Our technical stack allows us to build anything from simple sites to complex simulations.</p>
    </div>
    
    {[
      { icon: <Globe size={20} />, title: "Web Experience", items: ["Creative Frontend", "WebGL / Three.js", "React Architecture", "Headless CMS"] },
      { icon: <Cpu size={20} />, title: "Product Design", items: ["UI / UX Systems", "Prototyping", "Design Ops", "User Research"] },
      { icon: <Layers size={20} />, title: "Motion & 3D", items: ["Cinema 4D / Redshift", "Houdini FX", "After Effects", "R3F Interactions"] }
    ].map((cat, i) => (
      <div key={i} className="col-span-1">
        <div className="flex items-center gap-3 mb-6 text-[#ccff00]">
          {cat.icon}
          <h4 className="font-bold text-sm uppercase tracking-wide">{cat.title}</h4>
        </div>
        <ul className="space-y-3">
          {cat.items.map((item) => (
            <li key={item} className="text-zinc-400 text-sm hover:text-white transition-colors cursor-default flex items-center gap-2">
              <span className="w-1 h-1 bg-zinc-600 rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const StudioWidget = () => (
  <div className="flex flex-col md:flex-row gap-12">
    <div className="w-full md:w-1/2">
       <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800 border border-white/10 mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ccff00]/20 to-purple-900/20 mix-blend-overlay" />
          <div className="absolute inset-0 flex items-center justify-center">
             <h3 className="text-6xl font-bold text-white/10 font-manrope tracking-tighter">DANVERSE</h3>
          </div>
       </div>
    </div>
    <div className="w-full md:w-1/2 flex flex-col justify-center">
       <h3 className="text-[#ccff00] font-mono text-xs uppercase tracking-widest mb-4">The Philosophy</h3>
       <h2 className="text-3xl font-manrope font-bold text-white mb-6">We don't just build websites.<br/>We terraform the web.</h2>
       <p className="text-zinc-400 font-geist leading-relaxed mb-6">
         Founded in 2030, Danverse Studio is a collective of digital architects, code poets, and visual futurists. We believe the screen is a canvas for infinite possibility.
       </p>
       <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
          <div>
            <span className="block text-2xl font-bold text-white">45+</span>
            <span className="text-xs text-zinc-500 uppercase">Experts</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-white">3</span>
            <span className="text-xs text-zinc-500 uppercase">Continents</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-white">∞</span>
            <span className="text-xs text-zinc-500 uppercase">Possibilities</span>
          </div>
       </div>
    </div>
  </div>
);

const InsightsWidget = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
     <div className="col-span-1">
        <h3 className="text-2xl font-manrope font-bold text-white mb-4">Signal & Noise</h3>
        <p className="text-zinc-400 text-sm font-geist mb-8">
          Thoughts on the future of technology, design, and the human experience in the digital age.
        </p>
        <div className="bg-[#ccff00] p-6 rounded-xl">
           <span className="text-black font-mono text-xs font-bold uppercase mb-2 block">Featured</span>
           <h4 className="text-black font-bold text-xl leading-tight mb-4">Why WebGPU is the death of loading screens.</h4>
           <button className="text-black text-xs font-bold uppercase border-b border-black pb-1">Read Article</button>
        </div>
     </div>
     <div className="col-span-2 space-y-6">
        {[
          { date: "Oct 12, 2030", title: "The Ethics of AI-Generated Interfaces", cat: "Technology" },
          { date: "Sep 28, 2030", title: "Designing for the Apple Vision Pro 4", cat: "Spatial Computing" },
          { date: "Sep 15, 2030", title: "Minimalism is dead. Long live Maximalism.", cat: "Design Theory" },
        ].map((article, i) => (
           <div key={i} className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-6 hover:border-[#ccff00]/30 transition-colors">
              <div>
                 <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#ccff00] text-xs font-mono">{article.date}</span>
                    <span className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] text-zinc-300 uppercase">{article.cat}</span>
                 </div>
                 <h4 className="text-lg text-white font-medium group-hover:text-[#ccff00] transition-colors">{article.title}</h4>
              </div>
              <ArrowRight size={18} className="text-zinc-600 group-hover:text-[#ccff00] group-hover:translate-x-2 transition-all" />
           </div>
        ))}
     </div>
  </div>
);
