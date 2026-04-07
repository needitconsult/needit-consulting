"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 px-6 bg-[#0a0f0a]">
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
            Reach Out
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-white">
            Let&apos;s Talk <span className="text-green-400">Technology</span>
          </h2>
          <p className="mt-4 text-green-200/60 max-w-xl mx-auto">
            Ready to transform your IT? Book a free 30-minute consultation — no commitment required.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            {[
              { icon: Mail, label: "Email Us", value: "hello@needitconsulting.com" },
              { icon: Phone, label: "Call Us", value: "+1 (800) NEED-IT1" },
              { icon: MapPin, label: "Location", value: "Serving businesses nationwide" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-6 rounded-xl bg-[#111811] border border-green-900/40"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-green-500/70 text-xs uppercase tracking-wider mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-white font-medium">{item.value}</div>
                </div>
              </div>
            ))}

            {/* CTA block */}
            <div className="p-6 rounded-xl bg-green-900/20 border border-green-500/30">
              <p className="text-green-300 font-semibold mb-1">Free IT Assessment</p>
              <p className="text-green-200/60 text-sm leading-relaxed">
                Not sure where to start? We&apos;ll audit your current IT environment and
                give you a no-cost roadmap within 48 hours.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-8 rounded-2xl bg-[#111811] border border-green-900/40"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-64 text-center gap-4"
              >
                <CheckCircle className="w-16 h-16 text-green-400" />
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="text-green-200/60">
                  We&apos;ll be in touch within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-green-400/80 text-xs uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 rounded-lg bg-[#0f180f] border border-green-900/50 focus:border-green-500/70 text-white placeholder-green-900 outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-green-400/80 text-xs uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#0f180f] border border-green-900/50 focus:border-green-500/70 text-white placeholder-green-900 outline-none transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-green-400/80 text-xs uppercase tracking-wider mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    className="w-full px-4 py-3 rounded-lg bg-[#0f180f] border border-green-900/50 focus:border-green-500/70 text-white placeholder-green-900 outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-green-400/80 text-xs uppercase tracking-wider mb-2">
                    How Can We Help? *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your IT challenges or goals..."
                    className="w-full px-4 py-3 rounded-lg bg-[#0f180f] border border-green-900/50 focus:border-green-500/70 text-white placeholder-green-900 outline-none transition-colors text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-4 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-60 text-white font-bold transition-all glow-green hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
