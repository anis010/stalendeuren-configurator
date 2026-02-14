"use client";

import { useConfiguratorStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Check } from "lucide-react";

export function StepDimensions() {
  const {
    doorConfig,
    sidePanel,
    width,
    height,
    minWidth,
    maxWidth,
    holeWidth,
    doorLeafWidth,
    sidePanelWidth,
    setDoorConfig,
    setSidePanel,
    setWidth,
    setHeight,
  } = useConfiguratorStore();

  return (
    <div className="space-y-8">
      {/* Door Configuration */}
      <div>
        <h2 className="mb-2 text-lg font-bold text-[#1A2E2E]">Deur Configuratie</h2>
        <p className="mb-4 text-sm text-gray-600">
          Kies tussen enkele of dubbele deur.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {(['enkele', 'dubbele'] as const).map((config) => {
            const selected = doorConfig === config;

            return (
              <button
                key={config}
                type="button"
                onClick={() => setDoorConfig(config)}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  selected
                    ? "border-[#C4D668] bg-[#1A2E2E] text-white"
                    : "border-gray-200 bg-white text-gray-900 hover:border-[#1A2E2E]/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold capitalize">{config} deur</h3>
                    <p
                      className={`mt-1 text-sm ${
                        selected ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {config === 'enkele' ? '1 deurblad' : '2 deurbladen'}
                    </p>
                  </div>
                  {selected && (
                    <div className="flex size-6 items-center justify-center rounded-full bg-[#C4D668]">
                      <Check className="size-4 text-[#1A2E2E]" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side Panel Configuration */}
      <div>
        <h2 className="mb-2 text-lg font-bold text-[#1A2E2E]">Zijpanelen</h2>
        <p className="mb-4 text-sm text-gray-600">
          Voeg vaste panelen toe naast de deur.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {(['geen', 'links', 'rechts', 'beide'] as const).map((panel) => {
            const selected = sidePanel === panel;

            return (
              <button
                key={panel}
                type="button"
                onClick={() => setSidePanel(panel)}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  selected
                    ? "border-[#C4D668] bg-[#1A2E2E] text-white"
                    : "border-gray-200 bg-white text-gray-900 hover:border-[#1A2E2E]/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold capitalize">{panel}</h3>
                    {panel !== 'geen' && sidePanelWidth > 0 && (
                      <p
                        className={`mt-1 text-sm ${
                          selected ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {Math.round(sidePanelWidth)}mm breed
                      </p>
                    )}
                  </div>
                  {selected && (
                    <div className="flex size-6 items-center justify-center rounded-full bg-[#C4D668]">
                      <Check className="size-4 text-[#1A2E2E]" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Width Control */}
      <div>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <Label className="text-base font-bold text-[#1A2E2E]">
              Breedte
            </Label>
            <p className="text-sm text-gray-600">
              {minWidth}mm - {maxWidth}mm
            </p>
          </div>
          <div className="text-right">
            <Input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              min={minWidth}
              max={maxWidth}
              className="h-10 w-32 text-right font-mono text-lg font-bold"
            />
            <p className="mt-1 text-xs text-gray-500">Deurblad: {Math.round(doorLeafWidth)}mm</p>
          </div>
        </div>
        <Slider
          value={[width]}
          onValueChange={(values) => setWidth(values[0])}
          min={minWidth}
          max={maxWidth}
          step={10}
          className="w-full"
        />
      </div>

      {/* Height Presets - Dutch Market Standards */}
      <div>
        <Label className="text-base font-bold text-[#1A2E2E]">
          Standaard Hoogtes
        </Label>
        <p className="mb-3 text-sm text-gray-600">
          Kies een standaard hoogte of stel handmatig in.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Renovatie', value: 2015, desc: '201.5 cm' },
            { label: 'Nieuwbouw', value: 2315, desc: '231.5 cm' },
            { label: 'Plafondhoog', value: 2500, desc: '250+ cm' },
          ].map((preset) => {
            const isActive = height === preset.value;
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => setHeight(preset.value)}
                className={`rounded-lg border-2 px-3 py-2.5 text-center transition-all ${
                  isActive
                    ? 'border-[#C4D668] bg-[#1A2E2E] text-white shadow-md'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-[#1A2E2E]/30 hover:shadow-sm'
                }`}
              >
                <span className="block text-xs font-bold uppercase tracking-wide">
                  {preset.label}
                </span>
                <span className={`block font-mono text-sm ${isActive ? 'text-[#C4D668]' : 'text-gray-500'}`}>
                  {preset.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Height Control */}
      <div>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <Label className="text-base font-bold text-[#1A2E2E]">
              Hoogte
            </Label>
            <p className="text-sm text-gray-600">1800mm - 3000mm</p>
          </div>
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            min={1800}
            max={3000}
            className="h-10 w-32 text-right font-mono text-lg font-bold"
          />
        </div>
        <Slider
          value={[height]}
          onValueChange={(values) => setHeight(values[0])}
          min={1800}
          max={3000}
          step={10}
          className="w-full"
        />
      </div>

      {/* Summary */}
      <div className="rounded-xl bg-slate-50 p-4">
        <h3 className="mb-2 text-sm font-bold text-[#1A2E2E]">
          Samenvatting afmetingen
        </h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium">Deurblad breedte:</span>{" "}
            {Math.round(doorLeafWidth)}mm
          </p>
          <p>
            <span className="font-medium">Totale wandopening:</span>{" "}
            {Math.round(holeWidth)}mm × {height}mm
          </p>
          {sidePanelWidth > 0 && (
            <p>
              <span className="font-medium">Zijpaneel breedte:</span>{" "}
              {Math.round(sidePanelWidth)}mm
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
