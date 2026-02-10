"use client";

import { useFormContext } from "@/components/offerte/form-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MessageSquare } from "lucide-react";

export function StepContact() {
  const { formData, updateData } = useFormContext();

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Contactgegevens</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Vul uw gegevens in zodat wij u een offerte kunnen sturen.
      </p>

      <div className="grid gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="size-4 text-brand-orange" />
            Naam
          </Label>
          <Input
            id="name"
            placeholder="Uw volledige naam"
            value={formData.name ?? ""}
            onChange={(e) => updateData({ name: e.target.value })}
            className="h-11 focus-visible:ring-brand-orange"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="size-4 text-brand-orange" />
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="naam@bedrijf.nl"
              value={formData.email ?? ""}
              onChange={(e) => updateData({ email: e.target.value })}
              className="h-11 focus-visible:ring-brand-orange"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="size-4 text-brand-orange" />
              Telefoon
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="06 1234 5678"
              value={formData.phone ?? ""}
              onChange={(e) => updateData({ phone: e.target.value })}
              className="h-11 focus-visible:ring-brand-orange"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="note" className="flex items-center gap-2">
            <MessageSquare className="size-4 text-brand-orange" />
            Opmerking
            <span className="text-xs font-normal text-muted-foreground">(optioneel)</span>
          </Label>
          <textarea
            id="note"
            rows={3}
            placeholder="Bijv. specifieke wensen, RAL-kleur, plaatsing..."
            value={formData.note ?? ""}
            onChange={(e) => updateData({ note: e.target.value })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
          />
        </div>
      </div>
    </div>
  );
}
