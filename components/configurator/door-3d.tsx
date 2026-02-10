"use client";

import { useRef } from "react";
import { useConfiguratorStore } from "@/lib/store";
import * as THREE from "three";

export function Door3D() {
  const { doorType, gridType, finish, handle } = useConfiguratorStore();
  const doorRef = useRef<THREE.Group>(null);

  // Frame color based on finish
  const frameColor = {
    zwart: "#1f1f1f",
    brons: "#8B6F47",
    grijs: "#525252",
  }[finish];

  // Door dimensions
  const doorWidth = doorType === "paneel" ? 1.5 : 1.2;
  const doorHeight = 2.4;
  const frameThickness = 0.08;
  const glassThickness = 0.02;

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
        <boxGeometry args={[doorWidth + frameThickness * 2, frameThickness, frameThickness]} />
        <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Outer Frame - Bottom */}
      <mesh position={[0, -doorHeight / 2, 0]} castShadow>
        <boxGeometry args={[doorWidth + frameThickness * 2, frameThickness, frameThickness]} />
        <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Outer Frame - Left */}
      <mesh position={[-doorWidth / 2 - frameThickness / 2, 0, 0]} castShadow>
        <boxGeometry args={[frameThickness, doorHeight + frameThickness * 2, frameThickness]} />
        <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Outer Frame - Right */}
      <mesh position={[doorWidth / 2 + frameThickness / 2, 0, 0]} castShadow>
        <boxGeometry args={[frameThickness, doorHeight + frameThickness * 2, frameThickness]} />
        <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Glass Panel */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[doorWidth, doorHeight, glassThickness]} />
        <meshPhysicalMaterial
          color="#87CEEB"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>

      {/* Horizontal Dividers (Grid) */}
      {dividerPositions.map((yPos, index) => (
        <mesh key={`divider-${index}`} position={[0, yPos, 0]} castShadow>
          <boxGeometry args={[doorWidth, frameThickness, frameThickness]} />
          <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Vertical Divider for Paneel */}
      {doorType === "paneel" && (
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[frameThickness, doorHeight, frameThickness]} />
          <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.3} />
        </mesh>
      )}

      {/* Handle - U-Greep for Taats */}
      {doorType === "taats" && handle === "u-greep" && (
        <mesh position={[0, 0, frameThickness]} castShadow>
          <boxGeometry args={[0.03, 0.6, 0.03]} />
          <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.2} />
        </mesh>
      )}

      {/* Handle - Klink for Scharnier */}
      {doorType === "scharnier" && handle === "klink" && (
        <group position={[doorWidth / 2 - 0.15, 0, frameThickness]}>
          <mesh castShadow>
            <boxGeometry args={[0.12, 0.03, 0.03]} />
            <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.06, 0, 0]} castShadow>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial
              color={finish === "brons" ? "#6B5434" : frameColor}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
