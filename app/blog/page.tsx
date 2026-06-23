import IntechaAvatar from "@/components/ui/intecha-avatar";
import { OrangeGlowBackground } from "@/components/ui/background-components";
import BlogList from "./BlogList";

export const metadata = { title: "Intecha's Tech Take — NeedIT Consulting" };

export default function BlogPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <OrangeGlowBackground />

      {/* Header */}
      <div className="relative pt-32 pb-16 px-6 border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-end gap-6">
          <div className="relative flex-shrink-0">
            <div
              className="rounded-full p-[3px]"
              style={{
                background: "linear-gradient(135deg, #4ade80, #f97316, #4ade80)",
                boxShadow: "0 0 28px rgba(249,115,22,0.4)",
              }}
            >
              <IntechaAvatar size="lg" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-[#2a2c30]" />
          </div>

          <div>
            <p className="text-green-700 text-xs font-mono tracking-widest uppercase mb-1">
              {"// Written by"}
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Intecha&apos;s <span className="text-green-700">Tech Take</span>
            </h1>
            <p className="mt-3 text-gray-600 max-w-xl text-base leading-relaxed">
              Real talk on VoIP, IT, and the tech decisions that can make or break a small business.
              No fluff, no jargon — just what you actually need to know.
            </p>
            <p className="mt-2 text-orange-400/70 text-sm font-mono italic">
              &ldquo;I&apos;ve seen it all. Let me save you the trouble.&rdquo; — Intecha
            </p>
          </div>
        </div>
      </div>

      <BlogList />
    </main>
  );
}
