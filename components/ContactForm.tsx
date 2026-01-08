import React from 'react';
import { ArrowRight, Send } from 'lucide-react';

export const ContactForm: React.FC = () => {
  return (
    <section className="relative z-20 w-full py-40 px-6 overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ccff00]/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 relative z-10 items-center">
            
            <div className="animate-on-scroll">
                <h2 className="text-7xl md:text-9xl font-bold tracking-tighter font-manrope leading-[0.8] mb-12 text-white">
                    LET'S<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600">BUILD</span><br/>
                    WORLDS.
                </h2>
                <div className="flex flex-col gap-8 text-lg font-medium border-l-2 border-[#ccff00]/30 pl-8 text-zinc-300">
                    <p>Have a visionary project in mind?</p>
                    <p>We are currently accepting commissions for Q3 2030.</p>
                    <a href="mailto:hello@danverse.studio" className="text-3xl md:text-4xl font-bold text-[#ccff00] hover:text-white transition-colors duration-300">
                        hello@danverse.studio
                    </a>
                </div>
            </div>

            <div className="relative animate-on-scroll delay-200">
                {/* Glass Portal Card */}
                <div className="relative rounded-3xl p-10 md:p-16 border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden group">
                    
                    {/* Gloss Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    <form className="space-y-10 relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2 group/input">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#ccff00]">Your Name</label>
                            <input type="text" className="w-full border-b border-white/20 py-4 text-2xl font-manrope text-white focus:outline-none focus:border-[#ccff00] bg-transparent placeholder:text-white/10 transition-colors" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2 group/input">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#ccff00]">Email Address</label>
                            <input type="email" className="w-full border-b border-white/20 py-4 text-2xl font-manrope text-white focus:outline-none focus:border-[#ccff00] bg-transparent placeholder:text-white/10 transition-colors" placeholder="john@company.com" />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#ccff00]">Project Type</label>
                            <div className="flex flex-wrap gap-3">
                                 {['Branding', 'Website', 'Product', '3D / Motion', 'Other'].map(type => (
                                     <button key={type} className="px-6 py-3 border border-white/10 bg-white/5 rounded-full text-sm font-medium text-white hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] transition-all duration-300 backdrop-blur-md">
                                         {type}
                                     </button>
                                 ))}
                            </div>
                        </div>
                        <div className="pt-8">
                            <button className="w-full bg-[#ccff00] text-black py-6 text-xl font-bold uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-white transition-all duration-300 group/btn shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] rounded-xl">
                                Send Transmission <Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </section>
  );
};