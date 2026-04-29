import { cn } from "@/lib/utils";

export default function IntechaAvatar({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const dims = { sm: 32, md: 48, lg: 80 }[size];
  const r = dims / 2;

  return (
    <svg
      width={dims}
      height={dims}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("flex-shrink-0", className)}
      style={{ borderRadius: "50%" }}
    >
      {/* Base face — orange */}
      <circle cx="40" cy="40" r="40" fill="#f97316" />

      {/* Tiger stripes — dark */}
      <path d="M28 6 C26 14 24 22 26 30 C24 22 20 16 16 12 Z" fill="#1a0a00" opacity="0.7" />
      <path d="M52 6 C54 14 56 22 54 30 C56 22 60 16 64 12 Z" fill="#1a0a00" opacity="0.7" />
      <path d="M8 30 C16 32 22 36 24 44 C20 36 12 34 6 36 Z" fill="#1a0a00" opacity="0.6" />
      <path d="M72 30 C64 32 58 36 56 44 C60 36 68 34 74 36 Z" fill="#1a0a00" opacity="0.6" />
      <path d="M20 56 C24 52 30 50 32 56 C28 52 22 54 20 62 Z" fill="#1a0a00" opacity="0.5" />
      <path d="M60 56 C56 52 50 50 48 56 C52 52 58 54 60 62 Z" fill="#1a0a00" opacity="0.5" />

      {/* Muzzle area — lighter */}
      <ellipse cx="40" cy="52" rx="14" ry="10" fill="#fed7aa" />

      {/* Eyes — vivid green */}
      <ellipse cx="30" cy="34" rx="7" ry="8" fill="#14532d" />
      <ellipse cx="50" cy="34" rx="7" ry="8" fill="#14532d" />
      <ellipse cx="30" cy="34" rx="5" ry="6" fill="#22c55e" />
      <ellipse cx="50" cy="34" rx="5" ry="6" fill="#22c55e" />
      {/* Pupils */}
      <ellipse cx="30" cy="35" rx="2.5" ry="4" fill="#0a0a0a" />
      <ellipse cx="50" cy="35" rx="2.5" ry="4" fill="#0a0a0a" />
      {/* Eye shine */}
      <circle cx="31.5" cy="32.5" r="1.2" fill="white" opacity="0.8" />
      <circle cx="51.5" cy="32.5" r="1.2" fill="white" opacity="0.8" />

      {/* Nose */}
      <ellipse cx="40" cy="47" rx="3" ry="2" fill="#9a3412" />

      {/* Subtle smile */}
      <path d="M34 52 Q40 57 46 52" stroke="#9a3412" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Ears */}
      <polygon points="14,12 22,4 26,22" fill="#f97316" />
      <polygon points="66,12 58,4 54,22" fill="#f97316" />
      <polygon points="16,12 22,7 24,20" fill="#fbbf24" opacity="0.6" />
      <polygon points="64,12 58,7 56,20" fill="#fbbf24" opacity="0.6" />

      {/* Glasses (optional layer — shown on larger sizes) */}
      <rect x="20" y="28" width="17" height="14" rx="4" stroke="#1a1a1a" strokeWidth="2" fill="none" opacity="0.5" />
      <rect x="43" y="28" width="17" height="14" rx="4" stroke="#1a1a1a" strokeWidth="2" fill="none" opacity="0.5" />
      <line x1="37" y1="35" x2="43" y2="35" stroke="#1a1a1a" strokeWidth="2" opacity="0.5" />
      <line x1="20" y1="32" x2="16" y2="31" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.5" />
      <line x1="60" y1="32" x2="64" y2="31" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.5" />

      {/* Collar hint at bottom */}
      <path d="M12 72 Q40 80 68 72 L68 80 L12 80 Z" fill="#166534" />
      <path d="M32 72 L40 78 L48 72" stroke="#4ade80" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
