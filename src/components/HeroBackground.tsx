import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleNetwork() {
  const ref = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 150; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  // Generate connections between nearby particles
  const lines = useMemo(() => {
    const linePositions = [];
    const particleCount = particles.length / 3;
    const maxDistance = 3.5;

    for (let i = 0; i < particleCount; i++) {
      const x1 = particles[i * 3];
      const y1 = particles[i * 3 + 1];
      const z1 = particles[i * 3 + 2];

      for (let j = i + 1; j < particleCount; j++) {
        const x2 = particles[j * 3];
        const y2 = particles[j * 3 + 1];
        const z2 = particles[j * 3 + 2];

        const distance = Math.sqrt(
          Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
        );

        if (distance < maxDistance) {
          linePositions.push(x1, y1, z1, x2, y2, z2);
        }
      }
    }

    return new Float32Array(linePositions);
  }, [particles]);

  // Animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (ref.current) {
      ref.current.rotation.y = time * 0.05;
      ref.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
    
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.05;
      linesRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
  });

  return (
    <>
      {/* Particles */}
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="hsl(var(--primary))"
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lines.length / 3}
            array={lines}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="hsl(var(--primary))"
          transparent
          opacity={0.2}
        />
      </lineSegments>
    </>
  );
}

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <ParticleNetwork />
      </Canvas>
    </div>
  );
};

export default HeroBackground;
