import React, { useState, useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Html, Text, Float, Environment, MeshTransmissionMaterial, useCursor, Sparkles, shaderMaterial } from '@react-three/drei';
import { ArrowRight, X, Layers, Cpu, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, Variants } from 'framer-motion';

// --- SHADERS & MATERIALS ---

// 1. Stellarize Background Shader
const StellarMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#050505'),
    uColorEnd: new THREE.Color('#1a0b2e'),
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
    uniform float uTime;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    varying vec2 vUv;

    // Simplex noise function
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Moving Nebulae
      float n = snoise(uv * 3.0 + uTime * 0.1);
      float n2 = snoise(uv * 6.0 - uTime * 0.05);
      
      vec3 color = mix(uColorStart, uColorEnd, n * 0.5 + 0.5);
      
      // Stars
      float starNoise = snoise(uv * 50.0);
      if (starNoise > 0.98) {
          float twinkle = sin(uTime * 5.0 + uv.x * 100.0) * 0.5 + 0.5;
          color += vec3(twinkle);
      }
      
      // Subtle vignette
      float dist = distance(uv, vec2(0.5));
      color *= 1.0 - dist * 0.5;

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
        description: "The proprietary spatial operating system powering our entire infrastructure.",
        tags: ["Core", "Rust", "Neural UI"],
        color: "#ccff00"
    },
    {
        id: 2,
        title: "AERO SIM",
        client: "Tesla Aerospace",
        year: "2030",
        category: "Physics Engine",
        description: "Real-time airflow simulation visualization for next-gen VTOL aircraft.",
        tags: ["WebGPU", "Physics", "Compute"],
        color: "#00ffff"
    },
    {
        id: 3,
        title: "SYNTH DEFI",
        client: "Liquidity DAO",
        year: "2030",
        category: "FinTech Visualization",
        description: "Visualizing complex liquidity pools as organic, breathing organisms.",
        tags: ["D3.js", "WebGL", "Finance"],
        color: "#ff00ff"
    },
    {
        id: 4,
        title: "ARCHIVE 99",
        client: "Museum of Future",
        year: "2029",
        category: "Digital Preservation",
        description: "Preserving the history of the early internet in a procedurally generated 3D city library.",
        tags: ["ProcGen", "React", "3D"],
        color: "#ffaa00"
    },
    {
        id: 5,
        title: "VOGUE META",
        client: "Condé Nast",
        year: "2029",
        category: "Digital Fashion",
        description: "The premier digital fashion week experience with real-time cloth simulation.",
        tags: ["Unreal", "Pixel Stream"],
        color: "#ffffff"
    }
];

const tagDescriptions: Record<string, string> = {
    "Core": "Fundamental system kernel operations and low-level logic.",
    "Rust": "High-performance, memory-safe systems programming language.",
    "Neural UI": "Interface adapted by real-time user neural feedback patterns.",
    "WebGPU": "Next-generation graphics API for high-performance web rendering.",
    "Physics": "Real-time rigid body, soft body, and fluid simulations.",
    "Compute": "General-purpose computing on graphics processing units (GPGPU).",
    "D3.js": "Data-driven document manipulation for complex visualizations.",
    "WebGL": "High-performance interactive 3D graphics in the browser.",
    "Finance": "Decentralized financial protocols and liquidity mechanisms.",
    "ProcGen": "Algorithmic content generation for infinite variety.",
    "React": "Component-based library for building user interfaces.",
    "3D": "Three-dimensional modeling, rendering, and spatial computing.",
    "Unreal": "High-fidelity real-time 3D creation tool for immersive experiences.",
    "Pixel Stream": "Cloud-rendered graphics streaming to client devices."
};

// --- SUB COMPONENTS ---

const Tag = ({ text }: { text: string }) => {
    const [hovered, setHovered] = useState(false);
    
    return (
        <div 
            className="relative inline-block"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <span className="px-3 py-1 border border-white/20 bg-black/20 text-xs text-zinc-300 uppercase tracking-wider rounded-full cursor-help hover:bg-white/10 hover:border-white/40 hover:text-white hover:scale-105 transition-all duration-300 block">
                {text}
            </span>
            <AnimatePresence>
                {hovered && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 bg-zinc-900/95 border border-white/20 rounded-md text-[10px] text-zinc-300 z-50 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl pointer-events-none"
                    >
                        <div className="font-bold text-white mb-1 border-b border-white/10 pb-1">{text}</div>
                        <div className="leading-relaxed opacity-80">{tagDescriptions[text] || "Advanced technology stack used in this project."}</div>
                        {/* Little triangle arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-white/20"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- 3D COMPONENTS ---

const StellarBackground = () => {
    const materialRef = useRef<any>(null);
    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uTime = clock.getElapsedTime();
        }
    });

    return (
        <mesh scale={[100, 100, 100]}>
            <sphereGeometry args={[1, 64, 64]} />
            {/* @ts-ignore */}
            <stellarMaterial ref={materialRef} side={THREE.BackSide} />
        </mesh>
    );
}

const LiquidCore = ({ color, isActive }: { color: string, isActive: boolean }) => {
    // Realistic Water Shader Setup using Transmission
    return (
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.65, 64, 64]} />
            <MeshTransmissionMaterial
                background={new THREE.Color(color)}
                backside
                samples={4}
                thickness={0.5}
                roughness={0}
                transmission={1}
                ior={1.33} // Water IOR
                chromaticAberration={0.02}
                anisotropy={0.2}
                distortion={isActive ? 1.2 : 0.8} // Dynamic ripples
                distortionScale={0.4}
                temporalDistortion={0.2}
                color={color}
                toneMapped={true}
            />
        </mesh>
    );
};

const Card = ({ project, index, activeIndex, setActiveIndex, setSelectedProject, count, radius, animatingId, setAnimatingId }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    
    // Smooth Animation Refs
    const clickRotation = useRef(0);
    const targetRotation = useRef(0); // Additive rotation target

    useCursor(hovered);

    // Calculate position on the circle
    const angle = (index / count) * Math.PI * 2;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    
    const normalizedActiveIndex = ((activeIndex % count) + count) % count;
    const isActive = index === normalizedActiveIndex;

    const isGlobalAnimating = animatingId !== null;
    const isThisAnimating = animatingId === project.id;

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        
        // Slight floating animation for liveliness
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.1;

        // ANIMATION: Click-to-open Spin
        clickRotation.current = THREE.MathUtils.lerp(clickRotation.current, targetRotation.current, delta * 4);

        // Standard rotation is facing center (angle + PI)
        meshRef.current.rotation.y = angle + Math.PI + clickRotation.current;

        // ZOOM & INTERACTION ANIMATION
        let targetScale = 1;
        if (isThisAnimating) {
            targetScale = 1.6; // Big Zoom to face user
        } else if (isGlobalAnimating) {
            targetScale = 0.6; // Others shrink
        } else if (isActive || hovered) {
            targetScale = 1.15; // Hover state
        }
        
        const lerpSpeed = isThisAnimating ? 3 * delta : 8 * delta;
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, lerpSpeed));
    });

    const handleClick = (e: any) => {
        e.stopPropagation();
        if (isActive) {
            // Already facing user (mostly), perform spin and open details
            targetRotation.current += Math.PI * 2;
            setAnimatingId(project.id);
            setTimeout(() => {
                setSelectedProject(project);
                setAnimatingId(null);
            }, 800);
        } else {
            // Not active, rotate carousel to face user
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
                
                {/* 3. Realistic Water Core */}
                <LiquidCore color={project.color} isActive={isActive || hovered || isThisAnimating} />

                {/* 2. Realistic Crystalline Glass Shell */}
                <mesh 
                    ref={meshRef}
                    onClick={handleClick}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                >
                    <boxGeometry args={[2.5, 3.5, 0.4]} /> 
                    <MeshTransmissionMaterial 
                        backside
                        samples={12} // Increased for realism
                        thickness={1.2} // Thicker glass for deep refraction
                        chromaticAberration={0.08} // Stronger prism effect
                        anisotropy={0.3} // Brushed internal structure
                        distortion={0.3} // Subtle liquid distortion in glass
                        distortionScale={0.3}
                        temporalDistortion={0.1}
                        iridescence={1}
                        iridescenceIOR={1.3}
                        ior={1.7} // High IOR (Sapphire/Crystal)
                        roughness={0.02} // Extremely smooth
                        metalness={0.1}
                        color={isActive ? "#ffffff" : "#f0f0f0"}
                        // Emissive for the edge glow
                        emissive={project.color}
                        emissiveIntensity={isThisAnimating ? 0.8 : (isActive ? 0.1 : 0)}
                        toneMapped={true}
                    />
                    
                    {/* Delicate Edge Highlight */}
                    {(isActive || hovered || isThisAnimating) && (
                        <lineSegments>
                            <edgesGeometry args={[new THREE.BoxGeometry(2.5, 3.5, 0.4)]} />
                            <meshBasicMaterial 
                                color={project.color} 
                                transparent 
                                opacity={isThisAnimating ? 1 : (isActive ? 0.6 : 0.2)}
                            />
                        </lineSegments>
                    )}

                    {/* HTML Content Overlay */}
                    <Html 
                        transform 
                        occlude="blending"
                        position={[0, 0, 0.21]} // Slightly above glass
                        style={{
                            width: '250px',
                            height: '350px',
                            pointerEvents: 'none',
                            userSelect: 'none'
                        }}
                    >
                        <div className={`w-full h-full p-4 flex flex-col justify-between transition-opacity duration-500 ${isActive || hovered || isThisAnimating ? 'opacity-100' : 'opacity-60'}`}>
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <span className="font-mono text-[10px] text-white/70 drop-shadow-md">0{project.id}</span>
                                <Cpu size={12} className={isActive || hovered || isThisAnimating ? 'text-[#ccff00] drop-shadow-[0_0_5px_rgba(204,255,0,0.8)]' : 'text-white/40'} />
                            </div>

                            {/* Middle spacing - Transparency lets the Liquid Core show through */}
                            <div className="flex-1"></div>

                            {/* Footer */}
                            <div>
                                <h3 className="text-xl font-bold text-white font-manrope leading-none mb-1 drop-shadow-lg">{project.title}</h3>
                                <p className="text-[10px] text-zinc-300 font-mono uppercase tracking-widest drop-shadow-md">{project.client}</p>
                            </div>
                        </div>
                    </Html>
                </mesh>
            </Float>
        </group>
    );
};

const CarouselRig = ({ children, activeIndex, count }: any) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (!groupRef.current) return;
        const targetRotation = -(activeIndex / count) * Math.PI * 2;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            targetRotation,
            5 * delta
        );
    });
    return <group ref={groupRef}>{children}</group>;
};

// --- MAIN REACT COMPONENT ---

const modalContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            when: "beforeChildren",
            staggerChildren: 0.1,
            delayChildren: 0
        }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
};

// New variant for staggered letters
const letterVariants: Variants = {
    hidden: { opacity: 0, y: 100, rotateX: 90, filter: "blur(12px)" },
    visible: (i: number) => ({
        opacity: 0.5, // Maintain the mix-blend opacity look
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
            delay: 0.1 + (i * 0.04),
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9], // Custom bezier for premium feel
        }
    })
};

// New variants for staggered content reveal (Page Peel feel)
const modalContentVariants: Variants = {
    hidden: { 
        opacity: 0, 
        x: 40, 
        rotateY: -15, // Slight fold/peel effect
        filter: "blur(8px)" 
    },
    visible: { 
        opacity: 1, 
        x: 0, 
        rotateY: 0, 
        filter: "blur(0px)",
        transition: { 
            type: "spring", 
            stiffness: 90, 
            damping: 15,
            mass: 0.8
        }
    }
};

export const Portfolio3D = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [animatingId, setAnimatingId] = useState<number | null>(null);

    const getBlurIntensity = (color: string) => {
        if (!color.startsWith('#')) return 40;
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        return Math.floor(r / 5 + 20); 
    };

    const normalizedIndex = ((activeIndex % ecosystemNodes.length) + ecosystemNodes.length) % ecosystemNodes.length;

    return (
        <section className="relative z-20 w-full h-[100vh] bg-[#050505] overflow-hidden border-t border-white/5 group">
            
            {/* UI Overlay: Header */}
            <div className="absolute top-10 left-0 w-full text-center px-6 z-30 pointer-events-none">
                <span className="text-[#ccff00] font-mono text-xs uppercase tracking-[0.3em] block mb-4">/ WebGL Kernel</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter font-manrope">
                    DANVERSE <span className="text-zinc-600">OS</span>
                </h2>
            </div>

            {/* R3F Canvas */}
            <div className="absolute inset-0 z-10">
                <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 2]}>
                    <fog attach="fog" args={['#050505', 5, 25]} />
                    
                    {/* 1. Stellarize Background */}
                    <StellarBackground />
                    
                    {/* Atmospheric Lighting */}
                    <Environment preset="city" />
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#ccff00" distance={20} />
                    <spotLight position={[0, 10, 0]} intensity={2} angle={0.5} penumbra={1} color="white" />
                    
                    {/* Extra Particles for depth */}
                    <Sparkles count={150} scale={12} size={3} speed={0.4} opacity={0.5} color="#ccff00" />
                    
                    <CarouselRig activeIndex={activeIndex} count={ecosystemNodes.length}>
                        {ecosystemNodes.map((project, index) => (
                            <Card 
                                key={project.id}
                                project={project}
                                index={index}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                                setSelectedProject={setSelectedProject}
                                animatingId={animatingId}
                                setAnimatingId={setAnimatingId}
                                count={ecosystemNodes.length}
                                radius={4} 
                            />
                        ))}
                    </CarouselRig>

                </Canvas>
            </div>

            {/* SIDE NAVIGATION ARROWS (Hover to Reveal) */}
            <div className="absolute top-0 left-0 h-full w-32 z-30 flex items-center justify-start pl-8 pointer-events-none group-hover:pointer-events-auto">
                 <button 
                    onClick={() => setActiveIndex(prev => prev - 1)}
                    className="w-16 h-16 rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md flex items-center justify-center opacity-0 -translate-x-10 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#ccff00] hover:text-black hover:scale-110"
                >
                    <ChevronLeft size={32} />
                </button>
            </div>
            
            <div className="absolute top-0 right-0 h-full w-32 z-30 flex items-center justify-end pr-8 pointer-events-none group-hover:pointer-events-auto">
                 <button 
                    onClick={() => setActiveIndex(prev => prev + 1)}
                    className="w-16 h-16 rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md flex items-center justify-center opacity-0 translate-x-10 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#ccff00] hover:text-black hover:scale-110"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* UI Overlay: Bottom Navigation Controls */}
            <div className="absolute bottom-10 w-full flex justify-center gap-8 z-30 pointer-events-none">
                 <button 
                    onClick={() => setActiveIndex(prev => prev - 1)}
                    className="pointer-events-auto w-12 h-12 rounded-full border border-white/10 bg-black/40 text-white hover:bg-[#ccff00] hover:text-black hover:scale-110 transition-all flex items-center justify-center backdrop-blur-md"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2 items-center">
                    {ecosystemNodes.map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-1 rounded-full transition-all duration-300 ${normalizedIndex === i ? 'w-8 bg-[#ccff00]' : 'w-2 bg-zinc-800'}`}
                        />
                    ))}
                </div>
                 <button 
                    onClick={() => setActiveIndex(prev => prev + 1)}
                    className="pointer-events-auto w-12 h-12 rounded-full border border-white/10 bg-black/40 text-white hover:bg-[#ccff00] hover:text-black hover:scale-110 transition-all flex items-center justify-center backdrop-blur-md"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    >
                        {/* Backdrop */}
                        <div 
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                            onClick={() => setSelectedProject(null)}
                        ></div>

                        {/* Modal Content */}
                        <motion.div 
                            variants={modalContainerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative w-full max-w-6xl h-[80vh] flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,1)] bg-black overflow-hidden border border-white/5"
                        >
                             {/* Background Blobs */}
                            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
                                <div 
                                    className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-60 blur-[80px] animate-pulse"
                                    style={{ backgroundColor: selectedProject.color }}
                                ></div>
                            </div>

                            {/* Close Button */}
                            <button 
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 z-[60] p-2 bg-black/20 hover:bg-white hover:text-black rounded-full text-white transition-all border border-white/10"
                            >
                                <X size={24} />
                            </button>

                            {/* Left Pane - Title */}
                            <div 
                                className="w-full md:w-2/3 relative z-10 flex flex-col justify-end p-12 border-r border-white/10 bg-black/20 backdrop-blur-sm"
                                style={{ perspective: "1000px" }} // Important for 3D text stagger
                            >
                                <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter font-manrope leading-[0.8] mix-blend-overlay flex flex-wrap overflow-hidden">
                                    {selectedProject.title.split("").map((char: string, i: number) => (
                                         <motion.span
                                            key={i}
                                            custom={i}
                                            variants={letterVariants}
                                            // Inherit initial/animate from parent variant propagation
                                            style={{ display: "inline-block", transformOrigin: "bottom" }}
                                         >
                                            {char === " " ? "\u00A0" : char}
                                         </motion.span>
                                    ))}
                                </h1>
                            </div>

                            {/* Right Pane - Details */}
                            <div 
                                className="w-full md:w-1/3 p-12 flex flex-col justify-between relative z-20 border-l border-white/5"
                                style={{
                                    backgroundColor: 'rgba(5, 5, 5, 0.4)',
                                    backdropFilter: `blur(${getBlurIntensity(selectedProject.color)}px)`
                                }}
                            >
                                <div>
                                    <motion.div variants={modalContentVariants} className="flex items-center gap-2 mb-8">
                                        <div className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></div>
                                        <span className="text-[#ccff00] font-mono text-xs uppercase tracking-widest">Live Deployment</span>
                                    </motion.div>
                                    
                                    <motion.h2 variants={modalContentVariants} className="text-4xl font-bold text-white mb-2 font-manrope">
                                        {selectedProject.title}
                                    </motion.h2>
                                    
                                    <motion.p variants={modalContentVariants} className="text-zinc-400 font-mono text-sm mb-8">
                                        Client: {selectedProject.client} — {selectedProject.year}
                                    </motion.p>
                                    
                                    <motion.p variants={modalContentVariants} className="text-zinc-200 text-lg leading-relaxed font-geist mb-8 drop-shadow-md">
                                        {selectedProject.description}
                                    </motion.p>
                                    
                                    <motion.div variants={modalContentVariants} className="flex flex-wrap gap-2 mb-8">
                                        {selectedProject.tags.map((tag: string) => (
                                            <Tag key={tag} text={tag} />
                                        ))}
                                    </motion.div>
                                </div>
                                
                                <motion.button 
                                    variants={modalContentVariants}
                                    className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#ccff00] transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg"
                                >
                                    Launch Experience <ArrowRight size={18} />
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};