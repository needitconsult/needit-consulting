"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Users, Building2, Headphones, Phone, Cable, CheckCircle2 } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const INDUSTRIES = [
  "Healthcare / Medical",
  "Legal / Law Firm",
  "Real Estate",
  "Education / Schools",
  "Retail / E-Commerce",
  "Restaurant / Food Service",
  "Construction / Contracting",
  "Technology / Software",
  "Financial Services / Insurance",
  "Hospitality / Hotel",
  "Transportation / Logistics",
  "Non-Profit",
  "Government / Public Sector",
  "Consulting / Professional Services",
  "Other",
];

const PEOPLE_OPTIONS = [
  { value: "1",     label: "Just me",         sub: "1 person" },
  { value: "2-5",   label: "Small team",       sub: "2–5 people" },
  { value: "6-15",  label: "Growing team",     sub: "6–15 people" },
  { value: "16-30", label: "Mid-size office",  sub: "16–30 people" },
  { value: "30+",   label: "Larger org",       sub: "30+ people" },
];

const EQUIPMENT_OPTIONS = [
  { value: "headset",    label: "Desk phones or headsets",      icon: Headphones, desc: "Individual workstation calls" },
  { value: "conference", label: "Conference phone for meetings", icon: Phone,       desc: "Group calls and conference rooms" },
  { value: "accessories",label: "Accessories",                  icon: Cable,       desc: "Cables, adapters, PoE switches" },
];

type KitKey = "solo" | "budget" | "small" | "remote" | "reception" | "conference";

const KITS: Record<KitKey, { name: string; tagline: string; description: string; color: string; for: string }> = {
  solo: {
    name: "Solo Operator Kit",
    tagline: "One person. One great phone. Zero hassle.",
    description: "Perfect for solo consultants, home-based businesses, realtors, or anyone who needs a professional business line without the corporate setup. Simple, reliable, and affordable.",
    color: "#16a34a",
    for: "1-person operations",
  },
  budget: {
    name: "Budget Starter Kit",
    tagline: "Professional setup without breaking the bank.",
    description: "The right gear for small teams that need real desk phones and a reliable hosted VoIP platform — without enterprise pricing. Great starting point for fast-growing businesses.",
    color: "#0284c7",
    for: "2–5 person teams",
  },
  small: {
    name: "Small Office Kit",
    tagline: "Built for growing teams that need more.",
    description: "Designed for offices with multiple departments and a growing staff. Handles call routing, hold queues, and multi-line setups with ease.",
    color: "#7c3aed",
    for: "6–15 person offices",
  },
  remote: {
    name: "Remote Worker Kit",
    tagline: "Stay connected from anywhere.",
    description: "For distributed teams and remote employees who need a professional phone presence without being tied to a single office location.",
    color: "#b45309",
    for: "Distributed / remote teams",
  },
  reception: {
    name: "Reception Desk Kit",
    tagline: "A polished front-of-office experience.",
    description: "Built for busy front desks that manage high call volume, multiple lines, and call routing. Keeps callers properly greeted and directed every time.",
    color: "#be185d",
    for: "16–30+ person offices",
  },
  conference: {
    name: "Conference Ready Kit",
    tagline: "Crystal-clear calls for the whole room.",
    description: "Optimized for meeting rooms and conference spaces where multiple people participate in calls together. Eliminates the speakerphone struggle.",
    color: "#0f766e",
    for: "Meeting-heavy businesses",
  },
};

function getRecommendations(people: string, industry: string, equipment: string[]): KitKey[] {
  const kits: KitKey[] = [];

  if (people === "1") kits.push("solo");
  else if (people === "2-5") kits.push("budget");
  else if (people === "6-15") kits.push("small");
  else kits.push("reception");

  const remoteIndustries = ["Technology / Software", "Consulting / Professional Services"];
  if (remoteIndustries.includes(industry) && people !== "1") {
    if (!kits.includes("remote")) kits.push("remote");
  }

  if (equipment.includes("conference") && !kits.includes("conference")) {
    kits.push("conference");
  }

  return kits;
}

export default function GuidePage() {
  const [people, setPeople]       = useState<string>("");
  const [industry, setIndustry]   = useState<string>("");
  const [equipment, setEquipment] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults]     = useState<KitKey[]>([]);

  const toggleEquipment = (val: string) => {
    setEquipment((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const handleSubmit = () => {
    if (!people || !industry) return;
    setResults(getRecommendations(people, industry, equipment));
    setSubmitted(true);
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleReset = () => {
    setSubmitted(false);
    setResults([]);
    setPeople("");
    setIndustry("");
    setEquipment([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canSubmit = !!people && !!industry;

  return (
    <main className="min-h-screen flex flex-col" style={{ background: "radial-gradient(ellipse 160% 60% at 50% 0%, #ffffff 0%, #f0f9ff 40%, #e8f4f0 100%)" }}>
      <Navbar />

      {/* Hero */}
      <div className="pt-32 pb-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 border border-green-300 text-green-800 text-sm font-bold tracking-widest uppercase mb-4">
            Custom Recommendation
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Find Your <span className="text-green-700">Perfect Setup</span>
          </h1>
          <p className="text-gray-700 text-lg max-w-xl mx-auto leading-relaxed">
            Answer three quick questions and we&apos;ll match you with the right VoIP kit for your business.
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pb-16 max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl p-8 md:p-10"
          style={{
            background: "#ffffff",
            boxShadow: "0 8px 48px rgba(22,163,74,0.10), 0 2px 12px rgba(0,0,0,0.06)",
            border: "1px solid rgba(22,163,74,0.15)",
          }}
        >
          {/* Question 1 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-700" />
                <span className="text-gray-900 font-bold text-base">How many people need phones?</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {PEOPLE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPeople(opt.value)}
                  className="rounded-xl px-4 py-2.5 border-2 transition-all text-left"
                  style={{
                    borderColor: people === opt.value ? "#16a34a" : "#e5e7eb",
                    background: people === opt.value ? "#f0fdf4" : "#fafafa",
                    color: people === opt.value ? "#15803d" : "#374151",
                  }}
                >
                  <span className="font-bold text-sm block">{opt.label}</span>
                  <span className="text-xs opacity-70">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-green-700" />
                <span className="text-gray-900 font-bold text-base">What type of business are you in?</span>
              </div>
            </div>
            <div className="relative">
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full rounded-xl px-4 py-3 border-2 appearance-none bg-white text-gray-800 font-semibold text-sm cursor-pointer pr-10"
                style={{ borderColor: industry ? "#16a34a" : "#e5e7eb", outline: "none" }}
              >
                <option value="">Select your industry…</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Question 3 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
              <span className="text-gray-900 font-bold text-base">What equipment are you looking for?</span>
            </div>
            <p className="text-gray-500 text-sm mb-3">Select all that apply (optional)</p>
            <div className="flex flex-col gap-2">
              {EQUIPMENT_OPTIONS.map(({ value, label, icon: Icon, desc }) => {
                const checked = equipment.includes(value);
                return (
                  <button
                    key={value}
                    onClick={() => toggleEquipment(value)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 border-2 text-left transition-all"
                    style={{
                      borderColor: checked ? "#16a34a" : "#e5e7eb",
                      background: checked ? "#f0fdf4" : "#fafafa",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: checked ? "#dcfce7" : "#f3f4f6" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: checked ? "#16a34a" : "#9ca3af" }} />
                    </div>
                    <div className="flex-1">
                      <span className="font-bold text-sm text-gray-800 block">{label}</span>
                      <span className="text-xs text-gray-500">{desc}</span>
                    </div>
                    {checked && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full py-4 rounded-xl font-extrabold text-base transition-all"
            style={{
              background: canSubmit ? "linear-gradient(135deg, #16a34a 0%, #15803d 100%)" : "#e5e7eb",
              color: canSubmit ? "#ffffff" : "#9ca3af",
              boxShadow: canSubmit ? "0 4px 20px rgba(22,163,74,0.35)" : "none",
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
          >
            {canSubmit ? "See My Recommendations →" : "Please answer questions 1 and 2 above"}
          </button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {submitted && results.length > 0 && (
            <motion.div
              id="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.55 }}
              className="mt-10"
            >
              <div className="text-center mb-6">
                <span className="text-green-800 text-sm font-bold tracking-widest uppercase">Your Match</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
                  Here&apos;s what we recommend
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  Based on your answers — {people === "1" ? "1 person" : `${people} people`}, {industry}{equipment.length > 0 ? `, ${equipment.join(" + ")}` : ""}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {results.map((key, i) => {
                  const kit = KITS[key];
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-2xl p-6"
                      style={{
                        background: "#ffffff",
                        border: `2px solid ${kit.color}22`,
                        boxShadow: `0 4px 24px ${kit.color}14`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <span
                            className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2"
                            style={{ background: `${kit.color}18`, color: kit.color }}
                          >
                            {kit.for}
                          </span>
                          <h3 className="text-xl font-extrabold text-gray-900 mb-1">{kit.name}</h3>
                          <p className="text-sm font-semibold mb-2" style={{ color: kit.color }}>{kit.tagline}</p>
                          <p className="text-gray-600 text-sm leading-relaxed">{kit.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-3 flex-wrap">
                        <Link
                          href="/voip-kits"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                          style={{ background: kit.color }}
                        >
                          See Full Kit Details
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Accessories note */}
              {(equipment.includes("accessories") || true) && (
                <div
                  className="mt-4 rounded-2xl p-5"
                  style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
                >
                  <p className="text-green-800 font-bold text-sm mb-1">Don&apos;t forget accessories</p>
                  <p className="text-green-700 text-sm leading-relaxed">
                    Every kit works best with quality cables and a PoE switch. Visit the VoIP kits page to see the &quot;Recommended with every kit&quot; accessories section.
                  </p>
                </div>
              )}

              {/* CTA */}
              <div
                className="mt-6 rounded-2xl p-7 text-center"
                style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", border: "1.5px solid #86efac" }}
              >
                <p className="text-green-800 font-bold text-base mb-1">Want help setting this up?</p>
                <p className="text-green-700 text-sm mb-4 leading-relaxed">
                  NeedIT Consulting handles provisioning, number porting, and full configuration — so you&apos;re live fast.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold transition-all hover:scale-[1.02] text-sm"
                    style={{ boxShadow: "0 0 20px rgba(22,163,74,0.3)" }}
                  >
                    Talk to NeedIT
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={handleReset}
                    className="px-5 py-3 rounded-xl border-2 border-green-300 text-green-700 font-bold text-sm hover:bg-green-50 transition-all"
                  >
                    Start over
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
