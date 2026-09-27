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
    scene.fog = new THREE.FogExp2(0x06112a, 0.035);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 15);

    // ── 01 Stratospheric Particle Starfield & Atmospheric Motes ──────────────
    const particleCount = 750;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xdfb743);
    const blueColor = new THREE.Color(0x38bdf8);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 42;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 46;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 36;

      const choice = Math.random();
      const col = choice > 0.6 ? goldColor : choice > 0.25 ? blueColor : whiteColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ── 02 3D Flight Navigation Rings & Compass Heading Gyros ────────────────
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    const ringConfigs = [
      { radius: 3.4, color: 0xc59b27, opacity: 0.28, y: -2, rotSpeed: 0.003 },
      { radius: 5.6, color: 0x2563eb, opacity: 0.22, y: -7, rotSpeed: -0.002 },
      { radius: 8.0, color: 0xdfb743, opacity: 0.25, y: -12, rotSpeed: 0.0015 },
    ];

    const rings: { mesh: THREE.LineLoop; speed: number }[] = [];

    ringConfigs.forEach((cfg) => {
      const ringGeom = new THREE.BufferGeometry();
      const segments = 80;
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(theta) * cfg.radius, 0, Math.sin(theta) * cfg.radius));
      }
      ringGeom.setFromPoints(pts);

      const ringMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
      });

      const ring = new THREE.LineLoop(ringGeom, ringMat);
      ring.position.y = cfg.y;
      ring.rotation.x = 0.28;
      ringsGroup.add(ring);
      rings.push({ mesh: ring, speed: cfg.rotSpeed });
    });

    // ── 03 Aeronautical Flight Streamlines & Altitude Vectors ─────────────────
    const vectorsGroup = new THREE.Group();
    scene.add(vectorsGroup);

    for (let v = 0; v < 8; v++) {
      const vGeom = new THREE.BufferGeometry();
      const startX = (Math.random() - 0.5) * 26;
      const startY = (Math.random() - 0.5) * 32;
      const startZ = (Math.random() - 0.5) * 18 - 3;
      const length = 7 + Math.random() * 9;

      const vPts = [
        new THREE.Vector3(startX, startY, startZ),
        new THREE.Vector3(startX + 1.4, startY + length, startZ - 1.8),
      ];
      vGeom.setFromPoints(vPts);

      const vMat = new THREE.LineBasicMaterial({
        color: v % 2 === 0 ? 0xdfb743 : 0x38bdf8,
        transparent: true,
        opacity: 0.24,
      });
      const vLine = new THREE.Line(vGeom, vMat);
      vectorsGroup.add(vLine);
    }

    // ── 04 Heraldic 3D Interceptor Jet (Modeled after the School Crest) ───────
    const planeGroup = new THREE.Group();
    scene.add(planeGroup);

    const bodyMat = new THREE.MeshBasicMaterial({
      color: 0x152a4e,
      transparent: true,
      opacity: 0.55,
    });
    const goldTrimMat = new THREE.MeshBasicMaterial({
      color: 0xdfb743,
      transparent: true,
      opacity: 0.85,
    });
    const glassMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.75,
    });

    // Main fuselage (aerodynamic body)
    const fuselage = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.28, 3.2, 8),
      bodyMat
    );
    fuselage.rotation.x = Math.PI / 2;
    planeGroup.add(fuselage);

    // Jet nosecone (sharp ascent)
    const nose = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.7, 8),
      goldTrimMat
    );
    nose.rotation.x = -Math.PI / 2;
    nose.position.z = -1.95;
    planeGroup.add(nose);

    // Cockpit canopy
    const canopy = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.18, 0.9),
      glassMat
    );
    canopy.position.set(0, 0.2, -0.4);
    planeGroup.add(canopy);

    // Delta wings (swept supersonic wings)
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0.5);
    wingShape.lineTo(2.2, -0.6);
    wingShape.lineTo(2.1, -1.0);
    wingShape.lineTo(0, -0.4);
    wingShape.lineTo(-2.1, -1.0);
    wingShape.lineTo(-2.2, -0.6);
    wingShape.closePath();

    const wingGeom = new THREE.ShapeGeometry(wingShape);
    const wingsMesh = new THREE.Mesh(wingGeom, bodyMat);
    wingsMesh.rotation.x = Math.PI / 2;
    wingsMesh.position.y = -0.04;
    wingsMesh.position.z = 0.2;
    planeGroup.add(wingsMesh);

    // Wing leading-edge gold trim
    const wingEdgeShape = new THREE.Shape();
    wingEdgeShape.moveTo(0, 0.52);
    wingEdgeShape.lineTo(2.22, -0.58);
    wingEdgeShape.lineTo(2.2, -0.62);
    wingEdgeShape.lineTo(0, 0.46);
    wingEdgeShape.lineTo(-2.2, -0.62);
    wingEdgeShape.lineTo(-2.22, -0.58);
    wingEdgeShape.closePath();
    const wingEdgeGeom = new THREE.ShapeGeometry(wingEdgeShape);
    const wingEdgeMesh = new THREE.Mesh(wingEdgeGeom, goldTrimMat);
    wingEdgeMesh.rotation.x = Math.PI / 2;
    wingEdgeMesh.position.y = -0.03;
    wingEdgeMesh.position.z = 0.2;
    planeGroup.add(wingEdgeMesh);

    // Twin vertical stabilizers / rudders
    const finGeom = new THREE.BoxGeometry(0.05, 0.65, 0.5);
    const finLeft = new THREE.Mesh(finGeom, goldTrimMat);
    finLeft.position.set(-0.45, 0.35, 1.2);
    finLeft.rotation.z = -0.15;
    planeGroup.add(finLeft);

    const finRight = new THREE.Mesh(finGeom, goldTrimMat);
    finRight.position.set(0.45, 0.35, 1.2);
    finRight.rotation.z = 0.15;
    planeGroup.add(finRight);

    // Initial airplane position in the hero viewport
    planeGroup.position.set(6.8, 5.2, -5);
    planeGroup.rotation.y = -0.6;
    planeGroup.rotation.z = 0.18;

    // ── 05 Volumetric Cloud Formations (Soft Low-Poly Puffs) ───────────────────
    const cloudsGroup = new THREE.Group();
    scene.add(cloudsGroup);

    const cloudMat = new THREE.MeshBasicMaterial({
      color: 0x0f2444,
      transparent: true,
      opacity: 0.14,
    });

    for (let c = 0; c < 9; c++) {
      const cluster = new THREE.Group();
      const count = 3 + Math.floor(Math.random() * 3);
      for (let p = 0; p < count; p++) {
        const puff = new THREE.Mesh(
          new THREE.IcosahedronGeometry(0.7 + Math.random() * 0.5, 0),
          cloudMat
        );
        puff.position.set(
          (Math.random() - 0.5) * 2.4,
          (Math.random() - 0.5) * 0.7,
          (Math.random() - 0.5) * 1.4
        );
        cluster.add(puff);
      }
      cluster.position.set(
        (Math.random() - 0.5) * 32,
        (Math.random() - 0.5) * 22 - 3,
        (Math.random() - 0.5) * 20 - 9
      );
      cluster.scale.setScalar(0.9 + Math.random() * 1.3);
      cloudsGroup.add(cluster);
    }

    // ── Interaction & Gyroscopic Parallax ─────────────────────────────────────
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);

    const onPointerMove = (e: PointerEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

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
        // Slow celestial particle drift
        particles.rotation.y = elapsed * 0.012;
        particles.rotation.x = Math.sin(elapsed * 0.008) * 0.04;

        // Navigational beacon rings rotation
        rings.forEach(({ mesh, speed }) => {
          mesh.rotation.y += speed;
          mesh.rotation.z = Math.sin(elapsed * 0.25) * 0.04;
        });

        // Altitude streamlines
        vectorsGroup.rotation.y = elapsed * 0.006;

        // Supersonic aircraft banking and floating responsive to mouse
        const bankTarget = -mouse.x * 0.35 + 0.18;
        const pitchTarget = mouse.y * 0.25 - 0.15;
        planeGroup.rotation.z += (bankTarget - planeGroup.rotation.z) * 0.05;
        planeGroup.rotation.x += (pitchTarget - planeGroup.rotation.x) * 0.05;
        planeGroup.position.y = 5.2 + Math.sin(elapsed * 0.5) * 0.45;
        planeGroup.position.x = 6.8 + Math.cos(elapsed * 0.2) * 0.3 + mouse.x * 0.8;

        // Clouds slowly drift
        cloudsGroup.rotation.y = elapsed * 0.005;
        cloudsGroup.position.x = Math.sin(elapsed * 0.015) * 2;
      }

      // Camera elevation descent on scroll
      const targetCamY = -scrollProgress * 20;
      const targetCamZ = 15 - scrollProgress * 4;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;

      // Mouse parallax tilt
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.03;
      camera.rotation.y = -mouse.x * 0.035;
      camera.rotation.x = mouse.y * 0.025;

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
      rings.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      vectorsGroup.traverse((obj) => {
        if (obj instanceof THREE.Line) {
          obj.geometry.dispose();
          (obj.material as THREE.Material).dispose();
        }
      });
      planeGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          (obj.material as THREE.Material).dispose();
        }
      });
      cloudsGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
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
