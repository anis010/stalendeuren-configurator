import Link from "next/link";
import {
  ArrowRight,
  Check,
  MapPin,
  PenTool,
} from "lucide-react";

const steps = [
  "Vrijblijvende offerte",
  "Wensen bespreken",
  "Meten is weten",
  "Het definitieve plan",
  "Jouw deur wordt gemaakt",
  "Montage op locatie",
];

const checklistItems = [
  "We luisteren goed naar jouw ideeën en denken mee in mogelijkheden.",
  "Samen vertalen we jouw wensen naar een passend ontwerp.",
  "In onze eigen fabriek maken we alles volledig op maat.",
  "We gebruiken hoogwaardige materialen voor een duurzaam resultaat.",
  "Tijdens het hele traject kun je rekenen op persoonlijk advies.",
  "Ons team zorgt voor een zorgvuldige en nette montage op locatie.",
];

export function ProcessSection() {
  return (
    <section className="bg-[#F5F5F3] py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left Column */}
        <div className="flex flex-col justify-center">
          {/* Label */}
          <div className="mb-6 flex items-center gap-2">
            <div className="h-5 w-1 rounded-full bg-[#C4D668]" />
            <span className="text-sm font-medium tracking-wide text-gray-500">
              Onze werkwijze in 6 stappen
            </span>
          </div>

          {/* Heading */}
          <h2 className="mb-5 text-4xl font-light leading-tight text-gray-900 lg:text-5xl">
            Van schets tot stalen
            <br />
            deur in je woonkamer
          </h2>

          {/* Description */}
          <p className="mb-8 max-w-lg text-sm leading-relaxed text-gray-500">
            Bij Proinn vinden we dat een deur of wand meer is dan alleen een
            praktisch product. Het bepaalt de sfeer van een ruimte en moet
            perfect aansluiten bij jouw wensen. Daarom begeleiden we je stap
            voor stap in het proces:
          </p>

          {/* Checklist */}
          <ul className="mb-8 space-y-3">
            {checklistItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-gray-700" strokeWidth={2.5} />
                <span className="text-sm leading-snug text-gray-600">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Closing text */}
          <p className="mb-8 max-w-lg text-sm leading-relaxed text-gray-500">
            Zo zorgen we ervoor dat jij straks een deur of wand hebt die niet
            alleen mooi oogt, maar ook praktisch en duurzaam is.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/showrooms"
              className="inline-flex items-center gap-2 rounded-md bg-[#1A2E2E] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#263e3e]"
            >
              <MapPin className="size-4" />
              Onze showrooms
            </Link>
            <Link
              href="/offerte"
              className="inline-flex items-center gap-2 rounded-md bg-[#C4D668] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#b5c75a]"
            >
              <PenTool className="size-4" />
              Zelf ontwerpen
            </Link>
          </div>
        </div>

        {/* Right Column - 6 Steps */}
        <div className="flex flex-col justify-center space-y-3">
          {steps.map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-4 rounded-xl bg-white px-5 py-4 shadow-sm"
            >
              {/* Number Circle */}
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-sm font-semibold text-gray-700">
                {index + 1}
              </div>

              {/* Step Text */}
              <span className="flex-1 text-sm font-semibold text-gray-800">
                {step}
              </span>

              {/* Arrow */}
              <ArrowRight className="size-4 shrink-0 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
