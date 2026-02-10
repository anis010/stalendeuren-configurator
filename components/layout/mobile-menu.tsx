"use client";

import Link from "next/link";
import { ChevronDown, Phone, Mail } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/producten", label: "Producten", hasSubmenu: true },
  { href: "/maatwerk", label: "Maatwerk", hasSubmenu: true },
  { href: "/over-ons", label: "Over Ons" },
  { href: "/contact", label: "Contact" },
];

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full max-w-sm flex-col p-0">
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle className="text-left text-lg font-extrabold tracking-tight">
            PROINN
          </SheetTitle>
        </SheetHeader>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="space-y-1">
            {menuLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center justify-between rounded-md px-3 py-3 text-base font-medium text-gray-800 transition-colors hover:bg-gray-50"
                >
                  {link.label}
                  {link.hasSubmenu && (
                    <ChevronDown className="size-4 text-gray-400" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="mt-6">
            <Link
              href="/offerte"
              onClick={() => onOpenChange(false)}
              className="flex w-full items-center justify-center rounded-md bg-[#C4D668] px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#b5c75a]"
            >
              Vraag Offerte
            </Link>
          </div>
        </nav>

        {/* Footer Block */}
        <div className="bg-[#2F3B3B] px-6 py-6">
          <p className="mb-3 text-sm font-semibold text-white">
            Wil je wat vragen?
          </p>
          <div className="space-y-2">
            <a
              href="tel:0851234567"
              className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
            >
              <Phone className="size-4" />
              085 - 1234 567
            </a>
            <a
              href="mailto:info@proinn.nl"
              className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
            >
              <Mail className="size-4" />
              info@proinn.nl
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
