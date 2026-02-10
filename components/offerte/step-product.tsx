"use client";

import { useConfiguratorStore, type DoorType } from "@/lib/store";
import { useFormContext } from "@/components/offerte/form-context";
import { Check } from "lucide-react";

const doorTypes: Array<{
  value: DoorType;
  label: string;
  description: string;
}> = [
  {
    value: "taats",
    label: "Taatsdeur",
    description: "Pivoterende deur met verticaal draaimechanisme",
  },
  {
    value: "scharnier",
    label: "Scharnierdeur",
    description: "Klassieke deur met zijscharnieren",
  },
  {
    value: "paneel",
    label: "Vast Paneel",
    description: "Vast glaspaneel zonder bewegend mechanisme",
  },
];

const gridTypes: Array<{
  value: "3-vlak" | "4-vlak" | "geen";
  label: string;
  description: string;
}> = [
  { value: "geen", label: "Geen verdeling", description: "Volledig vlak" },
  { value: "3-vlak", label: "3-vlaks", description: "2 horizontale balken" },
  { value: "4-vlak", label: "4-vlaks", description: "3 horizontale balken" },
];

export function StepProduct() {
  const { nextStep } = useFormContext();
  const { doorType, gridType, setDoorType, setGridType } =
    useConfiguratorStore();

  function handleDoorTypeSelect(type: DoorType) {
    setDoorType(type);
  }

  function handleGridTypeSelect(type: "3-vlak" | "4-vlak" | "geen") {
    setGridType(type);
  }

  function handleContinue() {
    nextStep();
  }

  return (
    <div className="space-y-8">
      {/* Door Type Selection */}
      <div>
        <h2 className="mb-2 text-lg font-bold text-[#1A2E2E]">Kies uw deurtype</h2>
        <p className="mb-4 text-sm text-gray-600">
          Selecteer het type stalen deur dat u wilt configureren.
        </p>

        <div className="grid gap-3">
          {doorTypes.map((type) => {
            const selected = doorType === type.value;

            return (
              <button
                key={type.value}
                type="button"
                onClick={() => handleDoorTypeSelect(type.value)}
                className={`group relative rounded-xl border-2 p-4 text-left transition-all ${
                  selected
                    ? "border-[#C4D668] bg-[#1A2E2E] text-white"
                    : "border-gray-200 bg-white text-gray-900 hover:border-[#1A2E2E]/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold">{type.label}</h3>
                    <p
                      className={`mt-1 text-sm ${
                        selected ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {type.description}
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

      {/* Grid Type Selection */}
      <div>
        <h2 className="mb-2 text-lg font-bold text-[#1A2E2E]">Verdeling</h2>
        <p className="mb-4 text-sm text-gray-600">
          Kies het aantal horizontale vlakken.
        </p>

        <div className="grid gap-3">
          {gridTypes.map((type) => {
            const selected = gridType === type.value;

            return (
              <button
                key={type.value}
                type="button"
                onClick={() => handleGridTypeSelect(type.value)}
                className={`group relative rounded-xl border-2 p-4 text-left transition-all ${
                  selected
                    ? "border-[#C4D668] bg-[#1A2E2E] text-white"
                    : "border-gray-200 bg-white text-gray-900 hover:border-[#1A2E2E]/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold">{type.label}</h3>
                    <p
                      className={`mt-1 text-sm ${
                        selected ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {type.description}
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

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="w-full rounded-xl bg-[#C4D668] py-3 font-bold text-[#1A2E2E] transition-all hover:bg-[#b5c75a]"
      >
        Volgende stap
      </button>
    </div>
  );
}
