'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line, Float } from '@react-three/drei';
import * as THREE from 'three';

/* Rotating particle cloud */
function ParticleCloud() {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const bright = 0.4 + Math.random() * 0.6;
      col[i * 3] = 0;
      col[i * 3 + 1] = bright * 0.8;
      col[i * 3 + 2] = bright;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.015) * 0.15;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial vertexColors size={0.035} sizeAttenuation transparent opacity={0.7} />
    </Points>
  );
}

/* Wireframe globe */
function WireGlobe() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    ref.current.rotation.z = state.clock.elapsedTime * 0.02;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[3.5, 32, 32]} />
      <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.06} />
    </mesh>
  );
}

/* Inner glowing sphere */
function GlowSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.03 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[3.2, 16, 16]} />
      <meshBasicMaterial color="#1e6fff" transparent opacity={0.04} />
    </mesh>
  );
}

/* Metro network nodes */
function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const theta = (i / 20) * Math.PI * 2;
      const phi = (Math.random() * 0.6 + 0.2) * Math.PI;
      const r = 3.5;
      return {
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ] as [number, number, number],
        scale: 0.04 + Math.random() * 0.06,
        speed: 0.5 + Math.random(),
        phase: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={node.speed} rotationIntensity={0.3} floatIntensity={0.2}>
          <mesh position={node.position}>
            <octahedronGeometry args={[node.scale, 0]} />
            <meshBasicMaterial
              color={i % 4 === 0 ? '#f0a020' : i % 3 === 0 ? '#1e6fff' : '#00d4ff'}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* Animated connection lines between nodes */
function ConnectionLines() {
  const groupRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const result = [];
    const nodeCount = 12;
    for (let i = 0; i < nodeCount; i++) {
      const a = (i / nodeCount) * Math.PI * 2;
      const b = ((i + 3) / nodeCount) * Math.PI * 2;
      const r = 3.5;
      const phi1 = Math.PI * 0.4;
      const phi2 = Math.PI * 0.6;
      result.push({
        points: [
          new THREE.Vector3(r * Math.sin(phi1) * Math.cos(a), r * Math.cos(phi1), r * Math.sin(phi1) * Math.sin(a)),
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(r * Math.sin(phi2) * Math.cos(b), r * Math.cos(phi2), r * Math.sin(phi2) * Math.sin(b)),
        ],
        color: i % 3 === 0 ? '#1e6fff' : '#00d4ff',
      });
    }
    return result;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          color={line.color}
          lineWidth={0.3}
          transparent
          opacity={0.12}
        />
      ))}
    </group>
  );
}

/* Horizontal ring grid */
function HorizonGrid() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = -4 + Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.04 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
      <planeGeometry args={[30, 30, 40, 40]} />
      <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.04} />
    </mesh>
  );
}

export default function InfraScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 55 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <WireGlobe />
      <GlowSphere />
      <NetworkNodes />
      <ConnectionLines />
      <ParticleCloud />
      <HorizonGrid />
    </Canvas>
  );
}
