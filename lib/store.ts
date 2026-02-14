import { create } from 'zustand';
import {
  calculateHoleWidth,
  calculateHoleMinWidth,
  calculateHoleMaxWidth,
  calculateSidePanelWidth,
  calculateDoorLeafWidth,
  type DoorConfig,
  type SidePanel,
} from './calculations';
import type { GlassPattern } from './glass-patterns';
import { calculatePrice, type PriceBreakdown } from './pricing';

export type DoorType = 'taats' | 'scharnier' | 'paneel';
export type GridType = '3-vlak' | '4-vlak' | 'geen';
export type Finish = 'zwart' | 'brons' | 'grijs';
export type Handle = 'beugelgreep' | 'hoekgreep' | 'maangreep' | 'ovaalgreep' | 'klink' | 'u-greep' | 'geen';

interface ConfiguratorState {
  // Door configuration
  doorType: DoorType;
  doorConfig: DoorConfig;
  sidePanel: SidePanel;

  // Styling
  gridType: GridType;
  finish: Finish;
  handle: Handle;
  glassPattern: GlassPattern;

  // Dimensions (in mm)
  width: number;
  height: number;

  // Calculated values
  holeWidth: number;
  doorLeafWidth: number;
  sidePanelWidth: number;
  minWidth: number;
  maxWidth: number;

  // Pricing
  priceBreakdown: PriceBreakdown;

  // Actions
  setDoorType: (type: DoorType) => void;
  setDoorConfig: (config: DoorConfig) => void;
  setSidePanel: (panel: SidePanel) => void;
  setGridType: (type: GridType) => void;
  setFinish: (finish: Finish) => void;
  setHandle: (handle: Handle) => void;
  setGlassPattern: (pattern: GlassPattern) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setDimensions: (width: number, height: number) => void;
}

// Helper function for recalculation
const recalculate = (get: () => ConfiguratorState, set: (state: Partial<ConfiguratorState>) => void) => {
  const { width, doorConfig, sidePanel } = get();

  set({
    holeWidth: calculateHoleWidth(width, doorConfig, sidePanel),
    doorLeafWidth: calculateDoorLeafWidth(width, doorConfig, sidePanel),
    sidePanelWidth: calculateSidePanelWidth(width, doorConfig, sidePanel),
    minWidth: calculateHoleMinWidth(doorConfig, sidePanel),
    maxWidth: calculateHoleMaxWidth(doorConfig, sidePanel),
  });
};

// Helper function for price recalculation
const recalculatePrice = (get: () => ConfiguratorState, set: (state: Partial<ConfiguratorState>) => void) => {
  const { doorLeafWidth, height, doorType, gridType, doorConfig, sidePanel, handle } = get();
  const priceBreakdown = calculatePrice(doorLeafWidth, height, doorType, gridType, doorConfig, sidePanel, handle);
  set({ priceBreakdown });
};

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  // Initial state
  doorType: 'taats',
  doorConfig: 'enkele',
  sidePanel: 'geen',
  gridType: '3-vlak',
  finish: 'zwart',
  handle: 'beugelgreep',
  glassPattern: 'standard',
  width: 1000,
  height: 2400,

  // Initial calculated values
  holeWidth: 1160,
  doorLeafWidth: 1000,
  sidePanelWidth: 0,
  minWidth: 860,
  maxWidth: 1360,

  // Initial price (computed with defaults: taats, 3-vlak, enkele, geen, beugelgreep, 1000x2400)
  priceBreakdown: calculatePrice(1000, 2400, 'taats', '3-vlak', 'enkele', 'geen', 'beugelgreep'),

  // Actions with automatic recalculation
  setDoorType: (doorType) => {
    set({ doorType });
    recalculate(get, set);
    recalculatePrice(get, set);
  },

  setDoorConfig: (doorConfig) => {
    set({ doorConfig });
    recalculate(get, set);
    recalculatePrice(get, set);
  },

  setSidePanel: (sidePanel) => {
    set({ sidePanel });
    recalculate(get, set);
    recalculatePrice(get, set);
  },

  setGridType: (gridType) => {
    set({ gridType });
    recalculatePrice(get, set);
  },

  setFinish: (finish) => set({ finish }),

  setHandle: (handle) => {
    set({ handle });
    recalculatePrice(get, set);
  },

  setGlassPattern: (glassPattern) => set({ glassPattern }),

  setWidth: (width) => {
    const { doorConfig, sidePanel } = get();
    const minWidth = calculateHoleMinWidth(doorConfig, sidePanel);
    const maxWidth = calculateHoleMaxWidth(doorConfig, sidePanel);

    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, width));
    set({ width: clampedWidth });
    recalculate(get, set);
    recalculatePrice(get, set);
  },

  setHeight: (height) => {
    const clampedHeight = Math.max(1800, Math.min(3000, height));
    set({ height: clampedHeight });
    recalculatePrice(get, set);
  },

  setDimensions: (width, height) => {
    get().setWidth(width);
    get().setHeight(height);
  },
}));
