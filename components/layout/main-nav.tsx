"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { MobileMenu } from "./mobile-menu";
import { useState } from "react";

export function MainNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-gray-900"
          >
            PROINN
          </Link>

          {/* Right side: CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/offerte"
              className="inline-flex items-center rounded-md bg-[#C4D668] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#b5c75a]"
            >
              Vraag Offerte
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-md bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
              aria-label="Menu openen"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
}
