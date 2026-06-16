"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, FileText } from "lucide-react";

export default function EmailCapture() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("needit_popup_dismissed")) return;
    const t = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("needit_popup_dismissed", "1");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      sessionStorage.setItem("needit_popup_dismissed", "1");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (dismissed || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="email-capture-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
        onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 24 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="relative w-full max-w-md rounded-2xl bg-white overflow-hidden"
          style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.22), 0 0 0 1px rgba(22,163,74,0.15)" }}
        >
          {/* Green header bar */}
          <div className="px-7 pt-7 pb-5" style={{ background: "linear-gradient(135deg, #15803d 0%, #16a34a 100%)" }}>
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <p className="text-white/80 text-xs font-semibold uppercase tracking-widest">Free Resource</p>
            </div>
            <h2 className="text-white text-xl font-extrabold leading-snug">
              Get the Free VoIP Setup Checklist
            </h2>
            <p className="text-white/80 text-sm mt-1.5 leading-relaxed">
              A pre-flight checklist and call quality test guide — two documents NeedIT uses on every setup.
            </p>
          </div>

          {/* Body */}
          <div className="px-7 py-6">
            {submitted ? (
              <div className="flex flex-col items-center text-center gap-3 py-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
                <p className="text-gray-900 font-extrabold text-base">You&apos;re on the list!</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Your checklists are ready — click below to view and save them as PDFs.
                </p>
                <div className="flex flex-col gap-2 w-full mt-1">
                  <a
                    href="/pdf/network-checklist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm text-center transition-colors"
                  >
                    VoIP Pre-Flight Checklist →
                  </a>
                  <a
                    href="/pdf/call-quality"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl border border-green-200 text-green-700 font-bold text-sm text-center hover:bg-green-50 transition-colors"
                  >
                    Call Quality Testing Checklist →
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@yourbusiness.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                {error && <p className="text-red-600 text-xs">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-60 text-white font-extrabold text-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                  style={{ boxShadow: "0 4px 16px rgba(22,163,74,0.25)" }}
                >
                  {loading ? "Sending…" : "Send Me the Checklists"}
                </button>
                <p className="text-gray-400 text-xs text-center leading-relaxed">
                  No spam. Just useful IT resources from NeedIT Consulting.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
