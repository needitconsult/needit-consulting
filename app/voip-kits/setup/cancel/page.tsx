"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function SetupCancelPage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "radial-gradient(ellipse 160% 60% at 50% 0%, #ffffff 0%, #f0f9ff 40%, #e8f4f0 100%)" }}>
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center rounded-3xl p-10"
          style={{ background: "#ffffff", border: "1.5px solid #e5e7eb", boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}
        >
          <p className="text-4xl mb-4">👋</p>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">No problem!</h1>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Your checkout was cancelled and nothing was charged. Come back whenever you&apos;re ready.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/voip-kits"
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition-colors text-center flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to VoIP Kits
            </Link>
            <Link
              href="/#contact"
              className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors text-center"
            >
              Have questions? Contact NeedIT
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
