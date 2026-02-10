"use client";

import { useFormContext } from "@/components/offerte/form-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ruler } from "lucide-react";

export function StepDimensions() {
  const { formData, updateData } = useFormContext();

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Afmetingen</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Voer de gewenste afmetingen in millimeters in.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="height" className="flex items-center gap-2">
            <Ruler className="size-4 text-brand-orange" />
            Hoogte (mm)
          </Label>
          <Input
            id="height"
            type="number"
            placeholder="bijv. 2400"
            value={formData.height ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              updateData({ height: val === "" ? undefined : Number(val) });
            }}
            className="h-12 text-lg focus-visible:ring-brand-orange"
          />
          <p className="text-xs text-muted-foreground">
            Min: 2000mm &mdash; Max: 3000mm
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="width" className="flex items-center gap-2">
            <Ruler className="size-4 rotate-90 text-brand-orange" />
            Breedte (mm)
          </Label>
          <Input
            id="width"
            type="number"
            placeholder="bijv. 900"
            value={formData.width ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              updateData({ width: val === "" ? undefined : Number(val) });
            }}
            className="h-12 text-lg focus-visible:ring-brand-orange"
          />
          <p className="text-xs text-muted-foreground">
            Min: 300mm &mdash; Max: 3000mm
          </p>
        </div>
      </div>
    </div>
  );
}
