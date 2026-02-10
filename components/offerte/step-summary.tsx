"use client";

import { useFormContext } from "@/components/offerte/form-context";
import { Button } from "@/components/ui/button";
import { Send, Check } from "lucide-react";

const fieldLabels: Record<string, string> = {
  productType: "Product",
  height: "Hoogte",
  width: "Breedte",
  glassType: "Glas Type",
  finish: "Afwerking",
  name: "Naam",
  email: "E-mail",
  phone: "Telefoon",
  note: "Opmerking",
};

const fieldOrder = [
  "productType",
  "height",
  "width",
  "glassType",
  "finish",
  "name",
  "email",
  "phone",
  "note",
];

function formatValue(key: string, value: unknown): string {
  if (value === undefined || value === null || value === "") return "—";
  if (key === "height" || key === "width") return `${value} mm`;
  return String(value);
}

export function StepSummary() {
  const { formData } = useFormContext();

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Overzicht</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Controleer uw configuratie en verstuur de aanvraag.
      </p>

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <tbody>
            {fieldOrder.map((key, i) => {
              const value = formData[key as keyof typeof formData];
              return (
                <tr
                  key={key}
                  className={i % 2 === 0 ? "bg-muted/30" : "bg-card"}
                >
                  <td className="w-1/3 px-4 py-3 font-medium text-muted-foreground">
                    {fieldLabels[key]}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    <span className="flex items-center gap-2">
                      {value !== undefined && value !== "" && (
                        <Check className="size-3.5 text-green-600" />
                      )}
                      {formatValue(key, value)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Button
        size="lg"
        className="mt-8 w-full bg-brand-orange text-white hover:bg-brand-orange/90"
      >
        <Send className="size-4" />
        Verzend Aanvraag
      </Button>
    </div>
  );
}
