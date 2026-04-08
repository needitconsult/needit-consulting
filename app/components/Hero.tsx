"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const coords = { x: "48.2231° N", y: "16.3975° E" };

export default function Hero() {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] overflow-hidden">

      {/* Desktop: video — no overlays, full immersion */}
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
        {/* Only a very subtle bottom fade so the next section bleeds in cleanly */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f0a] to-transparent" />
      </div>

      {/* Mobile: still image */}
      <div className="md:hidden absolute inset-0 z-0">
        <Image
          src="/hero-mobile.png"
          alt="NeedIT Consulting"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f0a] to-transparent" />
      </div>

      {/* Scanline effect — subtle CRT / game feel */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        }}
      />

      {/* HUD — top-left: system tag */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute top-24 left-6 z-10 font-mono text-green-500/70 text-xs flex flex-col gap-1 select-none"
      >
        <span className="tracking-widest">// NEEDIT_OS v2.4.1</span>
        <span className="text-green-500/40">SYS.STATUS &gt; <span className="text-green-400">ONLINE</span></span>
        <span className="text-green-500/40">SEC.LEVEL &gt; <span className="text-green-400">MAXIMUM</span></span>
      </motion.div>

      {/* HUD — top-right: coords */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute top-24 right-6 z-10 font-mono text-green-500/50 text-xs text-right flex flex-col gap-1 select-none"
      >
        <span>{coords.x}</span>
        <span>{coords.y}</span>
        <BlinkingCursor />
      </motion.div>

      {/* HUD — bottom-left: uptime ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-6 z-10 font-mono text-green-500/50 text-xs flex flex-col gap-1 select-none"
      >
        <span className="text-green-500/30">UPTIME</span>
        <UptimeTicker />
      </motion.div>

      {/* HUD — bottom-right: scroll prompt */}
      <motion.button
        onClick={scrollToServices}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-12 right-6 z-10 font-mono text-green-500/50 hover:text-green-400 text-xs flex flex-col items-end gap-1 select-none transition-colors"
      >
        <span className="tracking-widest uppercase">[ scroll ]</span>
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="text-green-400"
        >
          ▼
        </motion.span>
      </motion.button>

      {/* Corner brackets — game HUD frame */}
      <CornerBrackets />
    </section>
  );
}

function BlinkingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="text-green-400 font-mono"
    >
      _
    </motion.span>
  );
}

function UptimeTicker() {
  return (
    <motion.span
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="text-green-400 tracking-widest"
    >
      99.9% ████████████░
    </motion.span>
  );
}

function CornerBrackets() {
  const size = "w-8 h-8";
  const color = "border-green-500/40";
  return (
    <>
      {/* Top-left */}
      <div className={`absolute top-20 left-4 z-10 ${size} border-t-2 border-l-2 ${color} pointer-events-none`} />
      {/* Top-right */}
      <div className={`absolute top-20 right-4 z-10 ${size} border-t-2 border-r-2 ${color} pointer-events-none`} />
      {/* Bottom-left */}
      <div className={`absolute bottom-10 left-4 z-10 ${size} border-b-2 border-l-2 ${color} pointer-events-none`} />
      {/* Bottom-right */}
      <div className={`absolute bottom-10 right-4 z-10 ${size} border-b-2 border-r-2 ${color} pointer-events-none`} />
    </>
  );
}
