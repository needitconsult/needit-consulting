"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import IntechaAvatar from "@/components/ui/intecha-avatar";
import faqData from "@/app/data/needit_faqs.json";
import { hints } from "@/app/data/intecha-hints";
import { posts, type ContentBlock } from "@/app/data/blog-posts";

/* ── types ───────────────────────────────────────────────────── */
type FaqEntry = { question: string; answer: string };
type SearchResult = { text: string; score: number; blogTitle?: string };

/* ── source data ─────────────────────────────────────────────── */
const allFaqs: FaqEntry[] = faqData.categories.flatMap((cat) =>
  cat.questions.map((q) => ({ question: q.question, answer: q.answer }))
);

/* ── helpers ─────────────────────────────────────────────────── */
function tokenize(text: string): string[] {
  return text.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
}

function countMatches(words: string[], haystack: string): number {
  const h = haystack.toLowerCase();
  return words.reduce((acc, w) => acc + (h.includes(w) ? 1 : 0), 0);
}

function blockText(block: ContentBlock): string {
  if (block.type === "list") return block.items.join(". ");
  return block.text;
}

/* ── FAQ search ──────────────────────────────────────────────── */
function findFaqAnswer(words: string[]): SearchResult | null {
  let best: FaqEntry | null = null;
  let bestScore = 0;
  for (const faq of allFaqs) {
    const score = countMatches(words, faq.question + " " + faq.answer);
    if (score > bestScore) { bestScore = score; best = faq; }
  }
  return bestScore >= 1 && best ? { text: best.answer, score: bestScore } : null;
}

/* ── Hints search ────────────────────────────────────────────── */
function findHintAnswer(words: string[]): SearchResult | null {
  let bestHint = "";
  let bestScore = 0;
  for (const hint of hints) {
    // Hints are short, dense facts — weight matches higher
    const score = countMatches(words, hint) * 1.5;
    if (score > bestScore) { bestScore = score; bestHint = hint; }
  }
  return bestScore >= 2 && bestHint ? { text: bestHint, score: bestScore } : null;
}

/* ── Blog search ─────────────────────────────────────────────── */
function findBlogAnswer(words: string[]): SearchResult | null {
  let bestText = "";
  let bestScore = 0;
  let bestTitle = "";

  for (const post of posts) {
    // Title/excerpt relevance sets the post's base score
    const titleScore = countMatches(words, post.title + " " + post.excerpt) * 2;
    if (titleScore === 0) {
      // Quick full-text gate — skip post if nothing matches at all
      const fullText = post.content.map(blockText).join(" ");
      if (countMatches(words, fullText) < 2) continue;
    }

    for (const block of post.content) {
      // Skip plain headings — they don't carry enough standalone context
      if (block.type === "h2" || block.type === "h3") continue;

      const text = blockText(block);
      if (text.length < 30) continue;

      const blockScore = countMatches(words, text);
      // Callouts and tips are pre-digested summaries — give them a boost
      const typeBoost = block.type === "callout" || block.type === "tip" ? 1.5 : 1;
      const combined = titleScore + blockScore * typeBoost;

      if (combined > bestScore) {
        bestScore = combined;
        bestText = text;
        bestTitle = post.title;
      }
    }
  }

  return bestScore >= 2 && bestText
    ? { text: bestText, score: bestScore, blogTitle: bestTitle }
    : null;
}

/* ── Personality wrappers ────────────────────────────────────── */
const openers = [
  "Oh, good question. Here's the deal:",
  "Glad you asked. Listen up:",
  "Okay, let me break it down for you:",
  "I've got you covered on this one:",
  "Great — this is actually one of my favorite topics:",
  "Straight to it — here's what you need to know:",
];

const closers = [
  "Still have questions? Hit up Ashley at needitconsult@gmail.com — she's the real expert.",
  "If that doesn't cover it, NeedIT's free assessment will. No pressure, no pitch.",
  "Want a human to look at your specific setup? That's what the free assessment is for.",
  "Need more detail? I'd recommend booking NeedIT's free IT consultation.",
];

const fallbacks = [
  "Hmm, that one's a little outside my quick-answer range. For anything that specific, reach out to Ashley directly at needitconsult@gmail.com — or grab a free assessment and she'll dig into it properly.",
  "I don't have a clean answer for that off the top of my head. Best move? Book NeedIT's free IT assessment and get a real expert's eyes on it.",
  "That's a great question — and a nuanced one. I'd rather Ashley give you a proper answer than me hand-wave through it. She's at needitconsult@gmail.com.",
  "Not one I can knock out of the park right now. Try the FAQs section on the site, or reach out directly — NeedIT does free assessments with zero strings attached.",
];

/* ── Main reply builder ──────────────────────────────────────── */
function buildReply(input: string): string {
  const words = tokenize(input);
  if (words.length === 0) return fallbacks[0];

  const faqResult   = findFaqAnswer(words);
  const hintResult  = findHintAnswer(words);
  const blogResult  = findBlogAnswer(words);

  // Collect all results and pick the highest-scoring one
  const candidates = [faqResult, hintResult, blogResult].filter(Boolean) as SearchResult[];
  if (candidates.length === 0) {
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
  candidates.sort((a, b) => b.score - a.score);
  const best = candidates[0];

  const opener = openers[Math.floor(Math.random() * openers.length)];
  const closer = closers[Math.floor(Math.random() * closers.length)];

  // For blog answers, add a soft pointer to the full post
  const blogNote =
    best.blogTitle
      ? `\n\nI cover this in more depth in "${best.blogTitle}" — check out Intecha's Tech Take for the full breakdown.`
      : "";

  return `${opener}\n\n${best.text}${blogNote}\n\n${closer}`;
}

/* ── Types ───────────────────────────────────────────────────── */
type Message = { role: "user" | "intecha"; text: string };

/* ── Greeting ────────────────────────────────────────────────── */
const greeting: Message = {
  role: "intecha",
  text: "Hey there. I'm Intecha — NeedIT's virtual consultant. Ask me anything about VoIP, IT support, cloud storage, network setup, security... I've seen it all. What's on your mind?",
};

/* ── Component ───────────────────────────────────────────────── */
export default function IntechaChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const send = () => {
    const text = input.trim();
    if (!text || thinking) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setThinking(true);
    setTimeout(() => {
      const reply = buildReply(text);
      setMessages((m) => [...m, { role: "intecha", text: reply }]);
      setThinking(false);
    }, 900 + Math.random() * 600);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="flex flex-col w-80 max-h-[520px] rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background: "#080f08",
        border: "1px solid #166534",
        boxShadow: "0 0 32px rgba(74,222,128,0.15), 0 0 8px rgba(249,115,22,0.1)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-[#0d170d] flex-shrink-0">
        <div
          className="rounded-full p-[2px] flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #4ade80, #f97316)" }}
        >
          <IntechaAvatar size="sm" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-bold leading-none">Intecha</p>
          <p className="text-orange-400/60 text-[10px] font-mono mt-0.5">AI Consultant · NeedIT</p>
        </div>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"
        />
        <button
          onClick={onClose}
          className="w-6 h-6 rounded flex items-center justify-center text-green-700 hover:text-green-700 hover:bg-green-900/40 transition-colors flex-shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            {msg.role === "intecha" && <IntechaAvatar size="sm" className="flex-shrink-0 mt-0.5" />}
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-green-600/20 border border-green-600/30 text-green-100 rounded-tr-sm"
                  : "bg-[#e8ebee] border border-gray-200 text-gray-700 rounded-tl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex gap-2 items-center">
            <IntechaAvatar size="sm" className="flex-shrink-0" />
            <div className="bg-[#e8ebee] border border-gray-200 rounded-xl rounded-tl-sm px-3 py-2.5 flex items-center gap-1.5">
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}    className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }} className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }}  className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-3 py-3 border-t border-gray-200 bg-[#0d170d] flex gap-2 items-center">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask me anything..."
          className="flex-1 bg-[#e8ebee] border border-gray-200 focus:border-green-500/60 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-400 outline-none transition-colors font-mono"
        />
        <button
          onClick={send}
          disabled={!input.trim() || thinking}
          className="w-8 h-8 rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-40 flex items-center justify-center transition-colors flex-shrink-0"
        >
          {thinking ? <Loader2 className="w-3.5 h-3.5 text-white animate-spin" /> : <Send className="w-3.5 h-3.5 text-white" />}
        </button>
      </div>
    </motion.div>
  );
}
