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
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please email needitconsult@gmail.com directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 bg-[#f0f2f5]">
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
          <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">
            Reach Out
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900">
            Let&apos;s Talk <span className="text-green-700">Technology</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
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
              { icon: Mail, label: "Email Us", value: "needitconsult@gmail.com" },
              { icon: Phone, label: "Call Us", value: "(540) 693-0033" },
              { icon: MapPin, label: "Location", value: "Fredericksburg, Spotsylvania, Stafford & Culpeper — serving nationwide" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-6 rounded-xl bg-[#e8ebee] border border-gray-200"
              >
                <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <div className="text-green-700/70 text-xs uppercase tracking-wider mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-gray-900 font-medium">{item.value}</div>
                </div>
              </div>
            ))}

            {/* CTA block */}
            <div className="p-6 rounded-xl bg-green-50 border border-green-500/30">
              <p className="text-green-700 font-semibold mb-1">Free IT Assessment</p>
              <p className="text-gray-600 text-sm leading-relaxed">
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
            className="p-8 rounded-2xl bg-[#e8ebee] border border-gray-200"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-64 text-center gap-4"
              >
                <CheckCircle className="w-16 h-16 text-green-700" />
                <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-600">
                  We&apos;ll be in touch within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-green-700/80 text-xs uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 rounded-lg bg-[#d6ddd6] border border-gray-200 focus:border-green-500/70 text-gray-900 placeholder-gray-400 outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-green-700/80 text-xs uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#d6ddd6] border border-gray-200 focus:border-green-500/70 text-gray-900 placeholder-gray-400 outline-none transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-green-700/80 text-xs uppercase tracking-wider mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    className="w-full px-4 py-3 rounded-lg bg-[#d6ddd6] border border-gray-200 focus:border-green-500/70 text-gray-900 placeholder-gray-400 outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-green-700/80 text-xs uppercase tracking-wider mb-2">
                    How Can We Help? *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your IT challenges or goals..."
                    className="w-full px-4 py-3 rounded-lg bg-[#d6ddd6] border border-gray-200 focus:border-green-500/70 text-gray-900 placeholder-gray-400 outline-none transition-colors text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 py-4 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-60 text-gray-900 font-bold transition-all glow-green hover:scale-[1.02] active:scale-[0.98]"
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
