"use client";

import { motion } from "framer-motion";
import { Shield, Cloud, Network, Monitor, Headphones, Lock } from "lucide-react";

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: string[];
};

const services = [
  {
    icon: Shield,
    title: "Cybersecurity & Threat Defense",
    description:
      "24/7 SOC monitoring, endpoint detection & response (EDR), vulnerability assessments, and incident response — aligned to NIST and CIS frameworks.",
    tags: ["EDR/XDR", "SIEM", "Zero Trust"],
  },
  {
    icon: Cloud,
    title: "Cloud & Microsoft 365",
    description:
      "Full lifecycle Microsoft 365 deployments, Azure migrations, and multi-cloud management. As a Microsoft Solutions Partner, we maximize your licensing and security posture.",
    tags: ["Microsoft 365", "Azure", "Entra ID"],
  },
  {
    icon: Network,
    title: "VoIP & Unified Communications",
    description:
      "Replace aging phone systems with enterprise-grade VoIP and UCaaS. AI-powered call routing, voicemail transcription, mobile apps, and seamless CRM integration — all managed for you.",
    tags: ["RingCentral", "3CX", "Microsoft Teams Voice"],
  },
  {
    icon: Monitor,
    title: "Managed IT Services",
    description:
      "Flat-rate, fully managed IT with RMM-powered monitoring, patch management, and unlimited helpdesk. We act as your dedicated IT department — without the overhead.",
    tags: ["RMM", "NOC", "SLA-backed"],
  },
  {
    icon: Headphones,
    title: "Helpdesk & On-Site Support",
    description:
      "Remote and on-site support with an average response time under 15 minutes. Tier 1–3 technicians available around the clock so your team stays productive.",
    tags: ["15-min Response", "Remote & On-Site", "24/7"],
  },
  {
    icon: Lock,
    title: "Compliance & Risk Management",
    description:
      "End-to-end compliance support for HIPAA, SOC 2, PCI-DSS, and CMMC. We handle gap assessments, policy documentation, staff training, and audit readiness.",
    tags: ["HIPAA", "SOC 2", "PCI-DSS", "CMMC"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
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
      className="group relative p-8 rounded-2xl bg-[#111811] border border-green-900/40 hover:border-green-500/50 transition-colors glow-green-sm hover:glow-green cursor-default flex flex-col gap-4"
    >
      <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
        <service.icon className="w-6 h-6 text-green-400" />
      </div>
      <h3 className="text-xl font-bold text-white">{service.title}</h3>
      <p className="text-green-200/60 leading-relaxed text-sm flex-1">{service.description}</p>
      <div className="flex flex-wrap gap-2 pt-2 border-t border-green-900/30">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-500/40 group-hover:bg-green-400 transition-colors" />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6 bg-[#0a0f0a]">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-green-500 text-sm font-semibold tracking-widest uppercase">
            What We Do
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-white">
            Our <span className="text-green-400">Services</span>
          </h2>
          <p className="mt-4 text-green-200/60 max-w-xl mx-auto text-lg">
            End-to-end managed IT, VoIP, and cybersecurity — built for businesses that can&apos;t afford downtime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
