import { create } from 'zustand';

export type DoorType = 'taats' | 'scharnier' | 'paneel';
export type GridType = '3-vlak' | '4-vlak' | 'geen';
export type Finish = 'zwart' | 'brons' | 'grijs';
export type Handle = 'u-greep' | 'klink' | 'geen';

interface ConfiguratorState {
  doorType: DoorType;
  gridType: GridType;
  finish: Finish;
  handle: Handle;
  width: number;
  height: number;

  setDoorType: (type: DoorType) => void;
  setGridType: (type: GridType) => void;
  setFinish: (finish: Finish) => void;
  setHandle: (handle: Handle) => void;
  setDimensions: (width: number, height: number) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  doorType: 'taats',
  gridType: '3-vlak',
  finish: 'zwart',
  handle: 'u-greep',
  width: 1000,
  height: 2400,

  setDoorType: (doorType) => set({ doorType }),
  setGridType: (gridType) => set({ gridType }),
  setFinish: (finish) => set({ finish }),
  setHandle: (handle) => set({ handle }),
  setDimensions: (width, height) => set({ width, height }),
}));
