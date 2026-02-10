"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Door3D } from "./door-3d";
import * as THREE from "three";

function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#8B7355" roughness={0.8} />
      </mesh>

      {/* Back Wall with Doorway */}
      <group position={[0, 2.5, -1]}>
        {/* Left wall section */}
        <mesh position={[-3, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[4, 5, 0.2]} />
          <meshStandardMaterial color="#E5E5E5" roughness={0.9} />
        </mesh>

        {/* Right wall section */}
        <mesh position={[3, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[4, 5, 0.2]} />
          <meshStandardMaterial color="#E5E5E5" roughness={0.9} />
        </mesh>

        {/* Top wall section (above door) */}
        <mesh position={[0, 1.8, 0]} receiveShadow castShadow>
          <boxGeometry args={[2, 1.4, 0.2]} />
          <meshStandardMaterial color="#E5E5E5" roughness={0.9} />
        </mesh>
      </group>

      {/* Side Walls */}
      <mesh position={[-5, 2.5, 3]} receiveShadow castShadow>
        <boxGeometry args={[0.2, 5, 8]} />
        <meshStandardMaterial color="#F0F0F0" roughness={0.9} />
      </mesh>

      <mesh position={[5, 2.5, 3]} receiveShadow castShadow>
        <boxGeometry args={[0.2, 5, 8]} />
        <meshStandardMaterial color="#F0F0F0" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Lighting() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.4} />

      {/* Main directional light (sun) with shadows */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Fill light from the side */}
      <directionalLight position={[-5, 5, 2]} intensity={0.3} />

      {/* Spot light for drama */}
      <spotLight
        position={[0, 5, 2]}
        angle={0.5}
        penumbra={0.5}
        intensity={0.5}
        castShadow
      />
    </>
  );
}

export function Scene3D() {
  return (
    <Canvas
      shadows
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      style={{ background: "#f5f5f5" }}
    >
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 1.5, 4]} fov={50} />

      {/* Camera Controls - Limited rotation */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={6}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        target={[0, 1.2, 0]}
      />

      {/* Lighting */}
      <Lighting />

      {/* Environment for reflections */}
      <Environment preset="apartment" />

      {/* The Room */}
      <Room />

      {/* The Door */}
      <Door3D />
    </Canvas>
  );
}
