import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero.jpg"
        alt="Stalen deuren in modern interieur"
        fill
        className="object-cover"
        priority
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E2E]/90 via-[#1A2E2E]/30 to-transparent" />

      {/* Content pinned to bottom */}
      <div className="relative w-full pb-20 pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Label */}
          <div className="mb-6 flex items-center gap-2">
            <div className="h-5 w-1 rounded-full bg-[#C4D668]" />
            <span className="text-sm font-medium tracking-wide text-[#C4D668]">
              Staal &middot; Vakmanschap &middot; Maatwerk
            </span>
          </div>

          <h1 className="max-w-3xl text-5xl font-light leading-[1.1] tracking-tight text-white md:text-7xl">
            Innovatieve
            <br />
            <span className="font-semibold">Stalen</span> Oplossingen
          </h1>

          <p className="mt-6 max-w-md text-base font-light leading-relaxed text-white/60">
            Maatwerk voor bedrijven en particulieren. Van stalen deuren tot
            industriële kozijnen — wij realiseren uw visie in staal.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/offerte"
              className="inline-flex items-center gap-2 rounded-md bg-[#C4D668] px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#b5c75a]"
            >
              Zelf ontwerpen
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/producten"
              className="inline-flex items-center gap-2 rounded-md border-2 border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Bekijk Producten
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
