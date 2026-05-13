"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dailyBrewPosts from "@/app/data/daily-brew-posts.json";

type BrewPost = { slug: string; title: string; excerpt: string; date: string };
const latestBrew = (dailyBrewPosts as BrewPost[])[0] ?? null;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let W: number, H: number, cx: number, cy: number, t = 0;
    let rafId: number;

    function resize() {
      W = cv!.width  = window.innerWidth;
      H = cv!.height = window.innerHeight;
      cx = W / 2;
      cy = H / 2;
    }
    resize();
    window.addEventListener("resize", resize);

    // colour palette — 4 CAT-6 pair colours
    const COLORS = [
      { solid: "#E86010", light: "#FF9955", dark: "#7A2C08" },
      { solid: "#2A8C18", light: "#60D030", dark: "#124008" },
      { solid: "#1A5FCC", light: "#5090FF", dark: "#0A2460" },
      { solid: "#7A4010", light: "#C07840", dark: "#3A1408" },
    ];
    const WHITE = { solid: "#f0f0f0", light: "#ffffff", dark: "#c8c4be" };

    const PAIR_COUNT = 20;
    const PAIRS: { baseAngle: number; col: { solid: string; light: string; dark: string }; phaseOffset: number }[] = [];
    for (let i = 0; i < PAIR_COUNT; i++) {
      const angle = (i / PAIR_COUNT) * Math.PI * 2;
      const col   = COLORS[i % COLORS.length];
      PAIRS.push({ baseAngle: angle, col, phaseOffset: i * (Math.PI * 2 / PAIR_COUNT) });
    }

    function perspPoint(baseAngle: number, lateralOffset: number, depth: number) {
      const spread = Math.max(W, H) * 0.82;
      const bx = Math.cos(baseAngle), by = Math.sin(baseAngle);
      const px = -by;
      const dist = depth * spread;
      const lat  = lateralOffset * depth * Math.min(W, H) * 0.028;
      return { x: cx + bx * dist + px * lat, y: cy + by * dist + bx * lat };
    }

    function wireRadius(depth: number) {
      return Math.min(W, H) * (0.0025 + depth * depth * 0.022);
    }

    function drawSeg(
      p1: { x: number; y: number }, p2: { x: number; y: number },
      r1: number, r2: number,
      cLight: string, cSolid: string, cDark: string,
      alpha: number,
    ) {
      if (alpha < 0.008) return;
      const dx = p2.x - p1.x, dy = p2.y - p1.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len < 0.3) return;
      const nx = -dy / len, ny = dx / len;

      ctx!.save();
      ctx!.globalAlpha = alpha;

      ctx!.beginPath();
      ctx!.moveTo(p1.x + nx * r1, p1.y + ny * r1);
      ctx!.lineTo(p2.x + nx * r2, p2.y + ny * r2);
      ctx!.lineTo(p2.x - nx * r2, p2.y - ny * r2);
      ctx!.lineTo(p1.x - nx * r1, p1.y - ny * r1);
      ctx!.closePath();

      const midX = (p1.x + p2.x) / 2, midY = (p1.y + p2.y) / 2;
      const maxR = Math.max(r1, r2);
      const g = ctx!.createLinearGradient(
        midX + nx * maxR, midY + ny * maxR,
        midX - nx * maxR, midY - ny * maxR,
      );
      g.addColorStop(0,    cLight);
      g.addColorStop(0.28, cSolid);
      g.addColorStop(0.72, cSolid);
      g.addColorStop(1,    cDark);
      ctx!.fillStyle = g;
      ctx!.fill();

      ctx!.beginPath();
      ctx!.moveTo(p1.x + nx * r1 * 0.62, p1.y + ny * r1 * 0.62);
      ctx!.lineTo(p2.x + nx * r2 * 0.62, p2.y + ny * r2 * 0.62);
      ctx!.lineTo(p2.x + nx * r2 * 0.34, p2.y + ny * r2 * 0.34);
      ctx!.lineTo(p1.x + nx * r1 * 0.34, p1.y + ny * r1 * 0.34);
      ctx!.closePath();
      ctx!.fillStyle = "rgba(255,255,255,0.2)";
      ctx!.fill();
      ctx!.restore();
    }

    const PULSES = Array.from({ length: 80 }, (_, i) => ({
      pairIdx:  i % PAIR_COUNT,
      isWhite:  Math.random() > 0.5,
      progress: Math.random(),
      speed:    0.0025 + Math.random() * 0.005,
      bright:   0.55 + Math.random() * 0.45,
      size:     0.4 + Math.random() * 0.9,
    }));

    function drawPulse(
      p: { x: number; y: number }, depth: number,
      cSolid: string, cLight: string,
      bright: number, size: number,
    ) {
      const br = wireRadius(depth);
      const gr = br * (3.5 + size * 4) * bright;
      const gg = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr);
      gg.addColorStop(0,    "#ffffff");
      gg.addColorStop(0.14, cLight);
      gg.addColorStop(0.42, cSolid + "bb");
      gg.addColorStop(1,    cSolid + "00");
      ctx!.save();
      ctx!.globalAlpha = bright * Math.pow(depth, 0.3) * 0.88;
      ctx!.fillStyle = gg;
      ctx!.beginPath(); ctx!.arc(p.x, p.y, gr, 0, Math.PI * 2); ctx!.fill();
      ctx!.globalAlpha = bright * Math.pow(depth, 0.22) * 0.95;
      ctx!.fillStyle = "#ffffff";
      ctx!.beginPath(); ctx!.arc(p.x, p.y, br * 0.75, 0, Math.PI * 2); ctx!.fill();
      ctx!.restore();
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      const bgG = ctx!.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.75);
      bgG.addColorStop(0,   "#44464c");
      bgG.addColorStop(0.5, "#2e3036");
      bgG.addColorStop(1,   "#1a1c20");
      ctx!.fillStyle = bgG;
      ctx!.fillRect(0, 0, W, H);

      const STEPS  = 40;
      const TWISTS = 4.0;
      const breath = 0.88 + 0.12 * Math.sin(t * 1.3);

      for (let step = 0; step < STEPS - 1; step++) {
        const d1   = step       / (STEPS - 1);
        const d2   = (step + 1) / (STEPS - 1);
        const dMid = (d1 + d2)  / 2;

        PAIRS.forEach((pair) => {
          const tp1 = TWISTS * Math.PI * 2 * d1 + pair.phaseOffset + t * 0.07;
          const tp2 = TWISTS * Math.PI * 2 * d2 + pair.phaseOffset + t * 0.07;

          const r1    = wireRadius(d1);
          const r2    = wireRadius(d2);
          const alpha = Math.pow(dMid, 0.42) * breath * 0.92;

          const ps1 = perspPoint(pair.baseAngle,  Math.cos(tp1), d1);
          const ps2 = perspPoint(pair.baseAngle,  Math.cos(tp2), d2);
          drawSeg(ps1, ps2, r1, r2, pair.col.light, pair.col.solid, pair.col.dark, alpha);

          const pw1 = perspPoint(pair.baseAngle, -Math.cos(tp1), d1);
          const pw2 = perspPoint(pair.baseAngle, -Math.cos(tp2), d2);
          drawSeg(pw1, pw2, r1, r2, WHITE.light, WHITE.solid, WHITE.dark, alpha * 1.05);
        });
      }

      PAIRS.forEach((pair, pi) => {
        const gp = t * 0.9 + pi * 0.32;
        const gi = 0.28 + 0.18 * Math.sin(gp);
        const ep = perspPoint(pair.baseAngle, 0, 1.0);
        const gR = Math.min(W, H) * 0.32;
        const gg = ctx!.createRadialGradient(ep.x, ep.y, 0, ep.x, ep.y, gR);
        gg.addColorStop(0,   pair.col.light + "44");
        gg.addColorStop(0.4, pair.col.solid + "18");
        gg.addColorStop(1,   pair.col.solid + "00");
        ctx!.save();
        ctx!.globalAlpha = gi;
        ctx!.fillStyle = gg;
        ctx!.fillRect(0, 0, W, H);
        ctx!.restore();
      });

      PULSES.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1.06) {
          p.progress = 0;
          p.pairIdx  = Math.floor(Math.random() * PAIR_COUNT);
          p.isWhite  = Math.random() > 0.45;
          p.speed    = 0.0025 + Math.random() * 0.005;
          p.bright   = 0.55 + Math.random() * 0.45;
          p.size     = 0.4 + Math.random() * 0.9;
        }
        const d = p.progress;
        if (d < 0.015 || d > 1.02) return;
        const pair = PAIRS[p.pairIdx];
        const tp   = TWISTS * Math.PI * 2 * d + pair.phaseOffset + t * 0.07;
        const lat  = p.isWhite ? -Math.cos(tp) : Math.cos(tp);
        const pt   = perspPoint(pair.baseAngle, lat, d);
        const col  = p.isWhite ? WHITE : pair.col;
        drawPulse(pt, d, col.solid, col.light, p.bright, p.size);
      });

      const vi = 0.55 + 0.2 * Math.sin(t * 1.6);
      const vg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.18);
      vg.addColorStop(0,    `rgba(210,150,60,${vi})`);
      vg.addColorStop(0.35, `rgba(110,65,20,${vi * 0.4})`);
      vg.addColorStop(1,    "rgba(0,0,0,0)");
      ctx!.fillStyle = vg;
      ctx!.fillRect(0, 0, W, H);

      const tm = ctx!.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.3);
      tm.addColorStop(0,   "rgba(18,20,24,0.94)");
      tm.addColorStop(0.5, "rgba(18,20,24,0.62)");
      tm.addColorStop(1,   "rgba(18,20,24,0)");
      ctx!.fillStyle = tm;
      ctx!.fillRect(0, 0, W, H);

      t += 0.013;
      rafId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ background: "#2a2c30", minHeight: "100vh", overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      />

      {/* Daily Brew banner */}
      {latestBrew && (
        <Link
          href={`/blog/${latestBrew.slug}`}
          style={{
            position: "absolute",
            top: "72px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(74,222,128,0.35)",
            borderRadius: "40px",
            padding: "6px 16px 6px 8px",
            textDecoration: "none",
            backdropFilter: "blur(8px)",
            whiteSpace: "nowrap",
            maxWidth: "calc(100vw - 48px)",
            overflow: "hidden",
          }}
        >
          <span style={{
            flexShrink: 0,
            background: "#16a34a",
            color: "#fff",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            borderRadius: "40px",
            padding: "3px 9px",
            fontFamily: "'Courier New', monospace",
          }}>
            ☕ Daily Brew
          </span>
          <span style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.85)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "340px",
          }}>
            {latestBrew.title}
          </span>
          <span style={{ flexShrink: 0, fontSize: "11px", color: "#4ade80", marginLeft: "2px" }}>→</span>
        </Link>
      )}

      {/* Centred content */}
      <div style={{ position: "relative", zIndex: 20, textAlign: "center", padding: "2rem 1.5rem", maxWidth: "480px" }}>

        <h1 style={{ fontSize: "clamp(36px,7vw,80px)", fontWeight: 700, lineHeight: 1.1, marginBottom: "12px", textShadow: "0 2px 16px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,1)" }}>
          <span style={{ color: "#ffffff", WebkitTextStroke: "1px #16a34a" }}>Need</span><span style={{ color: "#7fffb0", WebkitTextStroke: "1px #16a34a" }}>IT</span>
          <span style={{ display: "block", fontSize: "clamp(14px,2.5vw,28px)", fontWeight: 400, color: "rgba(255,255,255,0.92)", letterSpacing: "0.12em", marginTop: "4px", WebkitTextStroke: "0px" }}>Consulting LLC</span>
        </h1>

        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.92)", lineHeight: 1.7, marginBottom: "26px", textShadow: "0 0 30px rgba(0,0,0,0.98), 0 0 20px rgba(0,0,0,1)" }}>
          VoIP setup · IT support · virtual assistant services<br />
          for small and mid-size businesses
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/voip-kits"
            style={{ fontSize: "13px", padding: "11px 28px", borderRadius: "40px", background: "#1D9E75", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 0 24px rgba(29,158,117,0.7)", textDecoration: "none" }}
          >
            Explore VoIP kits
          </Link>
          <button
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            style={{ fontSize: "13px", padding: "11px 28px", borderRadius: "40px", background: "rgba(0,0,0,0.4)", color: "#9FE1CB", border: "1.5px solid rgba(29,158,117,0.65)", cursor: "pointer" }}
          >
            IT services →
          </button>
        </div>
      </div>

      {/* Bottom label */}
      <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", fontSize: "8px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Courier New', monospace", whiteSpace: "nowrap", zIndex: 20 }}>
        you are inside the infrastructure · CAT-6 · twisted pairs · signal live
      </div>
    </div>
  );
}
