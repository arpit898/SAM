'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CityGeometry() {
  const groupRef = useRef<THREE.Group>(null);

  // Merged building edges for performance
  const buildingGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];

    // City grid: concentric rings getting shorter toward edges
    const cols = 10;
    const rows = 10;
    for (let ci = 0; ci < cols; ci++) {
      for (let ri = 0; ri < rows; ri++) {
        const cx = (ci - cols / 2) * 1.6 + (Math.random() - 0.5) * 0.4;
        const cz = (ri - rows / 2) * 1.6 + (Math.random() - 0.5) * 0.4;
        // Height falloff from center
        const distFromCenter = Math.sqrt(cx * cx + cz * cz) / 10;
        const maxH = Math.max(0.2, 4.5 - distFromCenter * 3.5);
        const h = 0.2 + Math.random() * maxH;
        const w = 0.35 + Math.random() * 0.55;
        const d = 0.35 + Math.random() * 0.55;

        const box = new THREE.BoxGeometry(w, h, d);
        const edges = new THREE.EdgesGeometry(box);
        const arr = edges.attributes.position.array;
        for (let j = 0; j < arr.length; j += 3) {
          positions.push(arr[j] + cx, arr[j + 1] + h / 2, arr[j + 2] + cz);
        }
        box.dispose();
        edges.dispose();
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  // Ground grid
  const gridGeo = useMemo(() => {
    const size = 18;
    const divisions = 24;
    const step = size / divisions;
    const positions: number[] = [];
    for (let i = 0; i <= divisions; i++) {
      const p = -size / 2 + i * step;
      positions.push(p, 0, -size / 2, p, 0, size / 2);
      positions.push(-size / 2, 0, p, size / 2, 0, p);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      <lineSegments geometry={buildingGeo}>
        <lineBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      <lineSegments geometry={gridGeo}>
        <lineBasicMaterial
          color="#1e4fff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// Floating particles above the city
function CityParticles() {
  const ref = useRef<THREE.Points>(null);
  const N = 600;
  const pos = useMemo(() => {
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = Math.random() * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const p = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < N; i++) {
      p[i * 3 + 1] += 0.005;
      if (p[i * 3 + 1] > 6) p[i * 3 + 1] = 0;
      p[i * 3] += Math.sin(t * 0.2 + i) * 0.001;
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
        color="#00d4ff"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export default function WireframeCity() {
  return (
    <Canvas
      camera={{ position: [8, 6, 8], fov: 50, near: 0.1, far: 200 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <fog attach="fog" args={['#050a1a', 10, 30]} />
      <CityGeometry />
      <CityParticles />
    </Canvas>
  );
}
