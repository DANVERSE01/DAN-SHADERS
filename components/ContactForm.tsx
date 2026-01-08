import React, { useState } from 'react';
import { ArrowRight, Send, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ContactForm: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopied(email);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="relative z-20 w-full py-40 px-6 overflow-hidden bg-[#050505]" id="contact">
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ccff00]/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-5 gap-20 relative z-10 items-start">
            
            {/* Left Column: Contact Info */}
            <div className="lg:col-span-2 animate-on-scroll sticky top-32">
                <span className="text-[#ccff00] font-mono text-xs uppercase tracking-widest mb-6 block">/ Initialize Contact</span>
                <h2 className="text-6xl md:text-7xl font-bold tracking-tighter font-manrope leading-[0.9] mb-10 text-white">
                    LET'S<br/>
                    SCALE<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600">TOGETHER.</span>
                </h2>
                
                <p className="text-zinc-400 text-lg mb-12 leading-relaxed max-w-md">
                    We are currently accepting new partnerships for Q4. Reach out to discuss AI integration, high-fidelity 3D, or comprehensive digital ecosystems.
                </p>

                <div className="flex flex-col gap-6 border-l-2 border-[#ccff00]/30 pl-8">
                    <div className="group cursor-pointer" onClick={() => handleCopy('danverseai@gmail.com')}>
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 block group-hover:text-[#ccff00] transition-colors">Primary Channel</label>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-white group-hover:text-[#ccff00] transition-colors">danverseai@gmail.com</span>
                            {copied === 'danverseai@gmail.com' ? <Check size={18} className="text-[#ccff00]" /> : <Copy size={18} className="text-zinc-600 group-hover:text-white" />}
                        </div>
                    </div>
                    
                    <div className="group cursor-pointer" onClick={() => handleCopy('danverseai@outlook.com')}>
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 block group-hover:text-[#ccff00] transition-colors">Secondary Channel</label>
                         <div className="flex items-center gap-4">
                            <span className="text-xl font-medium text-zinc-300 group-hover:text-white transition-colors">danverseai@outlook.com</span>
                            {copied === 'danverseai@outlook.com' ? <Check size={16} className="text-[#ccff00]" /> : <Copy size={16} className="text-zinc-600 group-hover:text-white" />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Professional Form */}
            <div className="lg:col-span-3 relative animate-on-scroll delay-200">
                {/* Glass Portal Card */}
                <div className="relative rounded-3xl p-8 md:p-12 border border-white/10 bg-zinc-900/40 backdrop-blur-2xl shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden group">
                    
                    {/* Gloss Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2 group/input">
                                <label className="text-xs font-bold uppercase tracking-widest text-[#ccff00]">Full Name</label>
                                <input type="text" className="w-full border-b border-white/10 py-3 text-lg font-manrope text-white focus:outline-none focus:border-[#ccff00] bg-transparent placeholder:text-white/10 transition-colors" placeholder="Enter your name" />
                            </div>
                            <div className="space-y-2 group/input">
                                <label className="text-xs font-bold uppercase tracking-widest text-[#ccff00]">Email Address</label>
                                <input type="email" className="w-full border-b border-white/10 py-3 text-lg font-manrope text-white focus:outline-none focus:border-[#ccff00] bg-transparent placeholder:text-white/10 transition-colors" placeholder="email@company.com" />
                            </div>
                        </div>

                        <div className="space-y-2 group/input">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#ccff00]">Company / Organization</label>
                            <input type="text" className="w-full border-b border-white/10 py-3 text-lg font-manrope text-white focus:outline-none focus:border-[#ccff00] bg-transparent placeholder:text-white/10 transition-colors" placeholder="Company Name" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Inquiry Type</label>
                                <div className="flex flex-col gap-2">
                                     {['AI Solutions', 'Web Design & Dev', '3D / Motion', 'Branding Strategy'].map(type => (
                                         <label key={type} className="flex items-center gap-3 group/radio cursor-pointer">
                                             <input type="radio" name="type" className="peer sr-only" />
                                             <div className="w-4 h-4 rounded-full border border-zinc-600 peer-checked:border-[#ccff00] peer-checked:bg-[#ccff00] transition-all"></div>
                                             <span className="text-zinc-400 text-sm group-hover/radio:text-white transition-colors">{type}</span>
                                         </label>
                                     ))}
                                </div>
                            </div>

                             <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Project Budget (USD)</label>
                                <div className="flex flex-col gap-2">
                                     {['$1k - $5k', '$5k - $10k', '$10k - $50k', '$50k +'].map(budget => (
                                         <label key={budget} className="flex items-center gap-3 group/radio cursor-pointer">
                                             <input type="radio" name="budget" className="peer sr-only" />
                                             <div className="w-4 h-4 rounded-full border border-zinc-600 peer-checked:border-[#ccff00] peer-checked:bg-[#ccff00] transition-all"></div>
                                             <span className="text-zinc-400 text-sm group-hover/radio:text-white transition-colors">{budget}</span>
                                         </label>
                                     ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 group/input pt-4">
                             <label className="text-xs font-bold uppercase tracking-widest text-[#ccff00]">Project Details</label>
                             <textarea rows={4} className="w-full border-b border-white/10 py-3 text-lg font-manrope text-white focus:outline-none focus:border-[#ccff00] bg-transparent placeholder:text-white/10 transition-colors resize-none" placeholder="Tell us about your vision..."></textarea>
                        </div>

                        <div className="pt-8">
                            <button className="w-full bg-[#ccff00] text-black py-5 text-lg font-bold uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-white transition-all duration-300 group/btn shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] rounded-xl">
                                Submit Request <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </button>
                            <p className="text-center text-zinc-600 text-[10px] mt-4 uppercase tracking-wider">
                                Secure Transmission • 24h Response Time
                            </p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </section>
  );
};