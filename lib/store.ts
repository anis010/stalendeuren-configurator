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

export type DoorType = 'taats' | 'scharnier' | 'paneel';
export type GridType = '3-vlak' | '4-vlak' | 'geen';
export type Finish = 'zwart' | 'brons' | 'grijs';
export type Handle = 'u-greep' | 'klink' | 'geen';

interface ConfiguratorState {
  // Door configuration
  doorType: DoorType;
  doorConfig: DoorConfig;
  sidePanel: SidePanel;

  // Styling
  gridType: GridType;
  finish: Finish;
  handle: Handle;

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
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setDimensions: (width: number, height: number) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  // Initial state
  doorType: 'taats',
  doorConfig: 'enkele',
  sidePanel: 'geen',
  gridType: '3-vlak',
  finish: 'zwart',
  handle: 'u-greep',
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
    get().recalculate();
  },

  setDoorConfig: (doorConfig) => {
    set({ doorConfig });
    get().recalculate();
  },

  setSidePanel: (sidePanel) => {
    set({ sidePanel });
    get().recalculate();
  },

  setGridType: (gridType) => set({ gridType }),

  setFinish: (finish) => set({ finish }),

  setHandle: (handle) => set({ handle }),

  setWidth: (width) => {
    const { doorConfig, sidePanel } = get();
    const minWidth = calculateHoleMinWidth(doorConfig, sidePanel);
    const maxWidth = calculateHoleMaxWidth(doorConfig, sidePanel);

    // Clamp width to valid range
    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, width));
    set({ width: clampedWidth });
    get().recalculate();
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

  // Internal recalculation helper
  recalculate: () => {
    const { width, doorConfig, sidePanel } = get();

    set({
      holeWidth: calculateHoleWidth(width, doorConfig, sidePanel),
      doorLeafWidth: calculateDoorLeafWidth(width, doorConfig, sidePanel),
      sidePanelWidth: calculateSidePanelWidth(width, doorConfig, sidePanel),
      minWidth: calculateHoleMinWidth(doorConfig, sidePanel),
      maxWidth: calculateHoleMaxWidth(doorConfig, sidePanel),
    });
  },
} as ConfiguratorState));
