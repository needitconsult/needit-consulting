"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu } from "lucide-react";

const links = ["Services", "About", "Testimonials", "FAQs", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0f0a]/95 backdrop-blur-md border-b border-green-900/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
            <Cpu className="w-4 h-4 text-green-400" />
          </div>
          <span className="text-lg font-bold text-green-300 group-hover:text-green-200 transition-colors">
            Need<span className="text-white">IT</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-sm text-green-300/80 hover:text-green-300 transition-colors tracking-wide uppercase font-medium"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-all glow-green-sm hover:glow-green"
          >
            Get Started
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-green-400 hover:text-green-300"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0f0a]/98 border-b border-green-900/40 px-6 pb-6 flex flex-col gap-4"
          >
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-left text-green-300/80 hover:text-green-300 py-2 border-b border-green-900/30 text-sm uppercase tracking-wide font-medium transition-colors"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="mt-2 px-5 py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-all"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
