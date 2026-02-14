"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Door3DEnhanced } from "./door-3d-enhanced";
import { useConfiguratorStore } from "@/lib/store";
import {
  STELRUIMTE,
  WALL_THICKNESS,
  TAATS_PIVOT_OFFSET,
  mmToMeters,
} from "@/lib/door-models";
import * as THREE from "three";

// ============================================
// WALL MATERIALS
// ============================================

/** Smooth painted wall surface */
const WallMaterial = () => (
  <meshStandardMaterial color="#f5f2ed" roughness={0.95} metalness={0} />
);

/** Stucco/plaster reveal surface (inside the door opening) */
const RevealMaterial = () => (
  <meshStandardMaterial color="#e8e4dd" roughness={1.0} metalness={0} />
);

/** Floor material - light wood */
const FloorMaterial = () => (
  <meshStandardMaterial color="#e8dcc4" roughness={0.8} metalness={0} />
);

// ============================================
// WALL CONTAINER WITH PRECISE HOLE
// ============================================

/**
 * Creates a wall with a precise rectangular opening (sparing).
 * Uses 4 boxes to form the wall around the hole instead of CSG.
 * The reveal (inner edge of the hole) has a plaster texture.
 */
function WallContainer({
  holeWidth,
  holeHeight,
  wallThickness,
}: {
  holeWidth: number;   // meters - sparingsmaat width
  holeHeight: number;  // meters - sparingsmaat height
  wallThickness: number; // meters
}) {
  const wallWidth = 4.0;  // Total wall width in meters
  const wallHeight = 3.0; // Total wall height (floor to ceiling)

  // Half dimensions for positioning
  const halfHoleW = holeWidth / 2;
  const halfWallT = wallThickness / 2;

  // Left wall section: from left edge to hole left edge
  const leftSectionWidth = (wallWidth - holeWidth) / 2;
  const leftSectionX = -(halfHoleW + leftSectionWidth / 2);

  // Right wall section: from hole right edge to right edge
  const rightSectionWidth = leftSectionWidth;
  const rightSectionX = halfHoleW + rightSectionWidth / 2;

  // Top section: above hole, full width
  const topSectionHeight = wallHeight - holeHeight;
  const topSectionY = holeHeight + topSectionHeight / 2;

  // Stelruimte gap (visual indicator)
  const gapPerSide = mmToMeters(STELRUIMTE / 2);

  return (
    <group position={[0, 0, 0]}>
      {/* === MAIN WALL SECTIONS === */}

      {/* Left wall section */}
      <mesh
        position={[leftSectionX, wallHeight / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[leftSectionWidth, wallHeight, wallThickness]} />
        <WallMaterial />
      </mesh>

      {/* Right wall section */}
      <mesh
        position={[rightSectionX, wallHeight / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[rightSectionWidth, wallHeight, wallThickness]} />
        <WallMaterial />
      </mesh>

      {/* Top section (above hole, full wall width) */}
      {topSectionHeight > 0.01 && (
        <mesh
          position={[0, topSectionY, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[holeWidth, topSectionHeight, wallThickness]} />
          <WallMaterial />
        </mesh>
      )}

      {/* === REVEAL SURFACES (inside the hole) === */}
      {/* These are the plaster/stucco edges visible inside the opening */}

      {/* Left reveal */}
      <mesh
        position={[-halfHoleW + 0.001, holeHeight / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.002, holeHeight, wallThickness]} />
        <RevealMaterial />
      </mesh>

      {/* Right reveal */}
      <mesh
        position={[halfHoleW - 0.001, holeHeight / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.002, holeHeight, wallThickness]} />
        <RevealMaterial />
      </mesh>

      {/* Top reveal */}
      <mesh
        position={[0, holeHeight - 0.001, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[holeWidth, 0.002, wallThickness]} />
        <RevealMaterial />
      </mesh>

      {/* === REVEAL DEPTH SURFACES (visible sides inside the opening) === */}
      {/* Left inner wall (visible when looking at the opening from the side) */}
      <mesh
        position={[-halfHoleW + gapPerSide / 2, holeHeight / 2, 0]}
        receiveShadow
      >
        <boxGeometry args={[gapPerSide, holeHeight, wallThickness - 0.01]} />
        <RevealMaterial />
      </mesh>

      {/* Right inner wall */}
      <mesh
        position={[halfHoleW - gapPerSide / 2, holeHeight / 2, 0]}
        receiveShadow
      >
        <boxGeometry args={[gapPerSide, holeHeight, wallThickness - 0.01]} />
        <RevealMaterial />
      </mesh>

      {/* Top inner wall (lintel reveal) */}
      <mesh
        position={[0, holeHeight - gapPerSide / 2, 0]}
        receiveShadow
      >
        <boxGeometry args={[holeWidth - gapPerSide * 2, gapPerSide, wallThickness - 0.01]} />
        <RevealMaterial />
      </mesh>

      {/* === FLOOR === */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, wallThickness]}
        receiveShadow
      >
        <planeGeometry args={[wallWidth * 2, wallThickness * 8]} />
        <FloorMaterial />
      </mesh>

      {/* Floor behind wall */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -wallThickness]}
        receiveShadow
      >
        <planeGeometry args={[wallWidth * 2, wallThickness * 8]} />
        <FloorMaterial />
      </mesh>

      {/* === BASEBOARD (Plint) === */}
      {/* Left side baseboard */}
      <mesh
        position={[leftSectionX, 0.04, halfWallT + 0.005]}
        castShadow
      >
        <boxGeometry args={[leftSectionWidth, 0.08, 0.01]} />
        <meshStandardMaterial color="#d5d0c8" roughness={0.8} />
      </mesh>

      {/* Right side baseboard */}
      <mesh
        position={[rightSectionX, 0.04, halfWallT + 0.005]}
        castShadow
      >
        <boxGeometry args={[rightSectionWidth, 0.08, 0.01]} />
        <meshStandardMaterial color="#d5d0c8" roughness={0.8} />
      </mesh>
    </group>
  );
}

// ============================================
// DOOR + WALL COMPOSITION
// ============================================

function DoorInWall() {
  const { doorType, doorLeafWidth, height, holeWidth } = useConfiguratorStore();

  // Convert mm to meters
  const doorWidthM = mmToMeters(doorLeafWidth);
  const doorHeightM = mmToMeters(height);
  const wallThicknessM = mmToMeters(WALL_THICKNESS);

  // Sparingsmaat = the hole in the wall
  // Use doorLeafWidth + stelruimte as the opening size
  const stelruimteM = mmToMeters(STELRUIMTE);
  const holeWidthM = doorWidthM + stelruimteM;
  const holeHeightM = doorHeightM + stelruimteM / 2; // 5mm top tolerance

  // Door Z position depends on type
  // Taats: centered in wall thickness (pivot at center)
  // Scharnier/Paneel: flush with front wall face
  const doorZOffset = doorType === 'taats' ? 0 : wallThicknessM * 0.15;

  return (
    <>
      {/* The wall with precise opening */}
      <WallContainer
        holeWidth={holeWidthM}
        holeHeight={holeHeightM}
        wallThickness={wallThicknessM}
      />

      {/* The door, positioned inside the wall opening */}
      <group position={[0, 0, doorZOffset]}>
        <Door3DEnhanced />
      </group>
    </>
  );
}

// ============================================
// LIGHTING
// ============================================

function Lighting() {
  return (
    <>
      {/* Ambient for overall illumination */}
      <ambientLight intensity={0.5} />

      {/* Main directional light (sunlight angle) */}
      <directionalLight
        position={[4, 6, 8]}
        intensity={1.4}
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

      {/* Fill light from behind/left to illuminate reveal */}
      <directionalLight position={[-3, 4, -4]} intensity={0.3} />

      {/* Subtle light from viewer side to show depth in reveal */}
      <directionalLight position={[2, 3, 6]} intensity={0.4} />

      {/* Top down light for reveal shadows */}
      <directionalLight
        position={[0, 8, 0]}
        intensity={0.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  );
}

// ============================================
// MAIN SCENE EXPORT
// ============================================

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
      style={{ background: "#f0ede8" }}
    >
      {/* Camera - positioned for wall view */}
      <PerspectiveCamera makeDefault position={[0, 1.4, 4.5]} fov={45} />

      {/* Camera Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={2.5}
        maxDistance={7}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.1}
        maxAzimuthAngle={Math.PI / 3}
        minAzimuthAngle={-Math.PI / 3}
        target={[0, 1.1, 0]}
        enableDamping
        dampingFactor={0.05}
      />

      {/* Lighting */}
      <Lighting />

      {/* Apartment Environment for warm reflections */}
      <Environment preset="apartment" blur={0.6} environmentIntensity={1.2} />

      {/* Contact shadows for floor grounding */}
      <ContactShadows
        position={[0, 0.005, 0.15]}
        opacity={0.5}
        scale={20}
        blur={2.5}
        far={4}
        resolution={2048}
      />

      {/* Door mounted inside wall */}
      <DoorInWall />
    </Canvas>
  );
}
