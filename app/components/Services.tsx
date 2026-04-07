"use client";

import { motion } from "framer-motion";
import { Shield, Cloud, Network, Monitor, Headphones, Lock } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Proactive threat detection, vulnerability assessments, and incident response to protect your business assets.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Seamless migration, optimization, and management of cloud infrastructure across AWS, Azure, and Google Cloud.",
  },
  {
    icon: Network,
    title: "Network Infrastructure",
    description:
      "Design, deploy, and maintain robust network architectures that scale with your business needs.",
  },
  {
    icon: Monitor,
    title: "Managed IT Services",
    description:
      "24/7 monitoring, maintenance, and support so you can focus on growing your business — not fixing tech.",
  },
  {
    icon: Headphones,
    title: "IT Helpdesk Support",
    description:
      "Responsive, knowledgeable support for your team. Remote and on-site options available.",
  },
  {
    icon: Lock,
    title: "Compliance & Risk",
    description:
      "Navigate HIPAA, SOC 2, PCI-DSS, and other compliance frameworks with expert guidance.",
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

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6 bg-[#0a0f0a]">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
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
            End-to-end IT solutions built for businesses that can&apos;t afford downtime.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative p-8 rounded-2xl bg-[#111811] border border-green-900/40 hover:border-green-500/50 transition-colors glow-green-sm hover:glow-green cursor-default"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-5 group-hover:bg-green-500/20 transition-colors">
                <service.icon className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-green-200/60 leading-relaxed text-sm">{service.description}</p>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-500/40 group-hover:bg-green-400 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
