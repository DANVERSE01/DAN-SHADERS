import React, { useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Portfolio3D } from './components/Portfolio3D';
import { MobileSuite } from './components/MobileSuite';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

// --- GLOBAL SHADER MATERIAL ---
const CosmicBackgroundMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color('#050505'), // Deep Void
    uColor2: new THREE.Color('#0a0a0a'), // Soft Black
    uColor3: new THREE.Color('#0f0518'), // Cosmic Purple (Very Dark)
    uAccent: new THREE.Color('#1a2c20'), // Dark Teal/Lime hint
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
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uAccent;
    varying vec2 vUv;

    // Simplex Noise
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
      
      // Slow breathing movement
      float time = uTime * 0.1;
      
      // Generate multiple layers of noise
      float n1 = snoise(uv * 2.0 + vec2(time * 0.1, time * 0.2));
      float n2 = snoise(uv * 4.0 - vec2(time * 0.2, time * 0.1));
      float n3 = snoise(uv * 8.0 + vec2(sin(time), cos(time)) * 0.05);
      
      // Mix noise
      float finalNoise = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2);
      
      // Pulse intensity
      float pulse = sin(uTime * 0.5) * 0.1 + 0.9;
      
      // Color mixing
      vec3 bg = mix(uColor1, uColor2, uv.y);
      vec3 nebula = mix(uColor3, uAccent, n1 * 0.5 + 0.5);
      
      vec3 color = mix(bg, nebula, finalNoise * 0.6 * pulse);
      
      // Add subtle grain/dither
      float grain = fract(sin(dot(uv.xy ,vec2(12.9898,78.233))) * 43758.5453);
      color += grain * 0.02;

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ CosmicBackgroundMaterial });

const LivingBackground = () => {
    const materialRef = useRef<any>(null);
    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uTime = clock.getElapsedTime();
        }
    });

    return (
        <>
            <mesh scale={[10, 10, 1]}>
                <planeGeometry args={[2, 2]} />
                {/* @ts-ignore */}
                <cosmicBackgroundMaterial ref={materialRef} />
            </mesh>
            <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        </>
    );
};

// Define custom styles for the 2030 Aesthetic
const GlobalStyles = () => (
  <style>{`
    :root {
      --acid-lime: #ccff00;
      --deep-void: #050505;
      --holo-chrome: #e2e8f0;
    }

    ::selection {
      background-color: var(--acid-lime);
      color: black;
    }

    body {
      background-color: var(--deep-void);
      cursor: crosshair;
    }

    @keyframes fadeSlideIn {
      0% { opacity: 0; transform: translateY(40px) scale(0.98); filter: blur(10px); }
      100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
    }

    /* Enhanced Scroll Animation Logic */
    .animate-on-scroll { 
        opacity: 0; 
        will-change: opacity, transform;
        transition: opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1s cubic-bezier(0.2, 0.8, 0.2, 1), filter 1s;
    }
    .animate-on-scroll.animate { 
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
        animation: fadeSlideIn 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }

    @keyframes pulse-glow {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.1); }
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
  `}</style>
);

const App: React.FC = () => {
  useEffect(() => {
    // Robust Scroll Animation Observer
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.classList.add("animate");
          observer.unobserve(target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#ccff00] selection:text-black">
      <GlobalStyles />
      
      {/* --- GLOBAL LIVING BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
              <LivingBackground />
          </Canvas>
          {/* Subtle noise overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] animate-noise"></div>
          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_90%)]"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">
          <Navbar />
          <Hero />
          <Features />
          <Portfolio3D />
          <MobileSuite />
          <Testimonials />
          <ContactForm />
          <Footer />
      </div>
    </div>
  );
};

export default App;