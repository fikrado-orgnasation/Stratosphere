import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function createFlightPath(points: THREE.Vector3[], color: number) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(100));
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.42 });
  return new THREE.Line(geometry, material);
}

export default function FlightCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const world = new THREE.Group();
    scene.add(world);

    const starPositions = new Float32Array(900 * 3);
    for (let i = 0; i < 900; i += 1) {
      const radius = 3.5 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 6;
      starPositions[i * 3] = Math.cos(theta) * radius;
      starPositions[i * 3 + 1] = height;
      starPositions[i * 3 + 2] = Math.sin(theta) * radius - 2;
    }
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starsGeometry,
      new THREE.PointsMaterial({ color: 0xf0c76b, size: 0.018, transparent: true, opacity: 0.68, sizeAttenuation: true }),
    );
    world.add(stars);

    const orbitalGroup = new THREE.Group();
    orbitalGroup.rotation.set(0.7, -0.35, -0.2);
    world.add(orbitalGroup);
    [1.75, 2.15, 2.55].forEach((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, index === 1 ? 0.012 : 0.007, 8, 96),
        new THREE.MeshBasicMaterial({
          color: index === 1 ? 0xd9a441 : 0x4e8fd6,
          transparent: true,
          opacity: index === 1 ? 0.5 : 0.26,
        }),
      );
      ring.rotation.x = index === 0 ? 0.16 : index === 2 ? -0.2 : 0;
      ring.rotation.y = index * 0.25;
      orbitalGroup.add(ring);
    });

    const pathGroup = new THREE.Group();
    pathGroup.add(
      createFlightPath(
        [new THREE.Vector3(-4.8, -1.5, -1), new THREE.Vector3(-2, -0.7, 0), new THREE.Vector3(0, 0.1, 0.3), new THREE.Vector3(2.5, 0.5, 0), new THREE.Vector3(5, 1.5, -1)],
        0x4e8fd6,
      ),
      createFlightPath(
        [new THREE.Vector3(-3.4, 1.6, -0.5), new THREE.Vector3(-1.1, 1.1, 0.3), new THREE.Vector3(1, 0.7, 0), new THREE.Vector3(3.6, 1.1, -1)],
        0xd9a441,
      ),
    );
    pathGroup.rotation.z = -0.12;
    world.add(pathGroup);

    const pointer = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clock = new THREE.Clock();

    const onPointerMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      pointer.lerp(target, 0.035);
      const movement = reducedMotion ? 0 : elapsed;
      stars.rotation.y = movement * 0.008;
      orbitalGroup.rotation.z = movement * 0.018;
      world.rotation.y += (pointer.x * 0.08 - world.rotation.y) * 0.035;
      world.rotation.x += (-pointer.y * 0.045 - world.rotation.x) * 0.035;
      camera.position.x += (pointer.x * 0.22 - camera.position.x) * 0.02;
      camera.position.y += (-pointer.y * 0.12 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(animate);
    };

    let frame = 0;
    resize();
    animate();
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(frame);
      starsGeometry.dispose();
      stars.material.dispose();
      pathGroup.traverse((object) => {
        if (object instanceof THREE.Line) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      orbitalGroup.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="flight-canvas" aria-hidden="true" />;
}
