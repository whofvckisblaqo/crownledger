import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Security from "@/components/Security";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Security />
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  );
}