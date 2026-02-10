"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, DoorOpen, Home, Grid2x2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "binnendeuren",
    title: "Binnendeuren",
    subtitle: "Stalen deuren voor binnen gebruik",
    href: "/producten/binnendeuren",
    icon: DoorOpen,
  },
  {
    id: "buitendeuren",
    title: "Buitendeuren",
    subtitle: "Stalen deuren voor buiten gebruik",
    href: "/producten/buitendeuren",
    icon: Home,
  },
  {
    id: "kantoorwanden",
    title: "Kantoorwanden",
    subtitle: "Glazen wanden voor kantoren",
    href: "/producten/kantoorwanden",
    icon: Grid2x2,
  },
];

export function OfferSection() {
  const [activeId, setActiveId] = useState("binnendeuren");

  return (
    <section className="bg-[#F5F5F3] py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left Column */}
        <div className="flex flex-col justify-center">
          {/* Label */}
          <div className="mb-6 flex items-center gap-2">
            <div className="h-5 w-1 rounded-full bg-[#C4D668]" />
            <span className="text-sm font-medium tracking-wide text-gray-500">
              Ons aanbod
            </span>
          </div>

          {/* Heading */}
          <h2 className="mb-5 text-4xl font-light leading-tight text-gray-900 lg:text-5xl">
            Waar ben je
            <br />
            naar op zoek?
          </h2>

          {/* Description */}
          <p className="mb-10 max-w-lg text-sm leading-relaxed text-gray-500">
            Bij Proinn vind je deuren en wanden die passen bij iedere situatie.
            Of je nu op zoek bent naar stijlvolle binnendeuren, sterke
            buitendeuren of functionele kantoorwanden: wij verzorgen het
            volledig op maat. Altijd met de kwaliteit, aandacht en service die
            je van ons mag verwachten.
          </p>

          {/* Category Cards */}
          <div className="space-y-3">
            {categories.map((cat) => {
              const isActive = activeId === cat.id;
              const Icon = cat.icon;

              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  onMouseEnter={() => setActiveId(cat.id)}
                  className={cn(
                    "flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200",
                    isActive
                      ? "bg-[#1A2E2E] text-white shadow-lg"
                      : "bg-white text-gray-800 shadow-sm hover:shadow-md"
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-lg",
                      isActive
                        ? "bg-white/10"
                        : "bg-gray-50"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-6",
                        isActive ? "text-white" : "text-gray-600"
                      )}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{cat.title}</p>
                    <p
                      className={cn(
                        "text-xs",
                        isActive ? "text-gray-300" : "text-gray-400"
                      )}
                    >
                      {cat.subtitle}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                      isActive
                        ? "bg-white/10"
                        : "bg-gray-100"
                    )}
                  >
                    <ArrowRight
                      className={cn(
                        "size-4",
                        isActive ? "text-white" : "text-gray-500"
                      )}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative min-h-[400px] overflow-hidden rounded-[2rem] lg:min-h-[560px]">
          <Image
            src="/images/aanbod.jpg"
            alt="Stalen deur in modern interieur"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
