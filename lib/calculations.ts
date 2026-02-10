/**
 * Door dimension calculations
 * Based on standard steel door configurations
 */

export type DoorConfig = 'enkele' | 'dubbele';
export type SidePanel = 'geen' | 'links' | 'rechts' | 'beide';

// Standard constants
const FRAME_PROFILE_WIDTH = 80; // mm - Steel frame profile width
const SIDE_PANEL_MIN_WIDTH = 200; // mm
const SIDE_PANEL_MAX_WIDTH = 800; // mm
const DOOR_LEAF_MIN_WIDTH = 700; // mm
const DOOR_LEAF_MAX_WIDTH = 1200; // mm

/**
 * Calculate the total hole width needed in the wall
 */
export function calculateHoleWidth(
  doorWidth: number,
  doorConfig: DoorConfig,
  sidePanel: SidePanel
): number {
  let totalWidth = doorWidth;

  // Add frame profiles
  totalWidth += FRAME_PROFILE_WIDTH * 2;

  // Add side panels if configured
  if (sidePanel === 'links' || sidePanel === 'rechts') {
    totalWidth += SIDE_PANEL_MIN_WIDTH;
  } else if (sidePanel === 'beide') {
    totalWidth += SIDE_PANEL_MIN_WIDTH * 2;
  }

  return totalWidth;
}

/**
 * Calculate minimum hole width based on configuration
 */
export function calculateHoleMinWidth(
  doorConfig: DoorConfig,
  sidePanel: SidePanel
): number {
  let minWidth = DOOR_LEAF_MIN_WIDTH;

  // Double door requires two leaves
  if (doorConfig === 'dubbele') {
    minWidth *= 2;
  }

  // Add frame profiles
  minWidth += FRAME_PROFILE_WIDTH * 2;

  // Add side panels
  if (sidePanel === 'links' || sidePanel === 'rechts') {
    minWidth += SIDE_PANEL_MIN_WIDTH;
  } else if (sidePanel === 'beide') {
    minWidth += SIDE_PANEL_MIN_WIDTH * 2;
  }

  return minWidth;
}

/**
 * Calculate maximum hole width based on configuration
 */
export function calculateHoleMaxWidth(
  doorConfig: DoorConfig,
  sidePanel: SidePanel
): number {
  let maxWidth = DOOR_LEAF_MAX_WIDTH;

  // Double door requires two leaves
  if (doorConfig === 'dubbele') {
    maxWidth *= 2;
  }

  // Add frame profiles
  maxWidth += FRAME_PROFILE_WIDTH * 2;

  // Add side panels
  if (sidePanel === 'links' || sidePanel === 'rechts') {
    maxWidth += SIDE_PANEL_MAX_WIDTH;
  } else if (sidePanel === 'beide') {
    maxWidth += SIDE_PANEL_MAX_WIDTH * 2;
  }

  return maxWidth;
}

/**
 * Calculate individual side panel width
 */
export function calculateSidePanelWidth(
  totalWidth: number,
  doorConfig: DoorConfig,
  sidePanel: SidePanel
): number {
  if (sidePanel === 'geen') return 0;

  // Calculate door leaf width
  let doorLeafWidth = DOOR_LEAF_MIN_WIDTH;
  if (doorConfig === 'dubbele') {
    doorLeafWidth *= 2;
  }

  // Remaining space for side panels (minus frame profiles)
  const availableForPanels = totalWidth - doorLeafWidth - FRAME_PROFILE_WIDTH * 2;

  // Distribute to panels
  if (sidePanel === 'links' || sidePanel === 'rechts') {
    return Math.max(SIDE_PANEL_MIN_WIDTH, availableForPanels);
  } else if (sidePanel === 'beide') {
    return Math.max(SIDE_PANEL_MIN_WIDTH, availableForPanels / 2);
  }

  return 0;
}

/**
 * Calculate door leaf width (individual door panel)
 */
export function calculateDoorLeafWidth(
  totalWidth: number,
  doorConfig: DoorConfig,
  sidePanel: SidePanel
): number {
  // Subtract frame profiles
  let availableWidth = totalWidth - FRAME_PROFILE_WIDTH * 2;

  // Subtract side panels
  const sidePanelWidth = calculateSidePanelWidth(totalWidth, doorConfig, sidePanel);
  if (sidePanel === 'links' || sidePanel === 'rechts') {
    availableWidth -= sidePanelWidth;
  } else if (sidePanel === 'beide') {
    availableWidth -= sidePanelWidth * 2;
  }

  // Divide by number of door leaves
  if (doorConfig === 'dubbele') {
    availableWidth /= 2;
  }

  return Math.max(DOOR_LEAF_MIN_WIDTH, availableWidth);
}

/**
 * Validate dimensions
 */
export function validateDimensions(
  width: number,
  height: number,
  doorConfig: DoorConfig,
  sidePanel: SidePanel
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  const minWidth = calculateHoleMinWidth(doorConfig, sidePanel);
  const maxWidth = calculateHoleMaxWidth(doorConfig, sidePanel);

  if (width < minWidth) {
    errors.push(`Breedte moet minimaal ${minWidth}mm zijn voor deze configuratie`);
  }

  if (width > maxWidth) {
    errors.push(`Breedte mag maximaal ${maxWidth}mm zijn voor deze configuratie`);
  }

  if (height < 1800) {
    errors.push('Hoogte moet minimaal 1800mm zijn');
  }

  if (height > 3000) {
    errors.push('Hoogte mag maximaal 3000mm zijn');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
