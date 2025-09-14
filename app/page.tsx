import HeroSection from "@/components/home/heroSection";
import BgGradient from "@/components/common/BgGradient";
import DemoSection from "@/components/home/demoSection";
import HowItWorksSection from "@/components/home/howItWorksSection";
import PricingSecion from "@/components/home/pricingSection";
import CTASection from "@/components/home/ctaSection";
export default function Home() {
  return (
    <div className="relative w-full">
        <BgGradient></BgGradient>
        <div className="flex flex-col">
          <HeroSection/>
        </div>

        <DemoSection />

        <HowItWorksSection />

        <PricingSecion/>

        <CTASection />
      
    </div>
  );
}
