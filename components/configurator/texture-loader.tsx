"use client";

import { useTexture } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

/**
 * Preload textures to prevent loading freezes
 * Uses Suspense boundary for progressive loading
 */
export function useMetalTexture(finish: string) {
  const [textureUrl, setTextureUrl] = useState<string | null>(null);

  useEffect(() => {
    const mapping: Record<string, string> = {
      zwart: "/textures/aluwdoors/aluwdoors-configurator-metaalkleur-zwart.jpg",
      brons: "/textures/aluwdoors/aluwdoors-configurator-metaalkleur-brons.jpg",
      grijs: "/textures/aluwdoors/aluwdoors-configurator-metaalkleur-antraciet.jpg",
    };

    setTextureUrl(mapping[finish] || mapping.zwart);
  }, [finish]);

  try {
    if (!textureUrl) return null;

    // Load texture with useTexture
    const texture = useTexture(textureUrl);

    // Configure texture for optimal rendering
    if (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
      texture.colorSpace = THREE.SRGBColorSpace;
    }

    return texture;
  } catch (error) {
    // Fallback: return null if texture fails to load
    console.warn("Texture loading failed, using solid color fallback", error);
    return null;
  }
}

/**
 * Enhanced Steel Material with texture support
 */
export function SteelMaterialWithTexture({
  color,
  finish,
}: {
  color: string;
  finish: string;
}) {
  const texture = useMetalTexture(finish);

  return (
    <meshStandardMaterial
      map={texture}
      color={color}
      roughness={0.7}
      metalness={0.8}
      envMapIntensity={1.2}
    />
  );
}

/**
 * Fallback Steel Material (solid color)
 */
export function SteelMaterialSolid({ color }: { color: string }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.7}
      metalness={0.8}
      envMapIntensity={1}
    />
  );
}
