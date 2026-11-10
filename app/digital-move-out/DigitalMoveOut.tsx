"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, Info, Minus, Phone, Plus } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ServiceModal from "@/app/components/ServiceModal";
import { steps, moves, packages, extras, reasons, faqs, isMoveOutOnly } from "@/app/data/digital-move-out";

const PHONE_HREF = "tel:+15406930033";
const PHONE_LABEL = "(540) 693-0033";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function SectionHeader({ eyebrow, title, accent, children }: { eyebrow: string; title: string; accent?: string; children?: React.ReactNode }) {
  return (
    <motion.div {...fadeUp} className="text-center mb-10">
      <span className="text-green-800 text-sm font-semibold tracking-widest uppercase">{eyebrow}</span>
      <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">
        {title} {accent && <span className="text-green-700">{accent}</span>}
      </h2>
      {children && <p className="mt-3 text-gray-700 text-base max-w-2xl mx-auto leading-relaxed">{children}</p>}
    </motion.div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl bg-white border border-gray-200 hover:border-green-500/40 transition-colors">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900">{q}</span>
        {open ? <Minus className="w-4 h-4 text-green-700 flex-shrink-0" /> : <Plus className="w-4 h-4 text-green-700 flex-shrink-0" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-gray-700 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DigitalMoveOut() {
  const [booking, setBooking] = useState<string | null>(null);

  const scrollToPackages = () =>
    document.getElementById("dmo-packages")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-6 border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <SparklesCore
            id="dmo-hero-sparkles"
            background="transparent"
            minSize={0.3}
            maxSize={1}
            particleDensity={25}
            className="w-full h-full"
            particleColor="#15803d"
            speed={0.5}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-green-800 text-base font-semibold tracking-widest uppercase">De-Google Migration</span>

            <div className="relative mt-3 mb-4">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                Digital <span className="text-green-700">Move-Out</span>
              </h1>
              <div className="w-[20rem] h-12 mx-auto relative -mt-1">
                <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-[2px] w-4/5 blur-sm" />
                <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-px w-4/5" />
                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={800}
                  className="w-full h-full"
                  particleColor="#15803d"
                  speed={1.2}
                />
                <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(250px_80px_at_top,transparent_20%,white)]" />
              </div>
            </div>

            <p className="text-gray-800 max-w-2xl mx-auto text-xl leading-relaxed">
              We pack up your email, photos, files, passwords, and phone and move them somewhere Google can&apos;t read them. You keep everything. You just stop being the product.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={scrollToPackages}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-gray-900 font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ boxShadow: "0 0 20px rgba(74,222,128,0.3)" }}
              >
                See packages
                <ChevronRight className="w-4 h-4" />
              </button>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-green-500/50 bg-white text-gray-900 font-bold transition-colors"
              >
                <Phone className="w-4 h-4 text-green-700" />
                Call {PHONE_LABEL}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {["Gmail", "Google Photos", "Drive & Docs", "Chrome passwords", "Google Voice", "Android", "Google Workspace"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-green-50 border border-green-500/20 text-green-800 text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* How it works */}
      <section className="relative py-20 px-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="How it works" title="Just like a real move." accent="Minus the boxes.">
            Every Digital Move-Out follows the same four steps: see what you have, pack it carefully, move it, and make sure everything works in its new home.
          </SectionHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl bg-[#f0f2f5] border border-gray-200 p-6"
              >
                <span className="block text-3xl font-extrabold text-green-700 mb-2">0{i + 1}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we move */}
      <section className="relative py-20 px-6 border-b border-gray-200">
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <SectionHeader eyebrow="What we move" title="Every Google app, replaced with" accent="something private.">
            We pick the replacements based on how you actually use your phone and computer, not a one-size-fits-all list.
          </SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {moves.map((m, i) => (
              <motion.div
                key={m.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className={`rounded-xl p-5 border-2 transition-colors ${
                  m.feature ? "bg-green-50 border-green-500" : "bg-white border-gray-200 hover:border-green-500/50"
                }`}
              >
                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">{m.from}</p>
                <h3 className="mt-1 text-lg font-bold text-gray-900">{m.title}</h3>
                <p className="mt-1 mb-2 flex items-start gap-1.5 text-green-800 text-sm font-semibold">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {m.to}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">{m.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="dmo-packages" className="relative py-20 px-6 border-b border-gray-200 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="Packages" title="Pick the size of" accent="your move.">
            Flat prices, no surprises. Start with the Privacy Checkup if you&apos;re not sure what you need. The fee comes off any package you book.
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-2xl bg-white p-7 flex flex-col border-2 ${
                  pkg.popular ? "border-green-500 shadow-lg shadow-green-100" : "border-gray-200"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-7 px-3 py-0.5 rounded-full bg-green-600 text-white text-xs font-bold uppercase tracking-wider">
                    Most popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                <p className="text-gray-600 text-sm">{pkg.blurb}</p>
                <p className="mt-3 text-4xl font-extrabold text-gray-900">{pkg.price}</p>
                <ul className="mt-5 mb-6 flex flex-col gap-2.5 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-gray-800 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setBooking(pkg.name)}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.01] active:scale-[0.99] ${
                    pkg.popular
                      ? "bg-green-600 hover:bg-green-500 text-white"
                      : "border-2 border-gray-200 hover:border-green-500/50 text-gray-900"
                  }`}
                >
                  Book {pkg.name === "Household Move-Out" ? "a Household" : `a ${pkg.name}`}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
            {extras.map((ex, i) => (
              <motion.div
                key={ex.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border-2 border-dashed border-gray-300 bg-[#f0f2f5] p-6 flex flex-col"
              >
                <h3 className="text-lg font-bold text-gray-900">{ex.name}</h3>
                <p className="mt-1 text-2xl font-extrabold text-gray-900">
                  {ex.price} {ex.priceNote && <span className="text-sm font-medium text-gray-600">{ex.priceNote}</span>}
                </p>
                <p className="mt-2 text-gray-700 text-sm leading-relaxed flex-1">{ex.blurb}</p>
                <button
                  onClick={() => setBooking(ex.name)}
                  className="mt-4 self-start text-green-700 hover:text-green-600 font-semibold text-sm underline underline-offset-2"
                >
                  Request {ex.name} →
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-6 flex gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3">
            <Info className="w-4 h-4 text-green-700 flex-shrink-0 mt-0.5" />
            <p className="text-gray-600 text-sm leading-relaxed">
              Your new services (like Proton or Bitwarden) are paid directly by you, so every account is in your name. We&apos;ll go over the costs before anything is set up. Very large photo libraries (over 500&nbsp;GB) may need extra time, which we&apos;ll quote up front. Each package ends with a defined follow-up period; ongoing support after that can be quoted separately.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why NeedIT */}
      <section className="relative py-20 px-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div {...fadeUp}>
            <span className="text-green-800 text-sm font-semibold tracking-widest uppercase">Why NeedIT</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">
              Done by a security pro, <span className="text-green-700">not a YouTube tutorial.</span>
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Leaving Google takes dozens of small steps, and missing one can lock you out of your bank or lose 10 years of photos. We&apos;ve done the homework so you don&apos;t have to.
            </p>
          </motion.div>
          <div className="flex flex-col gap-3">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-r-xl bg-[#f0f2f5] border-l-4 border-green-600 px-5 py-4"
              >
                <p className="font-bold text-gray-900">{r.title}</p>
                <p className="text-gray-700 text-sm">{r.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 px-6 border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <SectionHeader eyebrow="Questions" title="Before you" accent="move out" />
          <div className="flex flex-col gap-3">
            {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6">
        <motion.div
          {...fadeUp}
          className="max-w-5xl mx-auto relative rounded-2xl overflow-hidden border border-green-500/30 bg-green-50 p-10 text-center"
        >
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <SparklesCore
              background="transparent"
              minSize={0.3}
              maxSize={0.8}
              particleDensity={40}
              className="w-full h-full"
              particleColor="#15803d"
              speed={0.8}
            />
          </div>
          <div className="relative z-10">
            <p className="text-green-800 text-base font-semibold uppercase tracking-widest mb-2">Ready to move?</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">Start with a Privacy Checkup.</h2>
            <p className="text-gray-700 max-w-lg mx-auto mb-6">
              One hour, a written plan, and the $129 comes off any package you book.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setBooking("Privacy Checkup")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-gray-900 font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ boxShadow: "0 0 20px rgba(74,222,128,0.3)" }}
              >
                Book a Privacy Checkup
                <ChevronRight className="w-4 h-4" />
              </button>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-green-500/50 bg-white text-gray-900 font-bold transition-colors"
              >
                <Phone className="w-4 h-4 text-green-700" />
                Call {PHONE_LABEL}
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />

      {booking && (
        <ServiceModal
          services={[booking]}
          businessOptional={isMoveOutOnly([booking])}
          onClose={() => setBooking(null)}
        />
      )}
    </main>
  );
}
