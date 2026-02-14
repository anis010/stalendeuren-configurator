/**
 * Pricing Engine for Proinn Configurator
 * Based on Dutch market standard pricing (Metalworks/Aluwdoors reference)
 */

import {
  PROFILE_WIDTH,
  RAIL_HEIGHT_SLIM,
  RAIL_HEIGHT_ROBUST,
  type GridLayout,
  type DoorModel,
} from './door-models';

// Pricing constants (EUR)
const STEEL_PRICE_PER_METER = 45;
const GLASS_PRICE_PER_SQM = 140;
const BASE_FEE = 650;
const SIDE_PANEL_SURCHARGE = 250;
const DOUBLE_DOOR_SURCHARGE = 350;
const TAATS_MECHANISM_SURCHARGE = 450;
const HANDLE_PRICES: Record<string, number> = {
  'beugelgreep': 85,
  'hoekgreep': 75,
  'maangreep': 95,
  'ovaalgreep': 90,
  'klink': 65,
  'u-greep': 55,
  'geen': 0,
};

function calculateSteelLength(
  doorWidth: number,
  doorHeight: number,
  gridLayout: GridLayout,
  hasVerticalDivider: boolean
): number {
  const innerWidth = doorWidth - PROFILE_WIDTH * 2;
  let totalLength = doorHeight * 2 + innerWidth * 2;

  if (gridLayout === '3-vlak') {
    totalLength += innerWidth * 2;
  } else if (gridLayout === '4-vlak') {
    totalLength += innerWidth * 3;
  }

  if (hasVerticalDivider) {
    totalLength += doorHeight - RAIL_HEIGHT_ROBUST * 2;
  }

  return totalLength / 1000;
}

function calculateGlassArea(
  doorWidth: number,
  doorHeight: number,
  gridLayout: GridLayout
): number {
  const glassWidth = doorWidth - PROFILE_WIDTH * 2;
  const glassHeight = doorHeight - RAIL_HEIGHT_ROBUST * 2;

  let dividerArea = 0;
  if (gridLayout === '3-vlak') {
    dividerArea = glassWidth * RAIL_HEIGHT_SLIM * 2;
  } else if (gridLayout === '4-vlak') {
    dividerArea = glassWidth * RAIL_HEIGHT_SLIM * 3;
  }

  return (glassWidth * glassHeight - dividerArea) / 1_000_000;
}

export interface PriceBreakdown {
  steelCost: number;
  glassCost: number;
  baseFee: number;
  mechanismSurcharge: number;
  sidePanelSurcharge: number;
  handleCost: number;
  totalPrice: number;
  steelLengthM: number;
  glassAreaSqm: number;
}

export function calculatePrice(
  doorWidth: number,
  doorHeight: number,
  doorType: DoorModel,
  gridLayout: GridLayout,
  doorConfig: 'enkele' | 'dubbele',
  sidePanel: 'geen' | 'links' | 'rechts' | 'beide',
  handle: string
): PriceBreakdown {
  const leafCount = doorConfig === 'dubbele' ? 2 : 1;
  const hasVerticalDivider = doorType === 'paneel';

  const steelLengthPerLeaf = calculateSteelLength(doorWidth, doorHeight, gridLayout, hasVerticalDivider);
  const glassAreaPerLeaf = calculateGlassArea(doorWidth, doorHeight, gridLayout);

  const totalSteelLength = steelLengthPerLeaf * leafCount;
  const totalGlassArea = glassAreaPerLeaf * leafCount;

  const sidePanelCount = sidePanel === 'beide' ? 2 : (sidePanel === 'geen' ? 0 : 1);

  const steelCost = Math.round(totalSteelLength * STEEL_PRICE_PER_METER);
  const glassCost = Math.round(totalGlassArea * GLASS_PRICE_PER_SQM);

  let mechanismSurcharge = 0;
  if (doorType === 'taats') mechanismSurcharge += TAATS_MECHANISM_SURCHARGE;
  if (doorConfig === 'dubbele') mechanismSurcharge += DOUBLE_DOOR_SURCHARGE;

  const handleCost = HANDLE_PRICES[handle] || 0;
  const sidePanelSurchrg = sidePanelCount * SIDE_PANEL_SURCHARGE;

  const totalPrice = steelCost + glassCost + BASE_FEE + mechanismSurcharge + sidePanelSurchrg + handleCost;

  return {
    steelCost,
    glassCost,
    baseFee: BASE_FEE,
    mechanismSurcharge,
    sidePanelSurcharge: sidePanelSurchrg,
    handleCost,
    totalPrice,
    steelLengthM: Math.round(totalSteelLength * 100) / 100,
    glassAreaSqm: Math.round(totalGlassArea * 100) / 100,
  };
}
