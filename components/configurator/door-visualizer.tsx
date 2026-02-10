"use client";

import { useConfiguratorStore } from "@/lib/store";

export function DoorVisualizer() {
  const { doorType, gridType, finish, handle } = useConfiguratorStore();

  // Color mapping based on finish
  const frameColor = {
    zwart: "#1A1A1A",
    brons: "#8B6F47",
    grijs: "#4A5568",
  }[finish];

  const viewBoxWidth = 400;
  const viewBoxHeight = 600;
  const frameThickness = 20;
  const padding = 40;

  // Door dimensions within viewBox
  const doorWidth = viewBoxWidth - padding * 2;
  const doorHeight = viewBoxHeight - padding * 2;
  const doorX = padding;
  const doorY = padding;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Background room image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url(/images/hero.jpg)" }}
      />
      <div className="absolute inset-0 bg-white/40" />

      {/* Live Preview Badge */}
      <div className="absolute left-8 top-8 z-10">
        <div className="flex items-center gap-2 rounded-full bg-[#1A2E2E] px-4 py-2 text-sm font-semibold text-white shadow-lg">
          <div className="size-2 animate-pulse rounded-full bg-[#C4D668]" />
          Live Voorbeeld
        </div>
      </div>

      {/* SVG Door */}
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="relative z-10 h-[90%] w-auto drop-shadow-2xl"
      >
        {/* Outer Frame */}
        <rect
          x={doorX}
          y={doorY}
          width={doorWidth}
          height={doorHeight}
          fill={frameColor}
          stroke={frameColor}
          strokeWidth="2"
          rx="4"
        />

        {/* Inner panel (lighter) */}
        <rect
          x={doorX + frameThickness}
          y={doorY + frameThickness}
          width={doorWidth - frameThickness * 2}
          height={doorHeight - frameThickness * 2}
          fill={frameColor}
          opacity="0.7"
          rx="2"
        />

        {/* Grid Lines based on gridType */}
        {gridType === "3-vlak" && (
          <>
            <line
              x1={doorX + frameThickness}
              y1={doorY + doorHeight / 3}
              x2={doorX + doorWidth - frameThickness}
              y2={doorY + doorHeight / 3}
              stroke={frameColor}
              strokeWidth="8"
            />
            <line
              x1={doorX + frameThickness}
              y1={doorY + (doorHeight / 3) * 2}
              x2={doorX + doorWidth - frameThickness}
              y2={doorY + (doorHeight / 3) * 2}
              stroke={frameColor}
              strokeWidth="8"
            />
          </>
        )}

        {gridType === "4-vlak" && (
          <>
            <line
              x1={doorX + frameThickness}
              y1={doorY + doorHeight / 4}
              x2={doorX + doorWidth - frameThickness}
              y2={doorY + doorHeight / 4}
              stroke={frameColor}
              strokeWidth="8"
            />
            <line
              x1={doorX + frameThickness}
              y1={doorY + doorHeight / 2}
              x2={doorX + doorWidth - frameThickness}
              y2={doorY + doorHeight / 2}
              stroke={frameColor}
              strokeWidth="8"
            />
            <line
              x1={doorX + frameThickness}
              y1={doorY + (doorHeight / 4) * 3}
              x2={doorX + doorWidth - frameThickness}
              y2={doorY + (doorHeight / 4) * 3}
              stroke={frameColor}
              strokeWidth="8"
            />
          </>
        )}

        {/* Handle based on doorType */}
        {doorType === "taats" && handle === "u-greep" && (
          <rect
            x={doorX + doorWidth / 2 - 6}
            y={doorY + doorHeight / 2 - 80}
            width="12"
            height="160"
            fill="#B8860B"
            rx="6"
          />
        )}

        {doorType === "scharnier" && handle === "klink" && (
          <>
            {/* Handle base */}
            <rect
              x={doorX + doorWidth - frameThickness - 50}
              y={doorY + doorHeight / 2 - 8}
              width="40"
              height="16"
              fill="#B8860B"
              rx="8"
            />
            {/* Handle knob */}
            <circle
              cx={doorX + doorWidth - frameThickness - 30}
              cy={doorY + doorHeight / 2}
              r="6"
              fill="#8B6F47"
            />
          </>
        )}

        {doorType === "paneel" && (
          <>
            {/* Central vertical line for paneel */}
            <line
              x1={doorX + doorWidth / 2}
              y1={doorY + frameThickness}
              x2={doorX + doorWidth / 2}
              y2={doorY + doorHeight - frameThickness}
              stroke={frameColor}
              strokeWidth="8"
            />
          </>
        )}
      </svg>

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
    </div>
  );
}
