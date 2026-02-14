"use client";

import { useRef, useMemo, Suspense } from "react";
import { useConfiguratorStore } from "@/lib/store";
import { RoundedBox, useTexture } from "@react-three/drei";
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
import {
  generateDoorAssembly,
  mmToMeters,
  getDividerPositions,
  PROFILE_CORNER_RADIUS,
  type PhysicalPart,
} from "@/lib/door-models";

// ============================================
// PHOTOREALISTIC MATERIALS
// ============================================

/**
 * Steel Material with Aluwdoors Texture
 * Vertical steel grain for industrial look
 */
function SteelMaterialTextured({ color, finish }: { color: string; finish: string }) {
  try {
    // Load texture based on finish
    const texturePath = {
      zwart: "/textures/aluwdoors/aluwdoors-configurator-metaalkleur-zwart.jpg",
      brons: "/textures/aluwdoors/aluwdoors-configurator-metaalkleur-brons.jpg",
      grijs: "/textures/aluwdoors/aluwdoors-configurator-metaalkleur-antraciet.jpg",
    }[finish] || "/textures/aluwdoors/aluwdoors-configurator-metaalkleur-zwart.jpg";

    const texture = useTexture(texturePath);

    // Configure texture for vertical steel grain
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(0.5, 3); // Vertical grain
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
  } catch (error) {
    return <SteelMaterialFallback color={color} />;
  }
}

/**
 * Fallback Steel Material (Solid Color)
 */
function SteelMaterialFallback({ color }: { color: string }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.7}
      metalness={0.6}
      envMapIntensity={1.5}
    />
  );
}

/**
 * Photorealistic Glass Material
 * High transmission for realistic glass look
 */
const GlassMaterial = () => (
  <meshPhysicalMaterial
    transmission={0.98}
    roughness={0.05}
    thickness={0.007}
    ior={1.5}
    color="#eff6ff"
    transparent
    opacity={0.98}
    envMapIntensity={1.0}
  />
);

// ============================================
// PHYSICAL PART RENDERER
// ============================================

/**
 * Renders a single physical part with correct geometry
 */
function PhysicalPartComponent({
  part,
  frameColor,
  finish,
}: {
  part: PhysicalPart;
  frameColor: string;
  finish: string;
}) {
  // Convert mm to meters
  const x = mmToMeters(part.x);
  const y = mmToMeters(part.y);
  const z = mmToMeters(part.z);
  const width = mmToMeters(part.width);
  const height = mmToMeters(part.height);
  const depth = mmToMeters(part.depth);

  // Glass uses different material
  if (part.isGlass) {
    return (
      <mesh position={[x, y, z]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <GlassMaterial />
      </mesh>
    );
  }

  // Steel profiles use RoundedBox for realistic edges
  const cornerRadius = mmToMeters(PROFILE_CORNER_RADIUS);

  return (
    <RoundedBox
      args={[width, height, depth]}
      radius={cornerRadius}
      smoothness={4}
      position={[x, y, z]}
      castShadow
      receiveShadow
    >
      <Suspense fallback={<SteelMaterialFallback color={frameColor} />}>
        <SteelMaterialTextured color={frameColor} finish={finish} />
      </Suspense>
    </RoundedBox>
  );
}

// ============================================
// MAIN DOOR COMPONENT
// ============================================

export function Door3DEnhanced() {
  const { doorType, gridType, finish, handle, glassPattern, doorLeafWidth, height } =
    useConfiguratorStore();
  const doorRef = useRef<THREE.Group>(null);

  // Frame color based on finish
  const frameColor = {
    zwart: "#1a1a1a",
    brons: "#8B6F47",
    grijs: "#525252",
  }[finish] || "#1a1a1a";

  // Generate door assembly from manufacturing specs
  const doorAssembly = useMemo(
    () => generateDoorAssembly(doorType, gridType, doorLeafWidth, height),
    [doorType, gridType, doorLeafWidth, height]
  );

  // Convert dimensions to meters
  const doorWidth = mmToMeters(doorLeafWidth);
  const doorHeight = mmToMeters(height);

  // Profile dimensions in meters (for handle positioning)
  const stileWidth = mmToMeters(40);
  const railDepth = mmToMeters(40);

  // Get divider positions for glass patterns (backward compatibility)
  const dividerPositions = getDividerPositions(gridType, height);

  return (
    <group ref={doorRef} position={[0, doorHeight / 2, 0]}>
      {/* RENDER ALL PHYSICAL PARTS */}
      {doorAssembly.parts.map((part, index) => (
        <PhysicalPartComponent
          key={`${part.type}-${index}`}
          part={part}
          frameColor={frameColor}
          finish={finish}
        />
      ))}

      {/* GLASS PANELS WITH PATTERNS */}
      {glassPattern !== "standard" && (
        <group position={[0, 0, 0.005]}>
          {glassPattern === "dt9-rounded" && (
            <mesh castShadow receiveShadow>
              <extrudeGeometry
                args={[
                  createRoundedCornerGlass(
                    doorWidth - stileWidth * 2,
                    doorHeight - stileWidth * 2,
                    0.12
                  ),
                  { depth: 0.01, bevelEnabled: false },
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
                      Math.abs(doorHeight / 2 - stileWidth - dividerPositions[0])
                    ),
                    { depth: 0.01, bevelEnabled: false },
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
                      Math.abs(
                        -doorHeight / 2 +
                          stileWidth -
                          dividerPositions[dividerPositions.length - 1]
                      )
                    ),
                    { depth: 0.01, bevelEnabled: false },
                  ]}
                />
                <GlassMaterial />
              </mesh>
            </>
          )}
        </group>
      )}

      {/* PROFESSIONAL 3D HANDLES */}
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
    </group>
  );
}
