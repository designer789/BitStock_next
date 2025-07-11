import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatIsBitStock from "@/components/WhatIsBitStock";
import CoreFeatures from "@/components/CoreFeatures";
import WhyBitStock from "@/components/WhyBitStock";
import Tokenomics from "@/components/Tokenomics";
import HowItWorks from "@/components/HowItWorks";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BitStock",
  description: "BitStock brings real U.S. stocks on-chain—directly tradable with your crypto. SEC-registered custodians ensure secure, auditable, institution-grade real-world asset allocation.",
  icons: {
    icon: "/icon.png",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <WhatIsBitStock />
      <CoreFeatures />
      <HowItWorks />
      <WhyBitStock />
      <Tokenomics />
      <Roadmap />
      <FAQ />
      <Footer />
    </div>
  );
}
