'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Noise helper ────────────────────────────────────────────────────────────
function noise(x: number, y: number, z: number): number {
  return (
    Math.sin(x * 1.7 + y * 2.3 + z * 0.9) * 0.5 +
    Math.sin(x * 0.8 - y * 1.1 + z * 2.1) * 0.3 +
    Math.cos(x * 3.1 + y * 0.7 - z * 1.5) * 0.2
  );
}

// ─── Procedural Buildings ────────────────────────────────────────────────────
function CityBuildings() {
  const groupRef = useRef<THREE.Group>(null);

  const buildings = useMemo(() => {
    const bs = [];
    const grid = [
      [-6, -4], [-4, -5], [-2, -3], [0, -6], [2, -4], [4, -5], [6, -3],
      [-5, -8], [-3, -7], [-1, -9], [1, -7], [3, -8], [5, -6],
      [-7, -5], [-5, -3], [-3, -4], [1, -5], [3, -3], [5, -4], [7, -5],
    ];
    for (const [x, z] of grid) {
      const height = 1.5 + Math.abs(Math.sin((x ?? 0) * 0.7 + (z ?? 0) * 0.4)) * 4;
      const width = 0.5 + Math.random() * 0.5;
      const depth = 0.5 + Math.random() * 0.5;
      bs.push({
        x: x ?? 0,
        z: z ?? 0,
        height,
        width,
        depth,
        color: Math.random() > 0.7 ? '#FFD700' : Math.random() > 0.5 ? '#FF4D00' : '#333333',
        opacity: 0.08 + Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return bs;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      if (buildings[i]) {
        child.position.y = Math.sin(t * 0.3 + buildings[i].phase) * 0.03;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.height / 2 - 2.5, b.z]}>
          <boxGeometry args={[b.width, b.height, b.depth]} />
          <meshBasicMaterial
            color={b.color}
            transparent
            opacity={b.opacity}
            wireframe
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Solid Building Bases ────────────────────────────────────────────────────
function BuildingBases() {
  const buildings = useMemo(() => {
    return [
      { x: -6, z: -4, h: 2.5, w: 0.7, d: 0.6 },
      { x: 0, z: -6, h: 4.0, w: 0.8, d: 0.7 },
      { x: 4, z: -5, h: 3.0, w: 0.6, d: 0.6 },
      { x: -3, z: -7, h: 3.5, w: 0.7, d: 0.7 },
      { x: 3, z: -8, h: 2.0, w: 0.6, d: 0.5 },
    ];
  }, []);

  return (
    <group>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2 - 2.5, b.z]}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.03}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Construction Cranes ─────────────────────────────────────────────────────
function Cranes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      if (child.children[1]) {
        child.children[1].rotation.y = Math.sin(t * 0.2 + i * 1.5) * 0.8;
      }
    });
  });

  const craneData = [
    { x: -5, z: -5 },
    { x: 2, z: -4 },
  ];

  return (
    <group ref={groupRef}>
      {craneData.map((c, i) => (
        <group key={i} position={[c.x, 0, c.z]}>
          {/* Mast - vertical */}
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[0.05, 4, 0.05]} />
            <meshBasicMaterial
              color="#FFD700"
              transparent
              opacity={0.25}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          {/* Horizontal jib */}
          <group position={[0, 3, 0]}>
            <mesh position={[0.75, 0, 0]}>
              <boxGeometry args={[1.5, 0.04, 0.04]} />
              <meshBasicMaterial
                color="#FFD700"
                transparent
                opacity={0.2}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

// ─── Blueprint Grid Floor ────────────────────────────────────────────────────
function BlueprintGrid() {
  const ref = useRef<THREE.Mesh>(null);
  const SEG = 40;
  const geo = useMemo(() => new THREE.PlaneGeometry(20, 20, SEG, SEG), []);

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
          Math.sin((x ?? 0) * 0.5 + t * 0.8) * 0.08 +
          Math.sin((y ?? 0) * 0.4 + t * 0.6) * 0.06 +
          Math.sin(((x ?? 0) + (y ?? 0)) * 0.3 + t * 1.1) * 0.04;
      }
    }
    attr.needsUpdate = true;
    ref.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={ref} geometry={geo} position={[0, -2.5, -6]} rotation={[-0.3, 0, 0]}>
      <meshBasicMaterial
        color="#FFD700"
        transparent
        opacity={0.05}
        wireframe
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── Metro Tunnel Rings ───────────────────────────────────────────────────────
function TunnelRings() {
  const groupRef = useRef<THREE.Group>(null);
  const COUNT = 20;
  const SPACING = 2.8;

  const data = useMemo(() =>
    Array.from({ length: COUNT }, (_, i) => ({
      z: -i * SPACING,
      r: 1.8 + Math.sin(i * 0.5) * 0.1,
      highlight: i % 5 === 0,
      rotOff: i * 0.12,
    })), []);

  useFrame(() => {
    if (!groupRef.current) return;
    for (const c of groupRef.current.children) {
      c.position.z += 0.02;
      c.rotation.z += 0.001;
      if (c.position.z > 4) c.position.z -= COUNT * SPACING;
    }
  });

  return (
    <group ref={groupRef}>
      {data.map((d, i) => (
        <mesh key={i} position={[0, 0, d.z]} rotation={[Math.PI / 2, 0, d.rotOff]}>
          <torusGeometry args={[d.r, 0.01, 8, 80]} />
          <meshBasicMaterial
            color={d.highlight ? '#FFD700' : '#FF4D00'}
            transparent
            opacity={d.highlight ? 0.4 : 0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Stream Particles ─────────────────────────────────────────────────────────
function StreamParticles({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const ref = useRef<THREE.Points>(null);
  const N = 3000;

  const { pos, vel, phi } = useMemo(() => {
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N);
    const phi = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 2.2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
      vel[i] = 0.015 + Math.random() * 0.03;
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
      p[i * 3] += noise((p[i * 3] ?? 0) * 0.3 + t * 0.06, (p[i * 3 + 1] ?? 0) * 0.3, t * 0.03) * 0.003;
      p[i * 3 + 1] += Math.sin(t * 0.1 + (phi[i] ?? 0)) * 0.002;

      const dx = (p[i * 3] ?? 0) - mx * 2.5;
      const dy = (p[i * 3 + 1] ?? 0) - my * 1.8;
      const d2 = dx * dx + dy * dy;
      if (d2 < 0.6 && d2 > 0.001) {
        const d = Math.sqrt(d2);
        p[i * 3] += (dx / d) * 0.006;
        p[i * 3 + 1] += (dy / d) * 0.006;
      }

      if ((p[i * 3 + 2] ?? 0) > 5) {
        p[i * 3 + 2] = -60 + Math.random() * 5;
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * 2.2;
        p[i * 3] = Math.cos(a) * r;
        p[i * 3 + 1] = Math.sin(a) * r;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={N} args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#FFD700"
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Floating Data Nodes ──────────────────────────────────────────────────────
function DataNodes() {
  const g = useRef<THREE.Group>(null);
  const nodes = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      p: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4, -Math.random() * 10 - 2] as [number, number, number],
      c: (['#FFD700', '#FF4D00', '#ffffff', '#00FFFF'] as const)[i % 4],
      sp: 0.2 + Math.random() * 0.5,
      ph: Math.random() * Math.PI * 2,
      size: 0.03 + Math.random() * 0.04,
    })), []);

  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.elapsedTime;
    g.current.children.forEach((n, i) => {
      if (nodes[i]) {
        n.position.y = nodes[i].p[1] + Math.sin(t * nodes[i].sp + nodes[i].ph) * 0.15;
        n.rotation.x += 0.012;
        n.rotation.y += 0.018;
      }
    });
  });

  return (
    <group ref={g}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.p}>
          <octahedronGeometry args={[n.size, 0]} />
          <meshBasicMaterial
            color={n.c}
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Ambient Glow ──────────────────────────────────────────────────────────────
function AmbientGlows() {
  return (
    <>
      <mesh position={[0, 0, -35]}>
        <sphereGeometry args={[6, 16, 16]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.012}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[-4, 2, -15]}>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial
          color="#FF4D00"
          transparent
          opacity={0.01}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

// ─── Camera Rig ───────────────────────────────────────────────────────────────
function CameraRig({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { camera } = useThree();
  const lerp = useRef({ x: 0, y: 0.2 });

  useFrame(() => {
    const [mx, my] = mouse.current;
    const scrollP = typeof window !== 'undefined'
      ? ((window as Window & { __heroScrollProgress?: number }).__heroScrollProgress ?? 0)
      : 0;

    lerp.current.x += (mx * 0.3 * (1 - scrollP * 0.5) - lerp.current.x) * 0.03;
    lerp.current.y += (-my * 0.15 + 0.2 - lerp.current.y) * 0.03;

    camera.position.x = lerp.current.x;
    camera.position.y = lerp.current.y;
    camera.position.z = 6 - scrollP * 52;
    camera.lookAt(lerp.current.x * 0.08, lerp.current.y * 0.08, camera.position.z - 18);
  });

  return null;
}

// ─── Scene ────────────────────────────────────────────────────────────────────
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
      <fog attach="fog" args={['#000', 10, 60]} />
      <ambientLight color="#050505" intensity={0.3} />
      <pointLight color="#FFD700" intensity={3} position={[0, 2, 3]} distance={20} />
      <pointLight color="#FF4D00" intensity={1.5} position={[3, 3, -6]} distance={40} />
      <pointLight color="#FFD700" intensity={0.5} position={[-5, -1, -4]} distance={25} />
      <pointLight color="#4488FF" intensity={0.3} position={[0, -2, -10]} distance={30} />
      <TunnelRings />
      <StreamParticles mouse={mouse} />
      <CityBuildings />
      <BuildingBases />
      <Cranes />
      <BlueprintGrid />
      <DataNodes />
      <AmbientGlows />
      <CameraRig mouse={mouse} />
    </>
  );
}

export default function InfraScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 6], fov: 58, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  );
}
