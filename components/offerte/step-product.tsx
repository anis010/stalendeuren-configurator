"use client";

import Image from "next/image";
import { useFormContext } from "@/components/offerte/form-context";
import { productTypes } from "@/lib/validators";
import { cn } from "@/lib/utils";

const productImages: Record<string, string> = {
  Taatsdeur: "/images/taats.jpg",
  Scharnierdeur: "/images/scharnier.jpg",
  "Vast Paneel": "/images/paneel.jpg",
};

const productDescriptions: Record<string, string> = {
  Taatsdeur: "Pivoterende deur",
  Scharnierdeur: "Klassiek scharnier",
  "Vast Paneel": "Vast glaspaneel",
};

export function StepProduct() {
  const { formData, updateData, nextStep } = useFormContext();

  function select(type: (typeof productTypes)[number]) {
    updateData({ productType: type });
    nextStep();
  }

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Kies uw product</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Selecteer het type stalen element dat u wilt configureren.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {productTypes.map((type) => {
          const selected = formData.productType === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => select(type)}
              className={cn(
                "group relative aspect-[3/4] overflow-hidden text-left transition-all",
                selected
                  ? "ring-4 ring-brand-orange ring-offset-2"
                  : "ring-0 hover:ring-2 hover:ring-brand-orange/40 hover:ring-offset-1"
              )}
            >
              {/* Image fills entire card */}
              <Image
                src={productImages[type]}
                alt={type}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Bottom gradient with label */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-5 pt-16">
                <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                  {productDescriptions[type]}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {type}
                </h3>
              </div>

              {/* Selected state overlay */}
              {selected && (
                <div className="absolute inset-0 border-4 border-brand-orange" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
