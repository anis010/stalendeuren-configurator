"use client";

import { useRef } from "react";
import { useConfiguratorStore } from "@/lib/store";
import { RoundedBox, Text, useTexture } from "@react-three/drei";
import { getMetalTexture } from "@/lib/asset-map";
import * as THREE from "three";

// Steel material with photorealistic texture mapping
const SteelMaterial = ({ color, finish }: { color: string; finish: string }) => {
  try {
    const metalTexture = useTexture(getMetalTexture(finish));

    // Configure texture repeat for realistic grain (4x horizontal, 8x vertical)
    metalTexture.wrapS = metalTexture.wrapT = THREE.RepeatWrapping;
    metalTexture.repeat.set(4, 8);

    return (
      <meshStandardMaterial
        map={metalTexture}
        color={color}
        roughness={0.7} // Matte powdercoat finish
        metalness={0.8}
        envMapIntensity={1.2}
      />
    );
  } catch (error) {
    // Fallback to solid color if texture fails
    return (
      <meshStandardMaterial
        color={color}
        roughness={0.7}
        metalness={0.8}
        envMapIntensity={1}
      />
    );
  }
};

// Glass material
const GlassMaterial = () => (
  <meshPhysicalMaterial
    color="#eff6ff"
    transparent
    transmission={1}
    roughness={0.05}
    thickness={2.5}
    ior={1.5}
    envMapIntensity={1}
    clearcoat={1}
    clearcoatRoughness={0}
  />
);

// 3D Dimension Label Component
function DimensionLabel({
  value,
  position,
  label,
}: {
  value: number;
  position: [number, number, number];
  label: string;
}) {
  return (
    <group position={position}>
      <Text
        fontSize={0.08}
        color="#1a1a1a"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {`${Math.round(value)} ${label}`}
      </Text>
      {/* Background for better readability */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[0.4, 0.12]} />
        <meshBasicMaterial color="#ffffff" opacity={0.9} transparent />
      </mesh>
    </group>
  );
}

export function Door3DEnhanced() {
  const { doorType, gridType, finish, handle, doorLeafWidth, height } =
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

  // Profile dimensions (in meters)
  const stileWidth = 0.04; // 40mm vertical profiles
  const stileDepth = 0.04; // 40mm depth
  const railHeight = 0.02; // 20mm horizontal profiles
  const railDepth = 0.04; // 40mm depth
  const glassThickness = 0.008; // 8mm glass
  const profileRadius = 0.001; // 1mm rounded corners

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
        <SteelMaterial color={frameColor} finish={finish} />
      </RoundedBox>

      {/* RIGHT STILE - Vertical profile */}
      <RoundedBox
        args={[stileWidth, doorHeight, stileDepth]}
        radius={profileRadius}
        smoothness={4}
        position={[doorWidth / 2 - stileWidth / 2, 0, 0]}
        castShadow
      >
        <SteelMaterial color={frameColor} finish={finish} />
      </RoundedBox>

      {/* TOP RAIL - Horizontal profile */}
      <RoundedBox
        args={[doorWidth - stileWidth * 2, railHeight, railDepth]}
        radius={profileRadius}
        smoothness={4}
        position={[0, doorHeight / 2 - railHeight / 2, 0]}
        castShadow
      >
        <SteelMaterial color={frameColor} finish={finish} />
      </RoundedBox>

      {/* BOTTOM RAIL - Horizontal profile */}
      <RoundedBox
        args={[doorWidth - stileWidth * 2, railHeight, railDepth]}
        radius={profileRadius}
        smoothness={4}
        position={[0, -doorHeight / 2 + railHeight / 2, 0]}
        castShadow
      >
        <SteelMaterial color={frameColor} finish={finish} />
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
          <SteelMaterial color={frameColor} finish={finish} />
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
          <SteelMaterial color={frameColor} finish={finish} />
        </RoundedBox>
      )}

      {/* GLASS PANEL - Sits inside the frame */}
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

      {/* HANDLE - U-Greep for Taats */}
      {doorType === "taats" && handle === "u-greep" && (
        <RoundedBox
          args={[0.02, 0.6, 0.02]}
          radius={0.003}
          smoothness={4}
          position={[0, 0, railDepth / 2 + 0.01]}
          castShadow
        >
          <SteelMaterial color={frameColor} finish={finish} />
        </RoundedBox>
      )}

      {/* HANDLE - Klink for Scharnier */}
      {doorType === "scharnier" && handle === "klink" && (
        <group position={[doorWidth / 2 - stileWidth - 0.1, 0, railDepth / 2 + 0.01]}>
          <RoundedBox args={[0.08, 0.02, 0.02]} radius={0.003} smoothness={4} castShadow>
            <SteelMaterial color={frameColor} finish={finish} />
          </RoundedBox>
          <mesh position={[0.04, 0, 0]} castShadow>
            <sphereGeometry args={[0.015, 32, 32]} />
            <meshStandardMaterial
              color={finish === "brons" ? "#6B5434" : frameColor}
              metalness={0.95}
              roughness={0.05}
              envMapIntensity={1.2}
            />
          </mesh>
        </group>
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
