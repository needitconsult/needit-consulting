"use client";

import { Cpu } from "lucide-react";
import Link from "next/link";

export default function Footer({ affiliateDisclaimer }: { affiliateDisclaimer?: boolean } = {}) {
  return (
    <footer className="bg-[#3a3d3a] border-t border-gray-500/40 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-green-100 border border-green-500/40 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-green-700" />
          </div>
          <span className="text-lg font-bold text-green-400" style={{ WebkitTextStroke: "0.5px white" }}>
            Need<span className="text-green-300" style={{ WebkitTextStroke: "0.5px white" }}>IT</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex flex-wrap justify-center gap-6">
          <Link href="/#about" className="text-sm text-green-400 hover:text-green-300 transition-colors" style={{ WebkitTextStroke: "0.5px white" }}>
            About
          </Link>
          <Link href="/#faqs" className="text-sm text-green-400 hover:text-green-300 transition-colors" style={{ WebkitTextStroke: "0.5px white" }}>
            FAQs
          </Link>
          <Link href="/#contact" className="text-sm text-green-400 hover:text-green-300 transition-colors" style={{ WebkitTextStroke: "0.5px white" }}>
            Contact
          </Link>
          <Link href="/disclaimer" className="text-sm text-green-400 hover:text-green-300 transition-colors" style={{ WebkitTextStroke: "0.5px white" }}>
            Disclaimer
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-green-400 text-sm" style={{ WebkitTextStroke: "0.5px white" }}>
          © {new Date().getFullYear()} NeedIT Consulting. All rights reserved.
        </p>
      </div>

      {/* Affiliate disclaimer — VoIP kits page only */}
      {affiliateDisclaimer && (
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-500/30">
          <p className="text-green-400 text-sm text-center leading-relaxed" style={{ WebkitTextStroke: "0.4px white" }}>
            NeedIT Consulting participates in the Amazon Associates Program and other affiliate programs. We may earn a commission if you purchase through our links, at no extra cost to you.
          </p>
        </div>
      )}
    </footer>
  );
}
