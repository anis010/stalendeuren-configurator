"use client";

import { useFormContext } from "@/components/offerte/form-context";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { glassTypes, finishTypes } from "@/lib/validators";
import { Paintbrush, GlassWater } from "lucide-react";

export function StepOptions() {
  const { formData, updateData } = useFormContext();

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Opties</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Kies de afwerking en het glastype voor uw product.
      </p>

      <div className="grid gap-8 sm:grid-cols-2">
        {/* Glass Type */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <GlassWater className="size-4 text-brand-orange" />
            Glas Type
          </Label>
          <RadioGroup
            value={formData.glassType ?? ""}
            onValueChange={(val) => updateData({ glassType: val as typeof formData.glassType })}
            className="space-y-2"
          >
            {glassTypes.map((type) => (
              <Label
                key={type}
                htmlFor={`glass-${type}`}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors has-[[data-state=checked]]:border-brand-orange has-[[data-state=checked]]:bg-brand-orange/5"
              >
                <RadioGroupItem value={type} id={`glass-${type}`} />
                <span className="text-sm font-medium">{type}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {/* Finish */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Paintbrush className="size-4 text-brand-orange" />
            Afwerking
          </Label>
          <RadioGroup
            value={formData.finish ?? ""}
            onValueChange={(val) => updateData({ finish: val as typeof formData.finish })}
            className="space-y-2"
          >
            {finishTypes.map((type) => (
              <Label
                key={type}
                htmlFor={`finish-${type}`}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors has-[[data-state=checked]]:border-brand-orange has-[[data-state=checked]]:bg-brand-orange/5"
              >
                <RadioGroupItem value={type} id={`finish-${type}`} />
                <span className="text-sm font-medium">{type}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
