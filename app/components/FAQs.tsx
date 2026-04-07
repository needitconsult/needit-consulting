"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What size businesses do you work with?",
    a: "We primarily serve small to mid-size businesses (5–500 employees), but we've supported larger enterprises on specific projects. Our solutions scale to fit your needs.",
  },
  {
    q: "Do you offer month-to-month contracts?",
    a: "Yes. While we offer discounts on annual agreements, we don't lock you into long-term contracts. We believe in earning your business every month.",
  },
  {
    q: "How quickly can you respond to IT emergencies?",
    a: "For managed service clients, our average response time is under 15 minutes. Critical issues receive immediate escalation and dedicated support.",
  },
  {
    q: "Can you support remote and hybrid teams?",
    a: "Absolutely. We specialize in modern work environments and can configure, secure, and support fully remote, hybrid, or on-site teams.",
  },
  {
    q: "Do you handle cloud migrations?",
    a: "Yes — we manage end-to-end migrations to AWS, Azure, and Google Cloud. We handle planning, data transfer, testing, and post-migration support with zero-downtime strategies.",
  },
  {
    q: "How do you handle cybersecurity incidents?",
    a: "We follow a structured incident response process: contain, eradicate, recover, and review. Our monitoring systems detect threats in real time, and we have playbooks ready for common attack vectors.",
  },
  {
    q: "What industries do you specialize in?",
    a: "We work across industries but have deep expertise in healthcare, legal, finance, and professional services — sectors with strict compliance and data security requirements.",
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
