import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AboutTeaser() {
  return (
    <section className="border-t border-border bg-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Over Proinn
            </p>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Vakmanschap sinds de eerste las
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Bij Proinn draait alles om staal. Onze werkplaats combineert
              traditioneel vakmanschap met moderne technieken om producten te
              leveren die niet alleen functioneel zijn, maar ook esthetisch
              verantwoord.
            </p>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Van industriële stalen deuren tot op maat gemaakte kozijnen — wij
              denken mee, ontwerpen en produceren alles in eigen huis.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Neem Contact Op
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/images/about.jpg"
              alt="Proinn werkplaats — stalen deuren productie"
              fill
              className="object-cover"
            />
            {/* Accent corner */}
            <div className="absolute bottom-0 left-0 h-1.5 w-24 bg-brand-orange" />
          </div>
        </div>
      </div>
    </section>
  );
}
