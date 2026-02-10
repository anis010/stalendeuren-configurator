import { Hammer, Truck, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Hammer,
    title: "Ambachtelijk Maatwerk",
    description:
      "Elk product wordt op maat gemaakt in onze eigen werkplaats. Geen standaardwerk, maar vakmanschap tot in detail.",
  },
  {
    icon: Truck,
    title: "Snelle Levering",
    description:
      "Korte doorlooptijden dankzij ons efficiënte productieproces. Van offerte tot montage, wij leveren op tijd.",
  },
  {
    icon: ShieldCheck,
    title: "Hoogste Kwaliteit",
    description:
      "Wij werken uitsluitend met hoogwaardig staal en duurzame coatings. Gebouwd om generaties mee te gaan.",
  },
];

export function Features() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-orange">
            Waarom Proinn
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Gebouwd op vakmanschap
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-lg border border-border bg-card p-8 transition-all hover:border-brand-orange/30 hover:shadow-lg"
            >
              <div className="mb-5 inline-flex rounded-md bg-brand-orange/10 p-3">
                <feature.icon className="size-6 text-brand-orange" />
              </div>
              <h3 className="mb-3 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
