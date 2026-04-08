"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Microsoft Solutions Partner", abbr: "MS" },
  { name: "Cisco Certified Partner", abbr: "Cisco" },
  { name: "CompTIA MSP Partner", abbr: "CompTIA" },
  { name: "RingCentral Partner", abbr: "RC" },
  { name: "3CX Platinum Partner", abbr: "3CX" },
  { name: "Datto Partner", abbr: "Datto" },
  { name: "CrowdStrike Partner", abbr: "CS" },
  { name: "AWS Partner Network", abbr: "AWS" },
];

export default function Partners() {
  return (
    <section className="relative py-14 px-6 bg-[#0d130d] border-y border-green-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-green-500/60 text-xs uppercase tracking-widest font-semibold mb-8"
        >
          Certified Partners & Technology Alliances
        </motion.p>

        {/* Scrolling marquee */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 w-max"
          >
            {[...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#111811] border border-green-900/40 flex-shrink-0"
              >
                <div className="w-8 h-8 rounded-lg bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                  <span className="text-green-400 text-[10px] font-bold leading-none text-center">
                    {p.abbr}
                  </span>
                </div>
                <span className="text-green-200/70 text-sm font-medium whitespace-nowrap">
                  {p.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
