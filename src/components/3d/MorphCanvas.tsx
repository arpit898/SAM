'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const N = 3500;

function makeSphere(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 2.2 + (Math.random() - 0.5) * 0.3;
    p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    p[i * 3 + 2] = r * Math.cos(phi);
  }
  return p;
}

function makeTunnel(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 2.0 + (Math.random() - 0.5) * 0.1;
    const z = (Math.random() - 0.5) * 5.5;
    p[i * 3] = Math.cos(angle) * r;
    p[i * 3 + 1] = Math.sin(angle) * r;
    p[i * 3 + 2] = z;
  }
  return p;
}

function makeCity(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  const GRID = 6;
  const perBuilding = Math.floor(n / (GRID * GRID));
  for (let i = 0; i < n; i++) {
    const bld = Math.floor(i / perBuilding);
    const col = (bld % GRID) - GRID / 2;
    const row = Math.floor(bld / GRID) - GRID / 2;
    const h = 1.2 + Math.sin(col * 1.3 + row * 0.8) * 0.9;
    const frac = (i % perBuilding) / perBuilding;
    p[i * 3] = col * 0.75 + (Math.random() - 0.5) * 0.22;
    p[i * 3 + 1] = frac * h * 3.2 - 1.8;
    p[i * 3 + 2] = row * 0.75 + (Math.random() - 0.5) * 0.22;
  }
  return p;
}

type Win = Window & { __morphProgress?: number };

function MorphParticles() {
  const ref = useRef<THREE.Points>(null);
  const shapes = useMemo(() => [makeSphere(N), makeTunnel(N), makeCity(N)], []);
  const initial = useMemo(() => {
    const p = new Float32Array(N * 3);
    for (let i = 0; i < N * 3; i++) p[i] = shapes[0][i];
    return p;
  }, [shapes]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const raw = typeof window !== 'undefined' ? ((window as Win).__morphProgress ?? 0) : 0;
    const progress = Math.max(0, Math.min(1, raw));
    const t = clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;

    let from: Float32Array, to: Float32Array, lt: number;
    if (progress < 0.5) {
      from = shapes[0]; to = shapes[1]; lt = progress * 2;
    } else {
      from = shapes[1]; to = shapes[2]; lt = (progress - 0.5) * 2;
    }

    // Smooth step + turbulence during transition
    const eased = lt * lt * (3 - 2 * lt);
    const turb = eased * (1 - eased) * 4.5;

    for (let i = 0; i < N; i++) {
      const nx = Math.sin(i * 0.011 + t * 1.8) * turb * 0.38;
      const ny = Math.cos(i * 0.013 + t * 1.5) * turb * 0.38;
      const nz = Math.sin(i * 0.009 + t * 2.1) * turb * 0.38;
      pos[i * 3] = from[i * 3] + (to[i * 3] - from[i * 3]) * eased + nx;
      pos[i * 3 + 1] = from[i * 3 + 1] + (to[i * 3 + 1] - from[i * 3 + 1]) * eased + ny;
      pos[i * 3 + 2] = from[i * 3 + 2] + (to[i * 3 + 2] - from[i * 3 + 2]) * eased + nz;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y += 0.003;
    ref.current.rotation.x = -0.25 + progress * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[initial, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.024}
        color="#00d4ff"
        transparent
        opacity={0.78}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function MorphCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight color="#0a1628" intensity={0.3} />
      <pointLight color="#00d4ff" intensity={2} position={[3, 3, 3]} />
      <MorphParticles />
    </Canvas>
  );
}
