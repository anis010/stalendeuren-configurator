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

  // Actions with automatic recalculation
  setDoorType: (doorType) => {
    set({ doorType });
    recalculate(get, set);
  },

  setDoorConfig: (doorConfig) => {
    set({ doorConfig });
    recalculate(get, set);
  },

  setSidePanel: (sidePanel) => {
    set({ sidePanel });
    recalculate(get, set);
  },

  setGridType: (gridType) => set({ gridType }),

  setFinish: (finish) => set({ finish }),

  setHandle: (handle) => set({ handle }),

  setGlassPattern: (glassPattern) => set({ glassPattern }),

  setWidth: (width) => {
    const { doorConfig, sidePanel } = get();
    const minWidth = calculateHoleMinWidth(doorConfig, sidePanel);
    const maxWidth = calculateHoleMaxWidth(doorConfig, sidePanel);

    // Clamp width to valid range
    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, width));
    set({ width: clampedWidth });
    recalculate(get, set);
  },

  setHeight: (height) => {
    // Clamp height to valid range
    const clampedHeight = Math.max(1800, Math.min(3000, height));
    set({ height: clampedHeight });
  },

  setDimensions: (width, height) => {
    get().setWidth(width);
    get().setHeight(height);
  },
}));
