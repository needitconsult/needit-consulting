"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  ShoppingCart,
  ChevronRight,
  ExternalLink,
  Phone,
} from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import kitsData from "@/app/data/needit_voip_kits.json";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import VoIPKitCircuit from "@/app/components/VoIPKitCircuit";
import VoIPGuide from "@/app/voip-kits/VoIPGuide";


type Product = {
  id: string;
  name: string;
  role: string;
  why_recommended: string;
  key_specs: string[];
  approx_price: string;
  amazon_search_url: string;
  amazon_asin: string;
  product_image_url?: string;
  voipsupply_url?: string;
  affiliate_note?: string;
};

type Kit = {
  id: string;
  recommended_for_all?: boolean;
  name: string;
  tagline: string;
  description: string;
  use_cases: string[];
  difficulty: string;
  estimated_hardware_cost: string;
  recommended_platform: {
    name: string;
    why: string;
    starting_price: string;
  };
  products: Product[];
  budget_tip?: string;
  needit_service_cta: {
    headline: string;
    body: string;
    link_text: string;
  };
};

function ProductImage({ asin, name, directUrl }: { asin: string; name: string; directUrl?: string }) {
  const [failed, setFailed] = useState(false);
  const src = directUrl ?? `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`;

  if ((!asin && !directUrl) || failed) {
    return (
      <div className="w-full h-32 rounded-lg bg-green-50 border border-gray-200 flex items-center justify-center">
        <Phone className="w-8 h-8 text-green-700/50" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="w-full h-32 object-contain rounded-lg bg-white/[0.03] border border-gray-100 p-2"
    />
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-xl bg-[#f0f2f5] border border-gray-200 p-5 flex flex-col gap-3 hover:border-green-500/40 transition-colors">
      <ProductImage asin={product.amazon_asin} name={product.name} directUrl={product.product_image_url} />

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-green-800 font-mono uppercase tracking-wider mb-0.5">{product.role}</p>
          <h4 className="text-gray-900 font-semibold text-base leading-snug">{product.name}</h4>
        </div>
        <span className="flex-shrink-0 px-2.5 py-1 rounded-full bg-green-50 border border-green-500/20 text-green-800 text-sm font-mono font-semibold whitespace-nowrap">
          {product.approx_price}
        </span>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed">{product.why_recommended}</p>

      <ul className="flex flex-col gap-1">
        {product.key_specs.map((spec) => (
          <li key={spec} className="flex items-start gap-1.5 text-gray-800 text-sm leading-relaxed">
            <span className="text-green-800 mt-0.5 flex-shrink-0">▸</span>
            {spec}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 mt-auto pt-1 flex-wrap">
        <a
          href={product.amazon_search_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF9900]/10 border border-[#FF9900]/30 text-[#FF9900] hover:bg-[#FF9900]/20 transition-colors text-sm font-semibold"
        >
          <ShoppingCart className="w-3 h-3" />
          Amazon
          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
        </a>
      </div>
    </div>
  );
}

export default function VoIPKitsPage() {
  const allKits = kitsData.kits as Kit[];
  const accessoryKit = allKits.find((k) => k.recommended_for_all);
  const meta = kitsData.meta;

  const [activeKitKey, setActiveKitKey] = useState<string | null>(null);
  const handleKitSelect = (key: string | null) => setActiveKitKey(key);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-32 pb-16 px-6 border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <SparklesCore
            id="voip-kits-hero-sparkles"
            background="transparent"
            minSize={0.3}
            maxSize={1}
            particleDensity={25}
            className="w-full h-full"
            particleColor="#15803d"
            speed={0.5}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-green-800 text-base font-semibold tracking-widest uppercase">
              NeedIT Recommended Gear
            </span>

            <div className="relative mt-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                VoIP <span className="text-green-700">Starter Kits</span>
              </h1>
              <div className="w-[20rem] h-12 mx-auto relative -mt-1">
                <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-[2px] w-4/5 blur-sm" />
                <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-px w-4/5" />
                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={800}
                  className="w-full h-full"
                  particleColor="#15803d"
                  speed={1.2}
                />
                <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(250px_80px_at_top,transparent_20%,white)]" />
              </div>
            </div>

            <p className="text-gray-800 max-w-2xl mx-auto text-xl leading-relaxed">
              Curated hardware bundles for every business size!
            </p>

            <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed mt-3">
              NeedIT Consulting participates in the Amazon Associates Program and other affiliate programs. We may earn a commission if you purchase through our links, at no extra cost to you. Prices and availability are subject to change.
            </p>

          </motion.div>
        </div>
      </div>

      {/* Circuit selector */}
      <div className="relative py-16 px-6 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="text-green-800 text-sm font-semibold tracking-widest uppercase">Quick Kit Finder</span>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-gray-900">
              Find your <span className="text-green-800">fit</span>
            </h2>
            <p className="mt-2 text-gray-700 text-base max-w-md mx-auto">
              Tap a node to explore each kit — products, platform recommendations, and setup details at a glance.
            </p>
          </motion.div>
          <VoIPKitCircuit onKitSelect={handleKitSelect} />
        </div>
      </div>

      <div className="relative flex-1 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Recommended with every kit — Adapters & Cables */}
          {accessoryKit && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16"
            >
              <div className="text-center mb-8">
                <span className="text-green-800 text-sm font-semibold tracking-widest uppercase">Recommended with every kit</span>
                <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-gray-900">
                  {accessoryKit.name}
                </h2>
                <p className="mt-2 text-gray-700 text-base max-w-xl mx-auto">{accessoryKit.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {accessoryKit.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 relative rounded-2xl overflow-hidden border border-green-500/30 bg-green-50 p-8 text-center"
          >
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <SparklesCore
                background="transparent"
                minSize={0.3}
                maxSize={0.8}
                particleDensity={40}
                className="w-full h-full"
                particleColor="#15803d"
                speed={0.8}
              />
            </div>
            <div className="relative z-10">
              <p className="text-green-800 text-base font-semibold uppercase tracking-widest mb-2">Not sure which kit is right for you?</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">{meta.cta_tagline}</h2>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-gray-900 font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ boxShadow: "0 0 20px rgba(74,222,128,0.3)" }}
              >
                Talk to NeedIT
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer affiliateDisclaimer />
      <VoIPGuide />
    </main>
  );
}
