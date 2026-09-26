"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Laptop, Cloud, Bot, Megaphone, Gift, CheckCircle2, Info } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import ServiceModal from "@/app/components/ServiceModal";

type ServiceCategory = {
  icon: React.ElementType;
  category: string;
  services: string[];
};

const serviceCategories: ServiceCategory[] = [
  {
    icon: Phone,
    category: "Business Phones & VoIP",
    services: [
      "Phone System Consultation",
      "Small Phone System Setup",
      "VoIP Troubleshooting",
      "VoIP Network Assessment",
      "Firewall or VPN Configuration",
    ],
  },
  {
    icon: Laptop,
    category: "Everyday IT Support",
    services: [
      "Computer Tune-Up",
      "Workstation Setup",
      "Email, Printer, or Connectivity Troubleshooting",
    ],
  },
  {
    icon: Cloud,
    category: "Cloud Workspace & Virtual IT Assistance",
    services: [
      "File & Cloud Storage Organization",
      "Business Account Setup",
      "Employee Access Setup or Removal",
      "Email or File Migration",
    ],
  },
  {
    icon: Bot,
    category: "CRM, Automation & AI Integrations",
    services: [
      "CRM Starter Setup",
      "CRM Data Cleanup",
      "Workflow Automation",
      "AI Website FAQ Assistant",
      "AI-Assisted Administrative Workflow",
    ],
  },
  {
    icon: Megaphone,
    category: "Ad Creative & Campaign Setup",
    services: [
      "Static Ad Creative Package",
      "Short Video Ad",
      "Advertising Account & Campaign Setup",
      "Advertising Campaign Audit",
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

function ServiceChip({ title, i, selected, onToggle }: { title: string; i: number; selected: boolean; onToggle: (title: string) => void }) {
  return (
    <motion.button
      type="button"
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`group relative flex items-center gap-3 text-left px-5 py-4 rounded-xl bg-white border-2 transition-all duration-300 ${
        selected ? "border-green-500 shadow-md shadow-green-100" : "border-gray-200 hover:border-green-500/50"
      }`}
      onClick={() => onToggle(title)}
    >
      <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
        selected ? "bg-green-600 border-green-600" : "border-gray-300 group-hover:border-green-500/60"
      }`}>
        {selected && <CheckCircle2 className="w-4 h-4 text-white" />}
      </div>
      <span className="text-sm font-medium text-gray-800">{title}</span>
    </motion.button>
  );
}

export default function Services() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleService = (title: string) =>
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );

  return (
    <section id="services" className="relative py-24 px-6 overflow-hidden">
      {/* Background sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <SparklesCore
          id="services-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#15803d"
          speed={0.6}
        />
      </div>

      <div className="absolute inset-0 grid-overlay opacity-40" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">
            What We Do
          </span>

          <div className="relative mt-3">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Our <span className="text-green-700">Services</span>
            </h2>
            <div className="w-[20rem] h-16 mx-auto relative -mt-2">
              <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-[2px] w-4/5 blur-sm" />
              <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-px w-4/5" />
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={800}
                className="w-full h-full"
                particleColor="#15803d"
                speed={1.2}
              />
              <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(250px_80px_at_top,transparent_20%,white)]" />
            </div>
          </div>

          <p className="mt-2 text-gray-600 max-w-xl mx-auto text-lg">
            Business phones, everyday IT support, cloud workspace, CRM &amp; AI integrations, and ad creative — built for small businesses that deserve real expertise without the overhead.
          </p>
        </motion.div>

        {/* Scope of work notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 rounded-2xl bg-[#e8ebee] border border-gray-200 p-8"
        >
          <h3 className="text-2xl font-extrabold text-gray-900">
            One-Time Projects. <span className="text-green-700">Clear Deliverables.</span>
          </h3>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Get help with a specific technology or advertising need through a clearly defined project.
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Before work begins, we confirm what&apos;s included, what we need from you, the price, and the expected completion date. Your project ends with the agreed deliverables and handoff instructions.
          </p>
          <div className="mt-5 flex gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3">
            <Info className="w-4 h-4 text-green-700 flex-shrink-0 mt-0.5" />
            <p className="text-gray-600 text-sm leading-relaxed">
              Ongoing support, monitoring, subscriptions, and advertising spend are not included. Additional work can be quoted separately.
            </p>
          </div>
        </motion.div>

        {/* Service categories */}
        <div className="flex flex-col gap-12">
          {serviceCategories.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                  <cat.icon className="w-5 h-5 text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{cat.category}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.services.map((title, i) => (
                  <ServiceChip
                    key={title}
                    title={title}
                    i={i}
                    selected={selectedServices.includes(title)}
                    onToggle={toggleService}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Don't see what you need */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center text-gray-600 text-base"
        >
          Don&apos;t see what you need?{" "}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="text-green-700 font-semibold hover:text-green-600 underline underline-offset-2 transition-colors"
          >
            Let&apos;s chat and find the perfect fit for your business →
          </a>
        </motion.p>

        {/* Free assessment banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 relative rounded-2xl overflow-hidden border border-green-500/30 bg-green-50 p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        >
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <SparklesCore
              background="transparent"
              minSize={0.3}
              maxSize={0.8}
              particleDensity={40}
              className="w-full h-full"
              particleColor="#15803d"
              speed={0.8}
            />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 border border-green-500/30 flex items-center justify-center flex-shrink-0">
              <Gift className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <p className="text-gray-900 font-bold text-lg">FREE Initial IT Assessment — No Obligation</p>
              <p className="text-gray-600 text-sm mt-0.5">
                Get your technology foundation right from the start. We recommend the solutions you actually need.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="relative z-10 flex-shrink-0 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-gray-900 font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ boxShadow: "0 0 16px rgba(74,222,128,0.3)" }}
          >
            Claim Free Assessment
          </a>
        </motion.div>
      </div>

      {/* Floating get started bar */}
      <AnimatePresence>
        {selectedServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
          >
            <div className="flex items-center gap-4 bg-gray-900 text-white rounded-2xl px-5 py-3.5 shadow-2xl border border-white/10">
              <span className="text-sm font-medium text-white/80">
                <span className="text-green-400 font-extrabold">{selectedServices.length}</span>{" "}
                service{selectedServices.length > 1 ? "s" : ""} selected
              </span>
              <button
                onClick={() => setModalOpen(true)}
                className="px-5 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-extrabold text-sm transition-colors"
              >
                Get Started →
              </button>
              <button
                onClick={() => setSelectedServices([])}
                className="text-white/40 hover:text-white/70 transition-colors text-xs"
                aria-label="Clear selection"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {modalOpen && (
        <ServiceModal
          services={selectedServices}
          onClose={() => { setModalOpen(false); setSelectedServices([]); }}
        />
      )}
    </section>
  );
}
