"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import IntechaAvatar from "@/components/ui/intecha-avatar";

const NODE_ORDER = ["budget", "solo", "small", "remote", "reception", "conf"];
const DWELL_MS   = 1400; // ms to linger on each tile before advancing

type Pt = { x1: number; y1: number; x2: number; y2: number };

function ArrowSVG({ x1, y1, x2, y2, label }: Pt & { label?: string }) {
  const cpX = (x1 + x2) / 2;
  const cpY = y1 - Math.abs(y1 - y2) * 0.45;
  const lx  = x2;
  const ly  = y2 - 18;

  return (
    <svg
      aria-hidden="true"
      style={{
        position: "fixed", inset: 0,
        width: "100vw", height: "100vh",
        pointerEvents: "none", zIndex: 48,
        overflow: "visible",
      }}
    >
      <defs>
        <marker id="kit-arrowhead" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
          <polygon points="0 0, 9 3.5, 0 7" fill="#16a34a" opacity="0.85" />
        </marker>
        <style>{`
          @keyframes kit-flow { to { stroke-dashoffset: -18; } }
          .kit-arrow-path { animation: kit-flow 0.45s linear infinite; }
        `}</style>
      </defs>

      <path
        className="kit-arrow-path"
        d={`M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`}
        stroke="#16a34a"
        strokeWidth="2.5"
        strokeDasharray="7 4"
        strokeDashoffset="0"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
        markerEnd="url(#kit-arrowhead)"
      />

      {label && (
        <>
          <rect x={lx - 22} y={ly - 10} width={44} height={18} rx={9} fill="#16a34a" opacity={0.92} />
          <text x={lx} y={ly + 3} textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace">
            {label}
          </text>
        </>
      )}
    </svg>
  );
}

export default function VoIPGuide() {
  const [mounted,   setMounted]   = useState(false);
  const [visible,   setVisible]   = useState(false);
  const [tileIdx,   setTileIdx]   = useState(0);      // which tile the arrow is on
  const [cycleDone, setCycleDone] = useState(false);  // true after all 6 tiles shown
  const [minimized, setMinimized] = useState(false);
  const [done,      setDone]      = useState(false);
  const [tileArrow, setTileArrow] = useState<Pt | null>(null);

  const bubbleRef = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Appear after a short delay so the page can settle
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  // Auto-advance the arrow through every tile, then minimize
  useEffect(() => {
    if (!visible || cycleDone) return;
    if (tileIdx >= NODE_ORDER.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCycleDone(true);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMinimized(true);
      return;
    }
    const t = setTimeout(() => setTileIdx((i) => i + 1), DWELL_MS);
    return () => clearTimeout(t);
  }, [visible, tileIdx, cycleDone]);

  // The tile the arrow is currently pointing at (null once cycle ends)
  const currentKey = !cycleDone && tileIdx < NODE_ORDER.length
    ? NODE_ORDER[tileIdx]
    : null;

  const wantArrow = mounted && visible && !cycleDone && !minimized && !done && !!currentKey;

  // rAF loop — restarts whenever currentKey changes (guaranteed since it's in closure)
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!wantArrow || !currentKey) { setTileArrow(null); return; }

    const key = currentKey;
    const loop = () => {
      const bubble = bubbleRef.current;
      const el     = document.querySelector<HTMLElement>(`[data-kit-node="${key}"]`);
      if (!bubble || !el) {
        setTileArrow(null);
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      const br = bubble.getBoundingClientRect();
      const r  = el.getBoundingClientRect();
      setTileArrow({
        x1: br.left + br.width  / 2,
        y1: br.top,
        x2: r.left  + r.width   / 2,
        y2: r.top   + r.height  / 2,
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [wantArrow, currentKey]);

  // Counter badge: "1 of 5" … "5 of 5"
  const counterLabel = tileIdx > 0 && tileIdx < NODE_ORDER.length
    ? `${tileIdx} of ${NODE_ORDER.length - 1}`
    : undefined;

  // Bubble slides to right corner once done, stays center while cycling
  const leftPos = cycleDone || minimized
    ? "calc(100vw - 88px)"
    : "calc(50vw - 128px)";

  if (!visible || done) return null;

  return (
    <>
      {tileArrow && createPortal(
        <ArrowSVG {...tileArrow} />,
        document.body,
      )}

      <motion.div
        className="fixed bottom-6 z-50 flex flex-col items-center gap-3 pointer-events-none"
        animate={{ left: leftPos }}
        transition={{ type: "spring", stiffness: 160, damping: 26, mass: 1 }}
        style={{ left: "calc(50vw - 128px)" }}
      >
        <AnimatePresence>
          {!minimized && (
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
                Hey! I&apos;m Intecha 👋 — see those kit tiles above? Each one is a different VoIP setup. Click any tile to see exactly what&apos;s inside!
              </p>

              {/* Progress bar while cycling */}
              {!cycleDone && tileIdx > 0 && (
                <div className="mt-3">
                  <span className="text-green-800 text-[10px] font-mono">
                    {tileIdx} of {NODE_ORDER.length} shown
                  </span>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden mt-1">
                    <motion.div
                      className="h-full rounded-full bg-green-500"
                      animate={{ width: `${(tileIdx / NODE_ORDER.length) * 100}%` }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Avatar button — always visible; click to dismiss after cycle */}
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
    </>
  );
}
