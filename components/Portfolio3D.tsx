import React, { useState, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Html, Float, Environment, useCursor, Sparkles, shaderMaterial } from '@react-three/drei';
import { ArrowRight, X, Cpu, ChevronLeft, ChevronRight, Target, Code2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// --- CRITICAL FIX: Global Type Definition for Custom Shader Material ---
declare global {
  namespace JSX {
    interface IntrinsicElements {
      stellarMaterial: any;
    }
  }
}

// Global cast for motion to bypass strict type checking issues
const Motion = motion as any;

// --- OPTIMIZED SHADERS ---

// 1. FAST Stellar Background (Gradient Only)
const StellarMaterial = shaderMaterial(
  {
    uColorStart: new THREE.Color('#05070D'),
    uColorEnd: new THREE.Color('#0B1020'),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    varying vec2 vUv;

    void main() {
      float dist = distance(vUv, vec2(0.5));
      vec3 color = mix(uColorStart, uColorEnd, dist * 1.5);
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ StellarMaterial });

// --- DATA LAYER ---
const ecosystemNodes = [
    {
        id: 1,
        title: "DANVERSE OS",
        client: "Internal R&D",
        year: "2031",
        category: "Kernel Architecture",
        description: "The proprietary spatial operating system powering our entire infrastructure. Designed to bridge the gap between web-based rendering and native hardware performance.",
        goals: "Create a hardware-agnostic OS that runs entirely in the browser via WebAssembly, removing the need for local installation while maintaining 120fps fidelity.",
        technologies: ["Rust (Kernel)", "WebAssembly", "WebGPU", "React Fiber"],
        tags: ["Core", "Rust", "Neural UI"],
        color: "#FF6B3D"
    },
    {
        id: 2,
        title: "AERO SIM",
        client: "Tesla Aerospace",
        year: "2030",
        category: "Physics Engine",
        description: "Real-time airflow simulation visualization for next-gen VTOL aircraft. Allows engineers to visualize drag coefficients and thermal loads in real-time.",
        goals: "Democratize access to high-fidelity CFD (Computational Fluid Dynamics) simulations by offloading compute to the GPU cluster.",
        technologies: ["Compute Shaders", "C++", "Three.js", "TensorFlow.js"],
        tags: ["WebGPU", "Physics", "Compute"],
        color: "#1F9AC8"
    },
    {
        id: 3,
        title: "SYNTH DEFI",
        client: "Liquidity DAO",
        year: "2030",
        category: "FinTech Visualization",
        description: "Visualizing complex liquidity pools as organic, breathing organisms. This interface turns abstract financial data into intuitive biological metaphors.",
        goals: "Reduce user error in high-value transactions by providing a visual feedback loop that represents market volatility as organic movement.",
        technologies: ["D3.js", "WebGL", "Solidity", "Ethers.js"],
        tags: ["D3.js", "WebGL", "Finance"],
        color: "#A5B4FC"
    },
    {
        id: 4,
        title: "ARCHIVE 99",
        client: "Museum of Future",
        year: "2029",
        category: "Digital Preservation",
        description: "Preserving the history of the early internet in a procedurally generated 3D city library where every building represents a decade of data.",
        goals: "Create an immutable, visually navigable archive of the pre-AI internet era using decentralized storage protocols.",
        technologies: ["IPFS", "Next.js", "GLSL Custom Shaders", "Procedural Gen"],
        tags: ["ProcGen", "React", "3D"],
        color: "#E8582C"
    },
    {
        id: 5,
        title: "VOGUE META",
        client: "Condé Nast",
        year: "2029",
        category: "Digital Fashion",
        description: "The premier digital fashion week experience with real-time cloth simulation, allowing users to try on digital couture in AR.",
        goals: "Achieve photorealistic fabric physics in a mobile browser environment without compromising battery life.",
        technologies: ["Unreal Engine 5", "Pixel Streaming", "WebXR", "Cloth.js"],
        tags: ["Unreal", "Pixel Stream"],
        color: "#F8FAFC"
    }
];

const tagDescriptions: Record<string, string> = {
    "Core": "Fundamental system kernel operations and low-level logic.",
    "Rust": "High-performance, memory-safe systems programming language.",
    "Neural UI": "Interface adapted by real-time user neural feedback patterns.",
    "WebGPU": "Next-generation graphics API for high-performance web rendering.",
    "Physics": "Real-time rigid body, soft body, and fluid simulations."
};

// --- SUB COMPONENTS ---

const Tag: React.FC<{ text: string }> = ({ text }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div 
            className="relative inline-block"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <span 
                className="px-3 py-1 border border-white/10 bg-[var(--bg-elevated)] text-xs text-[var(--text-dim)] uppercase tracking-wider rounded-full cursor-help hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 block"
            >
                {text}
            </span>
        </div>
    );
};

const ModalParticles = ({ color }: { color: string }) => {
    const particles = useMemo(() => {
        return Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 15 + 15,
            delay: Math.random() * -30,
            opacity: Math.random() * 0.3 + 0.1
        }));
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
             <style>{`
                @keyframes particle-drift {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    20% { opacity: var(--p-opacity); }
                    80% { opacity: var(--p-opacity); }
                    100% { transform: translateY(-60px) translateX(20px); opacity: 0; }
                }
            `}</style>
            {particles.map((p) => (
                <div 
                    key={p.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        boxShadow: `0 0 ${p.size * 2}px ${color}`,
                        animation: `particle-drift ${p.duration}s linear infinite`,
                        animationDelay: `${p.delay}s`,
                        // @ts-ignore
                        '--p-opacity': p.opacity
                    }}
                />
            ))}
        </div>
    );
};

// --- 3D COMPONENTS ---

const StellarBackground = () => {
    return (
        <mesh scale={[100, 100, 100]}>
            <sphereGeometry args={[1, 16, 16]} />
            {/* @ts-ignore */}
            <stellarMaterial side={THREE.BackSide} />
        </mesh>
    );
}

const LiquidCore = ({ color, isActive }: { color: string, isActive: boolean }) => {
    return (
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.65, 32, 32]} />
            <meshPhysicalMaterial
                color={color}
                roughness={0.2}
                metalness={0.1}
                transparent={true}
                opacity={0.8}
                clearcoat={1}
                emissive={color}
                emissiveIntensity={0.2}
            />
        </mesh>
    );
};

const Card = ({ project, index, activeIndex, setActiveIndex, setSelectedProject, count, radius, animatingId, setAnimatingId }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    
    // Smooth Animation Refs
    const clickRotation = useRef(0);
    const targetRotation = useRef(0); 
    const particlesSettled = useRef(true);

    // Particles State
    const particlesRef = useRef<THREE.Points>(null);
    const hoverPoint = useRef<THREE.Vector3 | null>(null);

    const { positions, originalPositions } = useMemo(() => {
        const particleCount = 24; // REDUCED FROM 48 FOR PERFORMANCE
        const pos = new Float32Array(particleCount * 3);
        const orig = new Float32Array(particleCount * 3);
        
        for(let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 2.2;
            const y = (Math.random() - 0.5) * 3.2;
            const z = 0.22;
            pos[i*3] = x;
            pos[i*3+1] = y;
            pos[i*3+2] = z;
            orig[i*3] = x;
            orig[i*3+1] = y;
            orig[i*3+2] = z;
        }
        return { positions: pos, originalPositions: orig };
    }, []);

    useCursor(hovered);

    const angle = (index / count) * Math.PI * 2;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    
    const normalizedActiveIndex = ((activeIndex % count) + count) % count;
    const isActive = index === normalizedActiveIndex;

    const isGlobalAnimating = animatingId !== null;
    const isThisAnimating = animatingId === project.id;

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.1;
        clickRotation.current = THREE.MathUtils.lerp(clickRotation.current, targetRotation.current, delta * 4);
        meshRef.current.rotation.y = angle + Math.PI + clickRotation.current;

        let targetScale = 1;
        let targetZ = 0;

        if (isThisAnimating) {
            targetScale = 1.8;
            targetZ = -2.0;
        } else if (isGlobalAnimating) {
            targetScale = 0.5;
            targetZ = 0;
        } else if (isActive || hovered) {
            targetScale = 1.15; 
        }
        
        const lerpSpeed = isThisAnimating ? 3 * delta : 8 * delta;
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, lerpSpeed));
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, lerpSpeed);

        // Particle logic (simplified for performance/smoothness)
        if (particlesRef.current) {
            if (particlesSettled.current && !hoverPoint.current) return;

            const currentPos = particlesRef.current.geometry.attributes.position.array as Float32Array;
            const count = currentPos.length / 3;
            let maxDisplacement = 0;
            const interactionRadiusSq = 1.44; // 1.2 * 1.2

            for(let i = 0; i < count; i++) {
                const ix = i * 3;
                const ox = originalPositions[ix];
                const oy = originalPositions[ix+1];
                const oz = originalPositions[ix+2];
                
                let tx = ox, ty = oy, tz = oz;

                if (hoverPoint.current) {
                    const dx = ox - hoverPoint.current.x;
                    const dy = oy - hoverPoint.current.y;
                    const distSq = dx * dx + dy * dy;
                    
                    if (distSq < interactionRadiusSq) {
                        const dist = Math.sqrt(distSq);
                        const force = (1.2 - dist) * 2.0; 
                        tx += (dx / dist) * force;
                        ty += (dy / dist) * force;
                        tz += 0.5;
                    }
                }
                
                const factor = delta * 6;
                const dx = (tx - currentPos[ix]) * factor;
                const dy = (ty - currentPos[ix+1]) * factor;
                const dz = (tz - currentPos[ix+2]) * factor;

                currentPos[ix] += dx;
                currentPos[ix+1] += dy;
                currentPos[ix+2] += dz;

                maxDisplacement = Math.max(maxDisplacement, Math.abs(dx));
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
            if (!hoverPoint.current && maxDisplacement < 0.001) particlesSettled.current = true;
        }
    });

    const handleClick = (e: any) => {
        e.stopPropagation();
        if (isActive) {
            targetRotation.current += Math.PI * 2;
            setAnimatingId(project.id);
            setTimeout(() => {
                setSelectedProject(project);
                setAnimatingId(null);
            }, 800);
        } else {
            const currentMod = ((activeIndex % count) + count) % count;
            let diff = index - currentMod;
            if (diff > count / 2) diff -= count;
            if (diff < -count / 2) diff += count;
            setActiveIndex(activeIndex + diff);
        }
    };

    return (
        <group position={[x, 0, z]}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <LiquidCore color={project.color} isActive={isActive || hovered || isThisAnimating} />
                <mesh 
                    ref={meshRef}
                    onClick={handleClick}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => { setHover(false); hoverPoint.current = null; }}
                    onPointerMove={(e) => { e.stopPropagation(); particlesSettled.current = false; if (meshRef.current) hoverPoint.current = meshRef.current.worldToLocal(e.point.clone()); }}
                >
                    <boxGeometry args={[2.5, 3.5, 0.4]} /> 
                    <meshPhysicalMaterial 
                        color={isActive ? "#ffffff" : "#f0f0f0"}
                        roughness={0.1}
                        metalness={0.1}
                        ior={isActive || hovered || isThisAnimating ? 1.6 : 1.4}
                        transmission={0}
                        transparent={true}
                        opacity={0.2}
                        clearcoat={1}
                        emissive={project.color}
                        emissiveIntensity={isThisAnimating ? 0.5 : (isActive ? 0.1 : 0)}
                    />
                    <points ref={particlesRef}>
                        <bufferGeometry>
                            <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
                        </bufferGeometry>
                        <pointsMaterial size={0.04} color={project.color} transparent opacity={0.6} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
                    </points>
                    <Html transform occlude={false} position={[0, 0, 0.21]} style={{ width: '250px', height: '350px', pointerEvents: 'none' }}>
                        <div className={`w-full h-full p-4 flex flex-col justify-between transition-opacity duration-500 ${isActive || hovered ? 'opacity-100' : 'opacity-60'}`}>
                            <div className="flex justify-between items-start">
                                <span className="font-mono text-[10px] text-white/70">0{project.id}</span>
                                <Cpu size={12} className={isActive ? 'text-[var(--primary-500)]' : 'text-white/40'} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white font-manrope leading-none mb-1 drop-shadow-lg">{project.title}</h3>
                                <p className="text-[10px] text-[var(--text-dim)] font-mono uppercase tracking-widest">{project.client}</p>
                            </div>
                        </div>
                    </Html>
                </mesh>
            </Float>
        </group>
    );
};

// ... Rest of component remains same (CarouselRig, Main Export) ... 
const CarouselRig = ({ children, activeIndex, count }: any) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (!groupRef.current) return;
        const targetRotation = -(activeIndex / count) * Math.PI * 2;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, 5 * delta);
    });
    return <group ref={groupRef}>{children}</group>;
};

// --- MAIN REACT COMPONENT ---
// Re-using the same variants and export structure as before to ensure compatibility
const modalContainerVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } },
    exit: { opacity: 0 }
};

const modalContentVariants: any = {
    hidden: { opacity: 0, x: 40, filter: "blur(10px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100 } },
    exit: { opacity: 0, x: 40 }
};

export const Portfolio3D = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [animatingId, setAnimatingId] = useState<number | null>(null);

    return (
        <section className="relative z-20 w-full h-[100vh] bg-[var(--bg-main)] overflow-hidden border-t border-[var(--glass-border)] group">
             {/* Header */}
            <div className="absolute top-10 left-0 w-full text-center px-6 z-30 pointer-events-none">
                <span className="text-[var(--primary-500)] font-mono text-xs uppercase tracking-[0.3em] block mb-4">/ Interactive Showcase</span>
                <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-main)] tracking-tighter font-manrope">
                    PROJECT <span className="text-[var(--text-dim)]">ARCHIVE</span>
                </h2>
            </div>

            <div className="absolute inset-0 z-10">
                <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                    <fog attach="fog" args={['#05070D', 5, 25]} />
                    <StellarBackground />
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF6B3D" />
                    <Sparkles count={50} scale={12} size={2} speed={0.2} opacity={0.5} color="#FF6B3D" />
                    <CarouselRig activeIndex={activeIndex} count={ecosystemNodes.length}>
                        {ecosystemNodes.map((project, index) => (
                            <Card 
                                key={project.id} project={project} index={index}
                                activeIndex={activeIndex} setActiveIndex={setActiveIndex}
                                setSelectedProject={setSelectedProject} animatingId={animatingId}
                                setAnimatingId={setAnimatingId} count={ecosystemNodes.length} radius={4} 
                            />
                        ))}
                    </CarouselRig>
                </Canvas>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-0 left-0 h-full w-32 z-30 flex items-center justify-start pl-8 pointer-events-none group-hover:pointer-events-auto">
                 <button onClick={() => setActiveIndex(prev => prev - 1)} className="w-16 h-16 rounded-full border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-md flex items-center justify-center opacity-0 -translate-x-10 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:text-black">
                    <ChevronLeft size={32} />
                </button>
            </div>
            <div className="absolute top-0 right-0 h-full w-32 z-30 flex items-center justify-end pr-8 pointer-events-none group-hover:pointer-events-auto">
                 <button onClick={() => setActiveIndex(prev => prev + 1)} className="w-16 h-16 rounded-full border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-md flex items-center justify-center opacity-0 translate-x-10 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:text-black">
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedProject(null)}></div>
                        <Motion.div variants={modalContainerVariants} initial="hidden" animate="visible" exit="exit" className="relative w-full max-w-6xl h-[85vh] flex flex-col md:flex-row shadow-2xl bg-[#080C14] border border-[var(--glass-border)] overflow-hidden rounded-2xl">
                             <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-[60] p-2 hover:bg-white hover:text-black rounded-full text-white transition-all border border-white/10"><X size={24} /></button>
                             
                             {/* Left Side: Large Visuals */}
                             <div className="w-full md:w-2/3 relative z-10 flex flex-col justify-end p-12 bg-gradient-to-tr from-[#05070D] to-[#0F172A]">
                                 <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter font-manrope mb-4 leading-tight">{selectedProject.title}</h1>
                                 <ModalParticles color={selectedProject.color} />
                             </div>
                             
                             {/* Right Side: Detailed Content */}
                             <div className="w-full md:w-1/3 flex flex-col bg-[rgba(255,255,255,0.02)] backdrop-blur-3xl border-l border-[var(--glass-border)]">
                                 
                                 {/* Scrollable Area */}
                                 <div className="flex-1 overflow-y-auto custom-scrollbar p-10">
                                     
                                     <Motion.div variants={modalContentVariants} className="mb-8">
                                         <h2 className="text-2xl font-bold text-white mb-2 font-manrope">{selectedProject.title}</h2>
                                         <p className="text-sm font-mono text-[var(--primary-500)] mb-4">{selectedProject.client} — {selectedProject.year}</p>
                                         <p className="text-[var(--text-dim)] leading-relaxed text-sm font-geist">{selectedProject.description}</p>
                                     </Motion.div>

                                     {/* Project Goals Section */}
                                     <Motion.div variants={modalContentVariants} className="mb-8">
                                         <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                                             <Target size={14} className="text-[var(--primary-500)]" />
                                             <h4 className="text-xs font-bold text-white uppercase tracking-widest">Project Mission</h4>
                                         </div>
                                         <p className="text-sm text-[var(--text-dim)] leading-relaxed italic border-l-2 border-[var(--primary-500)]/30 pl-4">
                                             "{selectedProject.goals}"
                                         </p>
                                     </Motion.div>

                                     {/* Tech Stack Section */}
                                     <Motion.div variants={modalContentVariants} className="mb-8">
                                         <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                                             <Code2 size={14} className="text-[var(--primary-500)]" />
                                             <h4 className="text-xs font-bold text-white uppercase tracking-widest">Key Technologies</h4>
                                         </div>
                                         <div className="grid grid-cols-2 gap-2">
                                             {selectedProject.technologies?.map((tech: string, i: number) => (
                                                 <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-dim)] hover:text-white transition-colors">
                                                     <div className="w-1 h-1 bg-[var(--primary-500)] rounded-full"></div>
                                                     {tech}
                                                 </div>
                                             ))}
                                         </div>
                                     </Motion.div>
                                     
                                     <div className="flex flex-wrap gap-2 mb-4">
                                         {selectedProject.tags.map((tag:string) => <Tag key={tag} text={tag} />)}
                                     </div>
                                 </div>

                                 {/* Fixed Bottom Action */}
                                 <div className="p-8 border-t border-[var(--glass-border)] bg-[rgba(5,7,13,0.8)] backdrop-blur-md">
                                     <button className="w-full py-4 bg-white text-black font-bold uppercase hover:bg-[var(--primary-500)] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                                         Launch Experience <ArrowRight size={16} />
                                     </button>
                                 </div>

                             </div>
                        </Motion.div>
                    </Motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};