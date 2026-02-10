import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CraftsmanshipSection() {
  return (
    <section className="relative bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left Column - Image */}
        <div className="relative z-10 min-h-[450px] overflow-hidden rounded-r-[2.5rem] lg:min-h-[560px]">
          <Image
            src="/images/proinn-spuiten.png"
            alt="Vakmanschap bij Proinn - spuitwerk in de fabriek"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right Column - Dark Content */}
        <div className="flex flex-col justify-center bg-[#1A2E2E] px-8 py-16 lg:px-16 lg:py-20">
          {/* Label */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-5 w-1 rounded-full bg-[#C4D668]" />
            <span className="text-sm font-medium tracking-wide text-[#C4D668]">
              Waarom Proinn
            </span>
          </div>

          {/* Heading */}
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white lg:text-4xl">
            Vakmanschap op
            <br />
            ieder niveau
          </h2>

          {/* Text */}
          <p className="mb-10 max-w-md text-sm leading-relaxed text-gray-300">
            Bij Proinn draait alles om kwaliteit en vakmanschap. Van het eerste
            ontwerp tot de laatste afwerking — elk detail wordt met zorg
            behandeld in onze eigen fabriek. Wij combineren ambachtelijke
            technieken met moderne technologie om stalen deuren en wanden te
            maken die perfect passen bij jouw ruimte.
          </p>

          {/* Input Group */}
          <div className="flex max-w-md items-center gap-3">
            <div className="flex-1 rounded-md bg-[#263e3e] px-4 py-3 text-sm text-gray-400">
              Meer weten?
            </div>
            <Link
              href="/over-ons"
              className="inline-flex items-center gap-2 rounded-md bg-[#C4D668] px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#b5c75a]"
            >
              Over ons
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
