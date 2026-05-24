// @ts-nocheck
"use client";

import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

extend(THREE);

function JasmineParticles({ tilt }: { tilt: { x: number; y: number } }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(
    () =>
      Array.from({ length: 180 }, (_, i) => ({
        x: (((i * 31) % 100) / 100 - 0.5) * 16,
        y: (((i * 17) % 100) / 100 - 0.5) * 14,
        z: (((i * 47) % 100) / 100 - 0.5) * 8,
        speed: 0.004 + (((i * 11) % 100) / 1000),
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
      <planeGeometry args={[0.1, 0.1]} />
      <meshBasicMaterial color="#E8D5A3" transparent opacity={0.5} />
    </instancedMesh>
  );
}

function Mandala() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.z += 0.001;
  });
  return (
    <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={ref} position={[0, 0, -2]}>
        <torusGeometry args={[3.2, 0.05, 16, 160]} />
        <meshBasicMaterial color="#C9A962" wireframe transparent opacity={0.12} />
      </mesh>
    </Float>
  );
}

function InnerRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.z -= 0.0008;
  });
  return (
    <mesh ref={ref} position={[0, 0, -1.5]}>
      <torusGeometry args={[2.2, 0.03, 12, 100]} />
      <meshBasicMaterial color="#B8736B" wireframe transparent opacity={0.08} />
    </mesh>
  );
}

export default function ThreeBackground() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMotion = (e: DeviceMotionEvent) => {
      setTilt({
        x: e.accelerationIncludingGravity?.x ?? 0,
        y: e.accelerationIncludingGravity?.y ?? 0,
      });
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
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 4, 2]} color="#C9A962" intensity={0.9} />
        <pointLight position={[-3, -3, 2]} color="#E8D5A3" intensity={0.6} />
        <Mandala />
        <InnerRing />
        <JasmineParticles tilt={tilt} />
      </Canvas>
    </div>
  );
}
