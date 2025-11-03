import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Anomaly Shapes Component - Unpredictable forms that light up like bulbs
function AnomalyShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const [shapes] = useState(() => 
    Array.from({ length: 8 }, () => ({
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      ] as [number, number, number],
      phase: Math.random() * Math.PI * 2,
      frequency: 0.3 + Math.random() * 0.7,
      nextShapeTime: Math.random() * 3,
      currentShape: Math.floor(Math.random() * 6),
    }))
  );

  const geometries = useMemo(() => [
    new THREE.TetrahedronGeometry(0.6),
    new THREE.OctahedronGeometry(0.6),
    new THREE.IcosahedronGeometry(0.6),
    new THREE.DodecahedronGeometry(0.6),
    new THREE.TorusGeometry(0.4, 0.15, 8, 12),
    new THREE.TorusKnotGeometry(0.4, 0.12, 32, 8),
  ], []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.children.forEach((mesh, i) => {
        const shape = shapes[i];
        const m = mesh as THREE.Mesh;
        const mat = m.material as THREE.MeshStandardMaterial;
        
        // Random "light bulb" illumination - sudden bright flashes
        const pulse = Math.sin(time * shape.frequency + shape.phase);
        const randomFlash = Math.random() > 0.97; // Occasional random flash
        const isActive = pulse > 0.8 || randomFlash;
        
        if (isActive) {
          // Bright like a light bulb
          mat.emissive.setHex(0x06b6d4);
          mat.emissiveIntensity = randomFlash ? 2.5 : 1.5 + pulse;
          mat.opacity = 0.9;
        } else {
          // Dim/off
          mat.emissive.setHex(0x000000);
          mat.emissiveIntensity = 0;
          mat.opacity = 0.15;
        }
        
        // Change shape unexpectedly
        if (Math.floor(time) !== Math.floor(time - 0.016)) {
          if (Math.random() > 0.95) {
            shape.currentShape = Math.floor(Math.random() * geometries.length);
            m.geometry = geometries[shape.currentShape];
          }
        }
        
        // Unpredictable rotation
        m.rotation.x += 0.02 * (Math.sin(time * 0.5) + 1);
        m.rotation.y += 0.015 * (Math.cos(time * 0.3) + 1);
        m.rotation.z += 0.01 * Math.sin(time * 0.7);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.position} geometry={geometries[shape.currentShape]}>
          <meshStandardMaterial
            color="#06b6d4"
            transparent
            opacity={0.15}
            emissive="#000000"
            emissiveIntensity={0}
            metalness={0.8}
            roughness={0.2}
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
      {/* Anomaly Shapes */}
      <AnomalyShapes />
      
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
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <CognitiveNetwork />
      </Canvas>
    </div>
  );
};

export default HeroBackground;
