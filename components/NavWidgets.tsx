import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Globe, Cpu, Layers, Zap } from 'lucide-react';

interface NavWidgetsProps {
  activeWidget: string | null;
  onClose: () => void;
}

export const NavWidgets: React.FC<NavWidgetsProps> = ({ activeWidget, onClose }) => {
  const MotionDiv = motion.div as any;

  return (
    <AnimatePresence>
      {activeWidget && (
        <>
          {/* Darker, Blurrrier Backdrop */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[40] bg-[#020305]/60 backdrop-blur-md cursor-pointer"
          />

          {/* Premium Glass Container */}
          <MotionDiv
            initial={{ y: 20, opacity: 0, scale: 0.95, rotateX: 5 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 0.8 }}
            className="fixed top-24 left-0 right-0 z-[45] mx-auto w-full max-w-[1400px] px-4 md:px-6 pointer-events-none perspective-[1000px]"
          >
            <div className="pointer-events-auto relative w-full bg-[rgba(10,15,30,0.85)] backdrop-blur-2xl border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col max-h-[80vh]">
              
              {/* Noise Texture Overlay for that "Premium" feel */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] sticky top-0 z-50">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-[var(--primary-500)] rounded-full animate-pulse shadow-[0_0_10px_var(--primary-500)]"></div>
                   <h2 className="text-xl font-bold text-white uppercase tracking-widest font-manrope">{activeWidget}</h2>
                </div>

                <button 
                    onClick={onClose}
                    className="group flex items-center gap-3 px-5 py-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-white/5 hover:bg-white hover:text-black transition-all duration-300"
                >
                    <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Close</span>
                    <X size={16} />
                </button>
              </div>

              {/* Scrollable Content Area */}
              <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar relative z-10">
                {activeWidget === 'Work' && <WorkWidget />}
                {activeWidget === 'Expertise' && <ExpertiseWidget />}
                {activeWidget === 'Studio' && <StudioWidget />}
                {activeWidget === 'Insights' && <InsightsWidget />}
              </div>
              
              {/* Mobile Footer */}
              <div className="md:hidden border-t border-white/5 p-4 bg-black/20 backdrop-blur-md">
                  <button onClick={onClose} className="w-full py-3 bg-white/5 border border-white/10 rounded-lg text-white/70 uppercase text-xs font-bold tracking-widest hover:bg-[var(--primary-500)] hover:text-white transition-colors">
                      Return
                  </button>
              </div>

            </div>
          </MotionDiv>
        </>
      )}
    </AnimatePresence>
  );
};

// --- WIDGET CONTENT COMPONENTS (Styled for High Contrast) ---

const WorkWidget = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="col-span-1">
      <h3 className="text-[var(--primary-500)] font-mono text-xs uppercase tracking-widest mb-4">Latest Case Studies</h3>
      <h2 className="text-4xl font-manrope font-bold text-white mb-6">Defining the<br />Digital Frontier.</h2>
      <p className="text-[var(--text-dim)] font-geist text-sm leading-relaxed mb-8">
        Explore our curated selection of award-winning projects that merge art, technology, and utility.
      </p>
      <button className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest hover:text-[var(--primary-500)] transition-colors group">
        View Full Archive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
    
    <div className="col-span-2 grid grid-cols-2 gap-4">
       {['Neon Genesis', 'Cyber Vogue', 'Orbital Finance', 'Tesla Neuro'].map((item, i) => (
         <div key={i} className="group relative h-48 bg-black/40 border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-[var(--primary-500)] transition-colors duration-500">
            {/* Image Placeholder Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-white/5 opacity-50"></div>
            <div className="absolute bottom-6 left-6 z-10">
               <span className="text-[var(--primary-500)] text-[10px] font-mono mb-2 block tracking-widest">202{4-i} / WEBGL</span>
               <h4 className="text-white text-xl font-bold group-hover:translate-x-2 transition-transform duration-300">{item}</h4>
            </div>
         </div>
       ))}
    </div>
  </div>
);

const ExpertiseWidget = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    <div className="col-span-1 md:border-r border-white/5 pr-8">
       <h3 className="text-2xl font-manrope font-bold text-white mb-2">Capabilities</h3>
       <p className="text-[var(--text-dim)] text-sm font-geist">Our technical stack allows us to build anything from simple sites to complex simulations.</p>
    </div>
    
    {[
      { icon: <Globe size={20} />, title: "Web Experience", items: ["Creative Frontend", "WebGL / Three.js", "React Architecture", "Headless CMS"] },
      { icon: <Cpu size={20} />, title: "Product Design", items: ["UI / UX Systems", "Prototyping", "Design Ops", "User Research"] },
      { icon: <Layers size={20} />, title: "Motion & 3D", items: ["Cinema 4D / Redshift", "Houdini FX", "After Effects", "R3F Interactions"] }
    ].map((cat, i) => (
      <div key={i} className="col-span-1">
        <div className="flex items-center gap-3 mb-6 text-[var(--primary-500)]">
          {cat.icon}
          <h4 className="font-bold text-sm uppercase tracking-wide">{cat.title}</h4>
        </div>
        <ul className="space-y-4">
          {cat.items.map((item) => (
            <li key={item} className="text-[var(--text-dim)] text-sm hover:text-white transition-colors cursor-default flex items-center gap-3 group">
              <span className="w-1 h-1 bg-[var(--text-dim)] rounded-full group-hover:bg-[var(--primary-500)] transition-colors" />
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
       <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/5 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-500)]/10 to-[var(--secondary-500)]/10" />
          <div className="absolute inset-0 flex items-center justify-center">
             <h3 className="text-6xl font-bold text-white/5 font-manrope tracking-tighter">DANVERSE</h3>
          </div>
       </div>
    </div>
    <div className="w-full md:w-1/2 flex flex-col justify-center">
       <h3 className="text-[var(--primary-500)] font-mono text-xs uppercase tracking-widest mb-4">The Philosophy</h3>
       <h2 className="text-3xl font-manrope font-bold text-white mb-6">We don't just build websites.<br/>We terraform the web.</h2>
       <p className="text-[var(--text-dim)] font-geist leading-relaxed mb-6">
         Founded in 2030, Danverse Studio is a collective of digital architects, code poets, and visual futurists. We believe the screen is a canvas for infinite possibility.
       </p>
       <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
          <div>
            <span className="block text-2xl font-bold text-white">45+</span>
            <span className="text-xs text-[var(--text-dim)] uppercase">Experts</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-white">3</span>
            <span className="text-xs text-[var(--text-dim)] uppercase">Continents</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-white">∞</span>
            <span className="text-xs text-[var(--text-dim)] uppercase">Possibilities</span>
          </div>
       </div>
    </div>
  </div>
);

const InsightsWidget = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
     <div className="col-span-1">
        <h3 className="text-2xl font-manrope font-bold text-white mb-4">Signal & Noise</h3>
        <p className="text-[var(--text-dim)] text-sm font-geist mb-8">
          Thoughts on the future of technology, design, and the human experience in the digital age.
        </p>
        <div className="bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-600)] p-8 rounded-xl shadow-[0_10px_30px_rgba(255,90,44,0.3)]">
           <span className="text-white font-mono text-xs font-bold uppercase mb-2 block opacity-70">Featured</span>
           <h4 className="text-white font-bold text-xl leading-tight mb-6">Why WebGPU is the death of loading screens.</h4>
           <button className="text-white text-xs font-bold uppercase border-b border-white/50 pb-1 hover:border-white transition-colors">Read Article</button>
        </div>
     </div>
     <div className="col-span-2 space-y-6">
        {[
          { date: "Oct 12, 2030", title: "The Ethics of AI-Generated Interfaces", cat: "Technology" },
          { date: "Sep 28, 2030", title: "Designing for the Apple Vision Pro 4", cat: "Spatial Computing" },
          { date: "Sep 15, 2030", title: "Minimalism is dead. Long live Maximalism.", cat: "Design Theory" },
        ].map((article, i) => (
           <div key={i} className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-6 hover:border-[var(--primary-500)] transition-colors">
              <div>
                 <div className="flex items-center gap-3 mb-2">
                    <span className="text-[var(--primary-500)] text-xs font-mono">{article.date}</span>
                    <span className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] text-[var(--text-dim)] uppercase">{article.cat}</span>
                 </div>
                 <h4 className="text-lg text-white font-medium group-hover:text-[var(--primary-500)] transition-colors">{article.title}</h4>
              </div>
              <ArrowRight size={18} className="text-[var(--text-dim)] group-hover:text-[var(--primary-500)] group-hover:translate-x-2 transition-all" />
           </div>
        ))}
     </div>
  </div>
);