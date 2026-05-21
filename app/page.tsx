import { ContactFormGridWithDetails } from "@/components/contact-section";
import { HeroWithCenteredImage } from "@/components/hero-section";
import { Products } from "@/components/products";
import { Services } from "@/components/services";

export default function Home() {
  return (
    <div>
      <HeroWithCenteredImage />
      <Services />
      <Products />
      <ContactFormGridWithDetails />
    </div>
  );
}
