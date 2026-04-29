"use client";

import { motion } from "framer-motion";
import { Phone, Headphones, Wifi, Shield, Bot, FileText, Gift } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";

type Service = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  bullets: string[];
  price: string;
};

const services: Service[] = [
  {
    icon: Phone,
    title: "VoIP System Consultation",
    subtitle: "Strategic planning and vendor management for optimal VoIP solutions",
    bullets: [
      "Diagnostic and inspection of current or prospective systems",
      "Detailed evaluation on the most cost-effective option for your business",
      "Vendor management assistance",
      "Strategic planning of systems design",
    ],
    price: "$95/hr",
  },
  {
    icon: Headphones,
    title: "VoIP Help Desk Support",
    subtitle: "Professional technical support for your VoIP systems",
    bullets: [
      "Help desk support via phone/email (ZohoDesk)",
      "Remote troubleshooting via screen share (Microsoft Teams)",
      "Call quality optimization",
      "User account management & system configuration",
      "Documentation and issue tracking",
    ],
    price: "$95/hr",
  },
  {
    icon: Wifi,
    title: "VoIP Network Assessment & Optimization",
    subtitle: "Ensure your network is VoIP-ready for optimal call quality",
    bullets: [
      "Bandwidth analysis and recommendations",
      "Quality of Service (QoS) configuration",
      "Network security assessment",
      "Router and firewall optimization",
      "Performance testing and validation",
    ],
    price: "$95/hr",
  },
  {
    icon: Shield,
    title: "VoIP Firewall Configuration",
    subtitle: "Secure firewall setup optimized for VoIP traffic",
    bullets: [
      "SonicWall, Fortinet, and Cisco firewall configuration",
      "VoIP port configuration and security",
      "Security policy implementation",
    ],
    price: "$95/hr",
  },
  {
    icon: Bot,
    title: "Virtual Assistant",
    subtitle: "Reliable technical support and system optimization",
    bullets: [
      "Help desk support via phone/email (ZohoDesk)",
      "Remote troubleshooting via screen share (Microsoft Teams)",
      "Vendor management",
      "File structure standardization",
      "Cloud storage optimization",
      "Desktop organization & software cleanup",
    ],
    price: "$75–$120/hr",
  },
  {
    icon: FileText,
    title: "VoIP System Documentation",
    subtitle: "Professional documentation for your VoIP implementation",
    bullets: [
      "System configuration documentation",
      "User guides and quick reference cards",
      "Troubleshooting procedures",
      "Emergency contact procedures",
      "System diagrams and network maps",
    ],
    price: "$120/hr",
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

function ServiceCard({ service, i }: { service: Service; i: number }) {
  return (
    <motion.div
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-green-500/50 transition-all duration-300 flex flex-col gap-4 overflow-hidden"
    >
      {/* Per-card sparkles on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <SparklesCore
          background="transparent"
          minSize={0.3}
          maxSize={0.9}
          particleDensity={60}
          className="w-full h-full"
          particleColor="#15803d"
          speed={1.5}
        />
      </div>

      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 30px rgba(74,222,128,0.05)" }} />

      {/* Icon + price row */}
      <div className="relative z-10 flex items-start justify-between gap-2">
        <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-500/20 flex items-center justify-center group-hover:bg-green-100 transition-colors flex-shrink-0">
          <service.icon className="w-6 h-6 text-green-700" />
        </div>
        <span className="px-3 py-1 rounded-full bg-green-50 border border-green-500/20 text-green-700 text-xs font-mono font-semibold whitespace-nowrap">
          {service.price}
        </span>
      </div>

      <div className="relative z-10">
        <h3 className="text-lg font-bold text-gray-900 leading-snug">{service.title}</h3>
        <p className="mt-1 text-gray-500 text-xs leading-relaxed">{service.subtitle}</p>
      </div>

      <ul className="relative z-10 flex flex-col gap-1.5 flex-1">
        {service.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-gray-600 text-sm leading-relaxed">
            <span className="text-green-700 mt-0.5 flex-shrink-0">▸</span>
            {b}
          </li>
        ))}
      </ul>

      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-500/40 group-hover:bg-green-400 transition-colors z-10" />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6 bg-[#f0f2f5] overflow-hidden">
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
            VoIP consulting, helpdesk, network optimization, and virtual IT support — built for small businesses that need real expertise without the overhead.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} i={i} />
          ))}
        </div>

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
    </section>
  );
}
