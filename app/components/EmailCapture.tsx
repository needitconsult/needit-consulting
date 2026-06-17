"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText } from "lucide-react";

export default function EmailCapture() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("needit_popup_dismissed")) return;
    const t = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem("needit_popup_dismissed", "1");
  };

  const handleSubmit = () => {
    localStorage.setItem("needit_popup_dismissed", "1");
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
          {/* Green header */}
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

          {/* Zoho form — posts directly to Zoho, redirects to /thank-you */}
          <div className="px-7 py-6">
            <form
              action="https://crm.zoho.com/crm/WebToLeadForm"
              name="WebToLeads6948644000000846002"
              method="POST"
              acceptCharset="UTF-8"
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              {/* Zoho required hidden fields — do not remove */}
              <input type="text" name="xnQsjsdp" value="0082a7814d15eadfc51f70753283cc905d889c37a3050700d0897f993cc36a8a" readOnly style={{ display: "none" }} />
              <input type="hidden" name="zc_gad" id="zc_gad" value="" />
              <input type="text" name="xmIwtLD" value="9cb0832cfd10747dc3c350e818614385a010841873c7ad7d86c59d513aa533dfca96c2ebb6f8f3da06abb4d667bb30df" readOnly style={{ display: "none" }} />
              <input type="text" name="actionType" value="TGVhZHM=" readOnly style={{ display: "none" }} />
              <input type="text" name="returnURL" value="https://needitconsulting.com/thank-you" readOnly style={{ display: "none" }} />
              <input type="text" name="aG9uZXlwb3Q" value="" readOnly style={{ display: "none" }} />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="First_Name"
                    name="First Name"
                    required
                    maxLength={40}
                    placeholder="Jane"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="Last_Name"
                    name="Last Name"
                    required
                    maxLength={80}
                    placeholder="Smith"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none focus:border-green-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  required
                  maxLength={100}
                  placeholder="jane@yourbusiness.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 outline-none focus:border-green-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-extrabold text-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{ boxShadow: "0 4px 16px rgba(22,163,74,0.25)" }}
              >
                Send Me the Checklists
              </button>

              <p className="text-gray-400 text-xs text-center leading-relaxed">
                No spam. Just useful IT resources from NeedIT Consulting.
              </p>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
