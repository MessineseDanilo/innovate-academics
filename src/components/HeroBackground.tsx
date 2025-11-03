import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CognitiveNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.Group>(null);
  const anomalyNodesRef = useRef<THREE.Group>(null);

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

  // Track which nodes are currently anomalous
  const [anomalousNodes] = useState(() => 
    Array.from({ length: 25 }, () => ({
      isAnomalous: false,
      anomalyStartTime: 0,
      nextAnomalyCheck: Math.random() * 5,
      anomalyShape: 0,
      lightPulse: 0, // Yellow light pulse intensity
      nextPulseCheck: Math.random() * 3,
    }))
  );

  const anomalyGeometries = useMemo(() => [
    new THREE.BoxGeometry(0.4, 0.4, 0.4),
    new THREE.TetrahedronGeometry(0.5),
    new THREE.OctahedronGeometry(0.5),
    new THREE.IcosahedronGeometry(0.5),
    new THREE.TorusGeometry(0.3, 0.12, 8, 12),
  ], []);

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
      
      // Check each node for anomaly triggers
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < anomalousNodes.length; i++) {
        const node = anomalousNodes[i];
        
        // Check for yellow light pulse
        if (time > node.nextPulseCheck) {
          if (Math.random() > 0.9) { // Random chance for light pulse
            node.lightPulse = 1.0; // Start pulse
          }
          node.nextPulseCheck = time + 1 + Math.random() * 3;
        }
        
        // Decay light pulse
        if (node.lightPulse > 0) {
          node.lightPulse *= 0.92; // Fade out quickly
        }
        
        // Check if it's time to trigger or end an anomaly
        if (!node.isAnomalous && time > node.nextAnomalyCheck) {
          if (Math.random() > 0.92) { // Random chance
            node.isAnomalous = true;
            node.anomalyStartTime = time;
            node.anomalyShape = Math.floor(Math.random() * anomalyGeometries.length);
          }
          node.nextAnomalyCheck = time + 2 + Math.random() * 3;
        }
        
        if (node.isAnomalous) {
          const anomalyDuration = time - node.anomalyStartTime;
          if (anomalyDuration > 1.5 + Math.random() * 1.5) {
            node.isAnomalous = false;
          }
        }
      }
    }

    // Handle anomaly mesh transformations
    if (anomalyNodesRef.current) {
      anomalyNodesRef.current.rotation.y = time * 0.015;
      anomalyNodesRef.current.rotation.x = Math.sin(time * 0.05) * 0.08;
      
      anomalyNodesRef.current.children.forEach((mesh, i) => {
        const node = anomalousNodes[i];
        const m = mesh as THREE.Mesh;
        const mat = m.material as THREE.MeshStandardMaterial;
        
        if (node.isAnomalous) {
          m.visible = true;
          m.geometry = anomalyGeometries[node.anomalyShape];
          
          // Base cyan illumination
          const intensity = 1.8 + Math.sin(time * 10) * 0.4;
          mat.emissive.setHex(0x06b6d4);
          mat.emissiveIntensity = intensity;
          mat.opacity = 0.95;
          
          // Erratic rotation
          m.rotation.x += 0.05;
          m.rotation.y += 0.07;
        } else {
          m.visible = false;
        }
        
        // Add yellow light pulse effect if active
        if (node.lightPulse > 0.05) {
          if (!m.visible) m.visible = true;
          const yellowIntensity = node.lightPulse * 2.5;
          // Mix yellow light with cyan base
          mat.emissive.setRGB(
            0.02 + node.lightPulse * 0.98, // Red channel (yellow)
            0.71 + node.lightPulse * 0.19, // Green channel 
            0.83 - node.lightPulse * 0.33  // Blue channel (reduce for yellow)
          );
          mat.emissiveIntensity = Math.max(mat.emissiveIntensity, yellowIntensity);
        }
      });
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

      {/* Anomaly Node Transformations */}
      <group ref={anomalyNodesRef}>
        {Array.from({ length: 25 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[points[i * 3], points[i * 3 + 1], points[i * 3 + 2]]}
            visible={false}
          >
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial
              color="#06b6d4"
              transparent
              opacity={0.95}
              emissive="#000000"
              emissiveIntensity={0}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>

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
