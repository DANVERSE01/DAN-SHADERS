import React, { useRef } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshTransmissionMaterial, Sparkles, CameraShake, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowDown } from 'lucide-react';

// --- TYPE DEFINITIONS FOR R3F ELEMENTS ---
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

// --- 3D SCENE COMPONENTS ---

const AlchemyCore = () => {
    const meshRef = useRef<THREE.Group>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        // Organic rotation
        meshRef.current.rotation.y = t * 0.1;
        meshRef.current.rotation.z = t * 0.05;
        
        // Pulsing light
        if(lightRef.current) {
            lightRef.current.intensity = 2 + Math.sin(t * 2) * 0.5;
        }
    });

    return (
        <group ref={meshRef}>
            {/* The Liquid Inner Core */}
            <mesh scale={0.8}>
                <sphereGeometry args={[1, 32, 32]} />
                <MeshDistortMaterial 
                    color="#ccff00" 
                    envMapIntensity={1} 
                    clearcoat={1} 
                    clearcoatRoughness={0} 
                    metalness={0.1} 
                    distort={0.4} 
                    speed={2} 
                />
            </mesh>

            {/* The Crystalline Shell */}
            <mesh scale={1.4}>
                <icosahedronGeometry args={[1, 4]} />
                {/* OPTIMIZED MATERIAL: Reduced samples and resolution for performance */}
                <MeshTransmissionMaterial 
                    backside
                    samples={4} 
                    resolution={512}
                    thickness={0.5}
                    roughness={0}
                    anisotropy={0.5}
                    chromaticAberration={0.06}
                    color="#e2e8f0"
                    transmission={1}
                    ior={1.5}
                />
            </mesh>
            
            {/* Inner Light Source */}
            <pointLight ref={lightRef} color="#ccff00" distance={10} decay={2} />
        </group>
    );
};

const Scene = () => {
    return (
        <>
            <Environment preset="city" />
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="purple" />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <AlchemyCore />
            </Float>

            <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.5} color="#ccff00" />
            
            <CameraShake 
                maxYaw={0.02} 
                maxPitch={0.02} 
                maxRoll={0.02} 
                yawFrequency={0.1} 
                pitchFrequency={0.1} 
                rollFrequency={0.1} 
                intensity={0.5} 
                decay={false} 
            />
        </>
    );
};

// --- MAIN COMPONENT ---

export const Hero: React.FC = () => {
  return (
    <section className="h-screen w-full relative overflow-hidden bg-[#050505]">
        
        {/* 3D Canvas Background - Full Immersion */}
        <div className="absolute inset-0 z-0">
             <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: false }}>
                 <Scene />
             </Canvas>
        </div>

        {/* Overlay Vignette for Focus */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_90%)]"></div>

        {/* Main Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            
            <h1 className="animate-on-scroll relative text-[13vw] leading-[0.85] font-bold text-white tracking-tighter font-manrope mix-blend-difference mb-8 select-none">
                VISUAL
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 filter drop-shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
                    ALCHEMY
                </span>
            </h1>

            <div className="animate-on-scroll flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mt-12 border-t border-white/5 pt-10 pointer-events-auto">
                <p className="text-zinc-400 font-geist text-lg max-w-md text-left leading-relaxed drop-shadow-md">
                    We engineer digital realities. Merging high-end aesthetics with bleeding-edge WebGL to define the next era of the web.
                </p>
                
                <div className="mt-8 md:mt-0 flex gap-16 backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/5">
                     <div className="flex flex-col text-left">
                         <span className="text-[#ccff00] font-bold text-4xl font-manrope">80+</span>
                         <span className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">Intl. Awards</span>
                     </div>
                     <div className="flex flex-col text-left">
                         <span className="text-white font-bold text-4xl font-manrope">Global</span>
                         <span className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">Operations</span>
                     </div>
                </div>
            </div>
        </div>

        {/* Scroll Indicator Removed */}
    </section>
  );
};