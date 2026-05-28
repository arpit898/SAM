'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 1200;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial color="#00d4ff" size={0.04} sizeAttenuation transparent opacity={0.6} />
    </Points>
  );
}

function GridPlane() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = -3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(30, 30, 30, 30);
    return geo;
  }, []);

  return (
    <mesh ref={ref} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.07} />
    </mesh>
  );
}

function FloatingNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        Math.cos((i / 12) * Math.PI * 2) * 5,
        Math.sin(i * 1.1) * 2,
        Math.sin((i / 12) * Math.PI * 2) * 5,
      ] as [number, number, number],
      scale: 0.06 + Math.random() * 0.08,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <octahedronGeometry args={[node.scale, 0]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#1e6fff' : '#00d4ff'} wireframe />
        </mesh>
      ))}
    </group>
  );
}

function ConnectingLines() {
  const ref = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const points: number[] = [];
    const nodeCount = 12;
    for (let i = 0; i < nodeCount; i++) {
      const a = (i / nodeCount) * Math.PI * 2;
      const b = ((i + 1) / nodeCount) * Math.PI * 2;
      points.push(Math.cos(a) * 5, Math.sin(i * 1.1) * 2, Math.sin(a) * 5);
      points.push(Math.cos(b) * 5, Math.sin((i + 1) * 1.1) * 2, Math.sin(b) * 5);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.08;
    const mat = ref.current.material as THREE.LineBasicMaterial;
    mat.opacity = 0.2 + Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#00d4ff" transparent opacity={0.25} />
    </lineSegments>
  );
}

export default function InfraScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 12], fov: 60 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <ParticleField />
      <GridPlane />
      <FloatingNodes />
      <ConnectingLines />
    </Canvas>
  );
}
