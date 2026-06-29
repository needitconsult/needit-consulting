"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import FAQs from "./components/FAQs";
import VoIPKitsTeaser from "./components/VoIPKitsTeaser";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import HintBubble from "@/components/ui/hint-bubble";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <VoIPKitsTeaser />
      <FAQs />
      <Contact />
      <Footer />
      <div className="hidden md:block"><HintBubble /></div>
    </main>
  );
}
