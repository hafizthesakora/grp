import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import PropertiesPreview from "@/components/sections/PropertiesPreview";
import DifferenceSection from "@/components/sections/DifferenceSection";
import LocationSection from "@/components/sections/LocationSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import MankessimSection from "@/components/sections/MankessimSection";
import HomeCTA from "@/components/sections/HomeCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <PropertiesPreview />
        <DifferenceSection />
        <MankessimSection />
        <LocationSection />
        <TestimonialsSection />
        <HomeCTA />
      </main>
      <Footer />
    </>
  );
}
