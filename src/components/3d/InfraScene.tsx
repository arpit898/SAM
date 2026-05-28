'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

function noise(x: number, y: number, z: number): number {
  return (
    Math.sin(x * 1.7 + y * 2.3 + z * 0.9) * 0.5 +
    Math.sin(x * 0.8 - y * 1.1 + z * 2.1) * 0.3 +
    Math.cos(x * 3.1 + y * 0.7 - z * 1.5) * 0.2
  );
}

// Metro tunnel: 24 glowing rings flying toward camera
function TunnelRings() {
  const groupRef = useRef<THREE.Group>(null);
  const COUNT = 24;
  const SPACING = 2.8;

  const data = useMemo(() =>
    Array.from({ length: COUNT }, (_, i) => ({
      z: -i * SPACING,
      r: 2.0 + Math.sin(i * 0.5) * 0.12,
      highlight: i % 4 === 0,
      rotOff: i * 0.15,
    })), []);

  useFrame(() => {
    if (!groupRef.current) return;
    for (const c of groupRef.current.children) {
      c.position.z += 0.025;
      c.rotation.z += 0.0015;
      if (c.position.z > 4) c.position.z -= COUNT * SPACING;
    }
  });

  return (
    <group ref={groupRef}>
      {data.map((d, i) => (
        <mesh key={i} position={[0, 0, d.z]} rotation={[Math.PI / 2, 0, d.rotOff]}>
          <torusGeometry args={[d.r, 0.012, 8, 80]} />
          <meshBasicMaterial
            color={d.highlight ? '#00d4ff' : '#1e4fff'}
            transparent
            opacity={d.highlight ? 0.45 : 0.18}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Fluid particle stream — noise motion + mouse repulsion
function StreamParticles({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const ref = useRef<THREE.Points>(null);
  const N = 2500;

  const { pos, vel, phi } = useMemo(() => {
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N);
    const phi = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 1.9;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 55;
      vel[i] = 0.02 + Math.random() * 0.04;
      phi[i] = Math.random() * Math.PI * 2;
    }
    return { pos, vel, phi };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const p = ref.current.geometry.attributes.position.array as Float32Array;
    const t = clock.elapsedTime;
    const [mx, my] = mouse.current;

    for (let i = 0; i < N; i++) {
      p[i * 3 + 2] += vel[i];
      p[i * 3] += noise(p[i * 3] * 0.3 + t * 0.08, p[i * 3 + 1] * 0.3, t * 0.04) * 0.004;
      p[i * 3 + 1] += Math.sin(t * 0.12 + phi[i]) * 0.0025;

      const dx = p[i * 3] - mx * 2.5;
      const dy = p[i * 3 + 1] - my * 1.8;
      const d2 = dx * dx + dy * dy;
      if (d2 < 0.8 && d2 > 0.001) {
        const d = Math.sqrt(d2);
        p[i * 3] += (dx / d) * 0.007;
        p[i * 3 + 1] += (dy / d) * 0.007;
      }

      if (p[i * 3 + 2] > 5) {
        p[i * 3 + 2] = -55 + Math.random() * 5;
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * 1.9;
        p[i * 3] = Math.cos(a) * r;
        p[i * 3 + 1] = Math.sin(a) * r;
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
        size={0.016}
        color="#00d4ff"
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Structural steel beams — diagonal lines like scaffold falsework
function SteelFrame() {
  const beams: [[number, number, number], [number, number, number]][] = useMemo(() => [
    [[-3.5, 2, -4], [-1.5, -2, -14]],
    [[3.2, 1.5, -6], [1.2, -2, -16]],
    [[-2, -1.5, -3], [2.5, 1.5, -12]],
    [[0.5, 2.2, -5], [-2, -1.5, -15]],
    [[3, -1, -8], [-3, 1.5, -18]],
  ], []);

  return (
    <>
      {beams.map((pts, i) => (
        <Line key={i} points={pts} color="#1e4fff" transparent opacity={0.15} lineWidth={0.5} />
      ))}
    </>
  );
}

// Rippling wireframe survey grid below tunnel
function SurveyGrid() {
  const ref = useRef<THREE.Mesh>(null);
  const SEG = 32;
  const geo = useMemo(() => new THREE.PlaneGeometry(14, 14, SEG, SEG), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const attr = ref.current.geometry.attributes.position;
    const arr = attr.array as Float32Array;
    const cols = SEG + 1;
    for (let i = 0; i <= SEG; i++) {
      for (let j = 0; j <= SEG; j++) {
        const idx = (i * cols + j) * 3;
        const x = arr[idx];
        const y = arr[idx + 1];
        arr[idx + 2] =
          Math.sin(x * 0.7 + t * 1.1) * 0.14 +
          Math.sin(y * 0.5 + t * 0.8) * 0.1 +
          Math.sin((x + y) * 0.35 + t * 1.4) * 0.07;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <mesh ref={ref} geometry={geo} position={[0, -2.5, -6]} rotation={[-0.35, 0, 0]}>
      <meshBasicMaterial color="#1e4fff" transparent opacity={0.07} wireframe blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

// Floating octahedra — like survey markers / construction nodes
function FloatingNodes() {
  const g = useRef<THREE.Group>(null);
  const nodes = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      p: [(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 3.5, -Math.random() * 12 - 2] as [number, number, number],
      c: (['#f0a020', '#00d4ff', '#1e6fff'] as const)[i % 3],
      sp: 0.3 + Math.random() * 0.4,
      ph: Math.random() * Math.PI * 2,
    })), []);

  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.elapsedTime;
    g.current.children.forEach((n, i) => {
      n.position.y += Math.sin(t * nodes[i].sp + nodes[i].ph) * 0.003;
      n.rotation.x += 0.01;
      n.rotation.y += 0.015;
    });
  });

  return (
    <group ref={g}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.p}>
          <octahedronGeometry args={[0.055, 0]} />
          <meshBasicMaterial color={n.c} transparent opacity={0.65} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

// Ambient glow at tunnel end — depth and draw
function TunnelGlow() {
  return (
    <mesh position={[0, 0, -40]}>
      <sphereGeometry args={[5, 16, 16]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.025} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

// Camera scroll-driven flythrough + mouse parallax
function CameraRig({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { camera } = useThree();
  const lerp = useRef({ x: 0, y: 0.3 });

  useFrame(() => {
    const [mx, my] = mouse.current;
    const scrollP = typeof window !== 'undefined'
      ? ((window as Window & { __heroScrollProgress?: number }).__heroScrollProgress ?? 0)
      : 0;

    lerp.current.x += (mx * 0.35 * (1 - scrollP * 0.6) - lerp.current.x) * 0.035;
    lerp.current.y += (-my * 0.2 + 0.3 - lerp.current.y) * 0.035;

    camera.position.x = lerp.current.x;
    camera.position.y = lerp.current.y;
    camera.position.z = 6 - scrollP * 48; // flies into tunnel on hero scroll
    camera.lookAt(lerp.current.x * 0.1, lerp.current.y * 0.1, camera.position.z - 20);
  });

  return null;
}

function Scene() {
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      ];
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      mouse.current = [
        (e.touches[0].clientX / window.innerWidth) * 2 - 1,
        -((e.touches[0].clientY / window.innerHeight) * 2 - 1),
      ];
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return (
    <>
      <fog attach="fog" args={['#050a1a', 8, 55]} />
      <ambientLight color="#0a1628" intensity={0.4} />
      <pointLight color="#00d4ff" intensity={2.5} position={[0, 0, 3]} distance={18} />
      <pointLight color="#1e3fff" intensity={1.2} position={[2, 2, -8]} distance={35} />
      <pointLight color="#f0a020" intensity={0.4} position={[-4, -2, -4]} distance={20} />
      <TunnelRings />
      <StreamParticles mouse={mouse} />
      <SteelFrame />
      <FloatingNodes />
      <SurveyGrid />
      <TunnelGlow />
      <CameraRig mouse={mouse} />
    </>
  );
}

export default function InfraScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 6], fov: 55, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  );
}
