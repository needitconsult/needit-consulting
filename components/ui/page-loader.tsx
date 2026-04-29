"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), 900);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(240,242,245,0.85)", backdropFilter: "blur(4px)" }}
    >
      <div
        style={{ width: 52, height: 52, borderRadius: "50%", border: "4px solid #bbf7d0", borderTopColor: "#16a34a", animation: "spin 0.8s linear infinite" }}
      />
      <p style={{ marginTop: 16, color: "#16a34a", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
        Loading...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
