import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Anomaly Cubes Component
function AnomalyCubes() {
  const groupRef = useRef<THREE.Group>(null);
  
  const cubes = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      ] as [number, number, number],
      phase: Math.random() * Math.PI * 2,
      frequency: 0.5 + Math.random() * 0.5,
      morphPhase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.children.forEach((mesh, i) => {
        const cube = cubes[i];
        const m = mesh as THREE.Mesh;
        const mat = m.material as THREE.MeshBasicMaterial;
        
        // Random illumination
        const pulse = Math.sin(time * cube.frequency + cube.phase);
        const isActive = pulse > 0.7;
        mat.opacity = isActive ? 0.6 + pulse * 0.4 : 0.1;
        
        // Morph between cube and sphere-like shape
        const morphValue = (Math.sin(time * 0.3 + cube.morphPhase) + 1) * 0.5;
        m.scale.setScalar(0.3 + morphValue * 0.2);
        
        // Gentle rotation
        m.rotation.x += 0.01;
        m.rotation.y += 0.01;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.1}
            wireframe={Math.random() > 0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function CognitiveNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.Group>(null);

  // Generate fewer points for minimalist approach
  const points = useMemo(() => {
    const positions = [];
    const count = 25; // Fewer points for elegance
    
    for (let i = 0; i < count; i++) {
      positions.push(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10
      );
    }
    return new Float32Array(positions);
  }, []);

  // Track connection states for intermittent connections
  const connectionStates = useMemo(() => {
    return Array.from({ length: 25 }, () => ({
      phase: Math.random() * Math.PI * 2,
      frequency: 0.2 + Math.random() * 0.3,
      targetOpacity: 0
    }));
  }, []);

  // Create potential connections
  const connections = useMemo(() => {
    const conns = [];
    const maxDistance = 5;
    
    for (let i = 0; i < points.length / 3; i++) {
      for (let j = i + 1; j < points.length / 3; j++) {
        const dx = points[i * 3] - points[j * 3];
        const dy = points[i * 3 + 1] - points[j * 3 + 1];
        const dz = points[i * 3 + 2] - points[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < maxDistance) {
          conns.push({
            start: [points[i * 3], points[i * 3 + 1], points[i * 3 + 2]],
            end: [points[j * 3], points[j * 3 + 1], points[j * 3 + 2]],
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    }
    return conns;
  }, [points]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Very slow, gentle rotation
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.015;
      pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.08;
    }

    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.015;
      linesRef.current.rotation.x = Math.sin(time * 0.05) * 0.08;

      // Animate each connection intermittently
      linesRef.current.children.forEach((line, i) => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial;
        const conn = connections[i];
        
        // Intermittent pulsing - connections appear and fade
        const pulse = Math.sin(time * 0.3 + conn.phase);
        const shouldBeVisible = pulse > 0.6; // Only visible occasionally
        
        if (shouldBeVisible) {
          material.opacity = Math.min(0.5, (pulse - 0.6) * 1.2);
        } else {
          material.opacity *= 0.95; // Smooth fade out
        }
      });
    }
  });

  return (
    <>
      {/* Anomaly Cubes */}
      <AnomalyCubes />
      
      {/* Glowing Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length / 3}
            array={points}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          color="#06b6d4"
          transparent
          opacity={0.85}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>

      {/* Intermittent Connections */}
      <group ref={linesRef}>
        {connections.map((conn, i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([...conn.start, ...conn.end])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#06b6d4"
              transparent
              opacity={0}
              linewidth={1}
            />
          </line>
        ))}
      </group>
    </>
  );
}

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-white">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ background: "transparent" }}
      >
        <CognitiveNetwork />
      </Canvas>
    </div>
  );
};

export default HeroBackground;
