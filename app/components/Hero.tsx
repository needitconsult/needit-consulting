"use client";

import { motion } from "framer-motion";
import TunnelShowcase from "@/components/ui/tunnel-hero";

export default function Hero() {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] overflow-hidden">

      {/* Three.js tunnel — renders its own fullscreen canvas */}
      <div className="absolute inset-0 z-0">
        <TunnelShowcase noContent />
      </div>

      {/* Scanlines */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
        }}
      />

      {/* HUD — top-left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute top-24 left-6 z-10 font-mono text-green-400/80 text-xs flex flex-col gap-1 select-none"
      >
        <span className="tracking-widest">// NEEDIT_OS v2.4.1</span>
        <span className="text-green-400/50">
          SYS.STATUS &gt; <span className="text-green-400">ONLINE</span>
        </span>
        <span className="text-green-400/50">
          SEC.LEVEL &gt; <span className="text-green-400">MAXIMUM</span>
        </span>
      </motion.div>

      {/* HUD — top-right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute top-24 right-6 z-10 font-mono text-green-400/50 text-xs text-right flex flex-col gap-1 select-none"
      >
        <span>48.2231° N</span>
        <span>16.3975° E</span>
        <BlinkingCursor />
      </motion.div>

      {/* HUD — bottom-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-6 z-10 font-mono text-green-400/50 text-xs flex flex-col gap-1 select-none"
      >
        <span className="text-green-400/30">UPTIME</span>
        <UptimeTicker />
      </motion.div>

      {/* HUD — bottom-right: scroll */}
      <motion.button
        onClick={scrollToServices}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-12 right-6 z-10 font-mono text-green-400/50 hover:text-green-400 text-xs flex flex-col items-end gap-1 select-none transition-colors"
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

      {/* Corner brackets */}
      <CornerBrackets />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0f0a] to-transparent z-[2] pointer-events-none" />
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
  const cls = "absolute z-10 w-8 h-8 pointer-events-none border-green-500/40";
  return (
    <>
      <div className={`${cls} top-20 left-4 border-t-2 border-l-2`} />
      <div className={`${cls} top-20 right-4 border-t-2 border-r-2`} />
      <div className={`${cls} bottom-10 left-4 border-b-2 border-l-2`} />
      <div className={`${cls} bottom-10 right-4 border-b-2 border-r-2`} />
    </>
  );
}
