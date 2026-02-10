"use client";

import { Suspense } from "react";
import { useConfiguratorStore } from "@/lib/store";
import { Scene3D } from "./scene";

function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="text-center">
        <div className="mb-4 size-12 animate-spin rounded-full border-4 border-[#1A2E2E] border-t-[#C4D668]" />
        <p className="text-sm font-medium text-[#1A2E2E]">3D Scene laden...</p>
      </div>
    </div>
  );
}

export function DoorVisualizer() {
  const { doorType, gridType, finish, handle } = useConfiguratorStore();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2.5rem]">
      {/* Live Preview Badge */}
      <div className="absolute left-8 top-8 z-10">
        <div className="flex items-center gap-2 rounded-full bg-[#1A2E2E] px-4 py-2 text-sm font-semibold text-white shadow-lg">
          <div className="size-2 animate-pulse rounded-full bg-[#C4D668]" />
          3D Voorbeeld
        </div>
      </div>

      {/* 3D Scene */}
      <Suspense fallback={<LoadingFallback />}>
        <Scene3D />
      </Suspense>

      {/* Configuration Info Card */}
      <div className="absolute bottom-8 left-8 right-8 z-10">
        <div className="rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-xs font-medium text-gray-500">Type</div>
              <div className="font-semibold capitalize text-[#1A2E2E]">
                {doorType}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Verdeling</div>
              <div className="font-semibold text-[#1A2E2E]">{gridType}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Afwerking</div>
              <div className="font-semibold capitalize text-[#1A2E2E]">
                {finish}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Greep</div>
              <div className="font-semibold capitalize text-[#1A2E2E]">
                {handle}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Hint */}
      <div className="absolute bottom-8 right-8 z-10 hidden lg:block">
        <div className="rounded-xl bg-[#1A2E2E]/80 px-3 py-2 text-xs text-white backdrop-blur-sm">
          <p className="font-medium">🖱️ Drag to rotate • Scroll to zoom</p>
        </div>
      </div>
    </div>
  );
}
