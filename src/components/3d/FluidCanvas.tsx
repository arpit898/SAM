'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vert = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const frag = /* glsl */`
precision mediump float;
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.11;

  // Three-layer turbulent noise for organic fluid
  float f1 = noise(uv * 2.8 + vec2(t * 0.7, t * 0.35));
  float f2 = noise(uv * 5.1 - vec2(t * 0.44, t * 0.83) + f1 * 0.52);
  float f3 = noise(uv * 2.1 + vec2(t * 0.22, t * 0.54) + f2 * 0.38);
  float f = (f1 + f2 * 0.55 + f3 * 0.28) / 1.83;

  // Mouse ripple
  float md = length(uv - uMouse);
  f += sin(md * 22.0 - uTime * 5.2) * exp(-md * 7.5) * 0.09;

  // Deep navy -> dark teal -> subtle cyan accent
  vec3 col = vec3(0.012, 0.024, 0.065);
  col = mix(col, vec3(0.016, 0.055, 0.118), clamp(f * 2.6, 0.0, 1.0));
  col = mix(col, vec3(0.0, 0.092, 0.22), pow(max(f * 2.0 - 0.55, 0.0), 2.0) * 3.0);

  // Blueprint grid
  vec2 gp = fract(vUv * 28.0 + 0.5);
  float g = min(abs(gp.x - 0.5), abs(gp.y - 0.5));
  col += vec3(0.0, 0.011, 0.024) * (1.0 - smoothstep(0.0, 0.045, g));

  gl_FragColor = vec4(col, 1.0);
}
`;

function FluidPlane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouseVec = useRef(new THREE.Vector2(0.5, 0.5));
  const uniforms = useRef({
    uTime: { value: 0.0 },
    uMouse: { value: mouseVec.current },
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseVec.current.set(e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms.current}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function FluidCanvas() {
  return (
    <Canvas
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 1] }}
      style={{ width: '100%', height: '100%' }}
    >
      <FluidPlane />
    </Canvas>
  );
}
