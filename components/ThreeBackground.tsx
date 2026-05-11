"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function JasmineParticles({ tilt }: { tilt: { x: number; y: number } }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(
    () =>
      Array.from({ length: 200 }, (_, i) => ({
        x: (((i * 31) % 100) / 100 - 0.5) * 16,
        y: (((i * 17) % 100) / 100 - 0.5) * 14,
        z: (((i * 47) % 100) / 100 - 0.5) * 8,
        speed: 0.005 + (((i * 11) % 100) / 1000),
      })),
    [],
  );

  useFrame(() => {
    if (!mesh.current) return;
    particles.forEach((p, i) => {
      p.y += p.speed + tilt.y * 0.001;
      p.x += Math.sin(p.y) * 0.001 + tilt.x * 0.001;
      if (p.y > 8) p.y = -8;
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.z += 0.002;
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, particles.length]}>
      <planeGeometry args={[0.12, 0.12]} />
      <meshBasicMaterial color="#FFF8DC" transparent opacity={0.65} />
    </instancedMesh>
  );
}

function Mandala() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.z += 0.0015;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={ref} position={[0, 0, -2]}>
        <torusGeometry args={[3.4, 0.06, 18, 180]} />
        <meshBasicMaterial color="#F2C94C" wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

export default function ThreeBackground() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMotion = (e: DeviceMotionEvent) => {
      setTilt({ x: e.accelerationIncludingGravity?.x ?? 0, y: e.accelerationIncludingGravity?.y ?? 0 });
    };
    const onVisibility = () => {
      if (document.hidden) setTilt({ x: 0, y: 0 });
    };
    window.addEventListener("devicemotion", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("devicemotion", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 4, 2]} color="#E8882A" intensity={1.1} />
        <pointLight position={[-3, -3, 2]} color="#FFF8DC" intensity={0.8} />
        <Mandala />
        <JasmineParticles tilt={tilt} />
      </Canvas>
    </div>
  );
}
