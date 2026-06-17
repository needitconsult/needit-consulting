"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import VoIPKitCircuit from "@/app/components/VoIPKitCircuit";

export default function VoIPKitsTeaser() {
  return (
    <section id="voip-kits" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <SparklesCore
          id="voip-kits-home-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1}
          particleDensity={20}
          className="w-full h-full"
          particleColor="#15803d"
          speed={0.5}
        />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">
            NeedIT Recommended Gear
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900">
            VoIP <span className="text-green-700">Starter Kits</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
            Curated hardware bundles for every business size. Select a kit to see exactly what&apos;s inside.
          </p>
          <p className="text-gray-400 max-w-xl mx-auto text-xs leading-relaxed mt-2">
            NeedIT participates in the Amazon Associates Program. We may earn a commission on purchases at no extra cost to you.
          </p>
        </motion.div>

        {/* Full kit circuit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <VoIPKitCircuit />
        </motion.div>

        {/* Link to full page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-10"
        >
          <Link
            href="/voip-kits"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-green-600 text-green-700 font-bold text-sm hover:bg-green-50 transition-colors"
          >
            View full gear page with cables & accessories
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
