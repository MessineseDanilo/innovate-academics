import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Anomaly Cubes - Normal cubes that suddenly transform and light up
function AnomalyCubes() {
  const groupRef = useRef<THREE.Group>(null);
  
  const [cubes] = useState(() => 
    Array.from({ length: 8 }, () => ({
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      ] as [number, number, number],
      isAnomalous: false,
      anomalyStartTime: 0,
      nextAnomalyCheck: Math.random() * 5,
    }))
  );

  const normalGeometry = useMemo(() => new THREE.BoxGeometry(0.5, 0.5, 0.5), []);
  const anomalyGeometries = useMemo(() => [
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
        const cube = cubes[i];
        const m = mesh as THREE.Mesh;
        const mat = m.material as THREE.MeshStandardMaterial;
        
        // Check if it's time to trigger or end an anomaly
        if (!cube.isAnomalous && time > cube.nextAnomalyCheck) {
          // Random chance to become anomalous
          if (Math.random() > 0.85) {
            cube.isAnomalous = true;
            cube.anomalyStartTime = time;
            // Transform into random anomaly shape
            const randomShape = anomalyGeometries[Math.floor(Math.random() * anomalyGeometries.length)];
            m.geometry = randomShape;
          }
          cube.nextAnomalyCheck = time + 2 + Math.random() * 3;
        }
        
        // If anomalous, check if anomaly should end
        if (cube.isAnomalous) {
          const anomalyDuration = time - cube.anomalyStartTime;
          
          if (anomalyDuration > 1 + Math.random() * 2) {
            // End anomaly - return to cube
            cube.isAnomalous = false;
            m.geometry = normalGeometry;
          } else {
            // During anomaly: bright illumination
            const intensity = 1.5 + Math.sin(time * 8) * 0.5;
            mat.emissive.setHex(0x06b6d4);
            mat.emissiveIntensity = intensity;
            mat.opacity = 0.9;
            
            // Erratic rotation during anomaly
            m.rotation.x += 0.05;
            m.rotation.y += 0.08;
            m.rotation.z += 0.03;
          }
        } else {
          // Normal state: dim and gentle rotation
          mat.emissive.setHex(0x000000);
          mat.emissiveIntensity = 0;
          mat.opacity = 0.2;
          
          m.rotation.x += 0.01;
          m.rotation.y += 0.01;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position} geometry={normalGeometry}>
          <meshStandardMaterial
            color="#06b6d4"
            transparent
            opacity={0.2}
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
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <CognitiveNetwork />
      </Canvas>
    </div>
  );
};

export default HeroBackground;
