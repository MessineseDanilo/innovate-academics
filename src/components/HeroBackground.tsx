import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function CognitiveNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.Group>(null);
  const anomalyNodesRef = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  raycaster.params.Points = { threshold: 0.3 };

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
      lightPulse: 0,
      nextPulseCheck: Math.random() * 3,
      clickEffect: 0, // 0=none, 1=explode, 2=light, 3=shape, 4=wave
      clickStartTime: 0,
      clickVelocity: new THREE.Vector3(),
      originalPosition: new THREE.Vector3(),
    }))
  );

  const anomalyGeometries = useMemo(() => [
    new THREE.BoxGeometry(0.15, 0.15, 0.15),
    new THREE.TetrahedronGeometry(0.12),
    new THREE.OctahedronGeometry(0.12),
    new THREE.IcosahedronGeometry(0.1),
    new THREE.TorusGeometry(0.08, 0.04, 8, 16),
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
        
        // Check for yellow light pulse - more frequent but subtle
        if (time > node.nextPulseCheck) {
          if (Math.random() > 0.85) { // More frequent pulses
            node.lightPulse = 0.8; // Subtle pulse intensity
          }
          node.nextPulseCheck = time + 0.5 + Math.random() * 2;
        }
        
        // Decay light pulse smoothly
        if (node.lightPulse > 0) {
          node.lightPulse *= 0.88; // Smooth fade out
        }
        
        // Check if it's time to trigger or end an anomaly
        if (!node.isAnomalous && time > node.nextAnomalyCheck) {
          if (Math.random() > 0.94) { // More selective anomalies
            node.isAnomalous = true;
            node.anomalyStartTime = time;
            node.anomalyShape = Math.floor(Math.random() * anomalyGeometries.length);
          }
          node.nextAnomalyCheck = time + 3 + Math.random() * 4;
        }
        
        if (node.isAnomalous) {
          const anomalyDuration = time - node.anomalyStartTime;
          if (anomalyDuration > 2 + Math.random() * 2) {
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
        
        // Handle click effects
        if (node.clickEffect > 0) {
          const clickDuration = time - node.clickStartTime;
          
          switch (node.clickEffect) {
            case 1: // Explosion effect
              if (clickDuration < 1.5) {
                const explosionFactor = Math.sin(clickDuration * Math.PI);
                m.position.x = node.originalPosition.x + node.clickVelocity.x * explosionFactor * 3;
                m.position.y = node.originalPosition.y + node.clickVelocity.y * explosionFactor * 3;
                m.position.z = node.originalPosition.z + node.clickVelocity.z * explosionFactor * 3;
                m.scale.setScalar(1 + explosionFactor * 2);
              } else {
                m.position.copy(node.originalPosition);
                m.scale.setScalar(1);
                node.clickEffect = 0;
              }
              break;
              
            case 2: // Intense light burst
              if (clickDuration < 2) {
                const lightIntensity = Math.max(0, 1 - clickDuration / 2);
                mat.emissive.setHex(0xffff00);
                mat.emissiveIntensity = 5 * lightIntensity;
                m.scale.setScalar(1 + lightIntensity * 0.5);
              } else {
                node.clickEffect = 0;
              }
              break;
              
            case 3: // Rapid shape morphing
              if (clickDuration < 2) {
                const morphSpeed = clickDuration * 8;
                node.anomalyShape = Math.floor(morphSpeed) % anomalyGeometries.length;
                m.rotation.x += 0.15;
                m.rotation.y += 0.15;
              } else {
                node.clickEffect = 0;
              }
              break;
              
            case 4: // Connection wave
              if (clickDuration < 1.5) {
                const pulse = Math.sin(clickDuration * Math.PI * 4);
                mat.emissive.setRGB(0.02, 0.71 + pulse * 0.2, 0.83);
                mat.emissiveIntensity = 2 + pulse * 2;
                m.scale.setScalar(1 + Math.abs(pulse) * 0.3);
              } else {
                node.clickEffect = 0;
              }
              break;
          }
        }
        
        if (node.isAnomalous && node.clickEffect === 0) {
          m.geometry = anomalyGeometries[node.anomalyShape];
          const intensity = 1.2 + Math.sin(time * 6) * 0.3;
          mat.emissive.setHex(0x06b6d4);
          mat.emissiveIntensity = intensity;
          mat.opacity = 0.85;
          m.rotation.x += 0.02;
          m.rotation.y += 0.03;
        } else if (node.clickEffect === 0) {
          // Default state - small sphere
          mat.emissive.setHex(0x06b6d4);
          mat.emissiveIntensity = 0.3;
          mat.opacity = 0.6;
        }
        
        // Add subtle yellow light pulse effect if active
        if (node.lightPulse > 0.05 && node.clickEffect === 0) {
          if (!m.visible) m.visible = true;
          const yellowIntensity = node.lightPulse * 1.8;
          mat.emissive.setRGB(
            0.02 + node.lightPulse * 0.88,
            0.71 + node.lightPulse * 0.15,
            0.83 - node.lightPulse * 0.25
          );
          mat.emissiveIntensity = Math.max(mat.emissiveIntensity, yellowIntensity);
          mat.opacity = 0.75 + node.lightPulse * 0.2;
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
        {Array.from({ length: 25 }).map((_, i) => {
          anomalousNodes[i].originalPosition = new THREE.Vector3(
            points[i * 3],
            points[i * 3 + 1],
            points[i * 3 + 2]
          );
          return (
            <mesh 
              key={i} 
              position={[points[i * 3], points[i * 3 + 1], points[i * 3 + 2]]}
              visible={true}
              onClick={() => {
                const node = anomalousNodes[i];
                const time = performance.now() / 1000;
                
                node.clickEffect = Math.floor(Math.random() * 4) + 1;
                node.clickStartTime = time;
                node.isAnomalous = true;
                node.anomalyStartTime = time;
                
                if (node.clickEffect === 1) {
                  node.clickVelocity.set(
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2
                  );
                }
                
                if (node.clickEffect === 4) {
                  connectionStates.forEach((conn, j) => {
                    conn.targetOpacity = 1;
                    conn.phase = time + j * 0.1;
                  });
                }
              }}
            >
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshStandardMaterial
                color="#06b6d4"
                transparent
                opacity={0.6}
                emissive="#06b6d4"
                emissiveIntensity={0.3}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          );
        })}
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
