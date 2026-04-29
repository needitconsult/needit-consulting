import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, posts, type ContentBlock } from "@/app/data/blog-posts";
import IntechaAvatar from "@/components/ui/intecha-avatar";
import { ArrowLeft, Clock, Tag, Lightbulb } from "lucide-react";
import { OrangeGlowBackground } from "@/components/ui/background-components";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — Intecha's Tech Take` };
}

const categoryColor: Record<string, string> = {
  "VoIP":                "bg-green-50 border-green-500/30 text-green-700",
  "VoIP Troubleshooting":"bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  "IT Security":         "bg-red-500/10 border-red-500/30 text-red-400",
  "IT Management":       "bg-blue-500/10 border-blue-500/30 text-blue-400",
  "Daily Brew":          "bg-orange-50 border-orange-400/40 text-orange-700",
};

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 mb-4 text-2xl font-extrabold text-gray-900" style={{ WebkitTextStroke: "1px #15803d" }}>{block.text}</h2>;
    case "h3":
      return <h3 className="mt-8 mb-3 text-xl font-bold text-gray-900" style={{ WebkitTextStroke: "1px #15803d" }}>{block.text}</h3>;
    case "p":
      return <p className="mb-5 text-gray-900 leading-relaxed text-[15px]">{block.text}</p>;
    case "list":
      return (
        <ul className="mb-5 flex flex-col gap-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-900 text-[15px] leading-relaxed">
              <span className="text-green-700 mt-0.5 flex-shrink-0">▸</span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="my-6 px-5 py-4 rounded-xl border-l-4 border-green-500 bg-green-50 text-gray-900 text-[15px] leading-relaxed font-medium">
          {block.text}
        </div>
      );
    case "tip":
      return (
        <div className="my-6 rounded-xl border border-orange-500/30 bg-orange-50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-orange-500/20 bg-orange-100">
            <IntechaAvatar size="sm" />
            <span className="text-orange-700 text-xs font-bold font-mono tracking-wide uppercase">
              {block.label}
            </span>
            <Lightbulb className="w-3.5 h-3.5 text-orange-600 ml-auto" />
          </div>
          <p className="px-4 py-3 text-gray-900 text-[15px] leading-relaxed italic">
            {block.text}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);

  return (
    <main className="min-h-screen bg-[#f0f2f5] relative overflow-hidden">
      <OrangeGlowBackground />
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      {/* Back nav */}
      <div className="relative pt-24 pb-4 px-6 max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-green-700/70 hover:text-green-700 text-sm font-mono transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>

      {/* Article header */}
      <header className="relative px-6 pb-10 max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className={`px-2.5 py-1 rounded-lg border text-xs font-medium ${categoryColor[post.category] ?? "bg-green-50 border-green-500/30 text-green-700"}`}>
            <Tag className="w-3 h-3 inline mr-1" />{post.category}
          </span>
          <span className="text-green-900 text-xs font-mono flex items-center gap-1">
            <Clock className="w-3 h-3" />{post.readTime}
          </span>
          <span className="text-green-900 text-xs font-mono">{post.date}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">{post.title}</h1>
        <p className="mt-4 text-gray-600 text-lg leading-relaxed">{post.excerpt}</p>

        {/* Byline */}
        <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-white border border-orange-900/30">
          <div
            className="rounded-full p-[2px] flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #4ade80, #f97316)" }}
          >
            <IntechaAvatar size="md" />
          </div>
          <div>
            <p className="text-gray-900 font-bold">Intecha</p>
            <p className="text-orange-400/70 text-xs font-mono">AI Consultant · NeedIT Consulting</p>
            <p className="text-gray-400 text-xs mt-0.5 italic">
              &ldquo;Confident. Sassy. Occasionally wearing glasses.&rdquo;
            </p>
          </div>
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-green-900/60 to-transparent" />
      </div>

      {/* Article body */}
      <article className="relative max-w-3xl mx-auto px-6 py-10">
        {post.content.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </article>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-6 pb-10">
        <div className="p-6 rounded-2xl border border-green-500/30 bg-green-50 text-center">
          <p className="text-gray-900 font-bold text-lg">Ready to talk to a real human?</p>
          <p className="text-gray-600 text-sm mt-1 mb-4">
            NeedIT offers a free IT assessment — no obligation, no fluff.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-gray-900 font-bold text-sm transition-all hover:scale-[1.02]"
          >
            Claim Your Free Assessment
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="max-w-3xl mx-auto px-6 pb-20">
          <p className="text-green-700 text-xs font-mono tracking-widest uppercase mb-4">// Related</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                <div className="p-5 rounded-xl bg-white border border-gray-200 hover:border-green-500/40 transition-all">
                  <p className="text-gray-900 font-semibold text-sm group-hover:text-green-700 transition-colors leading-snug">
                    {p.title}
                  </p>
                  <p className="text-green-900 text-xs font-mono mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />{p.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
