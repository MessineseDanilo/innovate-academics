import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Text } from "@react-three/drei";
import * as THREE from "three";

function ParticleNetwork() {
  const ref = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const [pulsePhases] = useState(() => 
    Array.from({ length: 80 }, () => Math.random() * Math.PI * 2)
  );

  // Generate particles with varying sizes (representing node importance)
  const { particles, sizes } = useMemo(() => {
    const positions = [];
    const nodeSizes = [];
    for (let i = 0; i < 80; i++) {
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 15;
      positions.push(x, y, z);
      // Varying sizes for different node importance
      nodeSizes.push(0.25 + Math.random() * 0.3);
    }
    return { 
      particles: new Float32Array(positions), 
      sizes: new Float32Array(nodeSizes) 
    };
  }, []);

  // Generate probability labels at random positions
  const probabilityLabels = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      basePosition: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 12
      ] as [number, number, number],
      value: Math.random(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.4
    }));
  }, []);

  // Generate probability distribution curves
  const distributionCurves = useMemo(() => {
    return Array.from({ length: 4 }, () => {
      const points = [];
      const centerX = (Math.random() - 0.5) * 14;
      const centerY = (Math.random() - 0.5) * 14;
      const centerZ = (Math.random() - 0.5) * 10;
      
      // Create a bell curve
      for (let i = 0; i < 20; i++) {
        const x = (i - 10) * 0.3;
        const y = Math.exp(-(x * x) / 2) * 1.5;
        points.push(centerX + x, centerY + y, centerZ);
      }
      return {
        points: new Float32Array(points),
        basePosition: [centerX, centerY, centerZ] as [number, number, number],
        phase: Math.random() * Math.PI * 2
      };
    });
  }, []);

  // Generate connections between nearby particles
  const lines = useMemo(() => {
    const linePositions = [];
    const particleCount = particles.length / 3;
    const maxDistance = 4.5;

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

  // Animation with probabilistic pulsing
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (ref.current) {
      ref.current.rotation.y = time * 0.03;
      ref.current.rotation.x = Math.sin(time * 0.08) * 0.15;
      
      // Animate particle opacity based on their phase (probabilistic behavior)
      const colors = ref.current.geometry.attributes.color;
      if (colors) {
        for (let i = 0; i < pulsePhases.length; i++) {
          const pulse = (Math.sin(time * 0.8 + pulsePhases[i]) + 1) / 2;
          const intensity = 0.4 + pulse * 0.6;
          colors.setXYZ(i, intensity, intensity, intensity);
        }
        colors.needsUpdate = true;
      }
    }
    
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.03;
      linesRef.current.rotation.x = Math.sin(time * 0.08) * 0.15;
      
      // Pulse the line opacity to simulate probabilistic connections
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.15 + Math.sin(time * 0.5) * 0.1;
    }

    // Animate probability labels to float around
    probabilityLabels.forEach((label, i) => {
      const element = state.scene.getObjectByName(`prob-label-${i}`);
      if (element) {
        element.position.x = label.basePosition[0] + Math.sin(time * label.speed + label.phase) * 1.5;
        element.position.y = label.basePosition[1] + Math.cos(time * label.speed * 0.7 + label.phase) * 1.5;
      }
    });

    // Rotate distribution curves
    distributionCurves.forEach((curve, i) => {
      const element = state.scene.getObjectByName(`dist-curve-${i}`);
      if (element) {
        element.rotation.y = time * 0.1 + curve.phase;
        element.position.y = curve.basePosition[1] + Math.sin(time * 0.3 + curve.phase) * 0.5;
      }
    });
  });

  return (
    <>
      {/* Particles - Neural Network Nodes */}
      <group>
        <points ref={ref}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particles.length / 3}
              array={particles}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={particles.length / 3}
              array={new Float32Array(particles.length).fill(1)}
              itemSize={1}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.35}
            color="#67e8f9"
            transparent
            opacity={0.5}
            sizeAttenuation={true}
            depthWrite={false}
            vertexColors={false}
          />
        </points>
      </group>

      {/* Probability Labels */}
      {probabilityLabels.map((label, i) => (
        <Text
          key={i}
          name={`prob-label-${i}`}
          position={label.basePosition}
          fontSize={0.35}
          color="#67e8f9"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.5}
        >
          {`P=${(0.7 + label.value * 0.3).toFixed(2)}`}
        </Text>
      ))}

      {/* Distribution Curves */}
      {distributionCurves.map((curve, i) => (
        <line key={`curve-${i}`} name={`dist-curve-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={curve.points.length / 3}
              array={curve.points}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#67e8f9"
            transparent
            opacity={0.3}
            linewidth={2}
          />
        </line>
      ))}

      {/* Connection lines - Probabilistic Edges */}
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
          color="#67e8f9"
          transparent
          opacity={0.15}
          linewidth={1}
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
