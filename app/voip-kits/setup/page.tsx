"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Wrench, CheckCircle2, ChevronRight, ArrowLeft, Lock } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const KIT_NAMES: Record<string, string> = {
  solo:      "Solo Operator Starter Kit",
  small:     "Small Office Kit (3–5 Users)",
  remote:    "Remote Worker Kit",
  reception: "Front Desk / Receptionist Kit",
  conf:      "Conference Room Upgrade Kit",
  budget:    "Budget-Conscious Starter Kit",
};

function CheckoutButton({ product, kitKey, kitName }: { product: "guide" | "service"; kitKey: string; kitName: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, kitName }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Could not connect. Please try again.");
      setLoading(false);
    }
  };

  const isGuide = product === "guide";

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full py-3.5 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2"
        style={{
          background: isGuide
            ? loading ? "#e5e7eb" : "linear-gradient(135deg, #16a34a 0%, #15803d 100%)"
            : loading ? "#e5e7eb" : "linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)",
          color: loading ? "#9ca3af" : "#ffffff",
          boxShadow: loading ? "none" : isGuide ? "0 4px 16px rgba(22,163,74,0.3)" : "0 4px 16px rgba(29,78,216,0.3)",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Redirecting to checkout…" : isGuide ? "Buy Setup Guide — $19" : "Book NeedIT Setup — $149"}
        {!loading && <ChevronRight className="w-4 h-4" />}
      </button>
      {error && <p className="text-red-600 text-xs text-center">{error}</p>}
    </div>
  );
}

function SetupPageContent() {
  const params = useSearchParams();
  const kitKey = params.get("kit") ?? "solo";
  const kitName = KIT_NAMES[kitKey] ?? "VoIP Starter Kit";

  return (
    <main className="min-h-screen flex flex-col" style={{ background: "radial-gradient(ellipse 160% 60% at 50% 0%, #ffffff 0%, #f0f9ff 40%, #e8f4f0 100%)" }}>
      <Navbar />

      {/* Hero */}
      <div className="pt-32 pb-10 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/voip-kits" className="inline-flex items-center gap-1.5 text-green-700 text-sm font-semibold mb-5 hover:text-green-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to VoIP Kits
          </Link>
          <div className="mt-2">
            <span className="inline-block px-3 py-1 rounded-full bg-green-100 border border-green-300 text-green-800 text-xs font-bold tracking-widest uppercase mb-3">
              Setup Instructions
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              {kitName}
            </h1>
            <p className="text-gray-600 text-base mt-3 max-w-lg mx-auto leading-relaxed">
              Get the complete setup guide or have NeedIT handle everything for you — remotely, fast.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 px-6 pb-16 max-w-4xl mx-auto w-full">

        {/* Two purchase options */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          {/* Option 1: Buy the guide */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-6 flex flex-col"
            style={{ background: "#ffffff", border: "2px solid #bbf7d0", boxShadow: "0 4px 24px rgba(22,163,74,0.10)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="font-extrabold text-gray-900 text-base">Setup Guide</p>
                <p className="text-green-700 font-bold text-lg">$19 <span className="text-gray-400 text-sm font-normal">one-time</span></p>
              </div>
            </div>

            <ul className="flex flex-col gap-2 mb-5 flex-1">
              {[
                "Illustrated, phone-specific hardware setup walkthrough",
                "Network requirements & pre-flight checklist",
                "SIP credentials & phone provisioning guide",
                "Step-by-step web interface configuration",
                "Call quality testing checklist",
                "Quick troubleshooting reference by problem",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <CheckoutButton product="guide" kitKey={kitKey} kitName={kitName} />
          </motion.div>

          {/* Option 2: Book NeedIT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6 flex flex-col relative overflow-hidden"
            style={{ background: "#ffffff", border: "2px solid #bfdbfe", boxShadow: "0 4px 24px rgba(29,78,216,0.10)" }}
          >
            <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold">
              Most popular
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="font-extrabold text-gray-900 text-base">NeedIT Does It For You</p>
                <p className="text-blue-700 font-bold text-lg">$149 <span className="text-gray-400 text-sm font-normal">per setup</span></p>
              </div>
            </div>

            <ul className="flex flex-col gap-2 mb-5 flex-1">
              {[
                "Everything in the guide — done for you",
                "Remote phone provisioning (no site visit needed)",
                "SIP credentials configured & tested",
                "Auto-attendant & call routing setup",
                "Voicemail-to-email configuration",
                "Live test call before we sign off",
                "30-day follow-up support included",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <CheckoutButton product="service" kitKey={kitKey} kitName={kitName} />
          </motion.div>
        </div>

        {/* Setup guide content placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: "1.5px solid #e5e7eb" }}
        >
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <div>
              <p className="font-extrabold text-gray-900 text-base">{kitName} — Full Setup Guide</p>
              <p className="text-gray-500 text-sm">Preview the first section below</p>
            </div>
            <Lock className="w-5 h-5 text-gray-400" />
          </div>

          {/* FREE preview section */}
          <div className="p-6 bg-white">
            <h2 className="text-lg font-extrabold text-gray-900 mb-2">Before You Begin</h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Before touching a single cable, confirm you have everything on this checklist. Most setup headaches come from skipping this step.
            </p>
            <ul className="flex flex-col gap-2 mb-4">
              {[
                "Active internet connection (min. 10 Mbps upload per concurrent call)",
                "VoIP platform account created and login credentials ready",
                "All hardware unboxed and power-on tested",
                "Router/switch with available ethernet port (PoE or separate power adapter)",
                "SIP credentials from your VoIP provider (server, username, password)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Locked section */}
          <div className="relative">
            <div className="p-6 bg-white blur-[3px] select-none pointer-events-none" aria-hidden>
              <h2 className="text-lg font-extrabold text-gray-900 mb-2">Step 1 — Physical Setup</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Connect your Yealink phone to the network using the included Cat6 ethernet cable. Plug one end into the LAN port on the back of the phone and the other into your PoE switch or router. If your switch doesn't have PoE, plug in the power adapter as well. Once connected, press OK on the phone to find its IP address...
              </p>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[1px]">
              <Lock className="w-6 h-6 text-gray-500 mb-2" />
              <p className="text-gray-700 font-bold text-sm mb-3">Full guide unlocked after purchase</p>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-bold hover:bg-green-500 transition-colors"
              >
                Get the Guide — $19
              </Link>
            </div>
          </div>
        </motion.div>

        {/* FAQ strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 rounded-2xl p-6"
          style={{ background: "#f8faff", border: "1.5px solid #e0e7ff" }}
        >
          <p className="font-extrabold text-gray-900 mb-4">Common questions</p>
          <div className="flex flex-col gap-4">
            {[
              { q: "Do I need to be on-site for the NeedIT setup service?", a: "No. NeedIT provisions everything 100% remotely. We coordinate directly with your VoIP provider and walk you through connecting the hardware." },
              { q: "What if I already bought the guide but still need help?", a: "The $149 setup service fee is waived for guide purchasers who book within 10 days. Just email us with your receipt and we'll sort it." },
            ].map(({ q, a }) => (
              <div key={q}>
                <p className="text-gray-900 font-bold text-sm">{q}</p>
                <p className="text-gray-600 text-sm mt-0.5 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

export default function SetupPage() {
  return (
    <Suspense>
      <SetupPageContent />
    </Suspense>
  );
}
