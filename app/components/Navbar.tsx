"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { label: "Reach Out",    id: "contact",      href: undefined },
  { label: "Services",     id: "services",     href: undefined },
  { label: "About",        id: "about",        href: undefined },
  { label: "FAQs",         id: "faqs",         href: undefined },
  { label: "VoIP Kits",    id: "voip-kits",    href: "/voip-kits" },
  { label: "Intecha's Tech Take", id: "blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-green-100 border border-green-500/40 flex items-center justify-center group-hover:bg-green-100 transition-colors">
            <Cpu className="w-4 h-4 text-green-700" />
          </div>
          <span className={`text-[1.375rem] font-bold transition-colors group-hover:text-green-300 ${scrolled ? "text-gray-700" : "text-white"}`}>
            Need<span className="text-green-400">IT</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) =>
            link.href ? (
              <Link
                key={link.id}
                href={link.href}
                className={`nav-link text-sm transition-all tracking-wide uppercase font-bold rounded px-2 py-0.5 ${
                  scrolled
                    ? `border border-green-800 ${pathname === link.href ? "text-gray-700 bg-green-800" : "text-gray-900 hover:text-white hover:bg-green-800"}`
                    : "border border-white/40 text-white hover:bg-white/15"
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`nav-link text-sm transition-all tracking-wide uppercase font-bold rounded px-2 py-0.5 ${
                  scrolled
                    ? "border border-green-800 text-gray-900 hover:text-white hover:bg-green-800"
                    : "border border-white/40 text-white hover:bg-white/15"
                }`}
              >
                {link.label}
              </button>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden transition-colors ${scrolled ? "text-green-700 hover:text-gray-700" : "text-white hover:text-green-300"}`}
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
            className="md:hidden bg-white/98 border-b border-gray-200 px-6 pb-6 flex flex-col gap-4"
          >
            {links.map((link) =>
              link.href ? (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-left text-gray-900 hover:text-gray-700 py-2 border-b border-gray-200 text-sm uppercase tracking-wide font-bold transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-gray-900 hover:text-gray-700 py-2 border-b border-gray-200 text-sm uppercase tracking-wide font-bold transition-colors"
                >
                  {link.label}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
