"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marcus Thompson",
    role: "CEO, Pinnacle Financial Group",
    body: "NeedIT transformed our outdated infrastructure into a modern, secure environment in under 60 days. Our team hasn't experienced a single outage since.",
    stars: 5,
  },
  {
    name: "Sandra Rivera",
    role: "Operations Director, MedCore Clinics",
    body: "HIPAA compliance felt overwhelming until NeedIT stepped in. They handled everything from risk assessments to staff training. Absolutely worth every penny.",
    stars: 5,
  },
  {
    name: "James O'Brien",
    role: "Founder, Swift Logistics LLC",
    body: "Their helpdesk support is lightning fast. Problems that used to derail our whole office are now resolved in minutes. I can't recommend them enough.",
    stars: 5,
  },
  {
    name: "Priya Patel",
    role: "IT Manager, Horizon Architecture",
    body: "We migrated to the cloud seamlessly with NeedIT's guidance. No downtime, no data loss, and our monthly costs actually went down.",
    stars: 5,
  },
  {
    name: "Derek Washington",
    role: "CTO, BrightEdge Media",
    body: "NeedIT caught a ransomware attempt before it could do any damage. Their proactive monitoring is truly world-class. They're a trusted extension of our team.",
    stars: 5,
  },
  {
    name: "Alicia Chen",
    role: "Owner, Keystone Legal Partners",
    body: "Clear communication, no tech jargon, and they actually show up on time. Refreshing to work with an IT firm that treats you like a priority.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 px-6 bg-[#f0f2f5]">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">
            Client Stories
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900">
            What Our <span className="text-green-700">Clients Say</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Real results from real businesses that trusted NeedIT with their technology.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative p-8 rounded-2xl bg-[#e8ebee] border border-gray-200 hover:border-green-500/40 transition-colors flex flex-col gap-4"
            >
              <Quote className="w-8 h-8 text-green-700/30 absolute top-6 right-6" />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-green-400 text-green-700" />
                ))}
              </div>

              {/* Body */}
              <p className="text-green-200/70 leading-relaxed text-sm flex-1">&ldquo;{t.body}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
                <div className="w-10 h-10 rounded-full bg-green-100 border border-green-500/30 flex items-center justify-center text-green-700 font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">{t.name}</div>
                  <div className="text-green-700/60 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
