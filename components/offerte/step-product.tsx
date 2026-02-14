"use client";

import { useConfiguratorStore, type DoorType } from "@/lib/store";
import { useFormContext } from "@/components/offerte/form-context";
import { Check } from "lucide-react";

// Door type visual icons (inline SVGs)
function TaatsIcon({ selected }: { selected: boolean }) {
  const stroke = selected ? "#C4D668" : "#1A2E2E";
  const fill = selected ? "#C4D668" : "none";
  return (
    <svg viewBox="0 0 64 80" className="h-20 w-16">
      {/* Door frame */}
      <rect x="8" y="4" width="48" height="72" rx="2" fill="none" stroke={stroke} strokeWidth="2" />
      {/* Glass */}
      <rect x="14" y="10" width="36" height="60" rx="1" fill={selected ? "#C4D668" : "#e5e7eb"} opacity="0.2" />
      {/* Pivot point (center) */}
      <circle cx="32" cy="40" r="3" fill={fill} stroke={stroke} strokeWidth="1.5" />
      {/* Rotation arrow */}
      <path d="M 44 20 A 16 16 0 0 1 44 60" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="44,58 48,54 40,54" fill={stroke} />
    </svg>
  );
}

function ScharnierIcon({ selected }: { selected: boolean }) {
  const stroke = selected ? "#C4D668" : "#1A2E2E";
  const fill = selected ? "#C4D668" : "none";
  return (
    <svg viewBox="0 0 64 80" className="h-20 w-16">
      {/* Door frame */}
      <rect x="8" y="4" width="48" height="72" rx="2" fill="none" stroke={stroke} strokeWidth="2" />
      {/* Glass */}
      <rect x="14" y="10" width="36" height="60" rx="1" fill={selected ? "#C4D668" : "#e5e7eb"} opacity="0.2" />
      {/* Hinge dots on left side */}
      <circle cx="10" cy="20" r="2.5" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <circle cx="10" cy="60" r="2.5" fill={fill} stroke={stroke} strokeWidth="1.5" />
      {/* Rotation arrow from hinge side */}
      <path d="M 56 18 A 24 24 0 0 1 56 62" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="56,60 60,56 52,56" fill={stroke} />
    </svg>
  );
}

function PaneelIcon({ selected }: { selected: boolean }) {
  const stroke = selected ? "#C4D668" : "#1A2E2E";
  return (
    <svg viewBox="0 0 64 80" className="h-20 w-16">
      {/* Door frame */}
      <rect x="8" y="4" width="48" height="72" rx="2" fill="none" stroke={stroke} strokeWidth="2" />
      {/* Glass */}
      <rect x="14" y="10" width="36" height="60" rx="1" fill={selected ? "#C4D668" : "#e5e7eb"} opacity="0.2" />
      {/* Fixed indicator - lock symbol */}
      <rect x="26" y="34" width="12" height="12" rx="2" fill="none" stroke={stroke} strokeWidth="1.5" />
      <circle cx="32" cy="34" r="5" fill="none" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
}

const doorTypeIcons: Record<DoorType, (props: { selected: boolean }) => React.ReactElement> = {
  taats: TaatsIcon,
  scharnier: ScharnierIcon,
  paneel: PaneelIcon,
};

// Grid type visual illustrations (CSS-based rectangles with dividers)
function GridIllustration({ dividers, selected }: { dividers: number; selected: boolean }) {
  const borderColor = selected ? "border-[#C4D668]" : "border-[#1A2E2E]/40";
  const dividerBg = selected ? "bg-[#C4D668]" : "bg-[#1A2E2E]/30";
  const glassBg = selected ? "bg-[#C4D668]/10" : "bg-gray-100";

  return (
    <div className={`flex h-20 w-14 flex-col overflow-hidden rounded border-2 ${borderColor}`}>
      {dividers === 0 && (
        <div className={`flex-1 ${glassBg}`} />
      )}
      {dividers > 0 &&
        Array.from({ length: dividers + 1 }).map((_, i) => (
          <div key={i} className="flex flex-1 flex-col">
            {i > 0 && <div className={`h-[2px] shrink-0 ${dividerBg}`} />}
            <div className={`flex-1 ${glassBg}`} />
          </div>
        ))
      }
    </div>
  );
}

const doorTypes: Array<{
  value: DoorType;
  label: string;
  description: string;
}> = [
  {
    value: "taats",
    label: "Taatsdeur",
    description: "Pivoterende deur",
  },
  {
    value: "scharnier",
    label: "Scharnierdeur",
    description: "Zijscharnieren",
  },
  {
    value: "paneel",
    label: "Vast Paneel",
    description: "Geen beweging",
  },
];

const gridTypes: Array<{
  value: "3-vlak" | "4-vlak" | "geen";
  label: string;
  description: string;
  dividers: number;
}> = [
  { value: "geen", label: "Geen", description: "Volledig vlak", dividers: 0 },
  { value: "3-vlak", label: "3-vlaks", description: "2 balken", dividers: 2 },
  { value: "4-vlak", label: "4-vlaks", description: "3 balken", dividers: 3 },
];

export function StepProduct() {
  const { nextStep } = useFormContext();
  const { doorType, gridType, setDoorType, setGridType } =
    useConfiguratorStore();

  return (
    <div className="space-y-8">
      {/* Door Type Selection - Visual Tiles */}
      <div>
        <h2 className="mb-2 text-lg font-bold text-[#1A2E2E]">Kies uw deurtype</h2>
        <p className="mb-4 text-sm text-gray-600">
          Selecteer het type stalen deur dat u wilt configureren.
        </p>

        <div className="grid grid-cols-3 gap-3">
          {doorTypes.map((type) => {
            const selected = doorType === type.value;
            const IconComponent = doorTypeIcons[type.value];

            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setDoorType(type.value)}
                className={`group relative flex flex-col items-center rounded-xl border-2 px-2 py-4 transition-all ${
                  selected
                    ? "border-[#C4D668] bg-[#1A2E2E] text-white ring-2 ring-[#C4D668] shadow-lg shadow-[#C4D668]/20"
                    : "border-gray-200 bg-white text-gray-900 hover:border-[#1A2E2E]/20 hover:shadow-md"
                }`}
              >
                <div className="mb-3">
                  <IconComponent selected={selected} />
                </div>
                <h3 className="text-sm font-bold">{type.label}</h3>
                <p
                  className={`mt-1 text-xs ${
                    selected ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  {type.description}
                </p>
                {selected && (
                  <div className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-[#C4D668]">
                    <Check className="size-3 text-[#1A2E2E]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Type Selection - Visual Tiles */}
      <div>
        <h2 className="mb-2 text-lg font-bold text-[#1A2E2E]">Verdeling</h2>
        <p className="mb-4 text-sm text-gray-600">
          Kies het aantal horizontale vlakken.
        </p>

        <div className="grid grid-cols-3 gap-3">
          {gridTypes.map((type) => {
            const selected = gridType === type.value;

            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setGridType(type.value)}
                className={`group relative flex flex-col items-center rounded-xl border-2 px-2 py-4 transition-all ${
                  selected
                    ? "border-[#C4D668] bg-[#1A2E2E] text-white ring-2 ring-[#C4D668] shadow-lg shadow-[#C4D668]/20"
                    : "border-gray-200 bg-white text-gray-900 hover:border-[#1A2E2E]/20 hover:shadow-md"
                }`}
              >
                <div className="mb-3 flex items-center justify-center">
                  <GridIllustration dividers={type.dividers} selected={selected} />
                </div>
                <h3 className="text-sm font-bold">{type.label}</h3>
                <p
                  className={`mt-1 text-xs ${
                    selected ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  {type.description}
                </p>
                {selected && (
                  <div className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-[#C4D668]">
                    <Check className="size-3 text-[#1A2E2E]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={() => nextStep()}
        className="w-full rounded-xl bg-[#C4D668] py-3 font-bold text-[#1A2E2E] transition-all hover:bg-[#b5c75a]"
      >
        Volgende stap
      </button>
    </div>
  );
}
