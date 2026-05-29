'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Cutterhead: circular disc with radial spokes and a ring
function Cutterhead() {
  const ref = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const positions: number[] = [];
    const R = 1.8;
    const spokes = 12;

    // Outer rim
    for (let i = 0; i < 128; i++) {
      const a0 = (i / 128) * Math.PI * 2;
      const a1 = ((i + 1) / 128) * Math.PI * 2;
      positions.push(Math.cos(a0) * R, Math.sin(a0) * R, 0);
      positions.push(Math.cos(a1) * R, Math.sin(a1) * R, 0);
    }
    // Inner rim
    for (let i = 0; i < 64; i++) {
      const a0 = (i / 64) * Math.PI * 2;
      const a1 = ((i + 1) / 64) * Math.PI * 2;
      positions.push(Math.cos(a0) * R * 0.55, Math.sin(a0) * R * 0.55, 0);
      positions.push(Math.cos(a1) * R * 0.55, Math.sin(a1) * R * 0.55, 0);
    }
    // Spokes
    for (let i = 0; i < spokes; i++) {
      const a = (i / spokes) * Math.PI * 2;
      positions.push(0, 0, 0);
      positions.push(Math.cos(a) * R, Math.sin(a) * R, 0);
    }
    // Cross bracing
    for (let i = 0; i < spokes / 2; i++) {
      const a0 = (i / (spokes / 2)) * Math.PI * 2;
      const a1 = a0 + Math.PI / 6;
      positions.push(Math.cos(a0) * R * 0.55, Math.sin(a0) * R * 0.55, 0);
      positions.push(Math.cos(a1) * R, Math.sin(a1) * R, 0);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.elapsedTime * 0.3;
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// Tunnel lining rings behind the TBM
function TunnelLining() {
  const groupRef = useRef<THREE.Group>(null);
  const COUNT = 18;
  const SPACING = 1.4;

  const ringsGeo = useMemo(() => {
    const positions: number[] = [];
    for (let ring = 0; ring < COUNT; ring++) {
      const z = -(ring + 1) * SPACING;
      const fade = 1 - ring / COUNT;
      const R = 1.85 + fade * 0.02;
      const segs = 64;
      for (let i = 0; i < segs; i++) {
        const a0 = (i / segs) * Math.PI * 2;
        const a1 = ((i + 1) / segs) * Math.PI * 2;
        positions.push(Math.cos(a0) * R, Math.sin(a0) * R, z);
        positions.push(Math.cos(a1) * R, Math.sin(a1) * R, z);
      }
      // Segment joints every 45°
      for (let j = 0; j < 8; j++) {
        const a = (j / 8) * Math.PI * 2;
        const r0 = R - 0.06;
        const r1 = R + 0.06;
        positions.push(Math.cos(a) * r0, Math.sin(a) * r0, z);
        positions.push(Math.cos(a) * r1, Math.sin(a) * r1, z);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <lineSegments geometry={ringsGeo}>
      <lineBasicMaterial
        color="#1e4fff"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

// Rock/soil strata cross-section around the tunnel
function RockStrata() {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const layers = 6;
    for (let l = 0; l < layers; l++) {
      const R = 2.1 + l * 0.7;
      const segs = 80;
      // Draw arc for each layer (simulate soil cross-section)
      for (let i = 0; i < segs; i++) {
        const a0 = (i / segs) * Math.PI * 2;
        const a1 = ((i + 1) / segs) * Math.PI * 2;
        const noise0 = 1 + Math.sin(a0 * 3 + l * 1.5) * 0.05;
        const noise1 = 1 + Math.sin(a1 * 3 + l * 1.5) * 0.05;
        positions.push(Math.cos(a0) * R * noise0, Math.sin(a0) * R * noise0, -4);
        positions.push(Math.cos(a1) * R * noise1, Math.sin(a1) * R * noise1, -4);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color="#8899bb"
        transparent
        opacity={0.1}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

// Debris particles streaming from cutterhead
function DebrisParticles() {
  const ref = useRef<THREE.Points>(null);
  const N = 800;

  const { pos, vel, life } = useMemo(() => {
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N * 3);
    const life = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 1.8;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      vel[i * 3] = (Math.random() - 0.5) * 0.04;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
      vel[i * 3 + 2] = -(0.02 + Math.random() * 0.05);
      life[i] = Math.random();
    }
    return { pos, vel, life };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const p = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < N; i++) {
      p[i * 3] += vel[i * 3];
      p[i * 3 + 1] += vel[i * 3 + 1];
      p[i * 3 + 2] += vel[i * 3 + 2];
      life[i] -= 0.008;
      if (life[i] <= 0) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * 1.8;
        p[i * 3] = Math.cos(a) * r;
        p[i * 3 + 1] = Math.sin(a) * r;
        p[i * 3 + 2] = 0;
        life[i] = 1;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#f0a020"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// Ambient glow at TBM center
function CenterGlow() {
  return (
    <>
      <mesh position={[0, 0, 0.3]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

export default function TBMScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 52, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <fog attach="fog" args={['#000000', 8, 35]} />
      <pointLight color="#00d4ff" intensity={3} position={[0, 0, 3]} distance={15} />
      <pointLight color="#1e4fff" intensity={1.5} position={[0, 0, -5]} distance={25} />
      <Cutterhead />
      <TunnelLining />
      <RockStrata />
      <DebrisParticles />
      <CenterGlow />
    </Canvas>
  );
}
