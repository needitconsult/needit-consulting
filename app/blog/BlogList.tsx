"use client";

import { useState } from "react";
import Link from "next/link";
import { posts } from "@/app/data/blog-posts";
import IntechaAvatar from "@/components/ui/intecha-avatar";
import { ArrowRight, Clock, Tag, Search, X } from "lucide-react";

const categoryColor: Record<string, string> = {
  "VoIP":                "bg-green-50 border-green-500/30 text-green-700",
  "VoIP Troubleshooting":"bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  "IT Security":         "bg-red-500/10 border-red-500/30 text-red-400",
  "IT Management":       "bg-blue-500/10 border-blue-500/30 text-blue-400",
  "Daily Brew":          "bg-orange-50 border-orange-400/40 text-orange-700",
};

function matches(query: string, post: (typeof posts)[0]): boolean {
  const q = query.toLowerCase();
  return (
    post.title.toLowerCase().includes(q) ||
    post.excerpt.toLowerCase().includes(q) ||
    post.category.toLowerCase().includes(q)
  );
}

export default function BlogList() {
  const [query, setQuery] = useState("");
  const trimmed = query.trim();
  const filtered = trimmed ? posts.filter((p) => matches(trimmed, p)) : posts;
  const [featured, ...rest] = filtered;
  const isSearching = trimmed.length > 0;

  return (
    <div className="relative max-w-6xl mx-auto px-6 py-16">

      {/* Search bar */}
      <div className="mb-10">
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles by topic, keyword, or category..."
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 outline-none focus:border-green-500 transition-colors"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3 h-3 text-gray-600" />
            </button>
          )}
        </div>
        {isSearching && (
          <p className="mt-2 text-sm text-gray-500">
            {filtered.length === 0
              ? "No articles found — try a different keyword."
              : `${filtered.length} article${filtered.length !== 1 ? "s" : ""} found for "${trimmed}"`}
          </p>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No results for &ldquo;{trimmed}&rdquo;</p>
          <p className="text-sm mt-1">Try searching for VoIP, SIP, network, firewall, or a specific topic.</p>
        </div>
      )}

      {filtered.length > 0 && (
        <>
          {/* Featured / top result */}
          <div className="mb-12">
            <p className="text-green-700 text-xs font-mono tracking-widest uppercase mb-4">
              {isSearching ? "// Top result" : "// Latest"}
            </p>
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

          {/* Remaining posts */}
          {rest.length > 0 && (
            <>
              <p className="text-green-700 text-xs font-mono tracking-widest uppercase mb-4">
                {isSearching ? "// More results" : "// More articles"}
              </p>
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
            </>
          )}
        </>
      )}
    </div>
  );
}
