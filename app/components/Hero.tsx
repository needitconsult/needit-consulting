"use client";

import { motion } from "framer-motion";
import { ArrowDown, Shield, Zap } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Desktop: video background */}
      <div className="hidden md:block absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-mobile.png"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark green overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0a]/70 via-[#0a0f0a]/50 to-[#0a0f0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0a]/60 via-transparent to-[#0a0f0a]/60" />
      </div>

      {/* Mobile: still image background */}
      <div className="md:hidden absolute inset-0 z-0">
        <Image
          src="/hero-mobile.png"
          alt="NeedIT Consulting background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0a]/75 via-[#0a0f0a]/55 to-[#0a0f0a]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[1] grid-overlay opacity-60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6"
        >
          <Shield className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm font-medium tracking-wide">
            Trusted IT Solutions Partner
          </span>
          <Zap className="w-4 h-4 text-green-400" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight max-w-4xl"
        >
          <span className="text-white">Your Business Deserves</span>
          <br />
          <span className="text-green-400 text-glow">Smarter IT.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-6 text-lg md:text-xl text-green-200/70 max-w-2xl leading-relaxed"
        >
          NeedIT Consulting delivers tailored technology strategies, managed services, and
          cybersecurity solutions that keep your business running at full speed.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-base transition-all glow-green hover:scale-105 active:scale-95"
          >
            Book a Free Consultation
          </button>
          <button
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-green-500/30 hover:border-green-500/60 text-green-300 font-semibold text-base transition-all hover:scale-105 active:scale-95"
          >
            Explore Services
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToServices}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-green-500/60 hover:text-green-400 transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
