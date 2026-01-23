import React from 'react';

export const NebulaLayer: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden select-none">
      {/* Deep Atmosphere Base */}
      <div className="absolute inset-0 bg-[var(--bg-main)] opacity-60 mix-blend-multiply" />

      {/* Nebula Cloud A (Primary Drift) */}
      <div className="absolute inset-[-50%] w-[200%] h-[200%] nebula-fog-a opacity-40 mix-blend-screen" 
           style={{ 
             background: 'radial-gradient(circle at 50% 50%, var(--primary-soft), transparent 70%)',
             filter: 'blur(100px)',
           }} 
      />

      {/* Nebula Cloud B (Secondary Drift) */}
      <div className="absolute inset-[-50%] w-[200%] h-[200%] nebula-fog-b opacity-30 mix-blend-screen" 
           style={{ 
             background: 'radial-gradient(circle at 80% 20%, var(--secondary-soft), transparent 60%)',
             filter: 'blur(120px)',
           }} 
      />

      {/* Cinematic Noise Grain */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
           }}
      />

      {/* Soft Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg-main)_120%)] opacity-80" />
    </div>
  );
};