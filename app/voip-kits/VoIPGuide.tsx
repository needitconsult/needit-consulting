"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import IntechaAvatar from "@/components/ui/intecha-avatar";

export default function VoIPGuide() {
  const [visible, setVisible] = useState(false);
  const [done,    setDone]    = useState(false);

  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  if (!visible || done) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      <AnimatePresence>
        <motion.div
          key="bubble"
          ref={bubbleRef}
          initial={{ opacity: 0, y: 12, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.93 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="pointer-events-auto bg-white rounded-2xl shadow-xl border border-green-400/40 p-4 w-64 relative"
          style={{ boxShadow: "0 4px 24px rgba(74,222,128,0.18), 0 2px 8px rgba(0,0,0,0.12)" }}
        >
          <button
            onClick={() => setDone(true)}
            className="absolute top-2.5 right-2.5 w-5 h-5 rounded flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Dismiss guide"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <p className="text-gray-800 text-sm leading-relaxed pr-4">
            Hey! I&apos;m Intecha 👋 — see those kit tiles? Each one is a different VoIP setup. Click any tile to see exactly what&apos;s inside!
          </p>
        </motion.div>
      </AnimatePresence>

      <motion.button
        onClick={() => setDone(true)}
        className="pointer-events-auto relative w-14 h-14 rounded-full flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #4ade80 0%, #f97316 100%)",
          padding: "2px",
          boxShadow: "0 0 18px rgba(74,222,128,0.45), 0 2px 8px rgba(0,0,0,0.2)",
        }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Dismiss guide"
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-[#f97316]">
          <IntechaAvatar size="md" />
        </div>
      </motion.button>
    </motion.div>
  );
}
