"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import { Door3DEnhanced } from "./door-3d-enhanced";
import { useConfiguratorStore } from "@/lib/store";
import * as THREE from "three";

function LivingRoom({ doorWidth, doorHeight }: { doorWidth: number; doorHeight: number }) {
  const wallThickness = 0.15;
  const roomWidth = 8;
  const roomDepth = 6;
  const roomHeight = 3;

  // Calculate dynamic doorway dimensions
  const doorwayWidth = doorWidth + wallThickness * 2 + 0.1; // Extra margin
  const doorwayHeight = doorHeight + wallThickness + 0.1;

  return (
    <group>
      {/* Floor - Modern light wood */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[roomWidth * 2, roomDepth * 2]} />
        <meshStandardMaterial color="#e8dcc4" roughness={0.8} metalness={0} />
      </mesh>

      {/* Back Wall with Dynamic Doorway */}
      <group position={[0, 0, -wallThickness / 2]}>
        {/* Left Pillar - Dynamic height */}
        <mesh
          position={[-(doorwayWidth / 2 + wallThickness / 2), roomHeight / 2, 0]}
          receiveShadow
          castShadow
        >
          <boxGeometry
            args={[wallThickness, roomHeight, wallThickness]}
          />
          <meshStandardMaterial color="#f5f5f5" roughness={1} />
        </mesh>

        {/* Right Pillar - Dynamic height */}
        <mesh
          position={[doorwayWidth / 2 + wallThickness / 2, roomHeight / 2, 0]}
          receiveShadow
          castShadow
        >
          <boxGeometry
            args={[wallThickness, roomHeight, wallThickness]}
          />
          <meshStandardMaterial color="#f5f5f5" roughness={1} />
        </mesh>

        {/* Doorway Frame - Left */}
        <mesh
          position={[-(doorwayWidth / 2), doorHeight / 2, 0]}
          receiveShadow
          castShadow
        >
          <boxGeometry args={[wallThickness, doorHeight, wallThickness]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.9} />
        </mesh>

        {/* Doorway Frame - Right */}
        <mesh
          position={[doorwayWidth / 2, doorHeight / 2, 0]}
          receiveShadow
          castShadow
        >
          <boxGeometry args={[wallThickness, doorHeight, wallThickness]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.9} />
        </mesh>

        {/* Doorway Frame - Top (Lintel) */}
        <mesh
          position={[0, doorHeight, 0]}
          receiveShadow
          castShadow
        >
          <boxGeometry
            args={[doorwayWidth + wallThickness * 2, wallThickness, wallThickness]}
          />
          <meshStandardMaterial color="#e0e0e0" roughness={0.9} />
        </mesh>

        {/* Main Wall - Left Section */}
        <mesh
          position={[-(doorwayWidth / 2 + wallThickness + (roomWidth - doorwayWidth) / 4), roomHeight / 2, 0]}
          receiveShadow
          castShadow
        >
          <boxGeometry
            args={[(roomWidth - doorwayWidth) / 2, roomHeight, wallThickness]}
          />
          <meshStandardMaterial color="#f5f5f5" roughness={1} />
        </mesh>

        {/* Main Wall - Right Section */}
        <mesh
          position={[doorwayWidth / 2 + wallThickness + (roomWidth - doorwayWidth) / 4, roomHeight / 2, 0]}
          receiveShadow
          castShadow
        >
          <boxGeometry
            args={[(roomWidth - doorwayWidth) / 2, roomHeight, wallThickness]}
          />
          <meshStandardMaterial color="#f5f5f5" roughness={1} />
        </mesh>

        {/* Main Wall - Top Section (above doorway) */}
        <mesh
          position={[0, doorwayHeight + (roomHeight - doorwayHeight) / 2, 0]}
          receiveShadow
          castShadow
        >
          <boxGeometry
            args={[doorwayWidth + wallThickness * 2, roomHeight - doorwayHeight, wallThickness]}
          />
          <meshStandardMaterial color="#f5f5f5" roughness={1} />
        </mesh>
      </group>

      {/* Left Wall */}
      <mesh position={[-roomWidth / 2, roomHeight / 2, roomDepth / 2]} receiveShadow castShadow>
        <boxGeometry args={[wallThickness, roomHeight, roomDepth]} />
        <meshStandardMaterial color="#fafafa" roughness={1} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[roomWidth / 2, roomHeight / 2, roomDepth / 2]} receiveShadow castShadow>
        <boxGeometry args={[wallThickness, roomHeight, roomDepth]} />
        <meshStandardMaterial color="#fafafa" roughness={1} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, roomHeight, roomDepth / 2]} receiveShadow>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color="#ffffff" roughness={1} />
      </mesh>

      {/* Decorative Elements - Baseboard Left */}
      <mesh position={[-roomWidth / 2 + wallThickness, 0.05, roomDepth / 2]} castShadow>
        <boxGeometry args={[wallThickness / 2, 0.1, roomDepth - wallThickness]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.8} />
      </mesh>

      {/* Decorative Elements - Baseboard Right */}
      <mesh position={[roomWidth / 2 - wallThickness, 0.05, roomDepth / 2]} castShadow>
        <boxGeometry args={[wallThickness / 2, 0.1, roomDepth - wallThickness]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.8} />
      </mesh>
    </group>
  );
}

function DoorWithRoom() {
  const { doorLeafWidth, height } = useConfiguratorStore();

  // Convert mm to meters for 3D scene
  const doorWidth = doorLeafWidth / 1000;
  const doorHeight = height / 1000;

  return (
    <>
      <LivingRoom doorWidth={doorWidth} doorHeight={doorHeight} />
      <Door3DEnhanced />
    </>
  );
}

function Lighting() {
  return (
    <>
      {/* Ambient for overall illumination */}
      <ambientLight intensity={0.6} />

      {/* Main directional light (sunlight from window) */}
      <directionalLight
        position={[5, 6, 8]}
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

      {/* Fill light from opposite side */}
      <directionalLight position={[-3, 3, 5]} intensity={0.4} />

      {/* Subtle top light */}
      <directionalLight position={[0, 8, 2]} intensity={0.3} />
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
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      style={{ background: "#fafafa" }}
    >
      {/* Camera - Zoomed out for room context */}
      <PerspectiveCamera makeDefault position={[0, 1.5, 5.5]} fov={50} />

      {/* Camera Controls - More freedom for room viewing */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={4}
        maxDistance={8}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.1}
        maxAzimuthAngle={Math.PI / 4}
        minAzimuthAngle={-Math.PI / 4}
        target={[0, 1.2, 0]}
        enableDamping
        dampingFactor={0.05}
      />

      {/* Premium Studio Lighting */}
      <Lighting />

      {/* Studio Environment for photorealistic steel reflections */}
      <Environment preset="studio" environmentIntensity={1.0} />

      {/* High-Resolution Contact Shadows for grounding */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.6}
        scale={15}
        blur={2}
        far={2}
        resolution={2048}
      />

      {/* The Door - Enhanced with textures and dimensions */}
      <DoorWithRoom />
    </Canvas>
  );
}
