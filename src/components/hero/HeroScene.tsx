'use client';

import { Suspense, useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, RoundedBox, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { PROJECTS, OWNER } from '@/lib/constants';
import { soundFX } from '@/lib/audioSFX';
import AICore from './AICore';
import { WebGLErrorBoundary, isWebGLAvailable } from '@/components/common/WebGLErrorBoundary';
import { IconRocket, IconMail, IconArrowRight } from '@/components/common/Icons';

// ============================================
// PARTICLE FIELD — Stage Ambiance Particles
// ============================================
function ParticleField({
  count = 500,
  mousePosition,
  isWarping = false,
}: {
  count?: number;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
  isWarping?: boolean;
}) {
  const points = useRef<THREE.Points>(null!);
  const speedMult = useRef(1);

  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      scales[i] = Math.random();
    }
    return { positions, scales };
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;

    const targetSpeed = isWarping ? 3.2 : 1.0;
    speedMult.current = THREE.MathUtils.lerp(speedMult.current, targetSpeed, 0.05);

    points.current.rotation.y += delta * 0.05 * speedMult.current;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01 * speedMult.current) * 0.05;

    const mx = mousePosition.current.x * 0.1;
    const my = mousePosition.current.y * 0.1;
    points.current.rotation.z = mx * 0.02;
    points.current.position.x = THREE.MathUtils.lerp(points.current.position.x, mx * 0.4, 0.03);
    points.current.position.y = THREE.MathUtils.lerp(points.current.position.y, my * 0.4, 0.03);

    const mat = points.current.material as THREE.PointsMaterial;
    if (mat) {
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, isWarping ? 0.85 : 0.65, 0.05);
      mat.size = THREE.MathUtils.lerp(mat.size, isWarping ? 0.048 : 0.035, 0.05);
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particleData.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#6366F1"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ============================================
// AMBIENT LIGHT SPHERE
// ============================================
function AmbientSphere({ coreY = -2.0 }: { coreY?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={[0, coreY, -5]}>
      <icosahedronGeometry args={[2.8, 1]} />
      <meshBasicMaterial color="#6366F1" wireframe transparent opacity={0.05} />
    </mesh>
  );
}

// ============================================
// HOLOGRAPHIC PROJECT CARD
// ============================================
function HologramCard({
  project,
  index,
  totalCount,
  coreX,
  coreY,
  coreZ,
  rx,
  rz,
  ry,
  angleRef,
  onClick,
  onHover,
  isHovered,
  mousePosition,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  totalCount: number;
  coreX: number;
  coreY: number;
  coreZ: number;
  rx: number;
  rz: number;
  ry: number;
  angleRef: React.MutableRefObject<number>;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
  isHovered: boolean;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    const angle = (index / totalCount) * Math.PI * 2 + angleRef.current;
    const x = coreX + Math.cos(angle) * rx;
    const z = coreZ + Math.sin(angle) * rz;
    const y = coreY + Math.sin(angle * 2) * ry;

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);

      const targetScale = isHovered ? 1.08 : 1.0;
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1)
      );

      const baseRotY = Math.sin(angle) * -0.28;
      const targetRotX = isHovered ? -mousePosition.current.y * 0.35 : 0;
      const targetRotY = isHovered ? baseRotY + mousePosition.current.x * 0.35 : baseRotY;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    }

    if (meshRef.current) {
      const glow = isHovered ? 0.6 : 0.15;
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, glow, 0.08);
    }
  });

  const color = useMemo(() => new THREE.Color(project.color), [project.color]);

  return (
    <Float speed={2} rotationIntensity={0.12} floatIntensity={0.35} floatingRange={[-0.1, 0.1]}>
      <group
        ref={groupRef}
        onClick={(e) => {
          e.stopPropagation();
          soundFX.playClick();
          onClick();
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        onPointerOver={() => {
          if (!isHovered) {
            soundFX.playHover();
          }
          onHover(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          onHover(false);
          document.body.style.cursor = 'default';
        }}
      >
        <RoundedBox ref={meshRef} args={[1.4, 1.8, 0.02]} radius={0.06}>
          <meshStandardMaterial
            color="#080812"
            emissive={color}
            emissiveIntensity={0.15}
            transparent
            opacity={0.88}
            metalness={0.4}
            roughness={0.4}
          />
        </RoundedBox>

        <mesh position={[0, 0.85, 0.015]}>
          <planeGeometry args={[1.22, 0.004]} />
          <meshBasicMaterial color={project.color} transparent opacity={0.7} />
        </mesh>

        <mesh position={[0, 0.42, 0.02]}>
          <circleGeometry args={[0.13, 24]} />
          <meshBasicMaterial color={project.color} transparent opacity={0.35} />
        </mesh>
        <mesh position={[0, 0.42, 0.025]}>
          <circleGeometry args={[0.045, 24]} />
          <meshBasicMaterial color={project.color} />
        </mesh>

        <Text
          position={[0, 0.1, 0.022]}
          fontSize={0.16}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.2}
        >
          {project.title}
        </Text>

        <Text
          position={[0, -0.1, 0.022]}
          fontSize={0.075}
          color="#94A3B8"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.1}
        >
          {project.subtitle}
        </Text>

        <Text
          position={[0, -0.52, 0.022]}
          fontSize={0.065}
          color={project.color}
          anchorX="center"
          anchorY="middle"
        >
          {`${project.features.length} Features`}
        </Text>

        <pointLight
          position={[0, 0, 0.5]}
          color={project.color}
          intensity={isHovered ? 2.5 : 0.6}
          distance={3}
        />
      </group>
    </Float>
  );
}

// ============================================
// CAMERA RIG WITH PARALLAX & RESPONSIVE ZOOM
// ============================================
function CameraRig({
  mousePosition,
  isMobile,
}: {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}) {
  useFrame((state) => {
    const { camera } = state;
    const mx = mousePosition.current.x;
    const my = mousePosition.current.y;

    const targetZ = isMobile ? 8.5 : 6.0;
    const targetY = isMobile ? 0.2 : 0.6;
    const targetX = isMobile ? 0 : 0.5;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX + mx * 0.35, 0.025);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + my * 0.22, 0.025);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.025);
    camera.lookAt(isMobile ? 0 : 0.9, 0, 0);
  });

  return null;
}

// ============================================
// STAGE ROOM ENVIRONMENT
// ============================================
function RoomEnvironment() {
  return (
    <group>
      <gridHelper args={[32, 64, '#1e293b', '#0f172a']} position={[0, -2, 0]} />

      <mesh position={[-4.5, 1, -6]} rotation={[0, 0.35, 0]}>
        <planeGeometry args={[0.025, 5]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.35} />
      </mesh>
      <mesh position={[4.5, 1, -6]} rotation={[0, -0.35, 0]}>
        <planeGeometry args={[0.025, 5]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.35} />
      </mesh>

      <mesh position={[0, 4.2, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2, 2.2, 32]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ============================================
// 3D ENERGY LASER BEAM
// ============================================
function EnergyBeam({
  index,
  totalCount,
  coreX,
  coreY,
  coreZ,
  rx,
  rz,
  ry,
  angleRef,
  color = '#3B82F6',
  isHovered = false,
}: {
  index: number;
  totalCount: number;
  coreX: number;
  coreY: number;
  coreZ: number;
  rx: number;
  rz: number;
  ry: number;
  angleRef: React.MutableRefObject<number>;
  color?: string;
  isHovered?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const pulseRef = useRef<THREE.Mesh>(null!);

  const beamColor = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state) => {
    const angle = (index / totalCount) * Math.PI * 2 + angleRef.current;
    const endX = coreX + Math.cos(angle) * rx;
    const endZ = coreZ + Math.sin(angle) * rz;
    const endY = coreY + Math.sin(angle * 2) * ry;

    const vStart = new THREE.Vector3(coreX, coreY, coreZ);
    const vEnd = new THREE.Vector3(endX, endY, endZ);
    const direction = vEnd.clone().sub(vStart);
    const len = direction.length();
    const mid = vStart.clone().add(vEnd).multiplyScalar(0.5);

    const rot = new THREE.Quaternion();
    rot.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    const euler = new THREE.Euler().setFromQuaternion(rot);

    if (meshRef.current) {
      meshRef.current.position.set(mid.x, mid.y, mid.z);
      meshRef.current.rotation.set(euler.x, euler.y, euler.z);
      meshRef.current.scale.set(1, len, 1);

      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      const targetIntensity = isHovered ? 2.5 : 1.0;
      const targetOpacity = isHovered ? 0.95 : 0.65;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetIntensity, 0.08);
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.08);
    }

    if (pulseRef.current) {
      const t = (state.clock.elapsedTime * (isHovered ? 1.8 : 0.8)) % 1;
      pulseRef.current.position.x = THREE.MathUtils.lerp(coreX, endX, t);
      pulseRef.current.position.y = THREE.MathUtils.lerp(coreY, endY, t);
      pulseRef.current.position.z = THREE.MathUtils.lerp(coreZ, endZ, t);

      const targetScale = isHovered ? 0.12 : 0.07;
      pulseRef.current.scale.setScalar(
        THREE.MathUtils.lerp(pulseRef.current.scale.x, targetScale, 0.1)
      );
    }
  });

  return (
    <group>
      {/* Volumetric 3D Laser Beam Cylinder */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.025, 0.025, 1, 12]} />
        <meshStandardMaterial
          color={beamColor}
          emissive={beamColor}
          emissiveIntensity={1.0}
          transparent
          opacity={0.65}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>

      {/* Traveling Energy Pulse Sphere */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial
          color={beamColor}
          emissive={beamColor}
          emissiveIntensity={isHovered ? 3.5 : 1.8}
        />
      </mesh>
    </group>
  );
}

// ============================================
// MAIN SCENE CONTAINER WITH CONTINUOUS 3D ORBIT
// ============================================
function Scene({
  mousePosition,
  onProjectClick,
  activeProject,
  setActiveProject,
  isMobile,
}: {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
  onProjectClick: (id: string) => void;
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;
  isMobile: boolean;
}) {
  const coreX = isMobile ? 0 : 2.5;
  const coreY = isMobile ? 0.1 : 0.1;
  const coreZ = -0.5;

  const angleRef = useRef(0);
  const rx = isMobile ? 1.8 : 2.45;
  const rz = isMobile ? 1.0 : 1.4;
  const ry = isMobile ? 0.18 : 0.22;

  useFrame((_, delta) => {
    const speed = activeProject ? 0.08 : 0.35;
    angleRef.current += delta * speed;
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[3.5, 8.5, 5]} intensity={0.5} color="#ffffff" castShadow />
      <pointLight position={[coreX, 4.5, 2.5]} intensity={0.8} color="#2563EB" distance={14} />
      <pointLight position={[coreX - 4.5, 2.2, 3]} intensity={0.3} color="#06B6D4" distance={11} />
      <pointLight position={[coreX + 4.5, 2.2, 3]} intensity={0.3} color="#3B82F6" distance={11} />
      <pointLight position={[coreX, 2.2, -3.5]} intensity={0.4} color="#8B5CF6" distance={9} />

      <RoomEnvironment />
      <AmbientSphere coreY={coreY} />
      <ParticleField count={isMobile ? 200 : 350} mousePosition={mousePosition} isWarping={!!activeProject} />
      <Stars radius={50} depth={50} count={450} factor={2} fade speed={activeProject ? 1.5 : 0.5} />

      {/* Futuristic 3D AI Quantum Core Group */}
      <group position={[coreX, coreY, -0.5]}>
        <AICore activeProject={activeProject} mousePosition={mousePosition} />
      </group>

      {/* Dynamic 3D Laser Energy Beams Tracking Moving Orbiting Cards */}
      {PROJECTS.map((project, index) => (
        <EnergyBeam
          key={`beam-${project.id}`}
          index={index}
          totalCount={PROJECTS.length}
          coreX={coreX}
          coreY={coreY}
          coreZ={coreZ}
          rx={rx}
          rz={rz}
          ry={ry}
          angleRef={angleRef}
          color={project.color}
          isHovered={activeProject === project.id}
        />
      ))}

      {/* Orbiting 3D Hologram Cards */}
      {PROJECTS.map((project, index) => (
        <HologramCard
          key={project.id}
          project={project}
          index={index}
          totalCount={PROJECTS.length}
          coreX={coreX}
          coreY={coreY}
          coreZ={coreZ}
          rx={rx}
          rz={rz}
          ry={ry}
          angleRef={angleRef}
          isHovered={activeProject === project.id}
          onHover={(hovered) => setActiveProject(hovered ? project.id : null)}
          onClick={() => onProjectClick(project.id)}
          mousePosition={mousePosition}
        />
      ))}

      <CameraRig mousePosition={mousePosition} isMobile={isMobile} />
    </>
  );
}

function HeroFallback() {
  return (
    <div className="absolute inset-0 bg-[#08080E] overflow-hidden flex items-center justify-center pointer-events-none">
      <div className="absolute w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px] top-1/4 left-1/3" />
      <div className="absolute w-[350px] h-[350px] bg-cyan-500/15 rounded-full blur-[90px] bottom-1/4 right-1/3" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
}

// ============================================
// HERO SECTION COMPONENT EXPORT
// ============================================
export default function HeroScene({
  onProjectClick,
}: {
  onProjectClick: (id: string) => void;
}) {
  const mousePosition = useRef({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mousePosition.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    };
  }, []);

  return (
    <section id="dashboard" className="relative w-full min-h-screen lg:h-screen overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Desktop 3D Canvas Background (Only rendered full-screen on Desktop lg) */}
      {!isMobile && (
        <div className="absolute inset-0">
          {!hasWebGL ? (
            <HeroFallback />
          ) : (
            <WebGLErrorBoundary fallback={<HeroFallback />}>
              <Canvas
                camera={{ position: [0, 1, 6], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{
                  antialias: true,
                  alpha: true,
                  powerPreference: 'high-performance',
                }}
                style={{ background: '#08080E' }}
              >
                <Suspense fallback={null}>
                  <Scene
                    mousePosition={mousePosition}
                    onProjectClick={onProjectClick}
                    activeProject={activeProject}
                    setActiveProject={setActiveProject}
                    isMobile={false}
                  />
                </Suspense>
              </Canvas>
            </WebGLErrorBoundary>
          )}
        </div>
      )}

      {/* Main Overlay Layout */}
      <div className="relative lg:absolute lg:inset-0 flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-24 pt-28 lg:pt-36 pb-12 z-10 pointer-events-none">
        
        {/* Clean Hero Text Block */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full lg:max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start pointer-events-auto"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-white/80">
              Available for AI Engineering & Software Architecture
            </span>
          </motion.div>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs md:text-sm font-mono text-primary mb-3 tracking-widest uppercase font-semibold"
          >
            {OWNER.role}
          </motion.p>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black gradient-text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
            {OWNER.name.split(' ')[0]}{' '}
            <span className="gradient-text">
              {OWNER.name.split(' ').slice(1).join(' ')}
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-white/60 text-base md:text-xl leading-relaxed mb-8 max-w-lg">
            {OWNER.tagline}
          </p>

          {/* Interactive CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6"
          >
            <a
              href="#products"
              onMouseEnter={() => soundFX.playHover()}
              onClick={(e) => {
                e.preventDefault();
                soundFX.playWarp();
                const el = document.getElementById('products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary cursor-pointer"
            >
              <IconRocket size={16} />
              <span>Explore Products</span>
              <IconArrowRight size={16} />
            </a>

            <a
              href="#contact"
              onMouseEnter={() => soundFX.playHover()}
              onClick={(e) => {
                e.preventDefault();
                soundFX.playClick();
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary cursor-pointer"
            >
              <IconMail size={16} />
              <span>Get in Touch</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Dedicated Clean Mobile 3D Neural Stage (Only rendered on Mobile < lg) */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative w-full h-[480px] my-8 rounded-3xl border border-white/10 overflow-hidden bg-[#080812]/90 backdrop-blur-2xl shadow-2xl"
          >
            <div className="absolute top-4 left-6 z-20 pointer-events-none">
              <span className="text-[11px] font-mono text-primary/90 tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                3D Neural Quantum Stage
              </span>
            </div>
            {!hasWebGL ? (
              <HeroFallback />
            ) : (
              <WebGLErrorBoundary fallback={<HeroFallback />}>
                <Canvas
                  camera={{ position: [0, 0, 8.5], fov: 50 }}
                  dpr={[1, 1.5]}
                  gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                  }}
                  style={{ background: '#08080E' }}
                >
                  <Suspense fallback={null}>
                    <Scene
                      mousePosition={mousePosition}
                      onProjectClick={onProjectClick}
                      activeProject={activeProject}
                      setActiveProject={setActiveProject}
                      isMobile={true}
                    />
                  </Suspense>
                </Canvas>
              </WebGLErrorBoundary>
            )}
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center gap-3 mt-4 lg:mt-0 pointer-events-auto"
        >
          <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1.5px] h-7 bg-gradient-to-b from-primary via-cyan-400 to-transparent"
          />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none z-10" />
    </section>
  );
}
