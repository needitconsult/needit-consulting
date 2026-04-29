"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lightbulb, MessageCircle } from "lucide-react";
import IntechaChat from "@/components/ui/intecha-chat";
import { hints } from "@/app/data/intecha-hints";

// 4 corners: [vertical, horizontal] positioning + tail config
const corners = [
  {
    pos: "bottom-6 left-6",
    initial: { opacity: 0, y: 20, scale: 0.92 },
    exit:    { opacity: 0, y: 12, scale: 0.95 },
    tail: "bottom",
    tailSide: "left-6",
  },
  {
    pos: "bottom-6 right-6",
    initial: { opacity: 0, y: 20, scale: 0.92 },
    exit:    { opacity: 0, y: 12, scale: 0.95 },
    tail: "bottom",
    tailSide: "right-6",
  },
  {
    pos: "top-24 left-6",
    initial: { opacity: 0, y: -20, scale: 0.92 },
    exit:    { opacity: 0, y: -12, scale: 0.95 },
    tail: "top",
    tailSide: "left-6",
  },
  {
    pos: "top-24 right-6",
    initial: { opacity: 0, y: -20, scale: 0.92 },
    exit:    { opacity: 0, y: -12, scale: 0.95 },
    tail: "top",
    tailSide: "right-6",
  },
] as const;

export default function HintBubble() {
  const [visible, setVisible]       = useState(false);
  const [index, setIndex]           = useState(0);
  const [cornerIdx, setCornerIdx]   = useState(0);
  const [dismissed, setDismissed]   = useState(false);
  const [progress, setProgress]     = useState(0);
  const [skipCount, setSkipCount]   = useState(0);
  const [chatOpen, setChatOpen]     = useState(false);

  const DISPLAY_MS  = 8000;
  const PAUSE_MS    = 3000;
  const MAX_SKIPS   = 2;

  const nextHint = useCallback((currentCorner: number) => {
    setVisible(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % hints.length);
      // pick a different corner than the current one
      setCornerIdx((prev) => {
        let next = prev;
        while (next === currentCorner) next = Math.floor(Math.random() * corners.length);
        return next;
      });
      setProgress(0);
      setDismissed(false);
      setVisible(true);
    }, PAUSE_MS);
  }, []);

  // Initial delay
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(t);
  }, []);

  // Progress + auto-advance
  useEffect(() => {
    if (!visible || dismissed) return;
    const captured = cornerIdx;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + (100 / (DISPLAY_MS / 100));
        if (next >= 100) {
          clearInterval(interval);
          nextHint(captured);
          return 100;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [visible, dismissed, nextHint, cornerIdx]);

  const handleDismiss = () => {
    const newSkipCount = skipCount + 1;
    setSkipCount(newSkipCount);
    setDismissed(true);
    setVisible(false);
    if (newSkipCount >= MAX_SKIPS) return; // stop permanently
    const captured = cornerIdx;
    setTimeout(() => {
      setIndex((i) => (i + 1) % hints.length);
      setCornerIdx((prev) => {
        let next = prev;
        while (next === captured) next = Math.floor(Math.random() * corners.length);
        return next;
      });
      setProgress(0);
      setDismissed(false);
      setVisible(true);
    }, PAUSE_MS);
  };

  const corner = corners[cornerIdx];
  const isTop  = corner.tail === "top";
  const secondsLeft = Math.ceil(((100 - progress) / 100) * (DISPLAY_MS / 1000));

  return (
    <>
    <AnimatePresence>
      {visible && (
        <motion.div
          key={`${index}-${cornerIdx}`}
          initial={corner.initial}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={corner.exit}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className={`fixed z-50 max-w-xs w-full pointer-events-auto select-none ${corner.pos}`}
        >
          {/* Top tail */}
          {isTop && (
            <>
              <div
                className={`absolute -top-[9px] ${corner.tailSide} w-4 h-4 rotate-45`}
                style={{
                  background: "#4ade80",
                  clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                }}
              />
              <div
                className={`absolute -top-[7px] ${corner.tailSide === "left-6" ? "left-[26px]" : "right-[26px]"} w-3 h-3 rotate-45 bg-[#c8dbd3]`}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
              />
            </>
          )}

          {/* Card */}
          <div
            className="relative rounded-2xl p-[2px]"
            style={{
              background: "linear-gradient(135deg, #4ade80 0%, #166534 50%, #4ade80 100%)",
              boxShadow: "0 0 18px rgba(74,222,128,0.35), 0 0 6px rgba(74,222,128,0.2)",
            }}
          >
            <div className="bg-[#d8eae2] rounded-[14px] overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-green-300/50 bg-[#c8dbd3]">
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.1 }}
                    className="w-2 h-2 rounded-full bg-green-400"
                  />
                  <Lightbulb className="w-3.5 h-3.5 text-green-400" />
                  <span className="font-mono text-green-400 text-[10px] tracking-widest uppercase font-bold">
                    {"// HINT"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-gray-400 text-[9px]">
                    {String(index + 1).padStart(2, "0")}/{String(hints.length).padStart(2, "0")}
                  </span>
                  <button
                    onClick={handleDismiss}
                    className="w-5 h-5 rounded flex items-center justify-center text-green-700 hover:text-green-600 hover:bg-green-200/60 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="px-4 py-3">
                <p className="font-mono text-gray-600 text-xs leading-relaxed">
                  <span className="text-green-600 font-bold">▶ </span>
                  {hints[index]}
                </p>
              </div>

              {/* Footer */}
              <div className="px-4 pb-3 flex items-center justify-between gap-2">
                <span className="font-mono text-gray-400 text-[9px] tracking-wider uppercase">
                  [ NEXT IN {secondsLeft}s ]
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setChatOpen(true); setVisible(false); }}
                    className="flex items-center gap-1 font-mono text-[9px] text-orange-600/80 hover:text-orange-500 tracking-widest uppercase transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-2.5 h-2.5" />
                    [ ASK INTECHA ]
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="font-mono text-[9px] text-green-600 hover:text-green-500 tracking-widest uppercase transition-colors"
                  >
                    [ SKIP ]
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-[2px] bg-green-200/60 w-full">
                <div
                  className="h-full bg-green-400 transition-none"
                  style={{ width: `${progress}%` }}
                />
              </div>

            </div>
          </div>

          {/* Bottom tail */}
          {!isTop && (
            <>
              <div
                className={`absolute -bottom-[9px] ${corner.tailSide} w-4 h-4 rotate-45`}
                style={{
                  background: "#4ade80",
                  clipPath: "polygon(0 0, 100% 100%, 0 100%)",
                }}
              />
              <div
                className={`absolute -bottom-[7px] ${corner.tailSide === "left-6" ? "left-[26px]" : "right-[26px]"} w-3 h-3 rotate-45 bg-[#d8eae2]`}
                style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>

      {/* Intecha chat panel */}
      <AnimatePresence>
        {chatOpen && (
          <div className="fixed bottom-6 left-6 z-50">
            <IntechaChat onClose={() => {
              setChatOpen(false);
              // resume hints after chat closes
              setTimeout(() => {
                setProgress(0);
                setDismissed(false);
                setVisible(true);
              }, PAUSE_MS);
            }} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
