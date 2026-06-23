"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Info } from "lucide-react";

interface Props {
  services: string[];
  onClose: () => void;
}

const employeeOptions = ["1–5", "6–15", "16–30", "31–50", "51+"];

export default function ServiceModal({ services, onClose }: Props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    employees: "",
    phone: "",
    preferredDate: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ services, ...form }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email needitconsult@gmail.com directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none focus:border-green-500 transition-colors";
  const labelClass =
    "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

  return (
    <AnimatePresence>
      <motion.div
        key="service-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 overflow-y-auto"
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 24 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="relative w-full max-w-lg rounded-2xl bg-white overflow-hidden my-auto"
          style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.22), 0 0 0 1px rgba(22,163,74,0.15)" }}
        >
          {/* Header */}
          <div className="px-7 pt-7 pb-5" style={{ background: "linear-gradient(135deg, #15803d 0%, #16a34a 100%)" }}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-white/75 text-xs font-semibold uppercase tracking-widest mb-1">Get Started</p>
            {services.length === 1 ? (
              <h2 className="text-white text-xl font-extrabold leading-snug">{services[0]}</h2>
            ) : (
              <div>
                <h2 className="text-white text-xl font-extrabold leading-snug mb-2">{services.length} Services Selected</h2>
                <ul className="flex flex-col gap-1">
                  {services.map((s) => (
                    <li key={s} className="text-white/80 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-300 flex-shrink-0" />{s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {submitted ? (
            <div className="px-7 py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-gray-900 font-extrabold text-lg mb-2">Request Received!</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                You&apos;ll be contacted within 48 hours to confirm your setup call details. Keep an eye on your phone.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="px-7 py-6">
              {/* Info notice */}
              <div className="flex gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5">
                <Info className="w-4 h-4 text-green-700 flex-shrink-0 mt-0.5" />
                <p className="text-green-800 text-xs leading-relaxed">
                  We collect this information to assist in contacting you and best servicing your needs. You will be contacted within <strong>48 hours</strong> to confirm setup call details prior to services.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>First Name <span className="text-red-500">*</span></label>
                    <input type="text" required placeholder="Jane" value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name <span className="text-red-500">*</span></label>
                    <input type="text" required placeholder="Smith" value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)} className={inputClass} />
                  </div>
                </div>

                {/* Business name */}
                <div>
                  <label className={labelClass}>Business Name <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="Acme Co." value={form.businessName}
                    onChange={(e) => set("businessName", e.target.value)} className={inputClass} />
                </div>

                {/* Employees + Phone row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Number of Employees</label>
                    <select value={form.employees} onChange={(e) => set("employees", e.target.value)}
                      className={inputClass}>
                      <option value="">Select...</option>
                      {employeeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Phone <span className="text-red-500">*</span></label>
                    <input type="tel" required placeholder="(555) 000-0000" value={form.phone}
                      onChange={(e) => set("phone", e.target.value)} className={inputClass} />
                  </div>
                </div>

                {/* Preferred date */}
                <div>
                  <label className={labelClass}>Preferred Date for Setup Call</label>
                  <input type="date" value={form.preferredDate}
                    onChange={(e) => set("preferredDate", e.target.value)} className={inputClass} />
                </div>

                {error && (
                  <p className="text-red-500 text-xs">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-60 text-white font-extrabold text-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                  style={{ boxShadow: "0 4px 16px rgba(22,163,74,0.25)" }}
                >
                  {submitting ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
