/**
 * Glass Pattern Generators
 * Creates custom THREE.Shape objects for decorative glass panels
 * Based on reference drawings: dt9 (rounded corners), dt10 (U-shapes)
 */

import * as THREE from "three";

export type GlassPattern = "standard" | "dt9-rounded" | "dt10-ushape";

/**
 * Standard rectangular glass panel
 */
export function createStandardGlass(width: number, height: number): THREE.Shape {
  const shape = new THREE.Shape();
  const hw = width / 2;
  const hh = height / 2;

  shape.moveTo(-hw, -hh);
  shape.lineTo(hw, -hh);
  shape.lineTo(hw, hh);
  shape.lineTo(-hw, hh);
  shape.lineTo(-hw, -hh);

  return shape;
}

/**
 * DT9: Rounded corners glass panel
 * Creates elegant rounded corners on glass sections
 */
export function createRoundedCornerGlass(
  width: number,
  height: number,
  cornerRadius: number = 0.08
): THREE.Shape {
  const shape = new THREE.Shape();
  const hw = width / 2;
  const hh = height / 2;
  const r = Math.min(cornerRadius, width / 4, height / 4);

  // Start from bottom-left corner (after radius)
  shape.moveTo(-hw + r, -hh);

  // Bottom edge
  shape.lineTo(hw - r, -hh);

  // Bottom-right rounded corner
  shape.quadraticCurveTo(hw, -hh, hw, -hh + r);

  // Right edge
  shape.lineTo(hw, hh - r);

  // Top-right rounded corner
  shape.quadraticCurveTo(hw, hh, hw - r, hh);

  // Top edge
  shape.lineTo(-hw + r, hh);

  // Top-left rounded corner
  shape.quadraticCurveTo(-hw, hh, -hw, hh - r);

  // Left edge
  shape.lineTo(-hw, -hh + r);

  // Bottom-left rounded corner
  shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

  return shape;
}

/**
 * DT10: U-shaped glass panel (top section - inverted U)
 * Creates an upside-down U shape for the upper glass section
 */
export function createInvertedUGlass(width: number, height: number): THREE.Shape {
  const shape = new THREE.Shape();
  const hw = width / 2;
  const hh = height / 2;
  const uRadius = hw * 0.85; // U curve radius

  // Start at top-left
  shape.moveTo(-hw, hh);

  // Top edge
  shape.lineTo(hw, hh);

  // Right edge down
  shape.lineTo(hw, -hh + uRadius);

  // Bottom U curve (inverted)
  shape.absarc(0, -hh + uRadius, uRadius, 0, Math.PI, false);

  // Left edge up
  shape.lineTo(-hw, hh);

  return shape;
}

/**
 * DT10: U-shaped glass panel (bottom section - normal U)
 * Creates a normal U shape for the lower glass section
 */
export function createNormalUGlass(width: number, height: number): THREE.Shape {
  const shape = new THREE.Shape();
  const hw = width / 2;
  const hh = height / 2;
  const uRadius = hw * 0.85; // U curve radius

  // Start at bottom-left
  shape.moveTo(-hw, -hh);

  // Bottom edge
  shape.lineTo(hw, -hh);

  // Right edge up
  shape.lineTo(hw, hh - uRadius);

  // Top U curve
  shape.absarc(0, hh - uRadius, uRadius, 0, Math.PI, true);

  // Left edge down
  shape.lineTo(-hw, -hh);

  return shape;
}

/**
 * DT9 Asymmetric: Create multiple panels with different rounded corners
 * For complex DT9 layouts with side panels
 */
export function createDT9Panels(
  mainWidth: number,
  mainHeight: number,
  sideWidth: number,
  position: "top-right" | "bottom-left" | "top-left" | "bottom-right"
): {
  mainPanel: THREE.Shape;
  roundedPanel: THREE.Shape;
  dividerHeight: number;
} {
  const cornerRadius = 0.12;

  // Main large panel with one rounded corner
  const mainPanel = new THREE.Shape();
  const mw = mainWidth / 2;
  const mh = mainHeight / 2;

  if (position === "top-right") {
    // Main panel with rounded top-right corner
    mainPanel.moveTo(-mw, -mh);
    mainPanel.lineTo(mw - cornerRadius, -mh);
    mainPanel.quadraticCurveTo(mw, -mh, mw, -mh + cornerRadius);
    mainPanel.lineTo(mw, mh - cornerRadius);
    mainPanel.quadraticCurveTo(mw, mh, mw - cornerRadius, mh);
    mainPanel.lineTo(-mw, mh);
    mainPanel.lineTo(-mw, -mh);
  } else if (position === "bottom-left") {
    // Main panel with rounded bottom-left corner
    mainPanel.moveTo(-mw + cornerRadius, -mh);
    mainPanel.lineTo(mw, -mh);
    mainPanel.lineTo(mw, mh);
    mainPanel.lineTo(-mw + cornerRadius, mh);
    mainPanel.quadraticCurveTo(-mw, mh, -mw, mh - cornerRadius);
    mainPanel.lineTo(-mw, -mh + cornerRadius);
    mainPanel.quadraticCurveTo(-mw, -mh, -mw + cornerRadius, -mh);
  }

  // Small rounded panel
  const roundedPanel = createRoundedCornerGlass(sideWidth, mainHeight / 3, cornerRadius * 0.6);

  return {
    mainPanel,
    roundedPanel,
    dividerHeight: mainHeight / 3,
  };
}

/**
 * Pattern metadata for UI selection
 */
export const glassPatternOptions = [
  {
    value: "standard" as GlassPattern,
    label: "Standaard",
    description: "Rechthoekige glaspanelen",
  },
  {
    value: "dt9-rounded" as GlassPattern,
    label: "DT9 - Afgeronde hoeken",
    description: "Elegante ronde hoeken",
  },
  {
    value: "dt10-ushape" as GlassPattern,
    label: "DT10 - U-vormen",
    description: "Decoratieve U-vormige panelen",
  },
] as const;
