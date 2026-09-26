import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CinematicAtmosphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06112a, 0.038);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 15);

    // Particle Cloud: Atmospheric Navigation Motes & Stars
    const particleCount = 650;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xd9a441);
    const blueColor = new THREE.Color(0x4e8fd6);
    const cyanColor = new THREE.Color(0x3fdc97);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 36;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 44;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 32;

      const choice = Math.random();
      const col = choice > 0.65 ? goldColor : choice > 0.15 ? blueColor : cyanColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 3D Geometric Flight Navigation Rings / Coordinate Beacons
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    const ringRadii = [3.2, 5.0, 7.4];
    const rings: THREE.LineLoop[] = [];

    ringRadii.forEach((rad, idx) => {
      const ringGeom = new THREE.BufferGeometry();
      const segments = 64;
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(theta) * rad, 0, Math.sin(theta) * rad));
      }
      ringGeom.setFromPoints(pts);

      const ringMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? 0x2c6fd6 : 0xd9a441,
        transparent: true,
        opacity: 0.18 + idx * 0.05,
      });

      const ring = new THREE.LineLoop(ringGeom, ringMat);
      ring.position.y = -idx * 5 - 2;
      ring.rotation.x = 0.25;
      ring.rotation.z = idx * 0.4;
      ringsGroup.add(ring);
      rings.push(ring);
    });

    // 3D Aeronautical Flight Vectors / Streamlines
    const vectorsGroup = new THREE.Group();
    scene.add(vectorsGroup);

    for (let v = 0; v < 6; v++) {
      const vGeom = new THREE.BufferGeometry();
      const startX = (Math.random() - 0.5) * 24;
      const startY = (Math.random() - 0.5) * 30;
      const startZ = (Math.random() - 0.5) * 16 - 4;
      const length = 6 + Math.random() * 8;

      const vPts = [
        new THREE.Vector3(startX, startY, startZ),
        new THREE.Vector3(startX + 1.2, startY + length, startZ - 1.5),
      ];
      vGeom.setFromPoints(vPts);

      const vMat = new THREE.LineBasicMaterial({
        color: v % 2 === 0 ? 0x4e8fd6 : 0xd9a441,
        transparent: true,
        opacity: 0.22,
      });
      const vLine = new THREE.Line(vGeom, vMat);
      vectorsGroup.add(vLine);
    }

    // Dynamic cursor lighting / spotlight
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);

    const onPointerMove = (e: PointerEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    // Scroll depth tracking
    let scrollProgress = 0;
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      }
    };
    onScroll();

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';

    resize();

    const clock = new THREE.Clock();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animId = 0;
    let isVisible = true;

    // Intersection observer to pause when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      mouse.lerp(targetMouse, 0.04);

      if (!reducedMotion) {
        // Slow atmospheric rotation
        particles.rotation.y = elapsed * 0.015;
        particles.rotation.x = Math.sin(elapsed * 0.01) * 0.05;

        ringsGroup.children.forEach((r, idx) => {
          r.rotation.y += 0.002 * (idx + 1);
          r.rotation.x = Math.sin(elapsed * 0.2 + idx) * 0.08 + 0.2;
        });

        vectorsGroup.rotation.y = elapsed * 0.008;
      }

      // Depth-based camera flight based on scroll
      // Camera moves downwards and forwards as user scrolls deeper into theory
      const targetCamY = -scrollProgress * 22;
      const targetCamZ = 15 - scrollProgress * 5;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;

      // Mouse parallax tilt
      camera.position.x += (mouse.x * 1.8 - camera.position.x) * 0.03;
      camera.rotation.y = -mouse.x * 0.04;
      camera.rotation.x = mouse.y * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      observer.disconnect();

      particleGeometry.dispose();
      particleMaterial.dispose();
      rings.forEach((r) => {
        r.geometry.dispose();
        (r.material as THREE.Material).dispose();
      });
      vectorsGroup.traverse((obj) => {
        if (obj instanceof THREE.Line) {
          obj.geometry.dispose();
          (obj.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="cinematic-atmosphere"
      aria-hidden="true"
    />
  );
}
