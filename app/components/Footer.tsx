"use client";

import { Cpu } from "lucide-react";

const links = ["Services", "About", "Testimonials", "FAQs", "Contact"];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#070c07] border-t border-green-900/30 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-green-400" />
          </div>
          <span className="text-lg font-bold text-green-300">
            Need<span className="text-white">IT</span>
          </span>
        </button>

        {/* Nav */}
        <nav className="flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-sm text-green-400/60 hover:text-green-400 transition-colors"
            >
              {link}
            </button>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-green-900 text-sm">
          © {new Date().getFullYear()} NeedIT Consulting. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
