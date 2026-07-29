'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import { ENGINEERING_STACK } from '@/lib/constants';
import { WebGLErrorBoundary, isWebGLAvailable } from '@/components/common/WebGLErrorBoundary';
import {
  IconBrain,
  IconCode,
  IconCpu,
  IconTerminal,
  IconDatabase,
  IconPython,
  IconReact,
  IconFastAPI,
  IconSupabase,
  IconJavaScript,
  IconGit,
  IconGlobe,
  IconLayers,
  IconActivity,
  IconBot,
  IconProps,
} from '@/components/common/Icons';

// Interactive floating chips with SVG icons
const FLOATING_CHIPS: { name: string; icon: React.ComponentType<IconProps> }[] = [
  { name: 'Python', icon: IconPython },
  { name: 'React', icon: IconReact },
  { name: 'FastAPI', icon: IconFastAPI },
  { name: 'Supabase', icon: IconSupabase },
  { name: 'JavaScript', icon: IconJavaScript },
  { name: 'NumPy', icon: IconCpu },
  { name: 'Pandas', icon: IconActivity },
  { name: 'Matplotlib', icon: IconLayers },
  { name: 'Git', icon: IconGit },
  { name: 'REST API', icon: IconGlobe },
];

const CATEGORY_ICONS: Record<string, React.ComponentType<IconProps>> = {
  'Artificial Intelligence': IconBot,
  'Python': IconPython,
  'Frontend': IconReact,
  'Backend': IconFastAPI,
  'Automation': IconTerminal,
  'Data Science': IconActivity,
};

function OrbitingNode({
  label,
  index,
  total,
}: {
  label: string;
  index: number;
  total: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const angle = (index / total) * Math.PI * 2;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * 0.2 + angle;
    const radius = 3;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    const y = Math.sin(t * 1.5) * 0.4;

    groupRef.current.position.set(x, y, z);
    groupRef.current.lookAt(state.camera.position);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.6} />
      </mesh>
      <Text
        position={[0, 0.25, 0]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function NetworkLinks({ count = 10 }: { count: number }) {
  const linesRef = useRef<THREE.LineSegments>(null!);
  // 10 radial links (Center -> Node) + 10 perimeter links (Node -> Next Node) = 20 lines total = 40 vertices = 120 floats
  const positionsBuffer = useMemo(() => new Float32Array(20 * 2 * 3), [count]);

  useFrame((state) => {
    if (!linesRef.current) return;
    const t = state.clock.elapsedTime * 0.2;
    const radius = 3;

    const nodeCoords: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + t;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 1.5) * 0.4;
      nodeCoords.push([x, y, z]);
    }

    const pos = linesRef.current.geometry.attributes.position.array as Float32Array;

    // 1. Radial links (Center [0,0,0] -> Node i)
    for (let i = 0; i < count; i++) {
      const idx = i * 6;
      pos[idx] = 0;
      pos[idx + 1] = 0;
      pos[idx + 2] = 0;
      pos[idx + 3] = nodeCoords[i][0];
      pos[idx + 4] = nodeCoords[i][1];
      pos[idx + 5] = nodeCoords[i][2];
    }

    // 2. Perimeter ring links (Node i -> Node (i+1)%count)
    const offset = count * 6;
    for (let i = 0; i < count; i++) {
      const nextI = (i + 1) % count;
      const idx = offset + i * 6;
      pos[idx] = nodeCoords[i][0];
      pos[idx + 1] = nodeCoords[i][1];
      pos[idx + 2] = nodeCoords[i][2];
      pos[idx + 3] = nodeCoords[nextI][0];
      pos[idx + 4] = nodeCoords[nextI][1];
      pos[idx + 5] = nodeCoords[nextI][2];
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={40}
          array={positionsBuffer}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#3B82F6"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function Engineering3DScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#3B82F6" distance={10} />
      <Float speed={2} rotationIntensity={0.2}>
        <mesh>
          <icosahedronGeometry args={[0.6, 2]} />
          <meshStandardMaterial color="#050505" emissive="#3B82F6" emissiveIntensity={0.3} wireframe />
        </mesh>
      </Float>
      <NetworkLinks count={FLOATING_CHIPS.length} />
      {FLOATING_CHIPS.map((chip, i) => (
        <OrbitingNode key={chip.name} label={chip.name} index={i} total={FLOATING_CHIPS.length} />
      ))}
    </>
  );
}

export default function TechSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
  }, []);

  return (
    <section id="engineering" className="relative pt-28 md:pt-36 scroll-mt-24" ref={sectionRef}>
      <div className="section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-6 inline-block">03 Engineering</span>
          <h2 className="font-display text-4xl md:text-6xl font-black gradient-text-white mt-4">
            Engineering Architecture
          </h2>
          <p className="text-white/60 mt-4 max-w-lg mx-auto text-base">
            High-performance stack engineered for intelligent automation, scalability, and seamless user experiences.
          </p>
        </motion.div>

        {/* 3D Orbiting Sphere */}
        {hasWebGL && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full h-[400px] mb-16"
          >
            <WebGLErrorBoundary fallback={null}>
              <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
              >
                <Engineering3DScene />
              </Canvas>
            </WebGLErrorBoundary>
          </motion.div>
        )}

        {/* Interactive Floating Chips Bar */}
        <div className="mb-16">
          <div className="text-xs font-mono text-center text-primary uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
            <IconCpu size={14} className="text-primary animate-pulse" />
            <span>Core Technology Interactive Chips</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {FLOATING_CHIPS.map((chip, i) => {
              const IconComp = chip.icon;
              return (
                <motion.div
                  key={chip.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.04 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-primary/20 border border-white/10 hover:border-primary text-white text-xs font-mono font-bold shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <IconComp size={15} className="text-primary group-hover:scale-110 transition-transform" />
                  <span>{chip.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Engineering Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENGINEERING_STACK.map((item, index) => {
            const CatIcon = CATEGORY_ICONS[item.category] || IconBrain;
            return (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.08 }}
                className="card-glow-border p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                      <CatIcon size={18} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {item.category}
                    </h3>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed mb-6 font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                  {item.chips.map((chip) => (
                    <span
                      key={chip}
                      className="text-[11px] font-mono text-white/70 bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
