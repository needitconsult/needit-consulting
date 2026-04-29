"use client";

import { cn } from "@/lib/utils";

// Yellow soft glow — works on light backgrounds
export const YellowGlowBackground = ({ className }: { className?: string }) => (
  <div className={cn("min-h-screen w-full relative bg-white", className)}>
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `radial-gradient(circle at center, #FFF991 0%, transparent 70%)`,
        opacity: 0.6,
        mixBlendMode: "multiply",
      }}
    />
  </div>
);

// Orange soft glow — adapted for dark backgrounds with "screen" blend mode
export const OrangeGlowBackground = ({ className }: { className?: string }) => (
  <div
    className={cn("absolute inset-0 z-0 pointer-events-none", className)}
    style={{
      backgroundImage: `radial-gradient(circle at 50% 0%, #FF7112, transparent 65%)`,
      opacity: 0.18,
      mixBlendMode: "screen",
    }}
  />
);

export default OrangeGlowBackground;
