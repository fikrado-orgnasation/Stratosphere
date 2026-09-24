import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

/* ── GlobalPointer: makes R3F pointer track window mousemove ─────────────── */
function GlobalPointer() {
  const pointer = useThree((s) => s.pointer);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [pointer]);
  return null;
}

/* ── Stylized aircraft built from primitives ──────────────────────────────── */
function Aircraft({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.z = Math.sin(t * 0.6) * 0.08;
      group.current.rotation.x = Math.sin(t * 0.4) * 0.04;
      group.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      {/* Fuselage */}
      <mesh>
        <capsuleGeometry args={[0.12, 1.8, 8, 16]} />
        <meshStandardMaterial color="#dceeff" metalness={0.6} roughness={0.25} />
      </mesh>
      {/* Wings */}
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[3.2, 0.04, 0.5]} />
        <meshStandardMaterial color="#a8d4fb" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Tail wing */}
      <mesh position={[0, 0.15, -0.9]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.8, 0.03, 0.3]} />
        <meshStandardMaterial color="#7ab8f7" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Tail fin */}
      <mesh position={[0, 0.25, -0.95]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.03, 0.4, 0.35]} />
        <meshStandardMaterial color="#4b8ef5" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Engine glow */}
      <pointLight position={[0, 0, -1.1]} intensity={0.3} color="#4b8ef5" distance={3} />
    </group>
  );
}

/* ── Animated flight path (curved line) ────────────────────────────────────── */
function FlightPath() {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      const x = (t - 0.5) * 14;
      const y = Math.sin(t * Math.PI * 2) * 0.6 + 0.5;
      const z = Math.cos(t * Math.PI) * 2 - 1;
      pts.push([x, y, z]);
    }
    return pts;
  }, []);

  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={ref}>
      <Line points={points} color="#4b8ef5" lineWidth={1} transparent opacity={0.15} />
    </group>
  );
}

/* ── Atmospheric clouds (sprite-like planes) ───────────────────────────────── */
function Clouds() {
  const clouds = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      pos: [
        (i * 2.5 - 10),
        Math.sin(i * 1.3) * 1.5 - 1,
        -3 - (i % 3),
      ] as [number, number, number],
      scale: 1.5 + (i % 3) * 0.8,
      speed: 0.2 + (i % 4) * 0.1,
    }));
  }, []);

  return (
    <>
      {clouds.map((c) => (
        <CloudPuff key={c.id} pos={c.pos} scale={c.scale} speed={c.speed} />
      ))}
    </>
  );
}

function CloudPuff({ pos, scale, speed }: { pos: [number, number, number]; scale: number; speed: number }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = pos[0] + Math.sin(state.clock.elapsedTime * speed) * 0.8;
      ref.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime * speed * 0.7) * 0.3;
    }
  });

  return (
    <group ref={ref} position={pos} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.5, 12, 12]} />
        <meshStandardMaterial color="#f0f6ff" transparent opacity={0.06} depthWrite={false} />
      </mesh>
      <mesh position={[0.4, -0.1, 0]}>
        <sphereGeometry args={[0.35, 10, 10]} />
        <meshStandardMaterial color="#f0f6ff" transparent opacity={0.04} depthWrite={false} />
      </mesh>
      <mesh position={[-0.35, -0.05, 0.1]}>
        <sphereGeometry args={[0.3, 10, 10]} />
        <meshStandardMaterial color="#f0f6ff" transparent opacity={0.05} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ── Main scene ────────────────────────────────────────────────────────────── */
export default function AircraftScene() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const dt = state.clock.getDelta();
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        state.pointer.x * 0.08,
        0.5,
        dt
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        -state.pointer.y * 0.05,
        0.5,
        dt
      );
    }
  });

  return (
    <>
      <GlobalPointer />
      <group ref={group}>
        <Aircraft position={[0, 0.5, 0]} rotation={[0, -0.3, 0]} />
      </group>
      <FlightPath />
      <Clouds />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#dceeff" />
      <directionalLight position={[-3, 2, -5]} intensity={0.3} color="#4b8ef5" />

      <fog attach="fog" args={['#040b1a', 6, 18]} />
    </>
  );
}
