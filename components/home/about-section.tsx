import Image from "next/image";
import Link from "next/link";
import { MousePointerClick, FileText } from "lucide-react";

export function AboutSection() {
  return (
    <section className="bg-[#F5F5F3] py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Left Column - Tall Image */}
        <div className="relative min-h-[500px] overflow-hidden rounded-[2.5rem] lg:col-span-5 lg:min-h-[600px]">
          <Image
            src="/images/image-people1.png"
            alt="Het team van Proinn aan het werk"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </div>

        {/* Right Column - Stacked Cards */}
        <div className="flex flex-col gap-8 lg:col-span-7">
          {/* Card 1 - Zelf aan de slag */}
          <div className="flex flex-1 flex-col justify-center rounded-[2.5rem] bg-[#1A2E2E] p-10 lg:p-12">
            {/* Label */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-5 w-1 rounded-full bg-[#C4D668]" />
              <span className="text-sm font-medium tracking-wide text-[#C4D668]">
                Zelf aan de slag
              </span>
            </div>

            {/* Heading */}
            <h2 className="mb-4 text-3xl font-bold leading-tight text-white lg:text-4xl">
              Ontwerp jouw deur of wand
              <br />
              op maat en zie direct de prijs
            </h2>

            {/* Text */}
            <p className="mb-8 max-w-lg text-sm leading-relaxed text-gray-300">
              Wil je zelf bepalen hoe jouw deur of wand eruitziet? Met onze
              configurator kan dat. Jij kiest, wij maken. Selecteer stap voor
              stap jouw favoriete uitvoering en bekijk direct het resultaat in
              beeld en prijs.
            </p>

            {/* Button */}
            <div>
              <Link
                href="/offerte"
                className="inline-flex items-center gap-2 rounded-md bg-[#C4D668] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#b5c75a]"
              >
                Klik hier
                <MousePointerClick className="size-4" />
              </Link>
            </div>
          </div>

          {/* Card 2 - Hulp nodig */}
          <div className="flex flex-1 flex-col justify-center rounded-[2.5rem] bg-[#1A2E2E] p-10 lg:p-12">
            {/* Heading */}
            <h3 className="mb-4 text-2xl font-bold text-white lg:text-3xl">
              Heb je meer hulp nodig?
            </h3>

            {/* Text */}
            <p className="mb-8 max-w-lg text-sm leading-relaxed text-gray-300">
              We kunnen ons voorstellen dat je graag geholpen wordt rondom het
              samenstellen van je deur. Hieronder kan je eenvoudig een snelle
              offerte aanvragen waarna we contact met jou opnemen.
            </p>

            {/* Button */}
            <div>
              <Link
                href="/offerte"
                className="inline-flex items-center gap-2 rounded-md border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#1A2E2E]"
              >
                <FileText className="size-4" />
                Snelle offerte aanvragen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
