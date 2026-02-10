"use client";

import { useRef, useMemo } from "react";
import { useConfiguratorStore } from "@/lib/store";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import {
  Beugelgreep,
  Hoekgreep,
  Maangreep,
  Ovaalgreep,
  Klink,
  UGreep,
} from "./handles-3d";
import {
  createStandardGlass,
  createRoundedCornerGlass,
  createInvertedUGlass,
  createNormalUGlass,
} from "@/lib/glass-patterns";

// Steel material - fallback to solid color for now
const SteelMaterial = ({ color }: { color: string }) => (
  <meshStandardMaterial
    color={color}
    roughness={0.7}
    metalness={0.8}
    envMapIntensity={1}
  />
);

// Glass material - More opaque/white for technical drawing look
const GlassMaterial = () => (
  <meshPhysicalMaterial
    color="#f8f9fa"
    transparent
    transmission={0.3}
    roughness={0.1}
    thickness={1}
    ior={1.5}
    envMapIntensity={0.5}
    opacity={0.95}
  />
);

// 3D Dimension Label Component - temporarily disabled
function DimensionLabel({
  value,
  position,
  label,
}: {
  value: number;
  position: [number, number, number];
  label: string;
}) {
  return null; // Temporarily disabled to fix loading
}

export function Door3DEnhanced() {
  const { doorType, gridType, finish, handle, glassPattern, doorLeafWidth, height } =
    useConfiguratorStore();
  const doorRef = useRef<THREE.Group>(null);

  // Frame color based on finish
  const frameColor = {
    zwart: "#1a1a1a",
    brons: "#8B6F47",
    grijs: "#525252",
  }[finish];

  // Convert mm to meters for 3D scene
  const doorWidth = doorLeafWidth / 1000; // Convert mm to m
  const doorHeight = height / 1000; // Convert mm to m

  // Profile dimensions (in meters) - Thicker for visibility
  const stileWidth = 0.06; // 60mm vertical profiles (more visible)
  const stileDepth = 0.06; // 60mm depth
  const railHeight = 0.04; // 40mm horizontal profiles (more visible)
  const railDepth = 0.06; // 60mm depth
  const glassThickness = 0.01; // 10mm glass
  const profileRadius = 0.002; // 2mm rounded corners

  // Calculate positions for grid dividers
  const getDividerPositions = () => {
    if (gridType === "3-vlak") {
      return [-doorHeight / 3, doorHeight / 3];
    } else if (gridType === "4-vlak") {
      return [-doorHeight / 2, 0, doorHeight / 2];
    }
    return [];
  };

  const dividerPositions = getDividerPositions();

  return (
    <group ref={doorRef} position={[0, doorHeight / 2, 0]}>
      {/* LEFT STILE - Vertical profile */}
      <RoundedBox
        args={[stileWidth, doorHeight, stileDepth]}
        radius={profileRadius}
        smoothness={4}
        position={[-doorWidth / 2 + stileWidth / 2, 0, 0]}
        castShadow
      >
        <SteelMaterial color={frameColor} />
      </RoundedBox>

      {/* RIGHT STILE - Vertical profile */}
      <RoundedBox
        args={[stileWidth, doorHeight, stileDepth]}
        radius={profileRadius}
        smoothness={4}
        position={[doorWidth / 2 - stileWidth / 2, 0, 0]}
        castShadow
      >
        <SteelMaterial color={frameColor} />
      </RoundedBox>

      {/* TOP RAIL - Horizontal profile */}
      <RoundedBox
        args={[doorWidth - stileWidth * 2, railHeight, railDepth]}
        radius={profileRadius}
        smoothness={4}
        position={[0, doorHeight / 2 - railHeight / 2, 0]}
        castShadow
      >
        <SteelMaterial color={frameColor} />
      </RoundedBox>

      {/* BOTTOM RAIL - Horizontal profile */}
      <RoundedBox
        args={[doorWidth - stileWidth * 2, railHeight, railDepth]}
        radius={profileRadius}
        smoothness={4}
        position={[0, -doorHeight / 2 + railHeight / 2, 0]}
        castShadow
      >
        <SteelMaterial color={frameColor} />
      </RoundedBox>

      {/* INTERMEDIATE RAILS (Grid dividers) */}
      {dividerPositions.map((yPos, index) => (
        <RoundedBox
          key={`rail-${index}`}
          args={[doorWidth - stileWidth * 2, railHeight, railDepth]}
          radius={profileRadius}
          smoothness={4}
          position={[0, yPos, 0]}
          castShadow
        >
          <SteelMaterial color={frameColor} />
        </RoundedBox>
      ))}

      {/* VERTICAL DIVIDER for Paneel */}
      {doorType === "paneel" && (
        <RoundedBox
          args={[stileWidth, doorHeight - railHeight * 2, stileDepth]}
          radius={profileRadius}
          smoothness={4}
          position={[0, 0, 0]}
          castShadow
        >
          <SteelMaterial color={frameColor} />
        </RoundedBox>
      )}

      {/* GLASS PANELS - Pattern-based decorative glass */}
      {glassPattern === "standard" && (
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry
            args={[
              doorWidth - stileWidth * 2,
              doorHeight - railHeight * 2,
              glassThickness,
            ]}
          />
          <GlassMaterial />
        </mesh>
      )}

      {glassPattern === "dt9-rounded" && (
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <extrudeGeometry
            args={[
              createRoundedCornerGlass(
                doorWidth - stileWidth * 2,
                doorHeight - railHeight * 2,
                0.12
              ),
              { depth: glassThickness, bevelEnabled: false },
            ]}
          />
          <GlassMaterial />
        </mesh>
      )}

      {glassPattern === "dt10-ushape" && dividerPositions.length > 0 && (
        <>
          {/* Top section - Inverted U */}
          <mesh
            position={[0, (doorHeight / 4 + dividerPositions[0]) / 2, 0]}
            castShadow
            receiveShadow
          >
            <extrudeGeometry
              args={[
                createInvertedUGlass(
                  doorWidth - stileWidth * 2,
                  Math.abs(doorHeight / 2 - railHeight - dividerPositions[0])
                ),
                { depth: glassThickness, bevelEnabled: false },
              ]}
            />
            <GlassMaterial />
          </mesh>

          {/* Bottom section - Normal U */}
          <mesh
            position={[
              0,
              (-doorHeight / 4 + dividerPositions[dividerPositions.length - 1]) / 2,
              0,
            ]}
            castShadow
            receiveShadow
          >
            <extrudeGeometry
              args={[
                createNormalUGlass(
                  doorWidth - stileWidth * 2,
                  Math.abs(-doorHeight / 2 + railHeight - dividerPositions[dividerPositions.length - 1])
                ),
                { depth: glassThickness, bevelEnabled: false },
              ]}
            />
            <GlassMaterial />
          </mesh>
        </>
      )}

      {/* HANDLES - Professional 3D handle components */}
      {handle === "beugelgreep" && (
        <Beugelgreep
          finish={finish}
          doorWidth={doorWidth}
          doorHeight={doorHeight}
          railDepth={railDepth}
          stileWidth={stileWidth}
        />
      )}
      {handle === "hoekgreep" && (
        <Hoekgreep
          finish={finish}
          doorWidth={doorWidth}
          doorHeight={doorHeight}
          railDepth={railDepth}
          stileWidth={stileWidth}
        />
      )}
      {handle === "maangreep" && (
        <Maangreep
          finish={finish}
          doorWidth={doorWidth}
          doorHeight={doorHeight}
          railDepth={railDepth}
          stileWidth={stileWidth}
        />
      )}
      {handle === "ovaalgreep" && (
        <Ovaalgreep
          finish={finish}
          doorWidth={doorWidth}
          doorHeight={doorHeight}
          railDepth={railDepth}
          stileWidth={stileWidth}
        />
      )}
      {handle === "klink" && (
        <Klink
          finish={finish}
          doorWidth={doorWidth}
          doorHeight={doorHeight}
          railDepth={railDepth}
          stileWidth={stileWidth}
        />
      )}
      {handle === "u-greep" && (
        <UGreep
          finish={finish}
          doorWidth={doorWidth}
          doorHeight={doorHeight}
          railDepth={railDepth}
          stileWidth={stileWidth}
        />
      )}

      {/* 3D DIMENSION LABELS */}
      {/* Width dimension */}
      <DimensionLabel
        value={doorLeafWidth}
        position={[0, -doorHeight / 2 - 0.15, 0.1]}
        label="mm"
      />

      {/* Height dimension */}
      <DimensionLabel
        value={height}
        position={[doorWidth / 2 + 0.15, 0, 0.1]}
        label="mm"
      />

      {/* Dimension lines */}
      {/* Horizontal line for width */}
      <mesh position={[0, -doorHeight / 2 - 0.1, 0.05]}>
        <boxGeometry args={[doorWidth, 0.002, 0.002]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>

      {/* Vertical line for height */}
      <mesh position={[doorWidth / 2 + 0.1, 0, 0.05]}>
        <boxGeometry args={[0.002, doorHeight, 0.002]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}
