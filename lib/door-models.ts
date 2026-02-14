/**
 * Door Manufacturing Specifications
 * Based on "Metalworks" market analysis
 * All dimensions in millimeters (mm)
 */

// ============================================
// MANUFACTURING CONSTANTS
// ============================================

/**
 * Steel Profile Dimensions (40x40mm Square Tube)
 * Standard industrial steel door profile
 */
export const PROFILE_WIDTH = 40; // mm - Face width
export const PROFILE_DEPTH = 40; // mm - Tube depth
export const PROFILE_CORNER_RADIUS = 2; // mm - Rounded corners for welding

/**
 * Steel Profile Named Exports (aliases for pricing/manufacturing clarity)
 */
export const STILE_WIDTH = 40; // mm - Vertical profiles (same as PROFILE_WIDTH)
export const RAIL_WIDTH = 20; // mm - Horizontal slim-line profiles

/**
 * Glass Specifications - Standard 33.1 laminated safety glass (VSG 33.1)
 */
export const GLASS_THICKNESS = 7; // mm - Standard 33.1 Safety Glass
export const GLASS_OFFSET = 15; // mm - Center glass in 40mm profile: (40-7)/2 - 1.5mm clearance

/**
 * Rail Height Variations
 */
export const RAIL_HEIGHT_SLIM = 20; // mm - Slim horizontal rails
export const RAIL_HEIGHT_ROBUST = 40; // mm - Standard robust rails (same as profile)

/**
 * Taats (Pivot) Door Mechanism
 */
export const TAATS_PIVOT_OFFSET = 60; // mm - Pivot axis offset from wall for Taats doors

// ============================================
// PHYSICAL PART TYPES
// ============================================

export type PartType = 'stile' | 'rail' | 'glass' | 'divider';
export type DoorModel = 'taats' | 'scharnier' | 'paneel';
export type GridLayout = '3-vlak' | '4-vlak' | 'geen';

/**
 * Physical Door Component
 * Represents an actual steel part that will be manufactured
 */
export interface PhysicalPart {
  type: PartType;
  // Position in 3D space (in mm, relative to door center)
  x: number;
  y: number;
  z: number;
  // Dimensions in mm
  width: number;
  height: number;
  depth: number;
  // Metadata
  label?: string;
  isGlass?: boolean;
}

/**
 * Complete Door Assembly
 */
export interface DoorAssembly {
  modelId: DoorModel;
  gridLayout: GridLayout;
  doorWidth: number; // mm - Actual door leaf width
  doorHeight: number; // mm - Door height
  parts: PhysicalPart[];
}

// ============================================
// LAYOUT GENERATION
// ============================================

/**
 * Generate physical parts list for door manufacturing
 *
 * @param modelId - Door model (taats, scharnier, paneel)
 * @param gridLayout - Grid division (3-vlak, 4-vlak, geen)
 * @param doorWidth - Door leaf width in mm
 * @param doorHeight - Door height in mm
 * @returns Complete assembly with all physical parts
 */
export function generateDoorAssembly(
  modelId: DoorModel,
  gridLayout: GridLayout,
  doorWidth: number,
  doorHeight: number
): DoorAssembly {
  const parts: PhysicalPart[] = [];

  // ============================================
  // PERIMETER FRAME (All door types)
  // ============================================

  // LEFT STILE (Vertical)
  parts.push({
    type: 'stile',
    x: -doorWidth / 2 + PROFILE_WIDTH / 2,
    y: 0,
    z: 0,
    width: PROFILE_WIDTH,
    height: doorHeight,
    depth: PROFILE_DEPTH,
    label: 'Left Stile',
  });

  // RIGHT STILE (Vertical)
  parts.push({
    type: 'stile',
    x: doorWidth / 2 - PROFILE_WIDTH / 2,
    y: 0,
    z: 0,
    width: PROFILE_WIDTH,
    height: doorHeight,
    depth: PROFILE_DEPTH,
    label: 'Right Stile',
  });

  // TOP RAIL (Horizontal)
  const topRailWidth = doorWidth - PROFILE_WIDTH * 2;
  parts.push({
    type: 'rail',
    x: 0,
    y: doorHeight / 2 - RAIL_HEIGHT_ROBUST / 2,
    z: 0,
    width: topRailWidth,
    height: RAIL_HEIGHT_ROBUST,
    depth: PROFILE_DEPTH,
    label: 'Top Rail',
  });

  // BOTTOM RAIL (Horizontal)
  parts.push({
    type: 'rail',
    x: 0,
    y: -doorHeight / 2 + RAIL_HEIGHT_ROBUST / 2,
    z: 0,
    width: topRailWidth,
    height: RAIL_HEIGHT_ROBUST,
    depth: PROFILE_DEPTH,
    label: 'Bottom Rail',
  });

  // ============================================
  // GRID DIVIDERS (Based on layout)
  // ============================================

  if (gridLayout === '3-vlak') {
    // Two horizontal dividers at 1/3 and 2/3 height
    const divider1Y = doorHeight / 2 - doorHeight / 3;
    const divider2Y = doorHeight / 2 - (2 * doorHeight) / 3;

    parts.push({
      type: 'divider',
      x: 0,
      y: divider1Y,
      z: 0,
      width: topRailWidth,
      height: RAIL_HEIGHT_SLIM,
      depth: PROFILE_DEPTH,
      label: 'Divider 1/3',
    });

    parts.push({
      type: 'divider',
      x: 0,
      y: divider2Y,
      z: 0,
      width: topRailWidth,
      height: RAIL_HEIGHT_SLIM,
      depth: PROFILE_DEPTH,
      label: 'Divider 2/3',
    });
  } else if (gridLayout === '4-vlak') {
    // Three horizontal dividers at 1/4, 1/2, 3/4 height
    const divider1Y = doorHeight / 2 - doorHeight / 4;
    const divider2Y = 0;
    const divider3Y = doorHeight / 2 - (3 * doorHeight) / 4;

    parts.push({
      type: 'divider',
      x: 0,
      y: divider1Y,
      z: 0,
      width: topRailWidth,
      height: RAIL_HEIGHT_SLIM,
      depth: PROFILE_DEPTH,
      label: 'Divider 1/4',
    });

    parts.push({
      type: 'divider',
      x: 0,
      y: divider2Y,
      z: 0,
      width: topRailWidth,
      height: RAIL_HEIGHT_SLIM,
      depth: PROFILE_DEPTH,
      label: 'Divider 1/2',
    });

    parts.push({
      type: 'divider',
      x: 0,
      y: divider3Y,
      z: 0,
      width: topRailWidth,
      height: RAIL_HEIGHT_SLIM,
      depth: PROFILE_DEPTH,
      label: 'Divider 3/4',
    });
  }

  // ============================================
  // VERTICAL CENTER DIVIDER (Paneel type only)
  // ============================================

  if (modelId === 'paneel') {
    const verticalDividerHeight = doorHeight - RAIL_HEIGHT_ROBUST * 2;

    parts.push({
      type: 'divider',
      x: 0,
      y: 0,
      z: 0,
      width: PROFILE_WIDTH,
      height: verticalDividerHeight,
      depth: PROFILE_DEPTH,
      label: 'Center Vertical Divider',
    });
  }

  // ============================================
  // GLASS PANELS
  // ============================================

  // Calculate glass dimensions (inside frame with offset)
  const glassWidth = doorWidth - PROFILE_WIDTH * 2 - GLASS_OFFSET * 2;
  const glassHeight = doorHeight - RAIL_HEIGHT_ROBUST * 2 - GLASS_OFFSET * 2;

  parts.push({
    type: 'glass',
    x: 0,
    y: 0,
    z: 0,
    width: glassWidth,
    height: glassHeight,
    depth: GLASS_THICKNESS,
    label: 'Main Glass Panel',
    isGlass: true,
  });

  return {
    modelId,
    gridLayout,
    doorWidth,
    doorHeight,
    parts,
  };
}

/**
 * Convert mm to meters for Three.js 3D scene
 */
export function mmToMeters(mm: number): number {
  return mm / 1000;
}

/**
 * Get divider positions in meters (for backward compatibility)
 */
export function getDividerPositions(
  gridLayout: GridLayout,
  doorHeight: number
): number[] {
  const doorHeightMeters = mmToMeters(doorHeight);

  if (gridLayout === '3-vlak') {
    return [-doorHeightMeters / 3, doorHeightMeters / 3];
  } else if (gridLayout === '4-vlak') {
    return [-doorHeightMeters / 2, 0, doorHeightMeters / 2];
  }

  return [];
}

/**
 * Validation: Check if door dimensions are manufacturable
 */
export function validateDoorDimensions(
  doorWidth: number,
  doorHeight: number
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Minimum dimensions check
  if (doorWidth < PROFILE_WIDTH * 3) {
    errors.push(`Door width too small (min: ${PROFILE_WIDTH * 3}mm)`);
  }

  if (doorHeight < RAIL_HEIGHT_ROBUST * 3) {
    errors.push(`Door height too small (min: ${RAIL_HEIGHT_ROBUST * 3}mm)`);
  }

  // Maximum dimensions check (based on steel profile strength)
  if (doorWidth > 1200) {
    errors.push('Door width exceeds maximum (1200mm) - structural integrity');
  }

  if (doorHeight > 3000) {
    errors.push('Door height exceeds maximum (3000mm) - structural integrity');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
