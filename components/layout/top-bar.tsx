"use client";

import { Star, Phone, Globe } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-[#E8E8E6]">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Trustpilot */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="size-3.5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-xs font-bold text-gray-700">4.8/5</span>
          <div className="flex items-center gap-1">
            <Star className="size-3.5 fill-green-600 text-green-600" />
            <span className="text-xs font-medium text-gray-600">
              Trustpilot
            </span>
          </div>
        </div>

        {/* Contact & Language */}
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <a
            href="tel:0851234567"
            className="flex items-center gap-1.5 font-medium transition-colors hover:text-gray-900"
          >
            <Phone className="size-3.5" />
            <span>085 - 1234 567</span>
          </a>
          <div className="h-3.5 w-px bg-gray-400" />
          <div className="flex items-center gap-1.5 font-medium">
            <Globe className="size-3.5" />
            <span>NL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
