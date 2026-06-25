import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// ── Low-poly airplane model (built from primitives) ───────────────────────────
function AirplaneModel({ color = '#d4af37' }: { color?: string }) {
  return (
    <group rotation={[0, Math.PI * 0.15, 0]}>
      {/* Fuselage */}
      <mesh castShadow>
        <capsuleGeometry args={[0.35, 2.4, 8, 16]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0, 0, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.35, 0.6, 16]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Main wings */}
      <mesh position={[0, 0, 0.2]} castShadow>
        <boxGeometry args={[3.6, 0.08, 0.7]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Tail wings */}
      <mesh position={[0, 0, 1.1]} castShadow>
        <boxGeometry args={[1.6, 0.06, 0.4]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Vertical stabilizer */}
      <mesh position={[0, 0.35, 1.2]} castShadow>
        <boxGeometry args={[0.06, 0.7, 0.5]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Cockpit glass */}
      <mesh position={[0, 0.18, -0.7]}>
        <sphereGeometry args={[0.28, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1e3e72" metalness={0.9} roughness={0.1} transparent opacity={0.7} />
      </mesh>
      {/* Engine nacelles */}
      <mesh position={[1.1, -0.1, 0.2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.5, 12]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[-1.1, -0.1, 0.2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.5, 12]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  );
}

// ── Hero airplane: large, slowly circling, mouse-reactive ──────────────────────
function HeroAirplane() {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    // Slow circular orbit
    const t = state.clock.elapsedTime;
    group.current.position.x = Math.sin(t * 0.25) * 3.5;
    group.current.position.z = Math.cos(t * 0.25) * 3.5 - 1;
    group.current.position.y = Math.sin(t * 0.4) * 0.4 + 0.5;
    // Bank into the turn
    group.current.rotation.y = t * 0.25 + Math.PI * 0.5;
    group.current.rotation.z = -0.15;
    // Subtle mouse parallax
    group.current.rotation.x = mouse.y * 0.15;
  });

  return (
    <group ref={group}>
      <AirplaneModel color="#d4af37" />
    </group>
  );
}

// ── Background airplanes flying across the scene ──────────────────────────────
function BackgroundPlane({ offset, speed, color, scale, y }: { offset: number; speed: number; color: string; scale: number; y: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = ((t % 20) - 10) * 1.5;
    ref.current.position.y = y + Math.sin(t * 0.5) * 0.3;
    ref.current.rotation.y = Math.PI * 0.5;
    ref.current.rotation.z = Math.sin(t * 0.5) * 0.05;
  });
  return (
    <group ref={ref} scale={scale}>
      <AirplaneModel color={color} />
    </group>
  );
}

// ── Floating clouds (soft spheres) ───────────────────────────────────────────
function Cloud({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <group position={position} scale={scale}>
        {[0, 1, 2, 3, 4].map(i => (
          <mesh key={i} position={[(i - 2) * 0.6, Math.sin(i) * 0.2, Math.cos(i) * 0.2]}>
            <sphereGeometry args={[0.5 + Math.random() * 0.2, 12, 12]} />
            <meshStandardMaterial color="#1e3e72" transparent opacity={0.12} roughness={1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// ── Main 3D scene ─────────────────────────────────────────────────────────────
export default function Scene3D() {
  const clouds = useMemo(
    () => Array.from({ length: 6 }, () => ({
      position: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 4 + 1,
        (Math.random() - 0.5) * 8 - 4,
      ] as [number, number, number],
      scale: Math.random() * 0.8 + 0.6,
    })),
    [],
  );

  const bgPlanes = useMemo(
    () => Array.from({ length: 4 }, (_, i) => ({
      offset: i * 5,
      speed: 0.15 + i * 0.05,
      color: i % 2 === 0 ? '#d4af37' : '#f0c040',
      scale: 0.3 + Math.random() * 0.2,
      y: (Math.random() - 0.5) * 4,
    })),
    [],
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <pointLight position={[-5, 3, -5]} intensity={0.6} color="#d4af37" />
      <pointLight position={[5, -3, 5]} intensity={0.4} color="#1e3e72" />

      <HeroAirplane />

      {bgPlanes.map((p, i) => (
        <BackgroundPlane key={i} {...p} />
      ))}

      {clouds.map((c, i) => (
        <Cloud key={i} {...c} />
      ))}

      <Stars radius={50} depth={30} count={1500} factor={4} saturation={0} fade speed={1} />

      <Sparkles count={60} scale={12} size={2} speed={0.3} color="#d4af37" opacity={0.4} />

      <Environment preset="night" />
      <fog attach="fog" args={['#0d2347', 8, 25]} />
    </Canvas>
  );
}
