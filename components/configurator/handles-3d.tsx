"use client";

import { Suspense } from "react";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

// ============================================
// PHYSICAL CONSTANTS (mm converted to meters)
// ============================================

const PROFILE_DEPTH_M = 0.04;       // 40mm profile depth
const DOOR_FACE_Z = PROFILE_DEPTH_M / 2; // 20mm - front face of door

const MOUNT_RADIUS = 0.006;          // 6mm radius standoff cylinders
const MOUNT_LENGTH = 0.04;           // 40mm standoff length
const MOUNT_CENTER_Z = DOOR_FACE_Z + MOUNT_LENGTH / 2; // Center of mount
const GRIP_CENTER_Z = DOOR_FACE_Z + MOUNT_LENGTH;       // Front face of mount = grip center

const GRIP_RADIUS = 0.01;            // 10mm radius for round grips
const GRIP_BAR_SIZE = 0.02;          // 20mm for square grip cross-section

export interface HandleProps {
  finish: string;
  doorWidth: number;
  doorHeight: number;
  railDepth: number;
  stileWidth: number;
}

// ============================================
// MATERIALS
// ============================================

/**
 * Powder-coated steel material matching door frame finish.
 * Loaded with texture for visual continuity with the frame.
 */
function HandleMaterialTextured({ color, finish }: { color: string; finish: string }) {
  try {
    const texturePath = {
      zwart: "/textures/aluwdoors/aluwdoors-configurator-metaalkleur-zwart.jpg",
      brons: "/textures/aluwdoors/aluwdoors-configurator-metaalkleur-brons.jpg",
      grijs: "/textures/aluwdoors/aluwdoors-configurator-metaalkleur-antraciet.jpg",
    }[finish] || "/textures/aluwdoors/aluwdoors-configurator-metaalkleur-zwart.jpg";

    const texture = useTexture(texturePath);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(0.2, 1);
    texture.colorSpace = THREE.SRGBColorSpace;

    return (
      <meshStandardMaterial
        map={texture}
        color={color}
        roughness={0.7}
        metalness={0.6}
        envMapIntensity={1.5}
      />
    );
  } catch {
    return <HandleMaterialFallback color={color} />;
  }
}

function HandleMaterialFallback({ color }: { color: string }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.7}
      metalness={0.6}
      envMapIntensity={1.5}
    />
  );
}

/** Wrap textured material in Suspense */
function PowderCoatMaterial({ color, finish }: { color: string; finish: string }) {
  return (
    <Suspense fallback={<HandleMaterialFallback color={color} />}>
      <HandleMaterialTextured color={color} finish={finish} />
    </Suspense>
  );
}

function getColor(finish: string): string {
  return { zwart: "#1a1a1a", brons: "#8B6F47", grijs: "#525252" }[finish] || "#1a1a1a";
}

// ============================================
// SHARED MOUNT COMPONENT
// ============================================

/**
 * A single cylindrical standoff (pootje) connecting handle to door face.
 * Rotated 90° on X to point outward from the door surface.
 */
function MountStandoff({
  position,
  color,
  finish,
}: {
  position: [number, number, number];
  color: string;
  finish: string;
}) {
  return (
    <mesh
      position={position}
      rotation={[Math.PI / 2, 0, 0]}
      castShadow
    >
      <cylinderGeometry args={[MOUNT_RADIUS, MOUNT_RADIUS, MOUNT_LENGTH, 16]} />
      <PowderCoatMaterial color={color} finish={finish} />
    </mesh>
  );
}

// ============================================
// HANDLE COMPONENTS
// ============================================

/**
 * U-Greep: Proper U-shaped bar handle with two standoff mounts.
 * The grip sits 40mm off the door face, connected by two cylindrical pootjes.
 */
export function UGreep({ finish, doorHeight }: HandleProps) {
  const color = getColor(finish);
  const gripLength = Math.min(doorHeight * 0.25, 0.6); // Max 60cm, proportional
  const mountSpacing = gripLength - GRIP_BAR_SIZE; // Distance between mount centers

  return (
    <group position={[0, 0, 0]}>
      {/* Top mount standoff */}
      <MountStandoff
        position={[0, mountSpacing / 2, MOUNT_CENTER_Z]}
        color={color}
        finish={finish}
      />

      {/* Bottom mount standoff */}
      <MountStandoff
        position={[0, -mountSpacing / 2, MOUNT_CENTER_Z]}
        color={color}
        finish={finish}
      />

      {/* Vertical grip bar */}
      <RoundedBox
        args={[GRIP_BAR_SIZE, gripLength, GRIP_BAR_SIZE]}
        radius={0.003}
        smoothness={4}
        position={[0, 0, GRIP_CENTER_Z]}
        castShadow
        receiveShadow
      >
        <PowderCoatMaterial color={color} finish={finish} />
      </RoundedBox>
    </group>
  );
}

/**
 * Beugelgreep: Vertical bar handle (round) with mounting blocks.
 * Two rectangular mounting blocks press against the door face,
 * with a round bar connecting them.
 */
export function Beugelgreep({ finish, doorHeight }: HandleProps) {
  const color = getColor(finish);
  const gripLength = Math.min(doorHeight * 0.35, 0.8); // Max 80cm
  const barDiameter = 0.025; // 25mm
  const mountBlockSize: [number, number, number] = [0.04, 0.05, MOUNT_LENGTH];
  const mountSpacing = gripLength * 0.85;

  return (
    <group position={[0, 0, 0]}>
      {/* Top mounting block (sits on door face, extends outward) */}
      <RoundedBox
        args={mountBlockSize}
        radius={0.003}
        smoothness={4}
        position={[0, mountSpacing / 2, MOUNT_CENTER_Z]}
        castShadow
        receiveShadow
      >
        <PowderCoatMaterial color={color} finish={finish} />
      </RoundedBox>

      {/* Bottom mounting block */}
      <RoundedBox
        args={mountBlockSize}
        radius={0.003}
        smoothness={4}
        position={[0, -mountSpacing / 2, MOUNT_CENTER_Z]}
        castShadow
        receiveShadow
      >
        <PowderCoatMaterial color={color} finish={finish} />
      </RoundedBox>

      {/* Main vertical round bar */}
      <mesh position={[0, 0, GRIP_CENTER_Z]} castShadow>
        <cylinderGeometry args={[barDiameter / 2, barDiameter / 2, gripLength, 32]} />
        <PowderCoatMaterial color={color} finish={finish} />
      </mesh>

      {/* Mounting screw details */}
      {[mountSpacing / 2, -mountSpacing / 2].map((y, i) => (
        <mesh
          key={i}
          position={[0, y, DOOR_FACE_Z + MOUNT_LENGTH + 0.002]}
          castShadow
        >
          <cylinderGeometry args={[0.003, 0.003, 0.005, 12]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Hoekgreep: L-shaped corner handle with standoff mounts.
 * Horizontal bar + vertical bar meeting at a rounded corner.
 */
export function Hoekgreep({ finish, doorWidth, stileWidth }: HandleProps) {
  const color = getColor(finish);
  const horizontalLength = 0.15;
  const verticalLength = 0.12;
  const barThickness = 0.02;
  const barWidth = 0.03;

  // Position near right stile
  const xPos = doorWidth / 2 - stileWidth - 0.12;

  return (
    <group position={[xPos, 0, 0]}>
      {/* Top mount standoff */}
      <MountStandoff
        position={[horizontalLength * 0.8, verticalLength / 2, MOUNT_CENTER_Z]}
        color={color}
        finish={finish}
      />

      {/* Bottom mount standoff */}
      <MountStandoff
        position={[0, -verticalLength * 0.3, MOUNT_CENTER_Z]}
        color={color}
        finish={finish}
      />

      {/* Horizontal bar */}
      <RoundedBox
        args={[horizontalLength, barWidth, barThickness]}
        radius={0.003}
        smoothness={4}
        position={[horizontalLength / 2, verticalLength / 2, GRIP_CENTER_Z]}
        castShadow
      >
        <PowderCoatMaterial color={color} finish={finish} />
      </RoundedBox>

      {/* Vertical bar */}
      <RoundedBox
        args={[barWidth, verticalLength, barThickness]}
        radius={0.003}
        smoothness={4}
        position={[0, 0, GRIP_CENTER_Z]}
        castShadow
      >
        <PowderCoatMaterial color={color} finish={finish} />
      </RoundedBox>

      {/* Corner radius */}
      <mesh
        position={[0.015, verticalLength / 2 - 0.015, GRIP_CENTER_Z]}
        castShadow
      >
        <torusGeometry args={[0.015, barThickness / 2, 16, 32, Math.PI / 2]} />
        <PowderCoatMaterial color={color} finish={finish} />
      </mesh>
    </group>
  );
}

/**
 * Maangreep: Crescent/moon shaped handle with standoff mounts.
 * Curved torus section mounted on two pootjes.
 */
export function Maangreep({ finish, doorWidth, stileWidth }: HandleProps) {
  const color = getColor(finish);
  const curveRadius = 0.08;
  const xPos = doorWidth / 2 - stileWidth - 0.12;

  return (
    <group position={[xPos, 0, 0]}>
      {/* Left mount standoff */}
      <MountStandoff
        position={[-curveRadius * 0.8, 0, MOUNT_CENTER_Z]}
        color={color}
        finish={finish}
      />

      {/* Right mount standoff */}
      <MountStandoff
        position={[curveRadius * 0.8, 0, MOUNT_CENTER_Z]}
        color={color}
        finish={finish}
      />

      {/* Main curved handle body */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, GRIP_CENTER_Z]}
        castShadow
      >
        <torusGeometry args={[curveRadius, 0.015, 16, 32, Math.PI]} />
        <PowderCoatMaterial color={color} finish={finish} />
      </mesh>

      {/* Left end cap */}
      <mesh position={[-curveRadius, 0, GRIP_CENTER_Z]} castShadow>
        <sphereGeometry args={[0.015, 32, 32]} />
        <PowderCoatMaterial color={color} finish={finish} />
      </mesh>

      {/* Right end cap */}
      <mesh position={[curveRadius, 0, GRIP_CENTER_Z]} castShadow>
        <sphereGeometry args={[0.015, 32, 32]} />
        <PowderCoatMaterial color={color} finish={finish} />
      </mesh>
    </group>
  );
}

/**
 * Ovaalgreep: Oval/elliptical pull handle with standoff mounts.
 * Extruded ellipse shape mounted on two pootjes.
 */
export function Ovaalgreep({ finish, doorWidth, stileWidth }: HandleProps) {
  const color = getColor(finish);
  const xPos = doorWidth / 2 - stileWidth - 0.12;

  const shape = new THREE.Shape();
  const rx = 0.06;
  const ry = 0.03;
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    const x = Math.cos(angle) * rx;
    const y = Math.sin(angle) * ry;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }

  return (
    <group position={[xPos, 0, 0]}>
      {/* Top mount standoff */}
      <MountStandoff
        position={[0, ry * 0.6, MOUNT_CENTER_Z]}
        color={color}
        finish={finish}
      />

      {/* Bottom mount standoff */}
      <MountStandoff
        position={[0, -ry * 0.6, MOUNT_CENTER_Z]}
        color={color}
        finish={finish}
      />

      {/* Oval handle */}
      <mesh position={[0, 0, GRIP_CENTER_Z - 0.01]} castShadow>
        <extrudeGeometry
          args={[shape, {
            depth: 0.02,
            bevelEnabled: true,
            bevelThickness: 0.003,
            bevelSize: 0.003,
            bevelSegments: 8,
          }]}
        />
        <PowderCoatMaterial color={color} finish={finish} />
      </mesh>
    </group>
  );
}

/**
 * Klink: Traditional lever handle with rosette, standoff-mounted.
 * Rosette plate against door, lever extending horizontally.
 */
export function Klink({ finish, doorWidth, stileWidth }: HandleProps) {
  const color = getColor(finish);
  const leverLength = 0.12;
  const xPos = doorWidth / 2 - stileWidth - 0.1;

  return (
    <group position={[xPos, 0, 0]}>
      {/* Mounting rosette (flat against door face) */}
      <mesh position={[0, 0, DOOR_FACE_Z + 0.004]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.008, 32]} />
        <PowderCoatMaterial color={color} finish={finish} />
      </mesh>

      {/* Square spindle standoff (connects rosette to lever) */}
      <mesh
        position={[0, 0, MOUNT_CENTER_Z]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.008, 0.008, MOUNT_LENGTH * 0.6, 8]} />
        <PowderCoatMaterial color={color} finish={finish} />
      </mesh>

      {/* Lever handle */}
      <RoundedBox
        args={[leverLength, 0.02, 0.015]}
        radius={0.005}
        smoothness={4}
        position={[leverLength / 2, 0, GRIP_CENTER_Z]}
        rotation={[0, 0, -0.15]}
        castShadow
      >
        <PowderCoatMaterial color={color} finish={finish} />
      </RoundedBox>

      {/* Lever end grip */}
      <mesh position={[leverLength, -0.015, GRIP_CENTER_Z]} castShadow>
        <sphereGeometry args={[0.012, 32, 32]} />
        <PowderCoatMaterial color={color} finish={finish} />
      </mesh>

      {/* Lock cylinder below */}
      <mesh position={[0, -0.045, DOOR_FACE_Z + 0.005]} castShadow>
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
