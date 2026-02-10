"use client";

import { useConfiguratorStore, type Finish, type Handle } from "@/lib/store";
import { Check } from "lucide-react";

const finishOptions: Array<{
  value: Finish;
  label: string;
  description: string;
}> = [
  { value: "zwart", label: "Mat Zwart", description: "Klassiek en tijdloos" },
  {
    value: "brons",
    label: "Brons",
    description: "Warm en industrieel",
  },
  { value: "grijs", label: "Antraciet", description: "Modern en neutraal" },
];

const handleOptions: Array<{
  value: Handle;
  label: string;
  description: string;
}> = [
  {
    value: "u-greep",
    label: "U-Greep",
    description: "Verticale greep voor taatsdeur",
  },
  { value: "klink", label: "Klink", description: "Klassieke deurklink" },
  { value: "geen", label: "Geen greep", description: "Voor vaste panelen" },
];

export function StepOptions() {
  const { finish, handle, setFinish, setHandle } = useConfiguratorStore();

  return (
    <div className="space-y-8">
      {/* Finish Selection */}
      <div>
        <h2 className="mb-2 text-lg font-bold text-[#1A2E2E]">Afwerking</h2>
        <p className="mb-4 text-sm text-gray-600">
          Kies de kleur en afwerking van het staal.
        </p>

        <div className="grid gap-3">
          {finishOptions.map((option) => {
            const selected = finish === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setFinish(option.value)}
                className={`group relative rounded-xl border-2 p-4 text-left transition-all ${
                  selected
                    ? "border-[#C4D668] bg-[#1A2E2E] text-white"
                    : "border-gray-200 bg-white text-gray-900 hover:border-[#1A2E2E]/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 items-center gap-4">
                    {/* Color swatch */}
                    <div
                      className="size-10 rounded-lg border-2 border-white shadow-md"
                      style={{
                        backgroundColor:
                          option.value === "zwart"
                            ? "#1A1A1A"
                            : option.value === "brons"
                              ? "#8B6F47"
                              : "#4A5568",
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{option.label}</h3>
                      <p
                        className={`mt-1 text-sm ${
                          selected ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {option.description}
                      </p>
                    </div>
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

      {/* Handle Selection */}
      <div>
        <h2 className="mb-2 text-lg font-bold text-[#1A2E2E]">Greep</h2>
        <p className="mb-4 text-sm text-gray-600">
          Selecteer het type handgreep.
        </p>

        <div className="grid gap-3">
          {handleOptions.map((option) => {
            const selected = handle === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setHandle(option.value)}
                className={`group relative rounded-xl border-2 p-4 text-left transition-all ${
                  selected
                    ? "border-[#C4D668] bg-[#1A2E2E] text-white"
                    : "border-gray-200 bg-white text-gray-900 hover:border-[#1A2E2E]/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold">{option.label}</h3>
                    <p
                      className={`mt-1 text-sm ${
                        selected ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {option.description}
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
    </div>
  );
}
