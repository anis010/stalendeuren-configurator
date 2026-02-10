"use client";

import { useConfiguratorStore } from "@/lib/store";

export function DoorVisualizer() {
  const { doorType, gridType, finish, handle } = useConfiguratorStore();

  // Frame color mapping based on finish
  const frameColor = {
    zwart: "#1f1f1f",
    brons: "#8B6F47",
    grijs: "#525252",
  }[finish];

  // Door width varies by type
  const doorWidth = doorType === "paneel" ? "w-[300px]" : "w-[240px]";

  // Grid configuration
  const gridConfig = {
    "3-vlak": "grid-rows-3",
    "4-vlak": "grid-rows-4",
    geen: "",
  }[gridType];

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2.5rem]">
      {/* Background room image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero.jpg)" }}
      />
      <div className="absolute inset-0 bg-white/60" />

      {/* Live Preview Badge */}
      <div className="absolute left-8 top-8 z-10">
        <div className="flex items-center gap-2 rounded-full bg-[#1A2E2E] px-4 py-2 text-sm font-semibold text-white shadow-lg">
          <div className="size-2 animate-pulse rounded-full bg-[#C4D668]" />
          Live Voorbeeld
        </div>
      </div>

      {/* The Door Frame (CSS-based) */}
      <div className="relative z-10 flex h-[500px] items-center justify-center">
        <div
          className={`relative h-[480px] ${doorWidth} rounded-sm border-[12px] shadow-2xl ring-1 ring-white/10`}
          style={{ borderColor: frameColor }}
        >
          {/* The Glass Panels with Grid */}
          {gridType !== "geen" ? (
            <div
              className={`grid h-full w-full gap-y-3 ${gridConfig}`}
              style={{ backgroundColor: frameColor }}
            >
              {gridType === "3-vlak" &&
                [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="backdrop-blur-[1px] backdrop-brightness-110 bg-sky-100/10"
                  />
                ))}
              {gridType === "4-vlak" &&
                [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="backdrop-blur-[1px] backdrop-brightness-110 bg-sky-100/10"
                  />
                ))}
            </div>
          ) : (
            // No grid - single glass panel
            <div className="h-full w-full backdrop-blur-[1px] backdrop-brightness-110 bg-sky-100/10" />
          )}

          {/* Handle Overlays */}
          {doorType === "taats" && handle === "u-greep" && (
            <div
              className="absolute left-1/2 top-1/2 h-32 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg"
              style={{ backgroundColor: frameColor }}
            />
          )}

          {doorType === "scharnier" && handle === "klink" && (
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1">
              <div
                className="h-2 w-12 rounded-full shadow-md"
                style={{ backgroundColor: frameColor }}
              />
              <div
                className="size-3 rounded-full shadow-md ring-1 ring-white/20"
                style={{ backgroundColor: finish === "brons" ? "#6B5434" : frameColor }}
              />
            </div>
          )}

          {doorType === "paneel" && (
            // Central vertical divider for paneel
            <div
              className="absolute left-1/2 top-0 h-full w-3 -translate-x-1/2 shadow-inner"
              style={{ backgroundColor: frameColor }}
            />
          )}
        </div>
      </div>

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
