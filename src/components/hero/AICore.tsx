'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Ring } from '@react-three/drei';
import * as THREE from 'three';

interface AICoreProps {
  activeProject?: string | null;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

const COLOR_MAP: Record<string, string> = {
  rex: '#2563EB',
  tableserve: '#06B6D4',
  rexai: '#8B5CF6',
  default: '#3B82F6',
};

export default function AICore({ activeProject, mousePosition }: AICoreProps) {
  const coreGroupRef = useRef<THREE.Group>(null!);
  const outerWireframeRef = useRef<THREE.Mesh>(null!);
  const innerSphereRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);

  const targetColor = useMemo(() => {
    return new THREE.Color(
      activeProject && COLOR_MAP[activeProject]
        ? COLOR_MAP[activeProject]
        : COLOR_MAP.default
    );
  }, [activeProject]);

  const currentColor = useRef(new THREE.Color('#3B82F6'));

  useFrame((state) => {
    if (!coreGroupRef.current) return;

    const t = state.clock.elapsedTime;
    const mx = mousePosition.current.x;
    const my = mousePosition.current.y;

    // Smoothly lerp color toward target project color
    currentColor.current.lerp(targetColor, 0.05);

    // Core group subtle tilting with mouse
    coreGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      coreGroupRef.current.rotation.y,
      mx * 0.4 + t * 0.15,
      0.03
    );
    coreGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      coreGroupRef.current.rotation.x,
      -my * 0.3 + Math.sin(t * 0.5) * 0.1,
      0.03
    );

    // Outer wireframe rotation
    if (outerWireframeRef.current) {
      outerWireframeRef.current.rotation.y = -t * 0.25;
      outerWireframeRef.current.rotation.z = Math.sin(t * 0.3) * 0.2;
      const mat = outerWireframeRef.current.material as THREE.MeshStandardMaterial;
      mat.color = currentColor.current;
      mat.emissive = currentColor.current;
    }

    // Inner pulsing core
    if (innerSphereRef.current) {
      const pulse = 1 + Math.sin(t * 2.5) * 0.08;
      innerSphereRef.current.scale.setScalar(pulse);
      const mat = innerSphereRef.current.material as THREE.MeshStandardMaterial;
      mat.color = currentColor.current;
      mat.emissive = currentColor.current;
      mat.emissiveIntensity = 0.6 + Math.sin(t * 4) * 0.25;
    }

    // Orbiting Rings counter rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.4) * 0.15;
      ring1Ref.current.rotation.y = t * 0.4;
      const mat = ring1Ref.current.material as THREE.MeshBasicMaterial;
      mat.color = currentColor.current;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -Math.PI / 4 + Math.cos(t * 0.3) * 0.15;
      ring2Ref.current.rotation.y = -t * 0.3;
      const mat = ring2Ref.current.material as THREE.MeshBasicMaterial;
      mat.color = currentColor.current;
    }

    // Light point intensity update
    if (lightRef.current) {
      lightRef.current.color = currentColor.current;
      lightRef.current.intensity = 1.5 + Math.sin(t * 3) * 0.5;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4} floatingRange={[-0.15, 0.15]}>
      <group ref={coreGroupRef} position={[0, 0.1, -1]}>
        {/* Dynamic Center Point Light */}
        <pointLight ref={lightRef} distance={7} intensity={2} color="#3B82F6" />

        {/* Inner Glowing Plasma Core */}
        <mesh ref={innerSphereRef}>
          <icosahedronGeometry args={[0.55, 3]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Middle Wireframe Quantum Cage */}
        <mesh ref={outerWireframeRef}>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={0.4}
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Orbiting Cyber Ring 1 */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.25, 0.012, 16, 64]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.5} />
        </mesh>

        {/* Orbiting Cyber Ring 2 */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[1.5, 0.008, 16, 64]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.35} />
        </mesh>

        {/* Ambient Ring Halo */}
        <Ring args={[0.5, 0.52, 64]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} side={THREE.DoubleSide} />
        </Ring>
      </group>
    </Float>
  );
}
