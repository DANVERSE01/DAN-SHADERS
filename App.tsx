import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Portfolio3D } from './components/Portfolio3D';
import { MobileSuite } from './components/MobileSuite';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { NavWidgets } from './components/NavWidgets';
import { SplineBackground } from './components/SplineBackground';
import { NebulaLayer } from './components/NebulaLayer';

// --- HIGH-FIDELITY "AWWWARDS" AESTHETIC STYLES ---
const GlobalStyles = () => (
  <style>{`
    :root {
      /* Deep Space Backgrounds */
      --bg-main: #020305;
      --bg-elevated: #080C14;
      --bg-card: rgba(15, 23, 42, 0.4);

      /* Typography */
      --text-main: #ECEEF2;
      --text-dim: #94A3B8;
      --text-muted: #64748B;

      /* Accents - Vibrant & Glowing */
      --primary-500: #FF5A2C;
      --primary-600: #E0481D;
      --primary-glow: rgba(255, 90, 44, 0.4);

      /* Borders & Glass */
      --glass-border: rgba(255, 255, 255, 0.08);
      --glass-highlight: rgba(255, 255, 255, 0.05);
      --glass-surface: rgba(5, 7, 13, 0.6);
    }

    /* Smoother Font Rendering */
    body {
      background-color: var(--bg-main);
      color: var(--text-main);
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
      cursor: auto; /* Restored Default Cursor */
    }

    /* Global Noise Overlay for Texture */
    .global-noise {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9998;
      opacity: 0.035;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Manrope', sans-serif;
    }

    /* Premium Glassmorphism Class */
    .glass-panel {
      background: var(--bg-card);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      border: 1px solid var(--glass-border);
      box-shadow: 
        0 20px 40px rgba(0,0,0,0.4),
        inset 0 1px 0 0 rgba(255,255,255,0.05); /* Top Edge Highlight */
      transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    }

    .glass-panel:hover {
      border-color: rgba(255,255,255,0.15);
      box-shadow: 
        0 30px 60px rgba(0,0,0,0.6),
        inset 0 1px 0 0 rgba(255,255,255,0.1);
      transform: translateY(-2px);
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg-main); }
    ::-webkit-scrollbar-thumb { 
        background: #334155; 
        border-radius: 4px; 
    }
    ::-webkit-scrollbar-thumb:hover { background: var(--primary-500); }

    /* Selection Color */
    ::selection {
      background: var(--primary-500);
      color: white;
    }

    /* Animation Utilities */
    .animate-on-scroll { 
        opacity: 0; 
        transform: translateY(20px); 
        filter: blur(10px);
        transition: opacity 1s ease, transform 1s ease, filter 1s ease;
        will-change: opacity, transform, filter;
    }
    .animate-on-scroll.animate { 
        opacity: 1; 
        transform: translateY(0); 
        filter: blur(0px);
    }
  `}</style>
);

const App: React.FC = () => {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleOpenWidget = (widget: string) => {
      setActiveWidget(prev => prev === widget ? null : widget);
  };

  const handleCloseWidget = () => {
      setActiveWidget(null);
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-x-hidden">
      <GlobalStyles />
      
      {/* 0. Texture Overlay */}
      <div className="global-noise"></div>

      {/* 1. Background Layers */}
      <SplineBackground />
      <NebulaLayer />

      {/* 2. WIDGETS OVERLAY */}
      <NavWidgets activeWidget={activeWidget} onClose={handleCloseWidget} />

      {/* 3. Main Content Wrapper */}
      {/* CRITICAL FIX: pointer-events-none allows clicks to pass through this wrapper to the 3D scene in the background */}
      <div 
        className="relative z-10 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none"
        style={{
            transform: activeWidget ? 'scale(0.96) translateY(20px)' : 'scale(1) translateY(0)',
            opacity: activeWidget ? 0.4 : 1,
            filter: activeWidget ? 'blur(12px) grayscale(50%)' : 'blur(0px) grayscale(0%)',
        }}
      >
          {/* Re-enable pointer events for the Navbar */}
          <div className="pointer-events-auto">
            <Navbar activeWidget={activeWidget} onOpenWidget={handleOpenWidget} />
          </div>

          <main className="flex flex-col">
              {/* Hero remains pointer-events-none (handled internally) so clicks hit the Spline robot */}
              <Hero />
              
              {/* Re-enable pointer events for the main content blocks */}
              <div className="bg-[rgba(2,3,5,0.8)] backdrop-blur-xl border-t border-[var(--glass-border)] pointer-events-auto">
                <Features />
                <Portfolio3D />
                <MobileSuite />
                <Testimonials />
                <ContactForm />
                <Footer />
              </div>
          </main>
      </div>
    </div>
  );
};

export default App;