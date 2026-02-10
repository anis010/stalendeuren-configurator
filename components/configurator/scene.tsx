"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import { Door3D } from "./door-3d";
import * as THREE from "three";

function Room() {
  const wallThickness = 0.15;
  const doorWidth = 1.3;
  const doorHeight = 2.5;

  return (
    <group>
      {/* Floor - Clean shadow catcher */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.9} metalness={0} />
      </mesh>

      {/* Proper Doorway with Reveal */}
      <group position={[0, 0, -wallThickness / 2]}>
        {/* Left Pillar */}
        <mesh position={[-(doorWidth / 2 + wallThickness / 2), doorHeight / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[wallThickness, doorHeight + wallThickness, wallThickness]} />
          <meshStandardMaterial color="#fafafa" roughness={1} />
        </mesh>

        {/* Right Pillar */}
        <mesh position={[doorWidth / 2 + wallThickness / 2, doorHeight / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[wallThickness, doorHeight + wallThickness, wallThickness]} />
          <meshStandardMaterial color="#fafafa" roughness={1} />
        </mesh>

        {/* Top Lintel */}
        <mesh position={[0, doorHeight + wallThickness / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[doorWidth + wallThickness * 2, wallThickness, wallThickness]} />
          <meshStandardMaterial color="#fafafa" roughness={1} />
        </mesh>

        {/* Main Wall - Left Section */}
        <mesh position={[-doorWidth - wallThickness * 2, 2.5, 0]} receiveShadow castShadow>
          <boxGeometry args={[6, 5, wallThickness]} />
          <meshStandardMaterial color="#fafafa" roughness={1} />
        </mesh>

        {/* Main Wall - Right Section */}
        <mesh position={[doorWidth + wallThickness * 2, 2.5, 0]} receiveShadow castShadow>
          <boxGeometry args={[6, 5, wallThickness]} />
          <meshStandardMaterial color="#fafafa" roughness={1} />
        </mesh>

        {/* Main Wall - Top Section */}
        <mesh position={[0, doorHeight + wallThickness + 1.25, 0]} receiveShadow castShadow>
          <boxGeometry args={[doorWidth + wallThickness * 2, 2.5, wallThickness]} />
          <meshStandardMaterial color="#fafafa" roughness={1} />
        </mesh>
      </group>

      {/* Side Walls for depth */}
      <mesh position={[-7, 2.5, 2]} receiveShadow castShadow>
        <boxGeometry args={[0.15, 5, 10]} />
        <meshStandardMaterial color="#fcfcfc" roughness={1} />
      </mesh>

      <mesh position={[7, 2.5, 2]} receiveShadow castShadow>
        <boxGeometry args={[0.15, 5, 10]} />
        <meshStandardMaterial color="#fcfcfc" roughness={1} />
      </mesh>
    </group>
  );
}

function Lighting() {
  return (
    <>
      {/* Soft ambient light */}
      <ambientLight intensity={0.5} />

      {/* Key light - main illumination */}
      <directionalLight
        position={[5, 10, 8]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />

      {/* Rim light for separation */}
      <directionalLight position={[-3, 3, -5]} intensity={0.6} />

      {/* Fill light */}
      <directionalLight position={[0, 2, 5]} intensity={0.4} />
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
        toneMappingExposure: 1.3,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      style={{ background: "#fafafa" }}
    >
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 1.6, 4.5]} fov={45} />

      {/* Camera Controls - Limited rotation */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3.5}
        maxDistance={7}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 2.2}
        maxAzimuthAngle={Math.PI / 6}
        minAzimuthAngle={-Math.PI / 6}
        target={[0, 1.2, 0]}
      />

      {/* Premium Studio Lighting */}
      <Lighting />

      {/* Studio Environment for realistic reflections */}
      <Environment preset="studio" environmentIntensity={0.6} />

      {/* Contact Shadows for "Anti-Gravity" premium look */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.4}
        scale={15}
        blur={2}
        far={3}
      />

      {/* The Room */}
      <Room />

      {/* The Door */}
      <Door3D />
    </Canvas>
  );
}
