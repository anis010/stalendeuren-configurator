"use client";

import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface HandleProps {
  finish: string;
  doorWidth: number;
  doorHeight: number;
  railDepth: number;
  stileWidth: number;
}

// Steel material for handles
const HandleMaterial = ({ color }: { color: string }) => (
  <meshStandardMaterial
    color={color}
    roughness={0.3}
    metalness={0.95}
    envMapIntensity={1.5}
  />
);

/**
 * Beugelgreep - Vertical bar handle with mounting blocks
 * Classic industrial style, common on steel pivot doors
 */
export function Beugelgreep({ finish, doorHeight, railDepth }: HandleProps) {
  const color = ({
    zwart: "#1a1a1a",
    brons: "#8B6F47",
    grijs: "#525252",
  }[finish] || "#1a1a1a") as string;

  const handleLength = Math.min(doorHeight * 0.35, 0.8); // Max 80cm
  const barDiameter = 0.025; // 25mm diameter bar
  const mountBlockSize: [number, number, number] = [0.04, 0.06, 0.03]; // Mount block dimensions

  return (
    <group position={[0, 0, railDepth / 2 + 0.02]}>
      {/* Main vertical bar */}
      <mesh castShadow>
        <cylinderGeometry args={[barDiameter / 2, barDiameter / 2, handleLength, 32]} />
        <HandleMaterial color={color} />
      </mesh>

      {/* Top mounting block */}
      <RoundedBox
        args={mountBlockSize}
        radius={0.003}
        position={[0, handleLength / 2 + mountBlockSize[1] / 2, -0.01]}
        castShadow
      >
        <HandleMaterial color={color} />
      </RoundedBox>

      {/* Bottom mounting block */}
      <RoundedBox
        args={mountBlockSize}
        radius={0.003}
        position={[0, -handleLength / 2 - mountBlockSize[1] / 2, -0.01]}
        castShadow
      >
        <HandleMaterial color={color} />
      </RoundedBox>

      {/* Mounting screws (detail) */}
      {[
        [0, handleLength / 2 + mountBlockSize[1] / 2, 0.005],
        [0, -handleLength / 2 - mountBlockSize[1] / 2, 0.005],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.003, 0.003, 0.008, 16]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Hoekgreep - L-shaped corner handle
 * Minimalist flush-mount design
 */
export function Hoekgreep({ finish, doorWidth, railDepth, stileWidth }: HandleProps) {
  const color = ({
    zwart: "#1a1a1a",
    brons: "#8B6F47",
    grijs: "#525252",
  }[finish] || "#1a1a1a") as string;

  const horizontalLength = 0.15; // 15cm horizontal
  const verticalLength = 0.12; // 12cm vertical
  const barThickness = 0.02; // 20mm thick
  const barWidth = 0.03; // 30mm wide

  return (
    <group position={[doorWidth / 2 - stileWidth - 0.12, 0, railDepth / 2 + 0.015]}>
      {/* Horizontal bar */}
      <RoundedBox
        args={[horizontalLength, barWidth, barThickness]}
        radius={0.003}
        smoothness={4}
        position={[horizontalLength / 2, verticalLength / 2, 0]}
        castShadow
      >
        <HandleMaterial color={color} />
      </RoundedBox>

      {/* Vertical bar */}
      <RoundedBox
        args={[barWidth, verticalLength, barThickness]}
        radius={0.003}
        smoothness={4}
        position={[0, 0, 0]}
        castShadow
      >
        <HandleMaterial color={color} />
      </RoundedBox>

      {/* Corner radius (decorative) */}
      <mesh position={[0.015, verticalLength / 2 - 0.015, 0]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.015, 0.01, 16, 32, Math.PI / 2]} />
        <HandleMaterial color={color} />
      </mesh>
    </group>
  );
}

/**
 * Maangreep - Crescent/moon shaped recessed handle
 * Elegant curved design for flush doors
 */
export function Maangreep({ finish, doorWidth, railDepth, stileWidth }: HandleProps) {
  const color = ({
    zwart: "#1a1a1a",
    brons: "#8B6F47",
    grijs: "#525252",
  }[finish] || "#1a1a1a") as string;

  const curveRadius = 0.08; // 8cm radius
  const handleDepth = 0.025; // 25mm deep recess

  return (
    <group position={[doorWidth / 2 - stileWidth - 0.12, 0, railDepth / 2]}>
      {/* Main curved handle body */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[curveRadius, 0.015, 16, 32, Math.PI]} />
        <HandleMaterial color={color} />
      </mesh>

      {/* Left end cap */}
      <mesh position={[-curveRadius, 0, 0]} castShadow>
        <sphereGeometry args={[0.015, 32, 32]} />
        <HandleMaterial color={color} />
      </mesh>

      {/* Right end cap */}
      <mesh position={[curveRadius, 0, 0]} castShadow>
        <sphereGeometry args={[0.015, 32, 32]} />
        <HandleMaterial color={color} />
      </mesh>

      {/* Recessed mounting plate */}
      <RoundedBox
        args={[curveRadius * 2.2, 0.05, handleDepth]}
        radius={0.005}
        position={[0, 0, -handleDepth / 2]}
        receiveShadow
      >
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.3} />
      </RoundedBox>
    </group>
  );
}

/**
 * Ovaalgreep - Oval/elliptical pull handle
 * Modern minimalist design
 */
export function Ovaalgreep({ finish, doorWidth, railDepth, stileWidth }: HandleProps) {
  const color = ({
    zwart: "#1a1a1a",
    brons: "#8B6F47",
    grijs: "#525252",
  }[finish] || "#1a1a1a") as string;

  // Create oval shape using THREE.Shape
  const shape = new THREE.Shape();
  const rx = 0.06; // 6cm horizontal radius
  const ry = 0.03; // 3cm vertical radius

  // Draw ellipse
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    const x = Math.cos(angle) * rx;
    const y = Math.sin(angle) * ry;
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }

  const extrudeSettings = {
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 8,
  };

  return (
    <group position={[doorWidth / 2 - stileWidth - 0.12, 0, railDepth / 2 + 0.015]}>
      {/* Oval handle ring */}
      <mesh castShadow rotation={[0, 0, 0]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <HandleMaterial color={color} />
      </mesh>
    </group>
  );
}

/**
 * Klink - Traditional door handle with lever
 * Classic hinged door handle
 */
export function Klink({ finish, doorWidth, railDepth, stileWidth }: HandleProps) {
  const color = ({
    zwart: "#1a1a1a",
    brons: "#8B6F47",
    grijs: "#525252",
  }[finish] || "#1a1a1a") as string;

  const leverLength = 0.12; // 12cm lever
  const leverThickness = 0.015; // 15mm thick

  return (
    <group position={[doorWidth / 2 - stileWidth - 0.1, 0, railDepth / 2 + 0.01]}>
      {/* Mounting rosette (round plate) */}
      <mesh castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.008, 32]} />
        <HandleMaterial color={color} />
      </mesh>

      {/* Lever handle */}
      <RoundedBox
        args={[leverLength, 0.02, leverThickness]}
        radius={0.005}
        smoothness={4}
        position={[leverLength / 2, 0, 0]}
        rotation={[0, 0, -0.15]}
        castShadow
      >
        <HandleMaterial color={color} />
      </RoundedBox>

      {/* Lever end (ergonomic grip) */}
      <mesh position={[leverLength, -0.015, 0]} castShadow>
        <sphereGeometry args={[0.012, 32, 32]} />
        <HandleMaterial color={color} />
      </mesh>

      {/* Lock cylinder (detail) */}
      <mesh position={[0, -0.045, 0]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.01, 16]} />
        <meshStandardMaterial
          color={finish === "brons" ? "#6B5434" : "#2a2a2a"}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

/**
 * U-Greep - U-shaped bar handle (current simple version)
 * Straight vertical bar for pivot doors
 */
export function UGreep({ finish, railDepth }: HandleProps) {
  const color = ({
    zwart: "#1a1a1a",
    brons: "#8B6F47",
    grijs: "#525252",
  }[finish] || "#1a1a1a") as string;

  return (
    <RoundedBox
      args={[0.02, 0.6, 0.02]}
      radius={0.003}
      smoothness={4}
      position={[0, 0, railDepth / 2 + 0.01]}
      castShadow
    >
      <HandleMaterial color={color} />
    </RoundedBox>
  );
}
