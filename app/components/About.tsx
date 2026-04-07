"use client";

import { motion } from "framer-motion";
import { CheckCircle, Users, Award, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "150+", label: "Clients Served" },
  { icon: Award, value: "10+", label: "Years Experience" },
  { icon: Clock, value: "99.9%", label: "Uptime Guaranteed" },
  { icon: CheckCircle, value: "24/7", label: "Support Available" },
];

const values = [
  "Proactive over reactive — we catch problems before they impact you.",
  "Plain-English communication — no jargon, no confusion.",
  "Scalable solutions built for where your business is going.",
  "Security-first mindset in everything we build and manage.",
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 bg-[#0d130d]">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-green-500 text-sm font-semibold tracking-widest uppercase">
              Who We Are
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-white">
              Built by IT Pros,{" "}
              <span className="text-green-400">for Your Business</span>
            </h2>
            <p className="mt-6 text-green-200/60 leading-relaxed text-lg">
              NeedIT Consulting was founded on a simple belief: every business deserves
              enterprise-grade technology without the enterprise price tag. We partner with
              small and mid-size businesses to design, secure, and maintain IT environments
              that actually work.
            </p>
            <p className="mt-4 text-green-200/60 leading-relaxed">
              Our team brings decades of combined experience across cybersecurity, cloud
              infrastructure, and managed services — giving you a dedicated technology
              partner, not just a vendor.
            </p>

            {/* Values list */}
            <ul className="mt-8 space-y-3">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-green-200/70 text-sm">{v}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="p-8 rounded-2xl bg-[#111811] border border-green-900/40 text-center glow-green-sm"
              >
                <stat.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-extrabold text-green-400 text-glow">
                  {stat.value}
                </div>
                <div className="text-sm text-green-200/60 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
