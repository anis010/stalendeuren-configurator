"use client";

import { useRef } from "react";
import { useConfiguratorStore } from "@/lib/store";
import * as THREE from "three";

export function Door3D() {
  const { doorType, gridType, finish, handle } = useConfiguratorStore();
  const doorRef = useRef<THREE.Group>(null);

  // Frame color based on finish
  const frameColor = {
    zwart: "#1a1a1a",
    brons: "#8B6F47",
    grijs: "#525252",
  }[finish];

  // Door dimensions (more realistic proportions)
  const doorWidth = doorType === "paneel" ? 1.5 : 1.2;
  const doorHeight = 2.4;
  const frameThickness = 0.03; // Slim steel profile (3cm)
  const frameDepth = 0.05; // Depth of frame
  const glassThickness = 0.015; // Realistic glass thickness

  // Calculate grid divider positions
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
      {/* Outer Frame - Top */}
      <mesh position={[0, doorHeight / 2, 0]} castShadow>
        <boxGeometry args={[doorWidth + frameThickness * 2, frameThickness, frameDepth]} />
        <meshStandardMaterial color={frameColor} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Outer Frame - Bottom */}
      <mesh position={[0, -doorHeight / 2, 0]} castShadow>
        <boxGeometry args={[doorWidth + frameThickness * 2, frameThickness, frameDepth]} />
        <meshStandardMaterial color={frameColor} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Outer Frame - Left */}
      <mesh position={[-doorWidth / 2 - frameThickness / 2, 0, 0]} castShadow>
        <boxGeometry args={[frameThickness, doorHeight + frameThickness * 2, frameDepth]} />
        <meshStandardMaterial color={frameColor} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Outer Frame - Right */}
      <mesh position={[doorWidth / 2 + frameThickness / 2, 0, 0]} castShadow>
        <boxGeometry args={[frameThickness, doorHeight + frameThickness * 2, frameDepth]} />
        <meshStandardMaterial color={frameColor} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Glass Panel - Premium Physical Material */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[doorWidth, doorHeight, glassThickness]} />
        <meshPhysicalMaterial
          color="#eef6fc"
          transparent
          transmission={1}
          roughness={0}
          thickness={2}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>

      {/* Horizontal Dividers (Grid) - Slim profiles */}
      {dividerPositions.map((yPos, index) => (
        <mesh key={`divider-${index}`} position={[0, yPos, 0.01]} castShadow>
          <boxGeometry args={[doorWidth, frameThickness, frameDepth]} />
          <meshStandardMaterial color={frameColor} metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Vertical Divider for Paneel */}
      {doorType === "paneel" && (
        <mesh position={[0, 0, 0.01]} castShadow>
          <boxGeometry args={[frameThickness, doorHeight, frameDepth]} />
          <meshStandardMaterial color={frameColor} metalness={0.9} roughness={0.2} />
        </mesh>
      )}

      {/* Handle - U-Greep for Taats */}
      {doorType === "taats" && handle === "u-greep" && (
        <mesh position={[0, 0, frameDepth + 0.01]} castShadow>
          <boxGeometry args={[0.025, 0.6, 0.025]} />
          <meshStandardMaterial color={frameColor} metalness={0.9} roughness={0.15} />
        </mesh>
      )}

      {/* Handle - Klink for Scharnier */}
      {doorType === "scharnier" && handle === "klink" && (
        <group position={[doorWidth / 2 - 0.12, 0, frameDepth + 0.01]}>
          <mesh castShadow>
            <boxGeometry args={[0.1, 0.025, 0.025]} />
            <meshStandardMaterial color={frameColor} metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[0.05, 0, 0]} castShadow>
            <sphereGeometry args={[0.02, 32, 32]} />
            <meshStandardMaterial
              color={finish === "brons" ? "#6B5434" : frameColor}
              metalness={0.95}
              roughness={0.05}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
