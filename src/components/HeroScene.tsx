import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

function ParticleHeart() {
  const points = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const scale = 0.8;
      
      // Heart parametric equation
      const x = scale * 16 * Math.pow(Math.sin(t), 3) * 0.05;
      const y = scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.05;
      const z = (Math.random() - 0.5) * 0.3;
      
      positions[i * 3] = x + (Math.random() - 0.5) * 0.08;
      positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.08;
      positions[i * 3 + 2] = z;
      
      // Pink to magenta gradient
      colors[i * 3] = 0.9 + Math.random() * 0.1;
      colors[i * 3 + 1] = 0.2 + Math.random() * 0.3;
      colors[i * 3 + 2] = 0.5 + Math.random() * 0.3;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      points.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <points ref={points} position={[0, 0.5, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Crown() {
  const crownRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (crownRef.current) {
      crownRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      crownRef.current.position.y = 2 + Math.sin(state.clock.elapsedTime) * 0.15;
    }
  });

  return (
    <group ref={crownRef} position={[0, 2, 0]}>
      {/* Crown base ring */}
      <mesh>
        <torusGeometry args={[0.5, 0.06, 8, 32]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Crown points */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.45, 0.35, Math.sin(angle) * 0.45]}>
            <coneGeometry args={[0.08, 0.35, 4]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.6} metalness={0.9} roughness={0.1} />
          </mesh>
        );
      })}
      {/* Crown gems */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh key={`gem-${i}`} position={[Math.cos(angle) * 0.45, 0.15, Math.sin(angle) * 0.45]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#FF69B4" emissive="#FF69B4" emissiveIntensity={1} />
          </mesh>
        );
      })}
    </group>
  );
}

function FloatingParticles3D() {
  const particles = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.02;
      const posArr = particles.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < posArr.length / 3; i++) {
        posArr[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      particles.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#FF69B4"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function IGLText() {
  const textRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = -0.8 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={textRef} position={[0, -0.8, 0]}>
      <Center>
        <mesh>
          <boxGeometry args={[1.8, 0.6, 0.1]} />
          <meshStandardMaterial
            color="#1a0a2e"
            transparent
            opacity={0.6}
          />
        </mesh>
      </Center>
      {/* IGL letters as simple geometry */}
      <Center>
        <group>
          {/* I */}
          <mesh position={[-0.5, 0, 0.06]}>
            <boxGeometry args={[0.1, 0.4, 0.05]} />
            <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
          </mesh>
          {/* G */}
          <group position={[0, 0, 0.06]}>
            <mesh position={[0, 0.15, 0]}>
              <boxGeometry args={[0.3, 0.1, 0.05]} />
              <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0, -0.15, 0]}>
              <boxGeometry args={[0.3, 0.1, 0.05]} />
              <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
            </mesh>
            <mesh position={[-0.1, 0, 0]}>
              <boxGeometry args={[0.1, 0.4, 0.05]} />
              <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0.1, -0.05, 0]}>
              <boxGeometry args={[0.1, 0.2, 0.05]} />
              <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
            </mesh>
          </group>
          {/* L */}
          <group position={[0.5, 0, 0.06]}>
            <mesh position={[-0.05, 0, 0]}>
              <boxGeometry args={[0.1, 0.4, 0.05]} />
              <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0.05, -0.15, 0]}>
              <boxGeometry args={[0.2, 0.1, 0.05]} />
              <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
            </mesh>
          </group>
        </group>
      </Center>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#FF69B4" />
      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#00E5FF" />
      <pointLight position={[0, -3, 3]} intensity={0.5} color="#9B59B6" />
      
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Crown />
      </Float>
      
      <ParticleHeart />
      <IGLText />
      <FloatingParticles3D />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-[70vh] md:h-[80vh]">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
