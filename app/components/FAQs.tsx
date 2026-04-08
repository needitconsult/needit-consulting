"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What's included in your Managed IT Services?",
    a: "Our managed IT plans include 24/7 RMM monitoring, automated patch management, endpoint protection, helpdesk support (Tier 1–3), monthly reporting, and a dedicated account manager. Everything is flat-rate — no surprise bills.",
  },
  {
    q: "Can you replace our existing phone system with VoIP?",
    a: "Yes. We handle the full VoIP migration — number porting, hardware provisioning, softphone setup, and staff training. We partner with RingCentral, 3CX, and Microsoft Teams Voice to find the right fit for your team size and budget. Most businesses cut their phone bills by 40–60% after switching.",
  },
  {
    q: "How quickly can you respond to IT emergencies?",
    a: "Managed service clients receive a response within 15 minutes for critical issues. Our NOC operates around the clock, and P1 incidents are escalated immediately to senior engineers.",
  },
  {
    q: "Are you a Microsoft Partner?",
    a: "Yes — we are a Microsoft Solutions Partner. We can provision, migrate, and fully manage Microsoft 365, Azure, Entra ID (formerly Azure AD), Intune, and Defender environments. We also have direct access to Microsoft support escalation paths.",
  },
  {
    q: "Do you support HIPAA or other compliance requirements?",
    a: "Absolutely. We support HIPAA, SOC 2, PCI-DSS, and CMMC compliance programs. Our process covers gap assessments, policy documentation, technical controls, staff security awareness training, and audit readiness reviews.",
  },
  {
    q: "Can you support remote and hybrid teams?",
    a: "Yes — it's a core part of what we do. We configure secure remote access (ZTNA/VPN), manage cloud-based phone and collaboration tools, and ensure your endpoints are protected regardless of where your team works.",
  },
  {
    q: "Do you offer month-to-month contracts?",
    a: "Yes. We don't lock you into long-term contracts. Annual agreements come with a discount, but we believe in earning your business every single month.",
  },
  {
    q: "What industries do you specialize in?",
    a: "We have deep expertise in healthcare, legal, finance, real estate, and professional services — industries where data security, uptime, and compliance aren't optional.",
  },
];

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07, duration: 0.4 }}
      className="border border-green-900/40 hover:border-green-500/40 rounded-xl overflow-hidden transition-colors"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left bg-[#111811] hover:bg-[#141f14] transition-colors"
      >
        <span className="text-white font-semibold pr-4">{q}</span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 bg-[#0f180f] text-green-200/60 leading-relaxed text-sm">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQs() {
  return (
    <section id="faqs" className="relative py-24 px-6 bg-[#0d130d]">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-green-500 text-sm font-semibold tracking-widest uppercase">
            Got Questions?
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-white">
            Frequently Asked <span className="text-green-400">Questions</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
