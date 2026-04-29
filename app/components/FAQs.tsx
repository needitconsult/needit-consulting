"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Minus, MessageCircle, Settings, Wrench, DollarSign,
  Lock, Clipboard, Folder, Cloud, Monitor, Hammer, ChevronRight,
} from "lucide-react";
import faqData from "@/app/data/needit_faqs.json";

/* ── icon map ─────────────────────────────────────────────────── */
const iconMap: Record<string, React.ElementType> = {
  chat: MessageCircle,
  settings: Settings,
  wrench: Wrench,
  dollar: DollarSign,
  lock: Lock,
  clipboard: Clipboard,
  folder: Folder,
  cloud: Cloud,
  monitor: Monitor,
  tools: Hammer,
};

/* ── badge colours ────────────────────────────────────────────── */
const badgeClasses: Record<string, string> = {
  general: "bg-green-50 border-green-500/30 text-green-700",
  info:    "bg-blue-500/10  border-blue-500/30  text-blue-400",
  warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  danger:  "bg-red-500/10   border-red-500/30   text-red-400",
  neutral: "bg-zinc-500/10  border-zinc-500/30  text-zinc-400",
};

const activeBg: Record<string, string> = {
  general: "bg-green-100  border-green-400   text-green-700",
  info:    "bg-blue-500/20   border-blue-400    text-blue-300",
  warning: "bg-yellow-500/20 border-yellow-400  text-yellow-300",
  success: "bg-emerald-500/20 border-emerald-400 text-emerald-300",
  danger:  "bg-red-500/20    border-red-400     text-red-300",
  neutral: "bg-zinc-500/20   border-zinc-400    text-zinc-300",
};

/* ── types ────────────────────────────────────────────────────── */
type Category = (typeof faqData.categories)[number];
type Question = Category["questions"][number];

/* ── accordion item ───────────────────────────────────────────── */
function FAQItem({ item, i, badge }: { item: Question; i: number; badge: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.04, duration: 0.35 }}
      className="border border-gray-200 hover:border-green-500/30 rounded-xl overflow-hidden transition-colors"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-[#e8ebee] hover:bg-[#dde0e4] transition-colors gap-4"
      >
        <span className="text-gray-900 font-semibold text-sm leading-snug">{item.question}</span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
            open
              ? activeBg[badge] ?? activeBg.neutral
              : badgeClasses[badge] ?? badgeClasses.neutral
          }`}
        >
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-3 bg-[#dde0e4] text-gray-600 leading-relaxed text-sm">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── category tab ─────────────────────────────────────────────── */
function CategoryTab({
  cat,
  active,
  onClick,
}: {
  cat: Category;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = iconMap[cat.icon] ?? MessageCircle;
  const badge = cat.badge_style;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 whitespace-nowrap ${
        active
          ? (activeBg[badge] ?? activeBg.neutral) + " shadow-lg"
          : "bg-[#e8ebee] border-gray-200 text-gray-500 hover:border-green-500/30 hover:text-gray-700"
      }`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{cat.label}</span>
      <span
        className={`ml-1 px-1.5 py-0.5 rounded-md text-xs font-semibold border ${
          active
            ? (activeBg[badge] ?? activeBg.neutral)
            : (badgeClasses[badge] ?? badgeClasses.neutral)
        }`}
      >
        {cat.questions.length}
      </span>
    </button>
  );
}

/* ── main component ───────────────────────────────────────────── */
export default function FAQs() {
  const categories = faqData.categories;
  const [activeCat, setActiveCat] = useState(categories[0].id);

  const current = useMemo(
    () => categories.find((c) => c.id === activeCat)!,
    [activeCat, categories]
  );

  return (
    <section id="faqs" className="relative py-24 px-6 bg-[#e4e7eb]">
      <div className="absolute inset-0 grid-overlay opacity-30" />

      <div className="relative max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-green-700 text-sm font-semibold tracking-widest uppercase">
            Got Questions?
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900">
            Frequently Asked <span className="text-green-700">Questions</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base">
            {faqData.meta.total_questions} answers across {faqData.meta.sections} topics — VoIP, cloud, security, and everyday IT.
          </p>
        </motion.div>

        {/* Category tabs — horizontal scroll on mobile */}
        <div className="mb-8 -mx-2 px-2 overflow-x-auto">
          <div className="flex gap-2 pb-2 min-w-max">
            {categories.map((cat) => (
              <CategoryTab
                key={cat.id}
                cat={cat}
                active={activeCat === cat.id}
                onClick={() => setActiveCat(cat.id)}
              />
            ))}
          </div>
        </div>

        {/* Active category header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat + "-header"}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            {(() => {
              const Icon = iconMap[current.icon] ?? MessageCircle;
              const badge = current.badge_style;
              return (
                <>
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${badgeClasses[badge] ?? badgeClasses.neutral}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">{current.label}</p>
                    <p className="text-gray-400 text-xs">{current.subtitle}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-green-900/60 ml-auto" />
                  <span className={`text-xs px-2 py-1 rounded-lg border font-medium ${badgeClasses[current.badge_style] ?? badgeClasses.neutral}`}>
                    {current.questions.length} questions
                  </span>
                </>
              );
            })()}
          </motion.div>
        </AnimatePresence>

        {/* FAQ accordion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col gap-3"
          >
            {current.questions.map((item, i) => (
              <FAQItem
                key={item.id}
                item={item}
                i={i}
                badge={current.badge_style}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
