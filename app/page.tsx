import { Hero } from "@/components/home/hero";
import { OfferSection } from "@/components/home/offer-section";
import { ProcessSection } from "@/components/home/process-section";
import { AboutSection } from "@/components/home/about-section";
import { CraftsmanshipSection } from "@/components/home/craftsmanship-section";

export default function Home() {
  return (
    <>
      <Hero />
      <OfferSection />
      <ProcessSection />
      <AboutSection />
      <CraftsmanshipSection />
    </>
  );
}
