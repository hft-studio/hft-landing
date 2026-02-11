import CTA from "@/components/cta";
import { ContactFormGridWithDetails } from "@/components/contact-section";
import { FrequentlyAskedQuestions } from "@/components/faq";
import { HeroWithCenteredImage } from "@/components/hero-section";
import { SpotlightLogoCloud } from "@/components/logos-cloud";

export default function Home() {
  return (
    <div>
      <HeroWithCenteredImage />
      <SpotlightLogoCloud />
      <FrequentlyAskedQuestions />
      <ContactFormGridWithDetails />
      <CTA />
    </div>
  );
}
