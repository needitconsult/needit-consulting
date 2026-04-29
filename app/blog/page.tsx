import Link from "next/link";
import { posts } from "@/app/data/blog-posts";
import IntechaAvatar from "@/components/ui/intecha-avatar";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { OrangeGlowBackground } from "@/components/ui/background-components";

export const metadata = { title: "Intecha's Tech Take — NeedIT Consulting" };

const categoryColor: Record<string, string> = {
  "VoIP":                "bg-green-50 border-green-500/30 text-green-700",
  "VoIP Troubleshooting":"bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  "IT Security":         "bg-red-500/10 border-red-500/30 text-red-400",
  "IT Management":       "bg-blue-500/10 border-blue-500/30 text-blue-400",
  "Daily Brew":          "bg-orange-50 border-orange-400/40 text-orange-700",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main className="min-h-screen bg-[#f0f2f5] relative overflow-hidden">
      <OrangeGlowBackground />

      {/* Header */}
      <div className="relative pt-32 pb-16 px-6 border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

        {/* Intecha intro */}
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
              // Written by
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

      <div className="relative max-w-6xl mx-auto px-6 py-16">

        {/* Featured post */}
        <div className="mb-12">
          <p className="text-green-700 text-xs font-mono tracking-widest uppercase mb-4">// Latest</p>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-orange-500/40 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-2.5 py-1 rounded-lg border text-xs font-medium ${categoryColor[featured.category] ?? "bg-green-50 border-green-500/30 text-green-700"}`}>
                  <Tag className="w-3 h-3 inline mr-1" />{featured.category}
                </span>
                <span className="text-green-900 text-xs font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />{featured.readTime}
                </span>
                <span className="text-green-900 text-xs font-mono">{featured.date}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug" style={{ WebkitTextStroke: "1px #15803d" }}>
                {featured.title}
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed max-w-2xl">{featured.excerpt}</p>

              <div className="mt-6 flex items-center gap-3">
                <IntechaAvatar size="sm" />
                <div>
                  <p className="text-gray-900 text-sm font-semibold">Intecha</p>
                  <p className="text-green-700/60 text-xs">AI Consultant, NeedIT</p>
                </div>
                <span className="ml-auto flex items-center gap-1 text-green-700 text-sm font-medium group-hover:gap-2 transition-all">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Rest of posts */}
        <p className="text-green-700 text-xs font-mono tracking-widest uppercase mb-4">// More articles</p>
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="h-full p-6 rounded-2xl bg-white border border-gray-200 hover:border-green-500/40 transition-all duration-300 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-lg border text-xs font-medium ${categoryColor[post.category] ?? "bg-green-50 border-green-500/30 text-green-700"}`}>
                    {post.category}
                  </span>
                  <span className="text-green-900 text-xs font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />{post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 leading-snug flex-1" style={{ WebkitTextStroke: "1px #15803d" }}>
                  {post.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-green-900 text-xs font-mono">{post.date}</span>
                  <span className="flex items-center gap-1 text-green-700 text-xs font-medium group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
